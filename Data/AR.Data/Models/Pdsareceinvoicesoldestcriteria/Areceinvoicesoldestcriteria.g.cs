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

namespace Infor.Sxe.AR.Data.Models.Pdsareceinvoicesoldestcriteria
{
   [ModelName("Infor.Sxe.AR.Data.Models.Pdsareceinvoicesoldestcriteria.Areceinvoicesoldestcriteria")]
   public partial class Areceinvoicesoldestcriteria : ModelBase
   {
      [StringValidationAttribute]
      public string invtype { get; set; }
      [StringValidationAttribute]
      public string disctype { get; set; }
      public bool disputed { get; set; }
      public bool creditsoninvscreen { get; set; }
      public bool includecredits { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Areceinvoicesoldestcriteria BuildAreceinvoicesoldestcriteriaFromRow(DataRow row)
      {
         Areceinvoicesoldestcriteria entity = new Areceinvoicesoldestcriteria();
         entity.invtype = row.IsNull("invtype") ? string.Empty : row.Field<string>("invtype");
         entity.disctype = row.IsNull("disctype") ? string.Empty : row.Field<string>("disctype");
         entity.disputed = row.Field<bool>("disputed");
         entity.creditsoninvscreen = row.Field<bool>("creditsoninvscreen");
         entity.includecredits = row.Field<bool>("includecredits");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromAreceinvoicesoldestcriteria(ref DataRow row, Areceinvoicesoldestcriteria entity)
      {
         row.SetField("invtype", entity.invtype);
         row.SetField("disctype", entity.disctype);
         row.SetField("disputed", entity.disputed);
         row.SetField("creditsoninvscreen", entity.creditsoninvscreen);
         row.SetField("includecredits", entity.includecredits);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
