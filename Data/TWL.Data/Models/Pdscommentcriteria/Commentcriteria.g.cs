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

namespace Infor.Sxe.TWL.Data.Models.Pdscommentcriteria
{
   [ModelName("Infor.Sxe.TWL.Data.Models.Pdscommentcriteria.Commentcriteria")]
   public partial class Commentcriteria : ModelBase
   {
      [StringValidationAttribute]
      public string type { get; set; }
      public int id { get; set; }
      public int line { get; set; }
      public int lineSequence { get; set; }
      public int commentLine { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Commentcriteria BuildCommentcriteriaFromRow(DataRow row)
      {
         Commentcriteria entity = new Commentcriteria();
         entity.type = row.IsNull("type") ? string.Empty : row.Field<string>("type");
         entity.id = row.IsNull("id") ? 0 : row.Field<int>("id");
         entity.line = row.IsNull("line") ? 0 : row.Field<int>("line");
         entity.lineSequence = row.IsNull("line_sequence") ? 0 : row.Field<int>("line_sequence");
         entity.commentLine = row.IsNull("comment_line") ? 0 : row.Field<int>("comment_line");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromCommentcriteria(ref DataRow row, Commentcriteria entity)
      {
         row.SetField("type", entity.type);
         row.SetField("id", entity.id);
         row.SetField("line", entity.line);
         row.SetField("line_sequence", entity.lineSequence);
         row.SetField("comment_line", entity.commentLine);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
