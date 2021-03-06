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

namespace Infor.Sxe.PD.Data.Models.Pdspderupdateitem
{
   [ModelName("Infor.Sxe.PD.Data.Models.Pdspderupdateitem.Pderupdateitem")]
   public partial class Pderupdateitem : ModelBase
   {
      [StringValidationAttribute]
      public string statustype { get; set; }
      public decimal actstkqty { get; set; }
      public decimal rebateamt { get; set; }
      [StringValidationAttribute]
      public string rowidpder { get; set; }
      public int secure { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Pderupdateitem BuildPderupdateitemFromRow(DataRow row)
      {
         Pderupdateitem entity = new Pderupdateitem();
         entity.statustype = row.IsNull("statustype") ? string.Empty : row.Field<string>("statustype");
         entity.actstkqty = row.IsNull("actstkqty") ? decimal.Zero : row.Field<decimal>("actstkqty");
         entity.rebateamt = row.IsNull("rebateamt") ? decimal.Zero : row.Field<decimal>("rebateamt");
         entity.rowidpder = row.Field<byte[]>("rowidpder").ToStringEncoded();
         entity.secure = row.IsNull("secure") ? 0 : row.Field<int>("secure");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromPderupdateitem(ref DataRow row, Pderupdateitem entity)
      {
         row.SetField("statustype", entity.statustype);
         row.SetField("actstkqty", entity.actstkqty);
         row.SetField("rebateamt", entity.rebateamt);
         row.SetField("rowidpder", entity.rowidpder.ToByteArray());
         row.SetField("secure", entity.secure);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
