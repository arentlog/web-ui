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

namespace Infor.Sxe.TWL.Data.Models.Pdsgetlabelprintinvresults
{
   [ModelName("Infor.Sxe.TWL.Data.Models.Pdsgetlabelprintinvresults.Getlabelprintinvresults")]
   public partial class Getlabelprintinvresults : ModelBase
   {
      [StringValidationAttribute]
      public string absNum { get; set; }
      [StringValidationAttribute]
      public string binNum { get; set; }
      [StringValidationAttribute]
      public string palletId { get; set; }
      [StringValidationAttribute]
      public string lot { get; set; }
      [StringValidationAttribute]
      public string rowID { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Getlabelprintinvresults BuildGetlabelprintinvresultsFromRow(DataRow row)
      {
         Getlabelprintinvresults entity = new Getlabelprintinvresults();
         entity.absNum = row.IsNull("abs_num") ? string.Empty : row.Field<string>("abs_num");
         entity.binNum = row.IsNull("bin_num") ? string.Empty : row.Field<string>("bin_num");
         entity.palletId = row.IsNull("pallet_id") ? string.Empty : row.Field<string>("pallet_id");
         entity.lot = row.IsNull("lot") ? string.Empty : row.Field<string>("lot");
         entity.rowID = row.Field<byte[]>("rowID").ToStringEncoded();
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromGetlabelprintinvresults(ref DataRow row, Getlabelprintinvresults entity)
      {
         row.SetField("abs_num", entity.absNum);
         row.SetField("bin_num", entity.binNum);
         row.SetField("pallet_id", entity.palletId);
         row.SetField("lot", entity.lot);
         row.SetField("rowID", entity.rowID.ToByteArray());
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
