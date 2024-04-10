import fs from "fs";
import * as LitJsSdk from "@lit-protocol/lit-node-client-nodejs";
import authSig from "./authSig.js";

async function encryptData(walletAddress) {
 try {
    const litNodeClient = new LitJsSdk.LitNodeClientNodeJs({
      alertWhenUnauthorized: false,
      litNetwork: "cayenne",
    });
    
    await litNodeClient.connect();
    // Define the access control condition based on the Ethereum wallet address
    const accessControlConditions = [
      {
        contractAddress: '', // Leave empty if not using a specific contract
        standardContractType: '',
        chain: 'ethereum',
        method: '',
        parameters: [
          walletAddress,
        ],
        returnValueTest: {
          comparator: '=',
          value: 'true',
        },
      },
    ];

    const { ciphertext, dataToEncryptHash } = await LitJsSdk.encryptString(
      {
        accessControlConditions,
        authSig,
        chain: "ethereum",
        dataToEncrypt: "hello",
      },
      litNodeClient
    );

    console.log("ciphertext", ciphertext);
    console.log("dataToEncryptHash", dataToEncryptHash);

    return { ciphertext, dataToEncryptHash };
 } catch (error) {
    console.error('An error occurred during encryption:', error);
    // Handle the error appropriately, e.g., by rethrowing it or returning a specific error response
    throw error; // Rethrow the error to be handled by the caller
 }
}

async function main() {
 try {
    const walletAddress = "0x74A6924CE57Bbdd83314d71DF0258A374667742d";
    const result = await encryptData(walletAddress);
  
    // Convert the result object to a JSON string
    const jsonString = JSON.stringify(result, null, 2); // The second and third arguments are for formatting
    
    // Write the JSON string to a file
    fs.writeFile('encryptionResult.json', jsonString, (err) => {
      if (err) {
        console.error('An error occurred while writing the file:', err);
      } else {
        console.log('The result has been saved to encryptionResult.json');
      }
    });
 } catch (error) {
    console.error('An error occurred in the main function:', error);
    // Handle the error appropriately
 }
}
main();
