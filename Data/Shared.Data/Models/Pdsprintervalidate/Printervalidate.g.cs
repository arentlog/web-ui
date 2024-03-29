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

namespace Infor.Sxe.Shared.Data.Models.Pdsprintervalidate
{
   [ModelName("Infor.Sxe.Shared.Data.Models.Pdsprintervalidate.Printervalidate")]
   public partial class Printervalidate : ModelBase
   {
      [StringValidationAttribute]
      public string functionname { get; set; }
      [StringValidationAttribute]
      public string subfunction { get; set; }
      public bool widefl { get; set; }
      public bool demandfl { get; set; }
      [StringValidationAttribute]
      public string printtype { get; set; }
      [StringValidationAttribute]
      public string printernm { get; set; }
      [StringValidationAttribute]
      public string queue { get; set; }
      [StringValidationAttribute]
      public string whse { get; set; }
      public bool printoptfl { get; set; }
      [StringValidationAttribute]
      public string faxphoneno { get; set; }
      [StringValidationAttribute]
      public string email { get; set; }
      public bool faxpriorityfl { get; set; }
      [StringValidationAttribute]
      public string faxto1 { get; set; }
      [StringValidationAttribute]
      public string faxto2 { get; set; }
      [StringValidationAttribute]
      public string faxfrom { get; set; }
      [StringValidationAttribute]
      public string faxcom { get; set; }
      [StringValidationAttribute]
      public string oeprintype { get; set; }
      public int whseprtno { get; set; }
      [StringValidationAttribute]
      public string outputover { get; set; }


      public static Printervalidate BuildPrintervalidateFromRow(DataRow row)
      {
         Printervalidate entity = new Printervalidate();
         entity.functionname = row.IsNull("functionname") ? string.Empty : row.Field<string>("functionname");
         entity.subfunction = row.IsNull("subfunction") ? string.Empty : row.Field<string>("subfunction");
         entity.widefl = row.Field<bool>("widefl");
         entity.demandfl = row.Field<bool>("demandfl");
         entity.printtype = row.IsNull("printtype") ? string.Empty : row.Field<string>("printtype");
         entity.printernm = row.IsNull("printernm") ? string.Empty : row.Field<string>("printernm");
         entity.queue = row.IsNull("queue") ? string.Empty : row.Field<string>("queue");
         entity.whse = row.IsNull("whse") ? string.Empty : row.Field<string>("whse");
         entity.printoptfl = row.Field<bool>("printoptfl");
         entity.faxphoneno = row.IsNull("faxphoneno") ? string.Empty : row.Field<string>("faxphoneno");
         entity.email = row.IsNull("email") ? string.Empty : row.Field<string>("email");
         entity.faxpriorityfl = row.Field<bool>("faxpriorityfl");
         entity.faxto1 = row.IsNull("faxto1") ? string.Empty : row.Field<string>("faxto1");
         entity.faxto2 = row.IsNull("faxto2") ? string.Empty : row.Field<string>("faxto2");
         entity.faxfrom = row.IsNull("faxfrom") ? string.Empty : row.Field<string>("faxfrom");
         entity.faxcom = row.IsNull("faxcom") ? string.Empty : row.Field<string>("faxcom");
         entity.oeprintype = row.IsNull("oeprintype") ? string.Empty : row.Field<string>("oeprintype");
         entity.whseprtno = row.IsNull("whseprtno") ? 0 : row.Field<int>("whseprtno");
         entity.outputover = row.IsNull("outputover") ? string.Empty : row.Field<string>("outputover");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromPrintervalidate(ref DataRow row, Printervalidate entity)
      {
         row.SetField("functionname", entity.functionname);
         row.SetField("subfunction", entity.subfunction);
         row.SetField("widefl", entity.widefl);
         row.SetField("demandfl", entity.demandfl);
         row.SetField("printtype", entity.printtype);
         row.SetField("printernm", entity.printernm);
         row.SetField("queue", entity.queue);
         row.SetField("whse", entity.whse);
         row.SetField("printoptfl", entity.printoptfl);
         row.SetField("faxphoneno", entity.faxphoneno);
         row.SetField("email", entity.email);
         row.SetField("faxpriorityfl", entity.faxpriorityfl);
         row.SetField("faxto1", entity.faxto1);
         row.SetField("faxto2", entity.faxto2);
         row.SetField("faxfrom", entity.faxfrom);
         row.SetField("faxcom", entity.faxcom);
         row.SetField("oeprintype", entity.oeprintype);
         row.SetField("whseprtno", entity.whseprtno);
         row.SetField("outputover", entity.outputover);

      }
   
   }
}
#pragma warning restore 1591
