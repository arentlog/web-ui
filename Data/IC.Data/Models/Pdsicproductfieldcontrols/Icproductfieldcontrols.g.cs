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

namespace Infor.Sxe.IC.Data.Models.Pdsicproductfieldcontrols
{
   [ModelName("Infor.Sxe.IC.Data.Models.Pdsicproductfieldcontrols.Icproductfieldcontrols")]
   public partial class Icproductfieldcontrols : ModelBase
   {
      [StringValidationAttribute]
      public string prod { get; set; }
      public bool noupdtfl { get; set; }
      public bool lwhrequiredfl { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Icproductfieldcontrols BuildIcproductfieldcontrolsFromRow(DataRow row)
      {
         Icproductfieldcontrols entity = new Icproductfieldcontrols();
         entity.prod = row.IsNull("prod") ? string.Empty : row.Field<string>("prod");
         entity.noupdtfl = row.Field<bool>("noupdtfl");
         entity.lwhrequiredfl = row.Field<bool>("lwhrequiredfl");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromIcproductfieldcontrols(ref DataRow row, Icproductfieldcontrols entity)
      {
         row.SetField("prod", entity.prod);
         row.SetField("noupdtfl", entity.noupdtfl);
         row.SetField("lwhrequiredfl", entity.lwhrequiredfl);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
