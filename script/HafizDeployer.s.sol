// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "forge-std/Script.sol";
  import {HafizDAO} from '../src/HafizDAO.sol';
 import {HafizEjaza} from '../src/HafizEjaza.sol';
 import {IHafizDAO} from '../src/IHafizDAO.sol';
 import {IEjaza} from '../src/IEjaza.sol';
 import {HafizMarketplace} from '../src/HafizMarketplace.sol';
contract HafizDeployer is Script {
    function run(address shikh1 ,uint256 _gracePeriod) external {
        uint256 senderPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(senderPrivateKey);

        HafizEjaza    ejaza = new HafizEjaza();
        // define array of admins 
        address[] memory admins = new address[](1);
      admins [0]= ejaza.owner();

        HafizDAO dataDAO = new HafizDAO(admins, address(ejaza),_gracePeriod);
        ejaza.setDAO(address(dataDAO));
        
        console.log(
            "Ejaza deployed with address: ",
            address(ejaza)
        );
        console.log(
            "Deployer address: ",
            admins[0]
        );
        console.log(
            "mg.sender address: ",
            msg.sender
        );
        console.log(
            "Ejaza DAO deployed with address: ",
            address(dataDAO)
        );

  IEjaza.Ejaza[] memory ejazaat = new IEjaza.Ejaza[](1);
            ejazaat[0] = IEjaza.Ejaza(IEjaza.Recitations.Hafs_3an_Aasem, block.timestamp  , 0, "ipfs://0QmZ2");
           // define 1 lenght array for tos
            address[] memory tos = new address[](1);
            tos[0] = shikh1;
           
             // issue ejazaat
            ejaza.issueForLegacyEjaza(tos, ejazaat);
                  uint256 shikh1Balance=    ejaza.balanceOf(shikh1);
            
            console.log("Balance: " , shikh1Balance);
        bytes  memory pieceCid = bytes("baga6ea4seaqikl4jmuhmvw7ldtf3qdhukoxsbu6qgwrxnfbf5zfgmgdtzkv7oai");
        bytes memory cid = bytes("QmUHZ9CVsHYvLpAhA6egP9Y878Fbd1Yr4io98STVHJA2yr");
        uint256 parentCertId = 1;
        uint64 size = 16777216;
        IEjaza.Recitations rewaya = IEjaza.Recitations.Hafs_3an_Aasem;

      
        uint64[] memory dealIds = new uint64[](1);
        dealIds[0] = 136999;
      
          dataDAO.joinDAO(); 
        bytes32 proposalId = dataDAO.propose(pieceCid, cid, admins[0], parentCertId, size, rewaya);
        //   console.log("proposalId: ", string(proposalId));
          //   dataDAO.executeProposal(proposalId, dealIds);
                
           // dataDAO.dealCheck( dealIds[0]);
        vm.stopBroadcast();
    }
}

 

 