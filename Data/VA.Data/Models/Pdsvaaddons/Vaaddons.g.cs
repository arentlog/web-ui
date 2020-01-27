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

namespace Infor.Sxe.VA.Data.Models.Pdsvaaddons
{
   [ModelName("Infor.Sxe.VA.Data.Models.Pdsvaaddons.Vaaddons")]
   public partial class Vaaddons : ModelBase
   {
      public int vano { get; set; }
      public int vasuf { get; set; }
      public int seqno { get; set; }
      public int addonno1 { get; set; }
      public decimal addonamt1 { get; set; }
      public int addonno2 { get; set; }
      public decimal addonamt2 { get; set; }
      public int addonno3 { get; set; }
      public decimal addonamt3 { get; set; }
      public int addonno4 { get; set; }
      public decimal addonamt4 { get; set; }
      public int origaddonno1 { get; set; }
      public decimal origaddonamt1 { get; set; }
      public int origaddonno2 { get; set; }
      public decimal origaddonamt2 { get; set; }
      public int origaddonno3 { get; set; }
      public decimal origaddonamt3 { get; set; }
      public int origaddonno4 { get; set; }
      public decimal origaddonamt4 { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Vaaddons BuildVaaddonsFromRow(DataRow row)
      {
         Vaaddons entity = new Vaaddons();
         entity.vano = row.IsNull("vano") ? 0 : row.Field<int>("vano");
         entity.vasuf = row.IsNull("vasuf") ? 0 : row.Field<int>("vasuf");
         entity.seqno = row.IsNull("seqno") ? 0 : row.Field<int>("seqno");
         entity.addonno1 = row.IsNull("addonno1") ? 0 : row.Field<int>("addonno1");
         entity.addonamt1 = row.IsNull("addonamt1") ? decimal.Zero : row.Field<decimal>("addonamt1");
         entity.addonno2 = row.IsNull("addonno2") ? 0 : row.Field<int>("addonno2");
         entity.addonamt2 = row.IsNull("addonamt2") ? decimal.Zero : row.Field<decimal>("addonamt2");
         entity.addonno3 = row.IsNull("addonno3") ? 0 : row.Field<int>("addonno3");
         entity.addonamt3 = row.IsNull("addonamt3") ? decimal.Zero : row.Field<decimal>("addonamt3");
         entity.addonno4 = row.IsNull("addonno4") ? 0 : row.Field<int>("addonno4");
         entity.addonamt4 = row.IsNull("addonamt4") ? decimal.Zero : row.Field<decimal>("addonamt4");
         entity.origaddonno1 = row.IsNull("origaddonno1") ? 0 : row.Field<int>("origaddonno1");
         entity.origaddonamt1 = row.IsNull("origaddonamt1") ? decimal.Zero : row.Field<decimal>("origaddonamt1");
         entity.origaddonno2 = row.IsNull("origaddonno2") ? 0 : row.Field<int>("origaddonno2");
         entity.origaddonamt2 = row.IsNull("origaddonamt2") ? decimal.Zero : row.Field<decimal>("origaddonamt2");
         entity.origaddonno3 = row.IsNull("origaddonno3") ? 0 : row.Field<int>("origaddonno3");
         entity.origaddonamt3 = row.IsNull("origaddonamt3") ? decimal.Zero : row.Field<decimal>("origaddonamt3");
         entity.origaddonno4 = row.IsNull("origaddonno4") ? 0 : row.Field<int>("origaddonno4");
         entity.origaddonamt4 = row.IsNull("origaddonamt4") ? decimal.Zero : row.Field<decimal>("origaddonamt4");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromVaaddons(ref DataRow row, Vaaddons entity)
      {
         row.SetField("vano", entity.vano);
         row.SetField("vasuf", entity.vasuf);
         row.SetField("seqno", entity.seqno);
         row.SetField("addonno1", entity.addonno1);
         row.SetField("addonamt1", entity.addonamt1);
         row.SetField("addonno2", entity.addonno2);
         row.SetField("addonamt2", entity.addonamt2);
         row.SetField("addonno3", entity.addonno3);
         row.SetField("addonamt3", entity.addonamt3);
         row.SetField("addonno4", entity.addonno4);
         row.SetField("addonamt4", entity.addonamt4);
         row.SetField("origaddonno1", entity.origaddonno1);
         row.SetField("origaddonamt1", entity.origaddonamt1);
         row.SetField("origaddonno2", entity.origaddonno2);
         row.SetField("origaddonamt2", entity.origaddonamt2);
         row.SetField("origaddonno3", entity.origaddonno3);
         row.SetField("origaddonamt3", entity.origaddonamt3);
         row.SetField("origaddonno4", entity.origaddonno4);
         row.SetField("origaddonamt4", entity.origaddonamt4);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591