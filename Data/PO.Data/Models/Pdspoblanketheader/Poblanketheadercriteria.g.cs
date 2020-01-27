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

namespace Infor.Sxe.PO.Data.Models.Pdspoblanketheader
{
   [ModelName("Infor.Sxe.PO.Data.Models.Pdspoblanketheader.Poblanketheadercriteria")]
   public partial class Poblanketheadercriteria : ModelBase
   {
      public int pono { get; set; }
      public int posuf { get; set; }
      [StringValidationAttribute]
      public string customparam { get; set; }


      public static Poblanketheadercriteria BuildPoblanketheadercriteriaFromRow(DataRow row)
      {
         Poblanketheadercriteria entity = new Poblanketheadercriteria();
         entity.pono = row.IsNull("pono") ? 0 : row.Field<int>("pono");
         entity.posuf = row.IsNull("posuf") ? 0 : row.Field<int>("posuf");
         entity.customparam = row.IsNull("customparam") ? string.Empty : row.Field<string>("customparam");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromPoblanketheadercriteria(ref DataRow row, Poblanketheadercriteria entity)
      {
         row.SetField("pono", entity.pono);
         row.SetField("posuf", entity.posuf);
         row.SetField("customparam", entity.customparam);

      }
   
   }
}
#pragma warning restore 1591