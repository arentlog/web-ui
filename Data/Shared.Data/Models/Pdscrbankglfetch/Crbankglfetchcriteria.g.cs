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

namespace Infor.Sxe.Shared.Data.Models.Pdscrbankglfetch
{
   [ModelName("Infor.Sxe.Shared.Data.Models.Pdscrbankglfetch.Crbankglfetchcriteria")]
   public partial class Crbankglfetchcriteria : ModelBase
   {
      public int bankno { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Crbankglfetchcriteria BuildCrbankglfetchcriteriaFromRow(DataRow row)
      {
         Crbankglfetchcriteria entity = new Crbankglfetchcriteria();
         entity.bankno = row.IsNull("bankno") ? 0 : row.Field<int>("bankno");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromCrbankglfetchcriteria(ref DataRow row, Crbankglfetchcriteria entity)
      {
         row.SetField("bankno", entity.bankno);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
