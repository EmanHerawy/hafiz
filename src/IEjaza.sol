/// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

interface IEjaza {
  // we need to know the type of recitations
    /**
   حفص عن عاصم.
  ورش عن نافع.
  قالون عن نافع.
  الدوري عن أبي عمرو.
  أبي الحارث عن الكسائي.
  الدوري عن الكسائي.
  شعبة عن عاصم.
  قنبل عن ابن كثير.
  البزي عن ابن كثير.
  السوسي عن أبي عمرو.
     */
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
        struct Ejaza {
        Recitations qiraa;
        // The timestamp from the block when this is created.
        uint256 issueTime;
        uint256 parentCertId;
        // recording cid
        string recodingURl;
    }

    // define error messages
    error NotAuthorized();
    error ZeroAddress();
    // error if the from is not the owner of the parent cert
    error NotParentCertOwner();
    // error if issuing diffrent recitation
    error NotSameRecitation();
    //  if (_tos.length != length)
    error NotSameLength();
    /** if  _legacyEjaza[index].issueTime == 0 ||
                _legacyEjaza[index].issueTime >= block.timestamp */
    error NotValidIssueTime();

}