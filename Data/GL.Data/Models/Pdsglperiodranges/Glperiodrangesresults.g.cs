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

namespace Infor.Sxe.GL.Data.Models.Pdsglperiodranges
{
   [ModelName("Infor.Sxe.GL.Data.Models.Pdsglperiodranges.Glperiodrangesresults")]
   public partial class Glperiodrangesresults : ModelBase
   {
      public int seqno { get; set; }
      [StringValidationAttribute]
      public string period { get; set; }
      [StringValidationAttribute]
      public string datefrom { get; set; }
      [StringValidationAttribute]
      public string datethru { get; set; }


      public static Glperiodrangesresults BuildGlperiodrangesresultsFromRow(DataRow row)
      {
         Glperiodrangesresults entity = new Glperiodrangesresults();
         entity.seqno = row.IsNull("seqno") ? 0 : row.Field<int>("seqno");
         entity.period = row.IsNull("period") ? string.Empty : row.Field<string>("period");
         entity.datefrom = row.IsNull("datefrom") ? string.Empty : row.Field<string>("datefrom");
         entity.datethru = row.IsNull("datethru") ? string.Empty : row.Field<string>("datethru");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromGlperiodrangesresults(ref DataRow row, Glperiodrangesresults entity)
      {
         row.SetField("seqno", entity.seqno);
         row.SetField("period", entity.period);
         row.SetField("datefrom", entity.datefrom);
         row.SetField("datethru", entity.datethru);

      }
   
   }
}
#pragma warning restore 1591
