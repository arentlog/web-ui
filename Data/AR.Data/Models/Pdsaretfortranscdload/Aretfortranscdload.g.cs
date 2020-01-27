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

namespace Infor.Sxe.AR.Data.Models.Pdsaretfortranscdload
{
   [ModelName("Infor.Sxe.AR.Data.Models.Pdsaretfortranscdload.Aretfortranscdload")]
   public partial class Aretfortranscdload : ModelBase
   {
      public int seqno { get; set; }
      public int transcd { get; set; }
      [StringValidationAttribute]
      public string transcddesc { get; set; }
      [StringValidationAttribute]
      public string caretfortranscdload { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Aretfortranscdload BuildAretfortranscdloadFromRow(DataRow row)
      {
         Aretfortranscdload entity = new Aretfortranscdload();
         entity.seqno = row.IsNull("seqno") ? 0 : row.Field<int>("seqno");
         entity.transcd = row.IsNull("transcd") ? 0 : row.Field<int>("transcd");
         entity.transcddesc = row.IsNull("transcddesc") ? string.Empty : row.Field<string>("transcddesc");
         entity.caretfortranscdload = row.IsNull("caretfortranscdload") ? string.Empty : row.Field<string>("caretfortranscdload");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromAretfortranscdload(ref DataRow row, Aretfortranscdload entity)
      {
         row.SetField("seqno", entity.seqno);
         row.SetField("transcd", entity.transcd);
         row.SetField("transcddesc", entity.transcddesc);
         row.SetField("caretfortranscdload", entity.caretfortranscdload);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
