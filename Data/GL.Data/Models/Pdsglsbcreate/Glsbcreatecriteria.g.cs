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

namespace Infor.Sxe.GL.Data.Models.Pdsglsbcreate
{
   [ModelName("Infor.Sxe.GL.Data.Models.Pdsglsbcreate.Glsbcreatecriteria")]
   public partial class Glsbcreatecriteria : ModelBase
   {
      public int yr { get; set; }
      [StringValidationAttribute]
      public string glno { get; set; }
      public int revno { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Glsbcreatecriteria BuildGlsbcreatecriteriaFromRow(DataRow row)
      {
         Glsbcreatecriteria entity = new Glsbcreatecriteria();
         entity.yr = row.IsNull("yr") ? 0 : row.Field<int>("yr");
         entity.glno = row.IsNull("glno") ? string.Empty : row.Field<string>("glno");
         entity.revno = row.IsNull("revno") ? 0 : row.Field<int>("revno");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromGlsbcreatecriteria(ref DataRow row, Glsbcreatecriteria entity)
      {
         row.SetField("yr", entity.yr);
         row.SetField("glno", entity.glno);
         row.SetField("revno", entity.revno);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
