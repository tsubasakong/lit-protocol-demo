# Lit Protocol Demo Project

This project demonstrates how to use the Lit Protocol for encryption and decryption operations. It includes examples for encrypting data, decrypting data, and generating authentication signatures using the Lit Protocol SDK.

## Getting Started

### Prerequisites

- Node.js installed on your system.
- Familiarity with JavaScript and Node.js.
- A basic understanding of the Lit Protocol and its SDK.

### Installation

1. Clone the repository to your local machine:
   ```
   git clone https://github.com/tsubasakong/lit-protocol-demo.git
   ```
2. Navigate to the project directory:
   ```
   cd lit-protocol-demo
   ```
3. Install the project dependencies:
   ```
   npm install
   ```
   or if you are using Yarn:
   ```
   yarn install
   ```

### Configuration

- Ensure you have the necessary environment variables set up, such as `PRIVATE_KEY_ENCRYPT` and `PRIVATE_KEY_DECRYPT`, which are used for encryption and decryption operations.

## Usage

### Encrypting Data

1. Run the encryption script:
   ```
   node encrypt.js
   ```
   This script will encrypt a sample string ("hello") using the Lit Protocol and save the encrypted data and its hash to `encryptionResult.json`.

2. The encrypted data and its hash will be printed to the console and saved to `encryptionResult.json`.

### Decrypting Data

1. Ensure you have the `encryptionResult.json` file from the encryption step.

2. Run the decryption script:
   ```
   node decrypt.js
   ```
   This script will read the encrypted data and its hash from `encryptionResult.json`, decrypt the data, and print the decrypted string to the console.

