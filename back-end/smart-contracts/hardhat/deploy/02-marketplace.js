module.exports = async ({ getNamedAccounts, deployments, network }) => {
    /**        address _daoContract,
        address _nftContract,
        uint256 _feePercentage */
 
    const { deploy, get } = deployments
    const { deployer } = await getNamedAccounts()
    let nft = await get('HafizEjaza')
    let dao = await get('HafizDAO')

     const _gracePeriod = 0// for testing 
 
    const _admins = [deployer]
    const lighthouseAddress = "0x3FDb159157C6CB8a8955CDcC2CeADFF157BA6F56";
    await deploy("HafizMarketplace", {
        // Learn more about args here: https://www.npmjs.com/package/hardhat-deploy#deploymentsdeploy
        from: deployer,
        args: [ dao.address,nft.address,_gracePeriod],
        log: true,
    });
};

/**
 * Use tags to run specific deploy scripts
 * For example:- npx hardhat deploy --tags Storage will run only this script
 */
module.exports.tags = ["HafizMarketplace"];
