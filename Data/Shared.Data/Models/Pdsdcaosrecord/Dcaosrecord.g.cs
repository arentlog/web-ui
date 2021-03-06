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

namespace Infor.Sxe.Shared.Data.Models.Pdsdcaosrecord
{
   [ModelName("Infor.Sxe.Shared.Data.Models.Pdsdcaosrecord.Dcaosrecord")]
   public partial class Dcaosrecord : ModelBase
   {
      [StringValidationAttribute]
      public string adminid { get; set; }
      [StringValidationAttribute]
      public string filetype { get; set; }
      [StringValidationAttribute]
      public string delim { get; set; }
      [StringValidationAttribute]
      public string xrefdelim { get; set; }
      [StringValidationAttribute]
      public string dirdata { get; set; }
      [StringValidationAttribute]
      public string dirsource { get; set; }
      [StringValidationAttribute]
      public string datetype { get; set; }
      public bool autosasttfl { get; set; }
      public bool csvlogfl { get; set; }
      [StringValidationAttribute]
      public string convertrowid { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Dcaosrecord BuildDcaosrecordFromRow(DataRow row)
      {
         Dcaosrecord entity = new Dcaosrecord();
         entity.adminid = row.IsNull("adminid") ? string.Empty : row.Field<string>("adminid");
         entity.filetype = row.IsNull("filetype") ? string.Empty : row.Field<string>("filetype");
         entity.delim = row.IsNull("delim") ? string.Empty : row.Field<string>("delim");
         entity.xrefdelim = row.IsNull("xrefdelim") ? string.Empty : row.Field<string>("xrefdelim");
         entity.dirdata = row.IsNull("dirdata") ? string.Empty : row.Field<string>("dirdata");
         entity.dirsource = row.IsNull("dirsource") ? string.Empty : row.Field<string>("dirsource");
         entity.datetype = row.IsNull("datetype") ? string.Empty : row.Field<string>("datetype");
         entity.autosasttfl = row.Field<bool>("autosasttfl");
         entity.csvlogfl = row.Field<bool>("csvlogfl");
         entity.convertrowid = row.Field<byte[]>("convertrowid").ToStringEncoded();
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromDcaosrecord(ref DataRow row, Dcaosrecord entity)
      {
         row.SetField("adminid", entity.adminid);
         row.SetField("filetype", entity.filetype);
         row.SetField("delim", entity.delim);
         row.SetField("xrefdelim", entity.xrefdelim);
         row.SetField("dirdata", entity.dirdata);
         row.SetField("dirsource", entity.dirsource);
         row.SetField("datetype", entity.datetype);
         row.SetField("autosasttfl", entity.autosasttfl);
         row.SetField("csvlogfl", entity.csvlogfl);
         row.SetField("convertrowid", entity.convertrowid.ToByteArray());
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
