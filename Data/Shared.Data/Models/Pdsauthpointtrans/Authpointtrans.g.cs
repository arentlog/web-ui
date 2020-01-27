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

namespace Infor.Sxe.Shared.Data.Models.Pdsauthpointtrans
{
   [ModelName("Infor.Sxe.Shared.Data.Models.Pdsauthpointtrans.Authpointtrans")]
   public partial class Authpointtrans : ModelBase
   {
      [StringValidationAttribute]
      public string oper2 { get; set; }
      [StringValidationAttribute]
      public string functionname { get; set; }
      [StringValidationAttribute]
      public string sectionname { get; set; }
      [StringValidationAttribute]
      public string pointname { get; set; }
      [StringValidationAttribute]
      public string modename { get; set; }
      [StringValidationAttribute]
      public string transtype { get; set; }
      [StringValidationAttribute]
      public string descrip { get; set; }
      public DateTime? attemptdt { get; set; }
      [StringValidationAttribute]
      public string attempttm { get; set; }
      public bool activefl { get; set; }
      [StringValidationAttribute]
      public string authstatdesc { get; set; }
      [StringValidationAttribute]
      public string updatestatus { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Authpointtrans BuildAuthpointtransFromRow(DataRow row)
      {
         Authpointtrans entity = new Authpointtrans();
         entity.oper2 = row.IsNull("oper2") ? string.Empty : row.Field<string>("oper2");
         entity.functionname = row.IsNull("functionname") ? string.Empty : row.Field<string>("functionname");
         entity.sectionname = row.IsNull("sectionname") ? string.Empty : row.Field<string>("sectionname");
         entity.pointname = row.IsNull("pointname") ? string.Empty : row.Field<string>("pointname");
         entity.modename = row.IsNull("modename") ? string.Empty : row.Field<string>("modename");
         entity.transtype = row.IsNull("transtype") ? string.Empty : row.Field<string>("transtype");
         entity.descrip = row.IsNull("descrip") ? string.Empty : row.Field<string>("descrip");
         entity.attemptdt = row.Field<DateTime?>("attemptdt");
         entity.attempttm = row.IsNull("attempttm") ? string.Empty : row.Field<string>("attempttm");
         entity.activefl = row.Field<bool>("activefl");
         entity.authstatdesc = row.IsNull("authstatdesc") ? string.Empty : row.Field<string>("authstatdesc");
         entity.updatestatus = row.IsNull("updatestatus") ? string.Empty : row.Field<string>("updatestatus");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromAuthpointtrans(ref DataRow row, Authpointtrans entity)
      {
         row.SetField("oper2", entity.oper2);
         row.SetField("functionname", entity.functionname);
         row.SetField("sectionname", entity.sectionname);
         row.SetField("pointname", entity.pointname);
         row.SetField("modename", entity.modename);
         row.SetField("transtype", entity.transtype);
         row.SetField("descrip", entity.descrip);
         row.SetField("attemptdt", entity.attemptdt);
         row.SetField("attempttm", entity.attempttm);
         row.SetField("activefl", entity.activefl);
         row.SetField("authstatdesc", entity.authstatdesc);
         row.SetField("updatestatus", entity.updatestatus);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591