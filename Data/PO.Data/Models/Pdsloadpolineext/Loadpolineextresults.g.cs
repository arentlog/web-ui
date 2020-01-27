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

namespace Infor.Sxe.PO.Data.Models.Pdsloadpolineext
{
   [ModelName("Infor.Sxe.PO.Data.Models.Pdsloadpolineext.Loadpolineextresults")]
   public partial class Loadpolineextresults : ModelBase, IUserFields
   {
      public DateTime? duedt { get; set; }
      [StringValidationAttribute]
      public string unit { get; set; }
      public decimal price { get; set; }
      public int lineno { get; set; }
      [StringValidationAttribute]
      public string reasunavty { get; set; }
      public decimal weight { get; set; }
      public decimal totweight { get; set; }
      public decimal onorder { get; set; }
      [StringValidationAttribute]
      public string proddesc { get; set; }
      public decimal netamt { get; set; }
      [StringValidationAttribute]
      public string specprcst { get; set; }
      public decimal stkqtyord { get; set; }
      public decimal cubes { get; set; }
      public decimal totcubes { get; set; }
      public decimal backorder { get; set; }
      public DateTime? expshipdt { get; set; }
      [StringValidationAttribute]
      public string stkunit { get; set; }
      public DateTime? reqshipdt { get; set; }
      public bool ignoreltfl { get; set; }
      public decimal netavail { get; set; }
      [StringValidationAttribute]
      public string contractno { get; set; }
      public DateTime? ackdt { get; set; }
      [StringValidationAttribute]
      public string user1 { get; set; }
      [StringValidationAttribute]
      public string user4 { get; set; }
      public decimal? user7 { get; set; }
      [StringValidationAttribute]
      public string user2 { get; set; }
      [StringValidationAttribute]
      public string user5 { get; set; }
      public DateTime? user8 { get; set; }
      [StringValidationAttribute]
      public string ackrsn { get; set; }
      [StringValidationAttribute]
      public string user3 { get; set; }
      public decimal? user6 { get; set; }
      public DateTime? user9 { get; set; }
      [StringValidationAttribute]
      public string ncnr { get; set; }
      public decimal dutyrate { get; set; }
      [StringValidationAttribute]
      public string tariffcd { get; set; }
      [StringValidationAttribute]
      public string countryoforigin { get; set; }
      [StringValidationAttribute]
      public string vendretauth { get; set; }
      [StringValidationAttribute]
      public string netbillty { get; set; }
      [StringValidationAttribute]
      public string upcid { get; set; }
      [StringValidationAttribute]
      public string dlvrydatecd { get; set; }


      public static Loadpolineextresults BuildLoadpolineextresultsFromRow(DataRow row)
      {
         Loadpolineextresults entity = new Loadpolineextresults();
         entity.duedt = row.Field<DateTime?>("duedt");
         entity.unit = row.IsNull("unit") ? string.Empty : row.Field<string>("unit");
         entity.price = row.IsNull("price") ? decimal.Zero : row.Field<decimal>("price");
         entity.lineno = row.IsNull("lineno") ? 0 : row.Field<int>("lineno");
         entity.reasunavty = row.IsNull("reasunavty") ? string.Empty : row.Field<string>("reasunavty");
         entity.weight = row.IsNull("weight") ? decimal.Zero : row.Field<decimal>("weight");
         entity.totweight = row.IsNull("totweight") ? decimal.Zero : row.Field<decimal>("totweight");
         entity.onorder = row.IsNull("onorder") ? decimal.Zero : row.Field<decimal>("onorder");
         entity.proddesc = row.IsNull("proddesc") ? string.Empty : row.Field<string>("proddesc");
         entity.netamt = row.IsNull("netamt") ? decimal.Zero : row.Field<decimal>("netamt");
         entity.specprcst = row.IsNull("specprcst") ? string.Empty : row.Field<string>("specprcst");
         entity.stkqtyord = row.IsNull("stkqtyord") ? decimal.Zero : row.Field<decimal>("stkqtyord");
         entity.cubes = row.IsNull("cubes") ? decimal.Zero : row.Field<decimal>("cubes");
         entity.totcubes = row.IsNull("totcubes") ? decimal.Zero : row.Field<decimal>("totcubes");
         entity.backorder = row.IsNull("backorder") ? decimal.Zero : row.Field<decimal>("backorder");
         entity.expshipdt = row.Field<DateTime?>("expshipdt");
         entity.stkunit = row.IsNull("stkunit") ? string.Empty : row.Field<string>("stkunit");
         entity.reqshipdt = row.Field<DateTime?>("reqshipdt");
         entity.ignoreltfl = row.Field<bool>("ignoreltfl");
         entity.netavail = row.IsNull("netavail") ? decimal.Zero : row.Field<decimal>("netavail");
         entity.contractno = row.IsNull("contractno") ? string.Empty : row.Field<string>("contractno");
         entity.ackdt = row.Field<DateTime?>("ackdt");
         entity.user1 = row.IsNull("user1") ? string.Empty : row.Field<string>("user1");
         entity.user4 = row.IsNull("user4") ? string.Empty : row.Field<string>("user4");
         entity.user7 = row.Field<decimal?>("user7");
         entity.user2 = row.IsNull("user2") ? string.Empty : row.Field<string>("user2");
         entity.user5 = row.IsNull("user5") ? string.Empty : row.Field<string>("user5");
         entity.user8 = row.Field<DateTime?>("user8");
         entity.ackrsn = row.IsNull("ackrsn") ? string.Empty : row.Field<string>("ackrsn");
         entity.user3 = row.IsNull("user3") ? string.Empty : row.Field<string>("user3");
         entity.user6 = row.Field<decimal?>("user6");
         entity.user9 = row.Field<DateTime?>("user9");
         entity.ncnr = row.IsNull("ncnr") ? string.Empty : row.Field<string>("ncnr");
         entity.dutyrate = row.IsNull("dutyrate") ? decimal.Zero : row.Field<decimal>("dutyrate");
         entity.tariffcd = row.IsNull("tariffcd") ? string.Empty : row.Field<string>("tariffcd");
         entity.countryoforigin = row.IsNull("countryoforigin") ? string.Empty : row.Field<string>("countryoforigin");
         entity.vendretauth = row.IsNull("vendretauth") ? string.Empty : row.Field<string>("vendretauth");
         entity.netbillty = row.IsNull("netbillty") ? string.Empty : row.Field<string>("netbillty");
         entity.upcid = row.IsNull("upcid") ? string.Empty : row.Field<string>("upcid");
         entity.dlvrydatecd = row.IsNull("dlvrydatecd") ? string.Empty : row.Field<string>("dlvrydatecd");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromLoadpolineextresults(ref DataRow row, Loadpolineextresults entity)
      {
         row.SetField("duedt", entity.duedt);
         row.SetField("unit", entity.unit);
         row.SetField("price", entity.price);
         row.SetField("lineno", entity.lineno);
         row.SetField("reasunavty", entity.reasunavty);
         row.SetField("weight", entity.weight);
         row.SetField("totweight", entity.totweight);
         row.SetField("onorder", entity.onorder);
         row.SetField("proddesc", entity.proddesc);
         row.SetField("netamt", entity.netamt);
         row.SetField("specprcst", entity.specprcst);
         row.SetField("stkqtyord", entity.stkqtyord);
         row.SetField("cubes", entity.cubes);
         row.SetField("totcubes", entity.totcubes);
         row.SetField("backorder", entity.backorder);
         row.SetField("expshipdt", entity.expshipdt);
         row.SetField("stkunit", entity.stkunit);
         row.SetField("reqshipdt", entity.reqshipdt);
         row.SetField("ignoreltfl", entity.ignoreltfl);
         row.SetField("netavail", entity.netavail);
         row.SetField("contractno", entity.contractno);
         row.SetField("ackdt", entity.ackdt);
         row.SetField("user1", entity.user1);
         row.SetField("user4", entity.user4);
         row.SetField("user7", entity.user7);
         row.SetField("user2", entity.user2);
         row.SetField("user5", entity.user5);
         row.SetField("user8", entity.user8);
         row.SetField("ackrsn", entity.ackrsn);
         row.SetField("user3", entity.user3);
         row.SetField("user6", entity.user6);
         row.SetField("user9", entity.user9);
         row.SetField("ncnr", entity.ncnr);
         row.SetField("dutyrate", entity.dutyrate);
         row.SetField("tariffcd", entity.tariffcd);
         row.SetField("countryoforigin", entity.countryoforigin);
         row.SetField("vendretauth", entity.vendretauth);
         row.SetField("netbillty", entity.netbillty);
         row.SetField("upcid", entity.upcid);
         row.SetField("dlvrydatecd", entity.dlvrydatecd);

      }
   
   }
}
#pragma warning restore 1591