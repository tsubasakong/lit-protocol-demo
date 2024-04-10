import * as LitJsSdk from "@lit-protocol/lit-node-client-nodejs";
import authSig from "./authSig.js";
import crypto from "crypto";

// Example usage of crypto
const hash = crypto.createHash("sha256");
hash.update("Hello");
console.log(" test crypto", hash.digest("hex"));

async function decryptData(ciphertext, dataToEncryptHash, walletAddress) {
  try {
    console.log("Ciphertext to decrypt:", ciphertext);
    console.log("Data to encrypt hash:", dataToEncryptHash);
    console.log("Wallet address:", walletAddress);

    const litNodeClient = new LitJsSdk.LitNodeClientNodeJs({
      alertWhenUnauthorized: false,
      litNetwork: "cayenne",
    });
    await litNodeClient.connect();

    // Define the access control condition based on the Ethereum wallet address
    const accessControlConditions = [
      {
        contractAddress: "", // Leave empty if not using a specific contract
        standardContractType: "",
        chain: "ethereum",
        method: "",
        parameters: [":userAddress"],
        returnValueTest: {
          comparator: "=",
          value: walletAddress,
        },
      },
    ];

    // Decrypt the data
    const decryptedString = await LitJsSdk.decryptToString(
      {
        accessControlConditions,
        ciphertext,
        dataToEncryptHash,
        authSig,
        chain: "ethereum",
      },
      litNodeClient
    );

    console.log("decryptedString:", decryptedString);
    return decryptedString;
  } catch (error) {
    console.error("An error occurred during decryption:", error);
    // Handle the error appropriately, e.g., by rethrowing it, logging it, or returning a default value
    throw error; // Rethrow the error if you want to handle it further up the call stack
  }
}

// Example usage
const ciphertext =
  "pmrwuqL1rliUSf9xpPN4zs2miqk4aBe042NfN5UlhXK8yQQhoy43m9P9ExzloJHHDb5TbVPqEWfkwVB8MJEfC1BbvUD36ODUvBEhcXSd0tYgpbRjLXg9Iwf/P9uUvZyFGbd7kD2XDzTnxt/IqgFgtoQD";
const dataToEncryptHash =
  "2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824";
// const walletAddress = '0xC3496599a7BB64Ae83F1bf30Cee7607d6114Aa25';
const walletAddress = "0x74A6924CE57Bbdd83314d71DF0258A374667742d";
decryptedString = await decryptData(
  ciphertext,
  dataToEncryptHash,
  walletAddress
);
console.log("decryptedString:", decryptedString);
