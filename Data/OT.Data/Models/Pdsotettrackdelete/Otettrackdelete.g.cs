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

namespace Infor.Sxe.OT.Data.Models.Pdsotettrackdelete
{
   [ModelName("Infor.Sxe.OT.Data.Models.Pdsotettrackdelete.Otettrackdelete")]
   public partial class Otettrackdelete : ModelBase
   {
      public int trackno { get; set; }
      public bool deletefl { get; set; }
      [StringValidationAttribute]
      public string deletequestion { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Otettrackdelete BuildOtettrackdeleteFromRow(DataRow row)
      {
         Otettrackdelete entity = new Otettrackdelete();
         entity.trackno = row.IsNull("trackno") ? 0 : row.Field<int>("trackno");
         entity.deletefl = row.Field<bool>("deletefl");
         entity.deletequestion = row.IsNull("deletequestion") ? string.Empty : row.Field<string>("deletequestion");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromOtettrackdelete(ref DataRow row, Otettrackdelete entity)
      {
         row.SetField("trackno", entity.trackno);
         row.SetField("deletefl", entity.deletefl);
         row.SetField("deletequestion", entity.deletequestion);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
