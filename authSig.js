import { fromString as uint8arrayFromString } from "uint8arrays/from-string";
import ethers from "ethers";
import siwe from "siwe";
import * as LitJsSdk from "@lit-protocol/lit-node-client-nodejs";

import dotenv from "dotenv";
dotenv.config();

async function generateAuthSig(privKey) {

 const litNodeClient = new LitJsSdk.LitNodeClientNodeJs({ network: "cayenne" });
 await litNodeClient.connect();

 console.log("privKey", privKey);
 const privKeyBuffer = uint8arrayFromString(privKey, "base16");
 const wallet = new ethers.Wallet(privKeyBuffer);

 const domain = "localhost";
 const origin = "https://localhost/login";
 const statement = "This is a test statement. You can put anything you want here.";
 const expirationTime = new Date(Date.now() + 60 * 60 * 1000).toISOString();

 let nonce = litNodeClient.getLatestBlockhash();

 const siweMessage = new siwe.SiweMessage({
    domain,
    address: wallet.address,
    statement,
    uri: origin,
    version: "1",
    chainId: "1",
    nonce,
    expirationTime,
 });

 const messageToSign = siweMessage.prepareMessage();

 const signature = await wallet.signMessage(messageToSign);

 const recoveredAddress = ethers.utils.verifyMessage(messageToSign, signature);
 console.log("recoveredAddress", recoveredAddress);

 if (recoveredAddress !== wallet.address) {
    throw new Error("Recovered address does not match wallet address");
 }

 const latestBlockhash = litNodeClient.getLatestBlockhash();
 console.log("latestBlockhash", latestBlockhash);

const authSig = {
    sig: signature,
    derivedVia: "web3.eth.personal.sign",
    signedMessage: messageToSign,
    address: recoveredAddress,
 };

 console.log("authSig", authSig);
 return authSig;
}

export default generateAuthSig;
