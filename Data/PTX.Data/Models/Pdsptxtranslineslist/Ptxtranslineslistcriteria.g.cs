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

namespace Infor.Sxe.PTX.Data.Models.Pdsptxtranslineslist
{
   [ModelName("Infor.Sxe.PTX.Data.Models.Pdsptxtranslineslist.Ptxtranslineslistcriteria")]
   public partial class Ptxtranslineslistcriteria : ModelBase
   {
      [StringValidationAttribute]
      public string whse { get; set; }
      [StringValidationAttribute]
      public string statustype { get; set; }
      [StringValidationAttribute]
      public string keywordln { get; set; }
      public int recordcountlimit { get; set; }


      public static Ptxtranslineslistcriteria BuildPtxtranslineslistcriteriaFromRow(DataRow row)
      {
         Ptxtranslineslistcriteria entity = new Ptxtranslineslistcriteria();
         entity.whse = row.IsNull("whse") ? string.Empty : row.Field<string>("whse");
         entity.statustype = row.IsNull("statustype") ? string.Empty : row.Field<string>("statustype");
         entity.keywordln = row.IsNull("keywordln") ? string.Empty : row.Field<string>("keywordln");
         entity.recordcountlimit = row.IsNull("recordcountlimit") ? 0 : row.Field<int>("recordcountlimit");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromPtxtranslineslistcriteria(ref DataRow row, Ptxtranslineslistcriteria entity)
      {
         row.SetField("whse", entity.whse);
         row.SetField("statustype", entity.statustype);
         row.SetField("keywordln", entity.keywordln);
         row.SetField("recordcountlimit", entity.recordcountlimit);

      }
   
   }
}
#pragma warning restore 1591
