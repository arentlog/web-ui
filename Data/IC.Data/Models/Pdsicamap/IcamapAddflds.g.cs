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

namespace Infor.Sxe.IC.Data.Models.Pdsicamap
{
   [ModelName("Infor.Sxe.IC.Data.Models.Pdsicamap.IcamapAddflds")]
   public partial class IcamapAddflds : ModelBase
   {
      [Key,Order]
      public int cono { get; set; }
      [Key,Order]
      public int reportno { get; set; }
      [Key,Order,StringValidationAttribute]
      public string whse { get; set; }
      [Key,Order,StringValidationAttribute]
      public string prod { get; set; }
      [StringValidationAttribute]
      public string notesfl { get; set; }
      [StringValidationAttribute]
      public string descrip { get; set; }
      [StringValidationAttribute]
      public string origmethod { get; set; }
      public decimal usagegoal { get; set; }
      public decimal usagerate { get; set; }
      public decimal percent { get; set; }
      [StringValidationAttribute]
      public string newmethod { get; set; }
      [StringValidationAttribute]
      public string icamapRowID { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static IcamapAddflds BuildIcamapAddfldsFromRow(DataRow row)
      {
         IcamapAddflds entity = new IcamapAddflds();
         entity.cono = row.IsNull("cono") ? 0 : row.Field<int>("cono");
         entity.reportno = row.IsNull("reportno") ? 0 : row.Field<int>("reportno");
         entity.whse = row.IsNull("whse") ? string.Empty : row.Field<string>("whse");
         entity.prod = row.IsNull("prod") ? string.Empty : row.Field<string>("prod");
         entity.notesfl = row.IsNull("notesfl") ? string.Empty : row.Field<string>("notesfl");
         entity.descrip = row.IsNull("descrip") ? string.Empty : row.Field<string>("descrip");
         entity.origmethod = row.IsNull("origmethod") ? string.Empty : row.Field<string>("origmethod");
         entity.usagegoal = row.IsNull("usagegoal") ? decimal.Zero : row.Field<decimal>("usagegoal");
         entity.usagerate = row.IsNull("usagerate") ? decimal.Zero : row.Field<decimal>("usagerate");
         entity.percent = row.IsNull("percent") ? decimal.Zero : row.Field<decimal>("percent");
         entity.newmethod = row.IsNull("newmethod") ? string.Empty : row.Field<string>("newmethod");
         entity.icamapRowID = row.Field<byte[]>("icamapRowID").ToStringEncoded();
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromIcamapAddflds(ref DataRow row, IcamapAddflds entity)
      {
         row.SetField("cono", entity.cono);
         row.SetField("reportno", entity.reportno);
         row.SetField("whse", entity.whse);
         row.SetField("prod", entity.prod);
         row.SetField("notesfl", entity.notesfl);
         row.SetField("descrip", entity.descrip);
         row.SetField("origmethod", entity.origmethod);
         row.SetField("usagegoal", entity.usagegoal);
         row.SetField("usagerate", entity.usagerate);
         row.SetField("percent", entity.percent);
         row.SetField("newmethod", entity.newmethod);
         row.SetField("icamapRowID", entity.icamapRowID.ToByteArray());
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
