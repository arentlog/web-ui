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

namespace Infor.Sxe.AP.Data.Models.Pdsapeiinvdettaxjur
{
   [ModelName("Infor.Sxe.AP.Data.Models.Pdsapeiinvdettaxjur.Apeiinvdettaxjur")]
   public partial class Apeiinvdettaxjur : ModelBase
   {
      [StringValidationAttribute]
      public string groupnm { get; set; }
      public int groupseqno { get; set; }
      public DateTime? createddt { get; set; }
      public int invseqno { get; set; }
      [StringValidationAttribute]
      public string jurtype { get; set; }
      [StringValidationAttribute]
      public string jurname { get; set; }
      [StringValidationAttribute]
      public string taxname { get; set; }
      public decimal taxableamt { get; set; }
      public decimal taxamount { get; set; }
      public decimal taxrate { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Apeiinvdettaxjur BuildApeiinvdettaxjurFromRow(DataRow row)
      {
         Apeiinvdettaxjur entity = new Apeiinvdettaxjur();
         entity.groupnm = row.IsNull("groupnm") ? string.Empty : row.Field<string>("groupnm");
         entity.groupseqno = row.IsNull("groupseqno") ? 0 : row.Field<int>("groupseqno");
         entity.createddt = row.Field<DateTime?>("createddt");
         entity.invseqno = row.IsNull("invseqno") ? 0 : row.Field<int>("invseqno");
         entity.jurtype = row.IsNull("jurtype") ? string.Empty : row.Field<string>("jurtype");
         entity.jurname = row.IsNull("jurname") ? string.Empty : row.Field<string>("jurname");
         entity.taxname = row.IsNull("taxname") ? string.Empty : row.Field<string>("taxname");
         entity.taxableamt = row.IsNull("taxableamt") ? decimal.Zero : row.Field<decimal>("taxableamt");
         entity.taxamount = row.IsNull("taxamount") ? decimal.Zero : row.Field<decimal>("taxamount");
         entity.taxrate = row.IsNull("taxrate") ? decimal.Zero : row.Field<decimal>("taxrate");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromApeiinvdettaxjur(ref DataRow row, Apeiinvdettaxjur entity)
      {
         row.SetField("groupnm", entity.groupnm);
         row.SetField("groupseqno", entity.groupseqno);
         row.SetField("createddt", entity.createddt);
         row.SetField("invseqno", entity.invseqno);
         row.SetField("jurtype", entity.jurtype);
         row.SetField("jurname", entity.jurname);
         row.SetField("taxname", entity.taxname);
         row.SetField("taxableamt", entity.taxableamt);
         row.SetField("taxamount", entity.taxamount);
         row.SetField("taxrate", entity.taxrate);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
