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

namespace Infor.Sxe.GL.Data.Models.Pdsglsdloadtt
{
   [ModelName("Infor.Sxe.GL.Data.Models.Pdsglsdloadtt.Glsdloadttcriteria")]
   public partial class Glsdloadttcriteria : ModelBase
   {
      public int recordlimit { get; set; }
      [StringValidationAttribute]
      public string groupnm { get; set; }
      public int transno { get; set; }
      public int setno { get; set; }
      [StringValidationAttribute]
      public string reversety { get; set; }
      [StringValidationAttribute]
      public string glno { get; set; }
      public int glyr { get; set; }
      [StringValidationAttribute]
      public string refer { get; set; }
      public decimal maxamount { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Glsdloadttcriteria BuildGlsdloadttcriteriaFromRow(DataRow row)
      {
         Glsdloadttcriteria entity = new Glsdloadttcriteria();
         entity.recordlimit = row.IsNull("recordlimit") ? 0 : row.Field<int>("recordlimit");
         entity.groupnm = row.IsNull("groupnm") ? string.Empty : row.Field<string>("groupnm");
         entity.transno = row.IsNull("transno") ? 0 : row.Field<int>("transno");
         entity.setno = row.IsNull("setno") ? 0 : row.Field<int>("setno");
         entity.reversety = row.IsNull("reversety") ? string.Empty : row.Field<string>("reversety");
         entity.glno = row.IsNull("glno") ? string.Empty : row.Field<string>("glno");
         entity.glyr = row.IsNull("glyr") ? 0 : row.Field<int>("glyr");
         entity.refer = row.IsNull("refer") ? string.Empty : row.Field<string>("refer");
         entity.maxamount = row.IsNull("maxamount") ? decimal.Zero : row.Field<decimal>("maxamount");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromGlsdloadttcriteria(ref DataRow row, Glsdloadttcriteria entity)
      {
         row.SetField("recordlimit", entity.recordlimit);
         row.SetField("groupnm", entity.groupnm);
         row.SetField("transno", entity.transno);
         row.SetField("setno", entity.setno);
         row.SetField("reversety", entity.reversety);
         row.SetField("glno", entity.glno);
         row.SetField("glyr", entity.glyr);
         row.SetField("refer", entity.refer);
         row.SetField("maxamount", entity.maxamount);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
