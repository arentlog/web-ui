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

namespace Infor.Sxe.TWL.Data.Models.Pdscommentresults
{
   [ModelName("Infor.Sxe.TWL.Data.Models.Pdscommentresults.Commentresults")]
   public partial class Commentresults : ModelBase
   {
      [StringValidationAttribute]
      public string type { get; set; }
      [StringValidationAttribute]
      public string commentText { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Commentresults BuildCommentresultsFromRow(DataRow row)
      {
         Commentresults entity = new Commentresults();
         entity.type = row.IsNull("type") ? string.Empty : row.Field<string>("type");
         entity.commentText = row.IsNull("comment_text") ? string.Empty : row.Field<string>("comment_text");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromCommentresults(ref DataRow row, Commentresults entity)
      {
         row.SetField("type", entity.type);
         row.SetField("comment_text", entity.commentText);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
