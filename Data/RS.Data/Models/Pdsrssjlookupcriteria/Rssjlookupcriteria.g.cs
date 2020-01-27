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

namespace Infor.Sxe.RS.Data.Models.Pdsrssjlookupcriteria
{
   [ModelName("Infor.Sxe.RS.Data.Models.Pdsrssjlookupcriteria.Rssjlookupcriteria")]
   public partial class Rssjlookupcriteria : ModelBase
   {
      [StringValidationAttribute]
      public string groupnm { get; set; }
      [StringValidationAttribute]
      public string runty { get; set; }
      public int fromhour { get; set; }
      public int fromminute { get; set; }
      [StringValidationAttribute]
      public string fromampm { get; set; }
      public int tohour { get; set; }
      public int tominute { get; set; }
      [StringValidationAttribute]
      public string toampm { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Rssjlookupcriteria BuildRssjlookupcriteriaFromRow(DataRow row)
      {
         Rssjlookupcriteria entity = new Rssjlookupcriteria();
         entity.groupnm = row.IsNull("groupnm") ? string.Empty : row.Field<string>("groupnm");
         entity.runty = row.IsNull("runty") ? string.Empty : row.Field<string>("runty");
         entity.fromhour = row.IsNull("fromhour") ? 0 : row.Field<int>("fromhour");
         entity.fromminute = row.IsNull("fromminute") ? 0 : row.Field<int>("fromminute");
         entity.fromampm = row.IsNull("fromampm") ? string.Empty : row.Field<string>("fromampm");
         entity.tohour = row.IsNull("tohour") ? 0 : row.Field<int>("tohour");
         entity.tominute = row.IsNull("tominute") ? 0 : row.Field<int>("tominute");
         entity.toampm = row.IsNull("toampm") ? string.Empty : row.Field<string>("toampm");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromRssjlookupcriteria(ref DataRow row, Rssjlookupcriteria entity)
      {
         row.SetField("groupnm", entity.groupnm);
         row.SetField("runty", entity.runty);
         row.SetField("fromhour", entity.fromhour);
         row.SetField("fromminute", entity.fromminute);
         row.SetField("fromampm", entity.fromampm);
         row.SetField("tohour", entity.tohour);
         row.SetField("tominute", entity.tominute);
         row.SetField("toampm", entity.toampm);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591