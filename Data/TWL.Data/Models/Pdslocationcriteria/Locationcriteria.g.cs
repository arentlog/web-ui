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

namespace Infor.Sxe.TWL.Data.Models.Pdslocationcriteria
{
   [ModelName("Infor.Sxe.TWL.Data.Models.Pdslocationcriteria.Locationcriteria")]
   public partial class Locationcriteria : ModelBase
   {
      [StringValidationAttribute]
      public string coNum { get; set; }
      [StringValidationAttribute]
      public string whNum { get; set; }
      [StringValidationAttribute]
      public string binNum { get; set; }
      [StringValidationAttribute]
      public string fchAbs { get; set; }
      [StringValidationAttribute]
      public string whZone { get; set; }
      [StringValidationAttribute]
      public string putawaygroup { get; set; }
      public int physicalInd { get; set; }
      public int countInd { get; set; }
      [StringValidationAttribute]
      public string binRowID { get; set; }
      public int recordcountlimit { get; set; }
      [StringValidationAttribute]
      public string locationcriteriauserfield { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Locationcriteria BuildLocationcriteriaFromRow(DataRow row)
      {
         Locationcriteria entity = new Locationcriteria();
         entity.coNum = row.IsNull("co_num") ? string.Empty : row.Field<string>("co_num");
         entity.whNum = row.IsNull("wh_num") ? string.Empty : row.Field<string>("wh_num");
         entity.binNum = row.IsNull("bin_num") ? string.Empty : row.Field<string>("bin_num");
         entity.fchAbs = row.IsNull("fch_abs") ? string.Empty : row.Field<string>("fch_abs");
         entity.whZone = row.IsNull("wh_zone") ? string.Empty : row.Field<string>("wh_zone");
         entity.putawaygroup = row.IsNull("putawaygroup") ? string.Empty : row.Field<string>("putawaygroup");
         entity.physicalInd = row.IsNull("physical_ind") ? 0 : row.Field<int>("physical_ind");
         entity.countInd = row.IsNull("count_ind") ? 0 : row.Field<int>("count_ind");
         entity.binRowID = row.Field<byte[]>("binRowID").ToStringEncoded();
         entity.recordcountlimit = row.IsNull("recordcountlimit") ? 0 : row.Field<int>("recordcountlimit");
         entity.locationcriteriauserfield = row.IsNull("locationcriteriauserfield") ? string.Empty : row.Field<string>("locationcriteriauserfield");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromLocationcriteria(ref DataRow row, Locationcriteria entity)
      {
         row.SetField("co_num", entity.coNum);
         row.SetField("wh_num", entity.whNum);
         row.SetField("bin_num", entity.binNum);
         row.SetField("fch_abs", entity.fchAbs);
         row.SetField("wh_zone", entity.whZone);
         row.SetField("putawaygroup", entity.putawaygroup);
         row.SetField("physical_ind", entity.physicalInd);
         row.SetField("count_ind", entity.countInd);
         row.SetField("binRowID", entity.binRowID.ToByteArray());
         row.SetField("recordcountlimit", entity.recordcountlimit);
         row.SetField("locationcriteriauserfield", entity.locationcriteriauserfield);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
