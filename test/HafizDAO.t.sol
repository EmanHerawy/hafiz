// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "forge-std/Test.sol";
 import {HafizDAO} from '../src/HafizDAO.sol';
 import {HafizEjaza} from '../src/HafizEjaza.sol';
 import {IHafizDAO} from '../src/IHafizDAO.sol';
 import {IEjaza} from '../src/IEjaza.sol';
 import {HafizMarketplace} from '../src/HafizMarketplace.sol';
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

 contract DummyToken is ERC20{
    constructor() ERC20("my test payment token", "MTPT"){
       
    }

    function mint(address to , uint256 amount)  external{
        _mint(to, amount);
        
    }
 }

contract TestFullScenario is Test {

    address admin = address(123);
    address Bob = address(456);
    address Alice = address(789);
    address miner = address(987);
    address cleint= address(123);
    HafizDAO dataDAO;
    HafizEjaza ejaza;
    HafizMarketplace marketplace;
     uint256 _gracePeriod = 1 hours;
 
    function setUp() external {
    // deploy sender 
    // deploy receiver 
    
    // 
   // define address array for admins 
    address[] memory admins = new address[](1);
    admins[0] = admin;
     ejaza = new HafizEjaza();
    dataDAO = new HafizDAO(admins, address(ejaza),_gracePeriod);
    ejaza.setDAO(address(dataDAO));
 
      } 
    function testIssueIjazat()  public{
         // define 3 lenght array for ejaza
            IEjaza.Ejaza[] memory ejazaat = new IEjaza.Ejaza[](3);
            ejazaat[0] = IEjaza.Ejaza(IEjaza.Recitations.Hafs_3an_Aasem, block.timestamp , 0, "ipfs://0QmZ2");
            ejazaat[1] = IEjaza.Ejaza(IEjaza.Recitations.Warash_3an_Nafi3, block.timestamp, 0, "ipfs://0QmZ2");
            ejazaat[2] = IEjaza.Ejaza(IEjaza.Recitations.Qalun_3an_Nafi3, block.timestamp, 0, "ipfs://0QmZ2");
            // define 3 lenght array for tos
            address[] memory tos = new address[](3);
            tos[0] = Bob;
            tos[1] = Alice;
            tos[2] = miner;
              vm.warp(1680616584 + 30 days);
            // issue ejazaat
            ejaza.issueForLegacyEjaza(tos, ejazaat);
            // check if ejazaat are issued
            assertEq(ejaza.balanceOf(Bob), 1);
            assertEq(ejaza.balanceOf(Alice), 1);
            assertEq(ejaza.balanceOf(miner), 1);         
        }

        // fnction to test create proposal and execute it 
    function testCreateProposal() public{
           // create a proposal 
      /**    bytes memory pieceCid,
        bytes memory cid,
        address to,
        uint256 parentCertId,
        uint64 size,
        Recitations rewaya */
        IEjaza.Ejaza[] memory ejazaat = new IEjaza.Ejaza[](3);
            ejazaat[0] = IEjaza.Ejaza(IEjaza.Recitations.Hafs_3an_Aasem, block.timestamp  , 0, "ipfs://0QmZ2");
            ejazaat[1] = IEjaza.Ejaza(IEjaza.Recitations.Warash_3an_Nafi3, block.timestamp, 0, "ipfs://0QmZ2");
            ejazaat[2] = IEjaza.Ejaza(IEjaza.Recitations.Qalun_3an_Nafi3, block.timestamp, 0, "ipfs://0QmZ2");
            // define 3 lenght array for tos
            address[] memory tos = new address[](3);
            tos[0] = Bob;
            tos[1] = Alice;
            tos[2] = miner;
              vm.warp(1680616584 + 30 days);
            // issue ejazaat
            ejaza.issueForLegacyEjaza(tos, ejazaat);
                        assertEq(ejaza.balanceOf(Bob), 1);
            assertEq(ejaza.balanceOf(Alice), 1);
            assertEq(ejaza.balanceOf(miner), 1); 
        bytes  memory pieceCid = bytes("baga6ea4seaqkaefdzn7rzgxs7w2ablcc75wqvnve6y5slap3dmcxiffjw3jtioy");
        bytes memory cid = bytes("QmUHZ9CVsHYvLpAhA6egP9Y878Fbd1Yr4io98STVHJA2yr");
        uint256 parentCertId = 1;
        uint64 size = 16777216;
        IEjaza.Recitations rewaya = IEjaza.Recitations.Hafs_3an_Aasem;

      
        uint64[] memory dealIds = new uint64[](1);
        dealIds[0] = 136968;
         // Non member can not propose
        vm.expectRevert();
        bytes32 proposalId = dataDAO.propose(pieceCid, cid, Bob, parentCertId, size, rewaya);
          // non Ejaza holder can not join the DAO
         vm.expectRevert();
         vm.startPrank(cleint);
          dataDAO.joinDAO(); 
            vm.stopPrank();
         vm.startPrank(Bob);
          dataDAO.joinDAO(); 
            proposalId = dataDAO.propose(pieceCid, cid, Bob, parentCertId, size, rewaya);
            vm.stopPrank();
             vm.warp(1680616584 + 300 days);
             // execute
             vm.startPrank(Bob);
             dataDAO.executeProposal(proposalId, dealIds);
                vm.stopPrank();
             
        }


}
 
 
