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

namespace Infor.Sxe.GL.Data.Models.Pdsglsfsetupslist
{
   [ModelName("Infor.Sxe.GL.Data.Models.Pdsglsfsetupslist.Glsfsetupsdivlist")]
   public partial class Glsfsetupsdivlist : ModelBase
   {
      public int divno { get; set; }
      [StringValidationAttribute]
      public string name { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Glsfsetupsdivlist BuildGlsfsetupsdivlistFromRow(DataRow row)
      {
         Glsfsetupsdivlist entity = new Glsfsetupsdivlist();
         entity.divno = row.IsNull("divno") ? 0 : row.Field<int>("divno");
         entity.name = row.IsNull("name") ? string.Empty : row.Field<string>("name");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromGlsfsetupsdivlist(ref DataRow row, Glsfsetupsdivlist entity)
      {
         row.SetField("divno", entity.divno);
         row.SetField("name", entity.name);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591