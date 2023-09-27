// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const NFT = await hre.ethers.getContractFactory("HafizEjaza");
  const nft = await NFT.attach("0x9aaD4719E6466835cb5B6c474450B20482DA672e")

  await nft.deployed();
  // let tx = await nft.setDAO("0xd9f311186176cF51255E4591fBfA078a6F367C0E");
  // console.log({tx});
  let ejaza =  {
     qiraa:0,
        // The timestamp from the block when this is created.
    issueTime: 1641894434,
         parentCertId:0,
        // recording cid
         recodingURl:""
}
  let tos = ["0x8906EA0bc4b4e62314417eCdcbe45757112720E8"];
  ejazat = [ejaza];
  let tx = await nft.issueForLegacyEjaza(tos,ejazat)
  console.log({tx});
  console.log("Greeter deployed to:", nft.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
