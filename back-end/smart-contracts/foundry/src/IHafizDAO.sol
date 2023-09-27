// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;
import "./IEjaza.sol";
interface IHafizDAO  is IEjaza{
    // we need to know the type of recitations
 
   

 
    enum ProposalState {
        Proposed,
        Passed,
        Flagged,
        Executed

    }
 
    struct EjazaProposal {
        address proposedBy;
        address to;
        uint64[] dealIds;
        bytes  cid;
        Recitations recitation;
        uint256 parentCertId;
        uint256 proposedAt;
        ProposalState status;
    }
    // mapping of the Ejaza data cid to the proposal details to make sure that cid is unique per proposal
    /// @dev Emitted when a admin is added to the DAO
    /// @param adminAddress: account address of the admin
    event AdminAdded(address adminAddress);

    /// @dev Emitted when a member is added to the DAO
    /// @param memberAddress: account address of the member
    event MemberAdded(address memberAddress);

    /// @dev Emitted when new ejaza is proposed
    /// @param proposalId: id of the proposal
    /// @param proposedBy: account address of the member who proposed the ejaza
    /// @param recitation: recitation of the ejaza
    event EjazaProposed(
        bytes32 proposalId,
        address proposedBy,
        Recitations recitation
    );

    /// @dev Emitted when a proposal is flagged
    /// @param proposalId: id of the proposal
    /// @param flaggedBy: account address of the member who flagged the proposal
    event ProposalFlagged(bytes32 proposalId, address flaggedBy);

    /// @dev Emitted when a proposal is executed
    /// @param proposalId: id of the proposal
    /// @param cid: cid of the proposal data
    /// @param executedBy: account address of the member who executed the proposal
    /// @param ejazaId: id of the ejaza
    /// @param recitation: recitation of the ejaz
    /// @param dealIds: deal ids of the ejaza
    event ProposalExecuted(
        bytes32 proposalId,
        bytes cid,
        address executedBy,
        uint256 ejazaId,
        Recitations recitation,
        uint64[] dealIds
    );
     /// @dev Emitted when a deal is refunded
    /// @param dealId: id of the deal
    /// @param provider: account address of the provider
    /// @param client: account address of the client
    /// @param amount: amount of the deal
    /// @param executedBy: account address of the member who executed the proposal
    event DealRefunded(
        uint64 dealId,
        address provider,
        address client,
        uint256 amount,
        address executedBy
    );
        function joinDAO() external;
    // only DAO members can propose a new ejaza
    function propose(
         bytes memory cid,
        address to,
        uint256 parentCertId,
         Recitations rewaya
    ) external returns (bytes32 proposalId);

    // flag a proposal if it is not valid. Only DAO members can flag a proposal within the grace period
    function flagProposal(bytes32 proposalId) external;
    // if proposal isnot flagged within the grace period, it will be passed. Anyone can call this function to execute the proposal and  Ejaza will be minted
    function executeProposal(bytes32 proposalId ) external;

    // function addDealId(bytes32 proposalId, uint64 dealId) external;
   
    // function getDealIds(bytes32 proposalId) external view returns (uint64[] memory) ;

    // function getProviders(bytes32 proposalId) external view returns (uint64[] memory) ;

    // function getActiveProviders(bytes32 proposalId) external view returns (uint64[] memory);
    //  function getDataProof(bytes32 proposalId) external view  returns (string memory) ;
     // errors go here
         error NotMember();
        error NotValidCID();
        // cidToProposalId[cid] != bytes32(0))
        error CidAlreadyUsed();
         error NotValidProposal();
        error NotValidDeal();
        error NotValidProposalState();
         error ExpiredProposal();
    //proposal.proposedAt + gracePeriod > block.timestamp
        error NotReadyForExecution();
        error ZeroDealId();
        error NotValidDealIds();
        error EmptyDealIds();
        error NotValidDealData();
        error AlreadyRefunded();
        error NotValidPeiceSize();

}
