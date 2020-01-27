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

namespace Infor.Sxe.AR.Data.Models.Pdsgleta
{
   [ModelName("Infor.Sxe.AR.Data.Models.Pdsgleta.Gletaheader")]
   public partial class Gletaheader : ModelBase
   {
      public decimal proof { get; set; }
      public decimal dorigdistamt { get; set; }
      public int glyear { get; set; }
      public decimal ddiscglar { get; set; }
      public decimal ddiscglap { get; set; }
      public int posttype { get; set; }
      public int posttype2 { get; set; }
      public int iAdjGLDivNo { get; set; }
      public int iAdjGLDeptNo { get; set; }
      public int iAdjGLAcctNo { get; set; }
      public int iAdjGLSubNo { get; set; }
      public decimal dExContAmt { get; set; }
      public int iDiscDiv { get; set; }
      public int iDiscDept { get; set; }
      public int iDiscAcct { get; set; }
      public int iDiscSub { get; set; }
      public decimal dInvFRate { get; set; }
      public decimal dvendtaxamt { get; set; }
      [StringValidationAttribute]
      public string currproc { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Gletaheader BuildGletaheaderFromRow(DataRow row)
      {
         Gletaheader entity = new Gletaheader();
         entity.proof = row.IsNull("proof") ? decimal.Zero : row.Field<decimal>("proof");
         entity.dorigdistamt = row.IsNull("dorigdistamt") ? decimal.Zero : row.Field<decimal>("dorigdistamt");
         entity.glyear = row.IsNull("glyear") ? 0 : row.Field<int>("glyear");
         entity.ddiscglar = row.IsNull("ddiscglar") ? decimal.Zero : row.Field<decimal>("ddiscglar");
         entity.ddiscglap = row.IsNull("ddiscglap") ? decimal.Zero : row.Field<decimal>("ddiscglap");
         entity.posttype = row.IsNull("posttype") ? 0 : row.Field<int>("posttype");
         entity.posttype2 = row.IsNull("posttype2") ? 0 : row.Field<int>("posttype2");
         entity.iAdjGLDivNo = row.IsNull("iAdjGLDivNo") ? 0 : row.Field<int>("iAdjGLDivNo");
         entity.iAdjGLDeptNo = row.IsNull("iAdjGLDeptNo") ? 0 : row.Field<int>("iAdjGLDeptNo");
         entity.iAdjGLAcctNo = row.IsNull("iAdjGLAcctNo") ? 0 : row.Field<int>("iAdjGLAcctNo");
         entity.iAdjGLSubNo = row.IsNull("iAdjGLSubNo") ? 0 : row.Field<int>("iAdjGLSubNo");
         entity.dExContAmt = row.IsNull("dExContAmt") ? decimal.Zero : row.Field<decimal>("dExContAmt");
         entity.iDiscDiv = row.IsNull("iDiscDiv") ? 0 : row.Field<int>("iDiscDiv");
         entity.iDiscDept = row.IsNull("iDiscDept") ? 0 : row.Field<int>("iDiscDept");
         entity.iDiscAcct = row.IsNull("iDiscAcct") ? 0 : row.Field<int>("iDiscAcct");
         entity.iDiscSub = row.IsNull("iDiscSub") ? 0 : row.Field<int>("iDiscSub");
         entity.dInvFRate = row.IsNull("dInvFRate") ? decimal.Zero : row.Field<decimal>("dInvFRate");
         entity.dvendtaxamt = row.IsNull("dvendtaxamt") ? decimal.Zero : row.Field<decimal>("dvendtaxamt");
         entity.currproc = row.IsNull("currproc") ? string.Empty : row.Field<string>("currproc");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromGletaheader(ref DataRow row, Gletaheader entity)
      {
         row.SetField("proof", entity.proof);
         row.SetField("dorigdistamt", entity.dorigdistamt);
         row.SetField("glyear", entity.glyear);
         row.SetField("ddiscglar", entity.ddiscglar);
         row.SetField("ddiscglap", entity.ddiscglap);
         row.SetField("posttype", entity.posttype);
         row.SetField("posttype2", entity.posttype2);
         row.SetField("iAdjGLDivNo", entity.iAdjGLDivNo);
         row.SetField("iAdjGLDeptNo", entity.iAdjGLDeptNo);
         row.SetField("iAdjGLAcctNo", entity.iAdjGLAcctNo);
         row.SetField("iAdjGLSubNo", entity.iAdjGLSubNo);
         row.SetField("dExContAmt", entity.dExContAmt);
         row.SetField("iDiscDiv", entity.iDiscDiv);
         row.SetField("iDiscDept", entity.iDiscDept);
         row.SetField("iDiscAcct", entity.iDiscAcct);
         row.SetField("iDiscSub", entity.iDiscSub);
         row.SetField("dInvFRate", entity.dInvFRate);
         row.SetField("dvendtaxamt", entity.dvendtaxamt);
         row.SetField("currproc", entity.currproc);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
