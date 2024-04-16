import * as LitJsSdk from "@lit-protocol/lit-node-client-nodejs";
import generateAuthSig from "./authSig.js"; // Import the function
import fs from "fs";

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
        contractAddress: '', // Leave empty if not using a specific contract
        standardContractType: '',
        chain: 'ethereum',
        method: '',
        parameters: [
          ":userAddress",
          "latest",
        ],
        returnValueTest: {
          comparator: "=",
          value: walletAddress,  // wallet address which should be able to encrypt/decrypt the string
        },
      },
    ];

    const authSig = await generateAuthSig(process.env.PRIVATE_KEY_DECRYPT);

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
// const ciphertext =
//   "t6eQxB228Z93Ju8lcJ3r4DfYK7oXES+r5bWL5LOobDsmXQ7YwWlkRd7U0MUfXR35OpAyBLbGjJeDgafdmloS0Ev/M6HEivWV+u9DZpFfDzUg8pIl1zjEYF0mMXUN8S7KJMxSeZuYl/E/7O04LrGn5DYD";
// const dataToEncryptHash =
//   "2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824";
const encryptionResult = JSON.parse(fs.readFileSync('encryptionResult.json', 'utf8'));
const { ciphertext, dataToEncryptHash } = encryptionResult;
// const walletAddress = '0xC3496599a7BB64Ae83F1bf30Cee7607d6114Aa25';
const walletAddress = "0x74A6924CE57Bbdd83314d71DF0258A374667742d";
const decryptedString = await decryptData(
  ciphertext,
  dataToEncryptHash,
  walletAddress
);
console.log("decryptedString:", decryptedString);
