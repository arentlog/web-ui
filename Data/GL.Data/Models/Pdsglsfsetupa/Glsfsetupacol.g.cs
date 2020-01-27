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

namespace Infor.Sxe.GL.Data.Models.Pdsglsfsetupa
{
   [ModelName("Infor.Sxe.GL.Data.Models.Pdsglsfsetupa.Glsfsetupacol")]
   public partial class Glsfsetupacol : ModelBase
   {
      public int columnNo { get; set; }
      public int printArea { get; set; }
      public int storeArea { get; set; }
      public bool printFl { get; set; }
      public bool reverseFl { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Glsfsetupacol BuildGlsfsetupacolFromRow(DataRow row)
      {
         Glsfsetupacol entity = new Glsfsetupacol();
         entity.columnNo = row.IsNull("columnNo") ? 0 : row.Field<int>("columnNo");
         entity.printArea = row.IsNull("printArea") ? 0 : row.Field<int>("printArea");
         entity.storeArea = row.IsNull("storeArea") ? 0 : row.Field<int>("storeArea");
         entity.printFl = row.Field<bool>("printFl");
         entity.reverseFl = row.Field<bool>("reverseFl");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromGlsfsetupacol(ref DataRow row, Glsfsetupacol entity)
      {
         row.SetField("columnNo", entity.columnNo);
         row.SetField("printArea", entity.printArea);
         row.SetField("storeArea", entity.storeArea);
         row.SetField("printFl", entity.printFl);
         row.SetField("reverseFl", entity.reverseFl);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
