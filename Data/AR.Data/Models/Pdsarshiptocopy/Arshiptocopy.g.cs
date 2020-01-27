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

namespace Infor.Sxe.AR.Data.Models.Pdsarshiptocopy
{
   [ModelName("Infor.Sxe.AR.Data.Models.Pdsarshiptocopy.Arshiptocopy")]
   public partial class Arshiptocopy : ModelBase
   {
      public decimal fromcustno { get; set; }
      [StringValidationAttribute]
      public string fromshipto { get; set; }
      public decimal tocustno { get; set; }
      [StringValidationAttribute]
      public string toshipto { get; set; }
      [StringValidationAttribute]
      public string name { get; set; }
      [StringValidationAttribute]
      public string createdby { get; set; }
      public DateTime? createddt { get; set; }
      [StringValidationAttribute]
      public string createdproc { get; set; }
      [StringValidationAttribute]
      public string createdtm { get; set; }
      [StringValidationAttribute]
      public string rowid { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Arshiptocopy BuildArshiptocopyFromRow(DataRow row)
      {
         Arshiptocopy entity = new Arshiptocopy();
         entity.fromcustno = row.IsNull("fromcustno") ? decimal.Zero : row.Field<decimal>("fromcustno");
         entity.fromshipto = row.IsNull("fromshipto") ? string.Empty : row.Field<string>("fromshipto");
         entity.tocustno = row.IsNull("tocustno") ? decimal.Zero : row.Field<decimal>("tocustno");
         entity.toshipto = row.IsNull("toshipto") ? string.Empty : row.Field<string>("toshipto");
         entity.name = row.IsNull("name") ? string.Empty : row.Field<string>("name");
         entity.createdby = row.IsNull("createdby") ? string.Empty : row.Field<string>("createdby");
         entity.createddt = row.Field<DateTime?>("createddt");
         entity.createdproc = row.IsNull("createdproc") ? string.Empty : row.Field<string>("createdproc");
         entity.createdtm = row.IsNull("createdtm") ? string.Empty : row.Field<string>("createdtm");
         entity.rowid = row.Field<byte[]>("rowid").ToStringEncoded();
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromArshiptocopy(ref DataRow row, Arshiptocopy entity)
      {
         row.SetField("fromcustno", entity.fromcustno);
         row.SetField("fromshipto", entity.fromshipto);
         row.SetField("tocustno", entity.tocustno);
         row.SetField("toshipto", entity.toshipto);
         row.SetField("name", entity.name);
         row.SetField("createdby", entity.createdby);
         row.SetField("createddt", entity.createddt);
         row.SetField("createdproc", entity.createdproc);
         row.SetField("createdtm", entity.createdtm);
         row.SetField("rowid", entity.rowid.ToByteArray());
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
