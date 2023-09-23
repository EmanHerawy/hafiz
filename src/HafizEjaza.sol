// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

import "./IEjaza.sol";
// nft based Ejaza certificate. non transferable , minitters are nft holders. it should keep track of parent nft for every minted child nft

contract HafizEjaza is IEjaza, Ownable, ERC721 {
    address daoContract;
    uint256 public counter;
  
    struct Ejaza {
        Recitations qiraa;
        // The timestamp from the block when this is created.
        uint256 issueTime;
        uint256 parentCertId;
        // recording cid
        string recodingURl;
    }

    // token id to Ejaza details
    mapping(uint256 => Ejaza) public isssuedEjaza;
    // link the minted ejaza to its parent
    // tokenid to tokenid
    mapping(uint256 => uint256) public ejazaLink;
    modifier onlyDAO() {
        if (_msgSender() != daoContract) {
            revert();
        }
        _;
    }

    constructor() ERC721("Hafiz Ejaza Token", "HET") {}

    function issueForLegacyEjaza(
        address[] memory _tos,
        Ejaza[] memory _legacyEjaza
    ) external onlyOwner {
        uint256 length = _legacyEjaza.length;
        uint256 index;
        if (_tos.length != length) {
            revert();
        }
        for (; index < length; ) {
            if (
                _legacyEjaza[index].issueTime == 0 ||
                _legacyEjaza[index].issueTime >= block.timestamp
            ) {
                revert();
            }
            unchecked {
                ++counter;
            }
            isssuedEjaza[counter] = _legacyEjaza[index];
            _safeMint(_tos[index], counter, "");
            ejazaLink[counter] = _legacyEjaza[index].parentCertId;
            unchecked {
                ++index;
            }
            emit EjazaIssued(
                _tos[index],
                _msgSender(),
                _legacyEjaza[index].parentCertId,
                counter,
                _legacyEjaza[index].qiraa
            );
        }
    }

    function issueEjaza(
        uint256 parentCertId_,
        string memory recodingURl_,
        Recitations qiraa_,
        address from,
        address to
    ) external onlyDAO returns (uint256) {
        if (ownerOf(parentCertId_) != from) {
            revert();
        }
        if (isssuedEjaza[parentCertId_].qiraa != qiraa_) {
            revert();
        }

        unchecked {
            ++counter;
        }
        _safeMint(to, counter, "");
        ejazaLink[counter] = parentCertId_;
        isssuedEjaza[counter] = Ejaza({
            qiraa: qiraa_,
            issueTime: block.timestamp,
            parentCertId: parentCertId_,
            recodingURl: recodingURl_
        });
        emit EjazaIssued(to, from, parentCertId_, counter, qiraa_);
        return counter;
    }

    /// @dev Returns recitation of the ejaza.
    /// @param _ejazaId: Id of the ejaza.
    /// @return Recitation of the ejaza.
    function getRecitation(uint256 _ejazaId)
        external
        view
        returns (Recitations)
    {
        return isssuedEjaza[_ejazaId].qiraa;
    }

    function _safeTransfer(
        address,
        address,
        uint256,
        bytes memory
    ) internal pure override {
        revert();
    }

    function _transfer(
        address,
        address,
        uint256
    ) internal pure override {
        revert();
    }

    // make it non transaferable

    event EjazaIssued(
        address indexed to,
        address from,
        uint256 indexed parentCertId,
        uint256 indexed id,
        Recitations recitation
    );
}
