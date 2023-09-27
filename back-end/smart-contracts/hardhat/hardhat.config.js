require("@nomicfoundation/hardhat-toolbox")
require("hardhat-deploy")
require("hardhat-deploy-ethers")
 require("dotenv").config()
// This is the mnemonic used by celo-devchain
const DEVCHAIN_MNEMONIC =
    "concert load couple harbor equip island argue ramp clarify fence smart topic";
const PRIVATE_KEY = process.env.PRIVATE_KEY

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
    solidity: {
        version: "0.8.17",
        settings: {
            optimizer: {
                enabled: true,
                runs: 1000,
                details: { yul: false },
            },
        },
    },
    defaultNetwork: "calibrationnet",
    networks: {
        localnet: {
            chainId: 31415926,
            url: "http://127.0.0.1:1234/rpc/v1",
            accounts: [PRIVATE_KEY],
        },
        calibrationnet: {
            chainId: 314159,
            url: "https://api.calibration.node.glif.io/rpc/v1",
            accounts: [PRIVATE_KEY],
        },
        filecoinmainnet: {
            chainId: 314,
            url: "https://api.node.glif.io",
            accounts: [PRIVATE_KEY],
        },
    },
    etherscan: {
        apiKey: {
            // Get it from here: https://celoscan.io/myapikey
            alfajores: process.env.CELOSCAN_API_KEY,
            celo: process.env.CELOSCAN_API_KEY,
        },
    },
   
    /**
     * Named Accounts become available as variable names in scripts
     * Learn more: https://github.com/wighawag/hardhat-deploy#1-namedaccounts-ability-to-name-addresses
     */
    namedAccounts: {
        deployer: 0,
        alice: 1,
        bob: 2,
    },
    typechain: {
        outDir: "types",
        target: "web3-v1",
        alwaysGenerateOverloads: false, // should overloads with full signatures like deposit(uint256) be generated always, even if there are no overloads?
        externalArtifacts: ["externalArtifacts/*.json"], // optional array of glob patterns with external artifacts to process (for example external libs from node_modules)
    },
};

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
    const accounts = await hre.ethers.getSigners();

    for (const account of accounts) {
        console.log(account.address);
    }
});

task(
    "devchain-keys",
    "Prints the private keys associated with the devchain",
    async (taskArgs, hre) => {
        const accounts = await hre.ethers.getSigners();
        const hdNode = hre.ethers.utils.HDNode.fromMnemonic(DEVCHAIN_MNEMONIC);
        for (let i = 0; i < accounts.length; i++) {
            const account = hdNode.derivePath(`m/44'/60'/0'/0/${i}`);
            console.log(
                `Account ${i}\nAddress: ${account.address}\nKey: ${account.privateKey}`
            );
        }
    }
);

task("create-account", "Prints a new private key", async () => {
    const wallet = new hre.ethers.Wallet.createRandom();
    console.log(`PRIVATE_KEY="` + wallet.privateKey + `"`);
    console.log(`Your account address: `, wallet.address);
});

task(
    "print-account",
    "Prints the address of the account associated with the private key in .env file",
    () => {
        const wallet = new hre.ethers.Wallet(process.env.PRIVATE_KEY);
        console.log(`Account: `, wallet.address);
    }
);
