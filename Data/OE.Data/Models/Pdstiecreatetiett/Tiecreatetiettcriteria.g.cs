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

namespace Infor.Sxe.OE.Data.Models.Pdstiecreatetiett
{
   [ModelName("Infor.Sxe.OE.Data.Models.Pdstiecreatetiett.Tiecreatetiettcriteria")]
   public partial class Tiecreatetiettcriteria : ModelBase
   {
      [StringValidationAttribute]
      public string tietype { get; set; }
      public int docorderno { get; set; }
      public int docordersuf { get; set; }
      public int doclineno { get; set; }
      public int docseqno { get; set; }
      public int cono2 { get; set; }
      [StringValidationAttribute]
      public string prod { get; set; }
      [StringValidationAttribute]
      public string nonstockty { get; set; }


      public static Tiecreatetiettcriteria BuildTiecreatetiettcriteriaFromRow(DataRow row)
      {
         Tiecreatetiettcriteria entity = new Tiecreatetiettcriteria();
         entity.tietype = row.IsNull("tietype") ? string.Empty : row.Field<string>("tietype");
         entity.docorderno = row.IsNull("docorderno") ? 0 : row.Field<int>("docorderno");
         entity.docordersuf = row.IsNull("docordersuf") ? 0 : row.Field<int>("docordersuf");
         entity.doclineno = row.IsNull("doclineno") ? 0 : row.Field<int>("doclineno");
         entity.docseqno = row.IsNull("docseqno") ? 0 : row.Field<int>("docseqno");
         entity.cono2 = row.IsNull("cono2") ? 0 : row.Field<int>("cono2");
         entity.prod = row.IsNull("prod") ? string.Empty : row.Field<string>("prod");
         entity.nonstockty = row.IsNull("nonstockty") ? string.Empty : row.Field<string>("nonstockty");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromTiecreatetiettcriteria(ref DataRow row, Tiecreatetiettcriteria entity)
      {
         row.SetField("tietype", entity.tietype);
         row.SetField("docorderno", entity.docorderno);
         row.SetField("docordersuf", entity.docordersuf);
         row.SetField("doclineno", entity.doclineno);
         row.SetField("docseqno", entity.docseqno);
         row.SetField("cono2", entity.cono2);
         row.SetField("prod", entity.prod);
         row.SetField("nonstockty", entity.nonstockty);

      }
   
   }
}
#pragma warning restore 1591
