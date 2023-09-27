module.exports = async ({ getNamedAccounts, deployments, network }) => {
    /**     constructor(address[] memory _admins, address _membershipNFT, uint256 _gracePeriod, address _agregator) {
 */
 
    const { deploy, get } = deployments
    const { deployer } = await getNamedAccounts()
    let nft = await get('HafizEjaza')

     const _gracePeriod = 0// for testing 
 
    const _admins = [deployer]
    const lighthouseAddress = "0x3FDb159157C6CB8a8955CDcC2CeADFF157BA6F56";
     await deploy("HafizDAO", {
        // Learn more about args here: https://www.npmjs.com/package/hardhat-deploy#deploymentsdeploy
        from: deployer,
        args: [ _admins,nft.address,_gracePeriod,lighthouseAddress],
        log: true,
    });
};

/**
 * Use tags to run specific deploy scripts
 * For example:- npx hardhat deploy --tags Storage will run only this script
 */
module.exports.tags = ["HafizDAO"];
