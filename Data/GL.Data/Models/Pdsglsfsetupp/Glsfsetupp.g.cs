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

namespace Infor.Sxe.GL.Data.Models.Pdsglsfsetupp
{
   [ModelName("Infor.Sxe.GL.Data.Models.Pdsglsfsetupp.Glsfsetupp")]
   public partial class Glsfsetupp : ModelBase
   {
      public int pageLength { get; set; }
      public int pageCenter { get; set; }
      public int topMargin { get; set; }
      public int bottomMargin { get; set; }
      public int headerLines { get; set; }
      public int footerLines { get; set; }
      [StringValidationAttribute]
      public string decimalChar { get; set; }
      [StringValidationAttribute]
      public string separator { get; set; }
      [StringValidationAttribute]
      public string negativeType { get; set; }
      [StringValidationAttribute]
      public string comment { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Glsfsetupp BuildGlsfsetuppFromRow(DataRow row)
      {
         Glsfsetupp entity = new Glsfsetupp();
         entity.pageLength = row.IsNull("pageLength") ? 0 : row.Field<int>("pageLength");
         entity.pageCenter = row.IsNull("pageCenter") ? 0 : row.Field<int>("pageCenter");
         entity.topMargin = row.IsNull("topMargin") ? 0 : row.Field<int>("topMargin");
         entity.bottomMargin = row.IsNull("bottomMargin") ? 0 : row.Field<int>("bottomMargin");
         entity.headerLines = row.IsNull("headerLines") ? 0 : row.Field<int>("headerLines");
         entity.footerLines = row.IsNull("footerLines") ? 0 : row.Field<int>("footerLines");
         entity.decimalChar = row.IsNull("decimalChar") ? string.Empty : row.Field<string>("decimalChar");
         entity.separator = row.IsNull("separator") ? string.Empty : row.Field<string>("separator");
         entity.negativeType = row.IsNull("negativeType") ? string.Empty : row.Field<string>("negativeType");
         entity.comment = row.IsNull("comment") ? string.Empty : row.Field<string>("comment");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromGlsfsetupp(ref DataRow row, Glsfsetupp entity)
      {
         row.SetField("pageLength", entity.pageLength);
         row.SetField("pageCenter", entity.pageCenter);
         row.SetField("topMargin", entity.topMargin);
         row.SetField("bottomMargin", entity.bottomMargin);
         row.SetField("headerLines", entity.headerLines);
         row.SetField("footerLines", entity.footerLines);
         row.SetField("decimalChar", entity.decimalChar);
         row.SetField("separator", entity.separator);
         row.SetField("negativeType", entity.negativeType);
         row.SetField("comment", entity.comment);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
