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

namespace Infor.Sxe.OE.Data.Models.Pdsoeblanketlines
{
   [ModelName("Infor.Sxe.OE.Data.Models.Pdsoeblanketlines.Oeblanketlinessingle")]
   public partial class Oeblanketlinessingle : ModelBase
   {
      [StringValidationAttribute]
      public string transtype { get; set; }
      [StringValidationAttribute]
      public string qtyremainlabel { get; set; }
      [StringValidationAttribute]
      public string qtyordlabel { get; set; }


      public static Oeblanketlinessingle BuildOeblanketlinessingleFromRow(DataRow row)
      {
         Oeblanketlinessingle entity = new Oeblanketlinessingle();
         entity.transtype = row.IsNull("transtype") ? string.Empty : row.Field<string>("transtype");
         entity.qtyremainlabel = row.IsNull("qtyremainlabel") ? string.Empty : row.Field<string>("qtyremainlabel");
         entity.qtyordlabel = row.IsNull("qtyordlabel") ? string.Empty : row.Field<string>("qtyordlabel");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromOeblanketlinessingle(ref DataRow row, Oeblanketlinessingle entity)
      {
         row.SetField("transtype", entity.transtype);
         row.SetField("qtyremainlabel", entity.qtyremainlabel);
         row.SetField("qtyordlabel", entity.qtyordlabel);

      }
   
   }
}
#pragma warning restore 1591