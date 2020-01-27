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

namespace Infor.Sxe.AP.Data.Models.Pdsapsplabel
{
   [ModelName("Infor.Sxe.AP.Data.Models.Pdsapsplabel.Apsplabelcriteria")]
   public partial class Apsplabelcriteria : ModelBase
   {
      public decimal vendno { get; set; }
      [StringValidationAttribute]
      public string whse { get; set; }
      [StringValidationAttribute]
      public string prodLine { get; set; }
      public int year { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Apsplabelcriteria BuildApsplabelcriteriaFromRow(DataRow row)
      {
         Apsplabelcriteria entity = new Apsplabelcriteria();
         entity.vendno = row.IsNull("Vendno") ? decimal.Zero : row.Field<decimal>("Vendno");
         entity.whse = row.IsNull("Whse") ? string.Empty : row.Field<string>("Whse");
         entity.prodLine = row.IsNull("ProdLine") ? string.Empty : row.Field<string>("ProdLine");
         entity.year = row.IsNull("Year") ? 0 : row.Field<int>("Year");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromApsplabelcriteria(ref DataRow row, Apsplabelcriteria entity)
      {
         row.SetField("Vendno", entity.vendno);
         row.SetField("Whse", entity.whse);
         row.SetField("ProdLine", entity.prodLine);
         row.SetField("Year", entity.year);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
