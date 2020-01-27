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

namespace Infor.Sxe.AR.Data.Models.Pdsarbchchecklookup
{
   [ModelName("Infor.Sxe.AR.Data.Models.Pdsarbchchecklookup.Arbchlookupresults")]
   public partial class Arbchlookupresults : ModelBase
   {
      [StringValidationAttribute]
      public string batch { get; set; }
      public decimal checkamt { get; set; }
      public int checkno { get; set; }
      public int checkseq { get; set; }
      public bool badcustfl { get; set; }
      public bool statfl { get; set; }
      [StringValidationAttribute]
      public string operinit { get; set; }
      public DateTime? recvdt { get; set; }
      public DateTime? transdt { get; set; }
      [StringValidationAttribute]
      public string transtm { get; set; }
      [StringValidationAttribute]
      public string transmission { get; set; }
      [StringValidationAttribute]
      public string pymttranscd { get; set; }
      [StringValidationAttribute]
      public string pymttransno { get; set; }
      public decimal custno { get; set; }
      [StringValidationAttribute]
      public string rowidArbch { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Arbchlookupresults BuildArbchlookupresultsFromRow(DataRow row)
      {
         Arbchlookupresults entity = new Arbchlookupresults();
         entity.batch = row.IsNull("batch") ? string.Empty : row.Field<string>("batch");
         entity.checkamt = row.IsNull("Checkamt") ? decimal.Zero : row.Field<decimal>("Checkamt");
         entity.checkno = row.IsNull("Checkno") ? 0 : row.Field<int>("Checkno");
         entity.checkseq = row.IsNull("checkseq") ? 0 : row.Field<int>("checkseq");
         entity.badcustfl = row.Field<bool>("Badcustfl");
         entity.statfl = row.Field<bool>("statfl");
         entity.operinit = row.IsNull("Operinit") ? string.Empty : row.Field<string>("Operinit");
         entity.recvdt = row.Field<DateTime?>("Recvdt");
         entity.transdt = row.Field<DateTime?>("Transdt");
         entity.transtm = row.IsNull("Transtm") ? string.Empty : row.Field<string>("Transtm");
         entity.transmission = row.IsNull("transmission") ? string.Empty : row.Field<string>("transmission");
         entity.pymttranscd = row.IsNull("pymttranscd") ? string.Empty : row.Field<string>("pymttranscd");
         entity.pymttransno = row.IsNull("pymttransno") ? string.Empty : row.Field<string>("pymttransno");
         entity.custno = row.IsNull("custno") ? decimal.Zero : row.Field<decimal>("custno");
         entity.rowidArbch = row.Field<byte[]>("rowid-arbch").ToStringEncoded();
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromArbchlookupresults(ref DataRow row, Arbchlookupresults entity)
      {
         row.SetField("batch", entity.batch);
         row.SetField("Checkamt", entity.checkamt);
         row.SetField("Checkno", entity.checkno);
         row.SetField("checkseq", entity.checkseq);
         row.SetField("Badcustfl", entity.badcustfl);
         row.SetField("statfl", entity.statfl);
         row.SetField("Operinit", entity.operinit);
         row.SetField("Recvdt", entity.recvdt);
         row.SetField("Transdt", entity.transdt);
         row.SetField("Transtm", entity.transtm);
         row.SetField("transmission", entity.transmission);
         row.SetField("pymttranscd", entity.pymttranscd);
         row.SetField("pymttransno", entity.pymttransno);
         row.SetField("custno", entity.custno);
         row.SetField("rowid-arbch", entity.rowidArbch.ToByteArray());
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591