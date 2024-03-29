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

namespace Infor.Sxe.IC.Data.Models.Pdsicsoclevelcds
{
   [ModelName("Infor.Sxe.IC.Data.Models.Pdsicsoclevelcds.Icsoclevelcds")]
   public partial class Icsoclevelcds : ModelBase
   {
      public int levelcd { get; set; }
      [StringValidationAttribute]
      public string levelcddesc { get; set; }
      public bool custnoenable { get; set; }
      public bool custtypeenable { get; set; }
      public bool pricetypeenable { get; set; }
      public bool shiptoenable { get; set; }
      public bool whseenable { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Icsoclevelcds BuildIcsoclevelcdsFromRow(DataRow row)
      {
         Icsoclevelcds entity = new Icsoclevelcds();
         entity.levelcd = row.IsNull("levelcd") ? 0 : row.Field<int>("levelcd");
         entity.levelcddesc = row.IsNull("levelcddesc") ? string.Empty : row.Field<string>("levelcddesc");
         entity.custnoenable = row.Field<bool>("custnoenable");
         entity.custtypeenable = row.Field<bool>("custtypeenable");
         entity.pricetypeenable = row.Field<bool>("pricetypeenable");
         entity.shiptoenable = row.Field<bool>("shiptoenable");
         entity.whseenable = row.Field<bool>("whseenable");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromIcsoclevelcds(ref DataRow row, Icsoclevelcds entity)
      {
         row.SetField("levelcd", entity.levelcd);
         row.SetField("levelcddesc", entity.levelcddesc);
         row.SetField("custnoenable", entity.custnoenable);
         row.SetField("custtypeenable", entity.custtypeenable);
         row.SetField("pricetypeenable", entity.pricetypeenable);
         row.SetField("shiptoenable", entity.shiptoenable);
         row.SetField("whseenable", entity.whseenable);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
