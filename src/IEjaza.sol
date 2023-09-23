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
}