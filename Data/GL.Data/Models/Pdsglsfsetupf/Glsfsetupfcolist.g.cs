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

namespace Infor.Sxe.GL.Data.Models.Pdsglsfsetupf
{
   [ModelName("Infor.Sxe.GL.Data.Models.Pdsglsfsetupf.Glsfsetupfcolist")]
   public partial class Glsfsetupfcolist : ModelBase
   {
      public int cono { get; set; }
      [StringValidationAttribute]
      public string name { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Glsfsetupfcolist BuildGlsfsetupfcolistFromRow(DataRow row)
      {
         Glsfsetupfcolist entity = new Glsfsetupfcolist();
         entity.cono = row.IsNull("cono") ? 0 : row.Field<int>("cono");
         entity.name = row.IsNull("name") ? string.Empty : row.Field<string>("name");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromGlsfsetupfcolist(ref DataRow row, Glsfsetupfcolist entity)
      {
         row.SetField("cono", entity.cono);
         row.SetField("name", entity.name);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591