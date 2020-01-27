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

namespace Infor.Sxe.AR.Data.Models.Pdsarstgetlist
{
   [ModelName("Infor.Sxe.AR.Data.Models.Pdsarstgetlist.Arstgetlistcriteria")]
   public partial class Arstgetlistcriteria : ModelBase
   {
      public decimal custno { get; set; }
      [StringValidationAttribute]
      public string shiptogrp { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Arstgetlistcriteria BuildArstgetlistcriteriaFromRow(DataRow row)
      {
         Arstgetlistcriteria entity = new Arstgetlistcriteria();
         entity.custno = row.IsNull("custno") ? decimal.Zero : row.Field<decimal>("custno");
         entity.shiptogrp = row.IsNull("shiptogrp") ? string.Empty : row.Field<string>("shiptogrp");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromArstgetlistcriteria(ref DataRow row, Arstgetlistcriteria entity)
      {
         row.SetField("custno", entity.custno);
         row.SetField("shiptogrp", entity.shiptogrp);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
