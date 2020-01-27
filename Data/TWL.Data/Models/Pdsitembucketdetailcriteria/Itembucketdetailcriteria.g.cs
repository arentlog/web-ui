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

namespace Infor.Sxe.TWL.Data.Models.Pdsitembucketdetailcriteria
{
   [ModelName("Infor.Sxe.TWL.Data.Models.Pdsitembucketdetailcriteria.Itembucketdetailcriteria")]
   public partial class Itembucketdetailcriteria : ModelBase
   {
      [StringValidationAttribute]
      public string rowID { get; set; }
      [StringValidationAttribute]
      public string itembucketuserfield { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Itembucketdetailcriteria BuildItembucketdetailcriteriaFromRow(DataRow row)
      {
         Itembucketdetailcriteria entity = new Itembucketdetailcriteria();
         entity.rowID = row.Field<byte[]>("rowID").ToStringEncoded();
         entity.itembucketuserfield = row.IsNull("itembucketuserfield") ? string.Empty : row.Field<string>("itembucketuserfield");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromItembucketdetailcriteria(ref DataRow row, Itembucketdetailcriteria entity)
      {
         row.SetField("rowID", entity.rowID.ToByteArray());
         row.SetField("itembucketuserfield", entity.itembucketuserfield);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
