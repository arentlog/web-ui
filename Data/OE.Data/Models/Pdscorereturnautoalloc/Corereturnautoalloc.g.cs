//------------------------------------------------------------------------------
// 
//     This code was generated by a tool.
//     Template version $Rev: 13370 $
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
//
//     (c) Infor Global Solutions 2018
// 
//------------------------------------------------------------------------------

#pragma warning disable 1591
using System;
using System.ComponentModel.DataAnnotations;
using System.Data;
using System.Collections.Generic;
using System.Linq;
using HelpPageErrorSimulator.HelpArea.Areas.HelpPage.ModelDescriptions;
using ServiceInterfaceClient.Attributes;
using ServiceInterfaceClient.BaseClasses;
using ServiceInterfaceClient.Helpers;
using ServiceInterfaceClient.Interfaces;

namespace Infor.Sxe.OE.Data.Models.Pdscorereturnautoalloc
{
   [ModelName("Infor.Sxe.OE.Data.Models.Pdscorereturnautoalloc.Corereturnautoalloc")]
   public partial class Corereturnautoalloc : ModelBase
   {
      public int mOrderNo { get; set; }
      public int mOrdersuf { get; set; }
      public int mCurrentLineno { get; set; }
      [StringValidationAttribute]
      public string cCoreType { get; set; }
      public int iRetOrderNo { get; set; }
      public int iRetOrdersuf { get; set; }
      public int iRetLineNo { get; set; }
      [StringValidationAttribute]
      public string cCallMode { get; set; }
      [StringValidationAttribute]
      public string cProd { get; set; }
      public decimal mCustno { get; set; }
      public decimal dStkQtyOrd { get; set; }
      public decimal iImplyQty { get; set; }
      [StringValidationAttribute]
      public string speccostty { get; set; }
      public decimal csunperstk { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Corereturnautoalloc BuildCorereturnautoallocFromRow(DataRow row)
      {
         Corereturnautoalloc entity = new Corereturnautoalloc();
         entity.mOrderNo = row.IsNull("mOrderNo") ? 0 : row.Field<int>("mOrderNo");
         entity.mOrdersuf = row.IsNull("mOrdersuf") ? 0 : row.Field<int>("mOrdersuf");
         entity.mCurrentLineno = row.IsNull("mCurrentLineno") ? 0 : row.Field<int>("mCurrentLineno");
         entity.cCoreType = row.IsNull("cCoreType") ? string.Empty : row.Field<string>("cCoreType");
         entity.iRetOrderNo = row.IsNull("iRetOrderNo") ? 0 : row.Field<int>("iRetOrderNo");
         entity.iRetOrdersuf = row.IsNull("iRetOrdersuf") ? 0 : row.Field<int>("iRetOrdersuf");
         entity.iRetLineNo = row.IsNull("iRetLineNo") ? 0 : row.Field<int>("iRetLineNo");
         entity.cCallMode = row.IsNull("cCallMode") ? string.Empty : row.Field<string>("cCallMode");
         entity.cProd = row.IsNull("cProd") ? string.Empty : row.Field<string>("cProd");
         entity.mCustno = row.IsNull("mCustno") ? decimal.Zero : row.Field<decimal>("mCustno");
         entity.dStkQtyOrd = row.IsNull("dStkQtyOrd") ? decimal.Zero : row.Field<decimal>("dStkQtyOrd");
         entity.iImplyQty = row.IsNull("iImplyQty") ? decimal.Zero : row.Field<decimal>("iImplyQty");
         entity.speccostty = row.IsNull("speccostty") ? string.Empty : row.Field<string>("speccostty");
         entity.csunperstk = row.IsNull("csunperstk") ? decimal.Zero : row.Field<decimal>("csunperstk");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromCorereturnautoalloc(ref DataRow row, Corereturnautoalloc entity)
      {
         row.SetField("mOrderNo", entity.mOrderNo);
         row.SetField("mOrdersuf", entity.mOrdersuf);
         row.SetField("mCurrentLineno", entity.mCurrentLineno);
         row.SetField("cCoreType", entity.cCoreType);
         row.SetField("iRetOrderNo", entity.iRetOrderNo);
         row.SetField("iRetOrdersuf", entity.iRetOrdersuf);
         row.SetField("iRetLineNo", entity.iRetLineNo);
         row.SetField("cCallMode", entity.cCallMode);
         row.SetField("cProd", entity.cProd);
         row.SetField("mCustno", entity.mCustno);
         row.SetField("dStkQtyOrd", entity.dStkQtyOrd);
         row.SetField("iImplyQty", entity.iImplyQty);
         row.SetField("speccostty", entity.speccostty);
         row.SetField("csunperstk", entity.csunperstk);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
