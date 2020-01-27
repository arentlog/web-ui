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

namespace Infor.Sxe.GL.Data.Models.Pdsglsfduplicate
{
   [ModelName("Infor.Sxe.GL.Data.Models.Pdsglsfduplicate.Glsfduplicatesourcelist")]
   public partial class Glsfduplicatesourcelist : ModelBase
   {
      public int seqno { get; set; }
      [StringValidationAttribute]
      public string recType { get; set; }
      [StringValidationAttribute]
      public string recDesc { get; set; }
      [StringValidationAttribute]
      public string comment { get; set; }
      [StringValidationAttribute]
      public string glsfRowid { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Glsfduplicatesourcelist BuildGlsfduplicatesourcelistFromRow(DataRow row)
      {
         Glsfduplicatesourcelist entity = new Glsfduplicatesourcelist();
         entity.seqno = row.IsNull("seqno") ? 0 : row.Field<int>("seqno");
         entity.recType = row.IsNull("recType") ? string.Empty : row.Field<string>("recType");
         entity.recDesc = row.IsNull("recDesc") ? string.Empty : row.Field<string>("recDesc");
         entity.comment = row.IsNull("comment") ? string.Empty : row.Field<string>("comment");
         entity.glsfRowid = row.Field<byte[]>("glsfRowid").ToStringEncoded();
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromGlsfduplicatesourcelist(ref DataRow row, Glsfduplicatesourcelist entity)
      {
         row.SetField("seqno", entity.seqno);
         row.SetField("recType", entity.recType);
         row.SetField("recDesc", entity.recDesc);
         row.SetField("comment", entity.comment);
         row.SetField("glsfRowid", entity.glsfRowid.ToByteArray());
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
