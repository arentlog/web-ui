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

namespace Infor.Sxe.IC.Data.Models.Pdsicspesetupcriteria
{
   [ModelName("Infor.Sxe.IC.Data.Models.Pdsicspesetupcriteria.Icspesetupcriteria")]
   public partial class Icspesetupcriteria : ModelBase
   {
      [StringValidationAttribute]
      public string prod { get; set; }
      [StringValidationAttribute]
      public string state { get; set; }
      public int addonno { get; set; }
      public int recordcountlimit { get; set; }
      [StringValidationAttribute]
      public string icsprowpointer { get; set; }
      [StringValidationAttribute]
      public string icscrowpointer { get; set; }
      [StringValidationAttribute]
      public string icsperowid { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Icspesetupcriteria BuildIcspesetupcriteriaFromRow(DataRow row)
      {
         Icspesetupcriteria entity = new Icspesetupcriteria();
         entity.prod = row.IsNull("prod") ? string.Empty : row.Field<string>("prod");
         entity.state = row.IsNull("state") ? string.Empty : row.Field<string>("state");
         entity.addonno = row.IsNull("addonno") ? 0 : row.Field<int>("addonno");
         entity.recordcountlimit = row.IsNull("recordcountlimit") ? 0 : row.Field<int>("recordcountlimit");
         entity.icsprowpointer = row.IsNull("icsprowpointer") ? string.Empty : row.Field<string>("icsprowpointer");
         entity.icscrowpointer = row.IsNull("icscrowpointer") ? string.Empty : row.Field<string>("icscrowpointer");
         entity.icsperowid = row.Field<byte[]>("icsperowid").ToStringEncoded();
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromIcspesetupcriteria(ref DataRow row, Icspesetupcriteria entity)
      {
         row.SetField("prod", entity.prod);
         row.SetField("state", entity.state);
         row.SetField("addonno", entity.addonno);
         row.SetField("recordcountlimit", entity.recordcountlimit);
         row.SetField("icsprowpointer", entity.icsprowpointer);
         row.SetField("icscrowpointer", entity.icscrowpointer);
         row.SetField("icsperowid", entity.icsperowid.ToByteArray());
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
