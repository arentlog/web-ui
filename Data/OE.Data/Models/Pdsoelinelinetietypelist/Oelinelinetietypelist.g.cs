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

namespace Infor.Sxe.OE.Data.Models.Pdsoelinelinetietypelist
{
   [ModelName("Infor.Sxe.OE.Data.Models.Pdsoelinelinetietypelist.Oelinelinetietypelist")]
   public partial class Oelinelinetietypelist : ModelBase
   {
      [StringValidationAttribute]
      public string codeval { get; set; }
      [StringValidationAttribute]
      public string codedesc { get; set; }
      public int seqno { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Oelinelinetietypelist BuildOelinelinetietypelistFromRow(DataRow row)
      {
         Oelinelinetietypelist entity = new Oelinelinetietypelist();
         entity.codeval = row.IsNull("codeval") ? string.Empty : row.Field<string>("codeval");
         entity.codedesc = row.IsNull("codedesc") ? string.Empty : row.Field<string>("codedesc");
         entity.seqno = row.IsNull("seqno") ? 0 : row.Field<int>("seqno");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromOelinelinetietypelist(ref DataRow row, Oelinelinetietypelist entity)
      {
         row.SetField("codeval", entity.codeval);
         row.SetField("codedesc", entity.codedesc);
         row.SetField("seqno", entity.seqno);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591