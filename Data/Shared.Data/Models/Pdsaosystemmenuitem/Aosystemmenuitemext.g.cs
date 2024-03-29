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

namespace Infor.Sxe.Shared.Data.Models.Pdsaosystemmenuitem
{
   [ModelName("Infor.Sxe.Shared.Data.Models.Pdsaosystemmenuitem.Aosystemmenuitemext")]
   public partial class Aosystemmenuitemext : ModelBase
   {
      public int position { get; set; }
      [StringValidationAttribute]
      public string folderfunctionnames { get; set; }
      [StringValidationAttribute]
      public string folderlabels { get; set; }
      [StringValidationAttribute]
      public string folderfunctiontype { get; set; }
      [StringValidationAttribute]
      public string folderviewername { get; set; }
      [StringValidationAttribute]
      public string folderinstructions { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Aosystemmenuitemext BuildAosystemmenuitemextFromRow(DataRow row)
      {
         Aosystemmenuitemext entity = new Aosystemmenuitemext();
         entity.position = row.IsNull("position") ? 0 : row.Field<int>("position");
         entity.folderfunctionnames = row.IsNull("folderfunctionnames") ? string.Empty : row.Field<string>("folderfunctionnames");
         entity.folderlabels = row.IsNull("folderlabels") ? string.Empty : row.Field<string>("folderlabels");
         entity.folderfunctiontype = row.IsNull("folderfunctiontype") ? string.Empty : row.Field<string>("folderfunctiontype");
         entity.folderviewername = row.IsNull("folderviewername") ? string.Empty : row.Field<string>("folderviewername");
         entity.folderinstructions = row.IsNull("folderinstructions") ? string.Empty : row.Field<string>("folderinstructions");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromAosystemmenuitemext(ref DataRow row, Aosystemmenuitemext entity)
      {
         row.SetField("position", entity.position);
         row.SetField("folderfunctionnames", entity.folderfunctionnames);
         row.SetField("folderlabels", entity.folderlabels);
         row.SetField("folderfunctiontype", entity.folderfunctiontype);
         row.SetField("folderviewername", entity.folderviewername);
         row.SetField("folderinstructions", entity.folderinstructions);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
