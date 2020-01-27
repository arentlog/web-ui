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

namespace Infor.Sxe.TWL.Data.Models.Pdsempmstcopy
{
   [ModelName("Infor.Sxe.TWL.Data.Models.Pdsempmstcopy.Empmstcopy")]
   public partial class Empmstcopy : ModelBase
   {
      [StringValidationAttribute]
      public string coNum { get; set; }
      [StringValidationAttribute]
      public string whNum { get; set; }
      [StringValidationAttribute]
      public string empNum { get; set; }
      [StringValidationAttribute]
      public string empName { get; set; }
      [StringValidationAttribute]
      public string rowid { get; set; }
      [StringValidationAttribute]
      public string empmstcopyuserfield { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Empmstcopy BuildEmpmstcopyFromRow(DataRow row)
      {
         Empmstcopy entity = new Empmstcopy();
         entity.coNum = row.IsNull("co_num") ? string.Empty : row.Field<string>("co_num");
         entity.whNum = row.IsNull("wh_num") ? string.Empty : row.Field<string>("wh_num");
         entity.empNum = row.IsNull("emp_num") ? string.Empty : row.Field<string>("emp_num");
         entity.empName = row.IsNull("emp_name") ? string.Empty : row.Field<string>("emp_name");
         entity.rowid = row.Field<byte[]>("rowid").ToStringEncoded();
         entity.empmstcopyuserfield = row.IsNull("empmstcopyuserfield") ? string.Empty : row.Field<string>("empmstcopyuserfield");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromEmpmstcopy(ref DataRow row, Empmstcopy entity)
      {
         row.SetField("co_num", entity.coNum);
         row.SetField("wh_num", entity.whNum);
         row.SetField("emp_num", entity.empNum);
         row.SetField("emp_name", entity.empName);
         row.SetField("rowid", entity.rowid.ToByteArray());
         row.SetField("empmstcopyuserfield", entity.empmstcopyuserfield);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
