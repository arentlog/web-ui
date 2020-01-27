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

namespace Infor.Sxe.PO.Data.Models.Pdsupdatepoea
{
   [ModelName("Infor.Sxe.PO.Data.Models.Pdsupdatepoea.Updatepoea")]
   public partial class Updatepoea : ModelBase
   {
      [StringValidationAttribute]
      public string ackrsn { get; set; }
      public int pono { get; set; }
      public int posuf { get; set; }
      [StringValidationAttribute]
      public string rowidPoeh { get; set; }
      public int stagecd { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Updatepoea BuildUpdatepoeaFromRow(DataRow row)
      {
         Updatepoea entity = new Updatepoea();
         entity.ackrsn = row.IsNull("ackrsn") ? string.Empty : row.Field<string>("ackrsn");
         entity.pono = row.IsNull("pono") ? 0 : row.Field<int>("pono");
         entity.posuf = row.IsNull("posuf") ? 0 : row.Field<int>("posuf");
         entity.rowidPoeh = row.Field<byte[]>("rowid-poeh").ToStringEncoded();
         entity.stagecd = row.IsNull("stagecd") ? 0 : row.Field<int>("stagecd");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromUpdatepoea(ref DataRow row, Updatepoea entity)
      {
         row.SetField("ackrsn", entity.ackrsn);
         row.SetField("pono", entity.pono);
         row.SetField("posuf", entity.posuf);
         row.SetField("rowid-poeh", entity.rowidPoeh.ToByteArray());
         row.SetField("stagecd", entity.stagecd);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
