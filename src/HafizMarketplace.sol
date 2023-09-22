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

    enum OfferState {
        Pending,
        Accepted,
        Rejected,
        Canceled,
        Fulfiled
    }
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
    struct Offer {
        address tutor;
        address student;
        uint256 tokenId;
        uint256 price;
        uint256 gracePeriod;
        uint256 offerTime;
        Recitations qiraa;
        OfferState status;
        string data;
    }

    constructor(
        address _daoContract,
        address _nftContract,
        uint256 _feePercentage
    ) {
        daoContract = _daoContract;
        nftContract = IERC721(_nftContract);
        feePercentage = _feePercentage;
    }

    // offer per session
    function submitOffer(Offer memory offer_) external payable {
        /// TODO:: apply these checks
        // create offer id based on the offer details
        // check if the tutor is eligible to teach the student based on the tutor's NFT certificate details.

        /// TODO : add more checks
        // check if the student has sent money to pay the tutor

        if (offer_.price == msg.value) {
            revert();
        }
        ++totalOffers;
        offers[totalOffers] = offer_;
    }

    function acceptOffer(uint256 offerId) external {
        Offer storage offer_ = offers[offerId];
        // tutor can accept the offer
        if (offer_.tutor != msg.sender) {
            revert();
        }
        if (offer_.status != OfferState.Pending) {
            revert();
        }
        // expire the offer if the tutor does not accept it within the grace period
        if(offer_.offerTime + offer_.gracePeriod < block.timestamp) {
            revert();
        }

        offer_.status = OfferState.Accepted;
    }

    function cancelOffer(uint256 offerId ) external {
                Offer storage offer_ = offers[offerId];

        if (offer_.tutor != msg.sender || offer_.student != msg.sender) {
            revert();
        }

        if (offer_.status == OfferState.Pending) {
            revert();
        }
        // Student can cancel the offer only within the grace period
        if (
            offer_.status == OfferState.Accepted &&
            offer_.offerTime + offer_.gracePeriod < block.timestamp &&
            offer_.student == msg.sender
        ) {
            revert();
        }

        offer_.status = OfferState.Canceled;
        // refund the student
        payable(offer_.student).transfer(offer_.price);
    }

    function rejectOffer(uint256 offerId ) external {
                Offer storage offer_ = offers[offerId];
        if (offer_.tutor != msg.sender) {
            revert();
        }
        if (offer_.status != OfferState.Pending) {
            revert();
        }
        offer_.status = OfferState.Rejected;
        payable(offer_.student).transfer(offer_.price);
    }

    // tutor fullfill the offer and get paid. Fee percentage is deducted and transfered to DAO
    function fullfillOffer(uint256 offerId ) external {
                Offer storage offer_ = offers[offerId];
        if (offer_.tutor != msg.sender) {
            revert();
        }
        if (offer_.status != OfferState.Accepted) {
            revert();
        }
        if (offer_.offerTime + offer_.gracePeriod > block.timestamp) {
            revert();
        }
        offer_.status = OfferState.Fulfiled;
        uint256 fees = (offer_.price * feePercentage) / 100;
        // transfer the money to the tutor
        payable(offer_.tutor).transfer(offer_.price - fees);
        // transfer the fee to the DAO
        payable(daoContract).transfer(fees);
    }
}
