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

namespace Infor.Sxe.PO.Data.Models.Pdsporrarlinemsg
{
   [ModelName("Infor.Sxe.PO.Data.Models.Pdsporrarlinemsg.Porrarlinemsgcriteria")]
   public partial class Porrarlinemsgcriteria : ModelBase
   {
      [StringValidationAttribute]
      public string leveltype { get; set; }
      public int reportno { get; set; }
      public int lineno { get; set; }
      public int seqno { get; set; }


      public static Porrarlinemsgcriteria BuildPorrarlinemsgcriteriaFromRow(DataRow row)
      {
         Porrarlinemsgcriteria entity = new Porrarlinemsgcriteria();
         entity.leveltype = row.IsNull("leveltype") ? string.Empty : row.Field<string>("leveltype");
         entity.reportno = row.IsNull("reportno") ? 0 : row.Field<int>("reportno");
         entity.lineno = row.IsNull("lineno") ? 0 : row.Field<int>("lineno");
         entity.seqno = row.IsNull("seqno") ? 0 : row.Field<int>("seqno");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromPorrarlinemsgcriteria(ref DataRow row, Porrarlinemsgcriteria entity)
      {
         row.SetField("leveltype", entity.leveltype);
         row.SetField("reportno", entity.reportno);
         row.SetField("lineno", entity.lineno);
         row.SetField("seqno", entity.seqno);

      }
   
   }
}
#pragma warning restore 1591