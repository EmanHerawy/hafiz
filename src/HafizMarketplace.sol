// SPDX-License-Identifier: MIT License
pragma solidity ^0.8.17;


import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

/**
 * @title HafizMarketplace
 * HafizMarketplace - a contract for user to hir certified tutors " Shikh". to teach them quran
 * Fees: 3% fees are collected from the tutor for each transaction and dipoisted to the DAO contract to be used  for paying for perserving/ retreiving the recordings of the tutors associated with their NFTs certificates.
 * students- tutor matching: " off-chain"
    * student can post a request to hire a tutor and any tutor can apply ad negotiate the price with the student. if the student accepts the offer,  the studnet send on-chain offer to the tutor and the tutor can accept or reject the offer.
    * the student can search for a tutor by his/her NFT certificate number and then send a request to the tutor to teach him/her. The tutor can accept or reject the request.
 * offer " on-chain": the tutor can offer a price for his/her service and the student can accept it or offer a new price. the contract will check to make sure the tutor is eligible to teach the student based on the tutor's NFT certificate details.
 * payment: the student can pay the tutor through time-based escrow contract. the tutor can withdraw the payment after the student confirms the tutor has taught him/her.
 
 */
contract HafizMarketplace {
    address public daoContract;
     IERC721 public nftContract;
    uint256 public feePercentage;
    uint256 public totalOffers;
    // offer id to offer details
    mapping(uint256 => Offer) public offers;
       enum Recitations {
        Hafs_3an_Aasem,
        Warash_3an_Nafi3,
        Qalun_3an_Nafi3,
        Aldawriu_3an_Abi_Amr,
        Abi_alharith_3an_Alkisaaiy,
        Aldawri_3an_Alkisaaiy,
        Shoo3ba_3an_Aasem,
        Qunbul_3an_Abn_Katheer,
        Albizi_3an_Abn_Katheer,
        Alsuwsi_3an_Abi_Amr
    }
    struct Offer{
        address tutor;
        address student;
        uint256 tokenId;
        uint256 price;
        uint256 time;
        Recitations qiraa;
        bool accepted;
        string data;
    }


    function submitOffer(offers memory offer_) {
        
    }
    function acceptOffer(offers memory offer_) {
        
    }
    function cancelOffer(offers memory offer_) {
        
    }
    function rejectOffer(offers memory offer_) {
        
    }


}