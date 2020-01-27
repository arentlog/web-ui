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

namespace Infor.Sxe.PO.Data.Models.Pdsloadpoheader
{
   [ModelName("Infor.Sxe.PO.Data.Models.Pdsloadpoheader.Loadpoheaderresults")]
   public partial class Loadpoheaderresults : ModelBase
   {
      [StringValidationAttribute]
      public string vendorname { get; set; }
      [StringValidationAttribute]
      public string shipfm { get; set; }
      [StringValidationAttribute]
      public string vendoraddr1 { get; set; }
      [StringValidationAttribute]
      public string fromaddr1 { get; set; }
      [StringValidationAttribute]
      public string vendoraddr2 { get; set; }
      [StringValidationAttribute]
      public string fromaddr2 { get; set; }
      [StringValidationAttribute]
      public string vendoraddr3 { get; set; }
      [StringValidationAttribute]
      public string fromaddr3 { get; set; }
      [StringValidationAttribute]
      public string vendorcity { get; set; }
      [StringValidationAttribute]
      public string vendorstate { get; set; }
      [StringValidationAttribute]
      public string vendorzip { get; set; }
      [StringValidationAttribute]
      public string fromcity { get; set; }
      [StringValidationAttribute]
      public string fromstate { get; set; }
      [StringValidationAttribute]
      public string fromzip { get; set; }
      [StringValidationAttribute]
      public string vendorphone { get; set; }
      [StringValidationAttribute]
      public string fromphone { get; set; }
      [StringValidationAttribute]
      public string vendorfax { get; set; }
      [StringValidationAttribute]
      public string fromfax { get; set; }
      [StringValidationAttribute]
      public string vendorcountrycd { get; set; }
      [StringValidationAttribute]
      public string fromcountrycd { get; set; }
      public DateTime? ackdt { get; set; }
      [StringValidationAttribute]
      public string ackrsn { get; set; }
      [StringValidationAttribute]
      public string shipinstr { get; set; }
      [StringValidationAttribute]
      public string extshipinstr { get; set; }
      [StringValidationAttribute]
      public string refer { get; set; }
      public int orderaltno { get; set; }
      public int orderaltsuf { get; set; }
      [StringValidationAttribute]
      public string shipviaty { get; set; }
      [StringValidationAttribute]
      public string shipviadesc { get; set; }
      [StringValidationAttribute]
      public string termstype { get; set; }
      [StringValidationAttribute]
      public string termstypedesc { get; set; }
      public int jrnlno { get; set; }
      [StringValidationAttribute]
      public string receivemessage { get; set; }
      public bool rushfl { get; set; }
      public bool confirmfl { get; set; }
      [StringValidationAttribute]
      public string createdby { get; set; }
      public DateTime? reqshipdt { get; set; }
      public bool fobfl { get; set; }
      public bool ignoreltfl { get; set; }
      [StringValidationAttribute]
      public string receiverno { get; set; }
      public DateTime? expshipdt { get; set; }
      public bool subfl { get; set; }
      public bool bofl { get; set; }
      [StringValidationAttribute]
      public string rcvoperinit { get; set; }
      [StringValidationAttribute]
      public string orderdispdesc { get; set; }
      public bool resalefl { get; set; }
      [StringValidationAttribute]
      public string resaleno { get; set; }
      [StringValidationAttribute]
      public string openinit { get; set; }
      public decimal contactid { get; set; }
      [StringValidationAttribute]
      public string jmjobid { get; set; }
      public int jmjobrevno { get; set; }
      [StringValidationAttribute]
      public string contactname { get; set; }
      [StringValidationAttribute]
      public string jobidfull { get; set; }
      public bool jobidhidden { get; set; }
      public bool orderaltnohidden { get; set; }
      [StringValidationAttribute]
      public string ackoper { get; set; }
      [StringValidationAttribute]
      public string acktype { get; set; }
      [StringValidationAttribute]
      public string frttermscd { get; set; }
      [StringValidationAttribute]
      public string frttermscddesc { get; set; }
      [StringValidationAttribute]
      public string frtbillacct { get; set; }
      [StringValidationAttribute]
      public string transferloc { get; set; }
      [StringValidationAttribute]
      public string crreasonty { get; set; }
      [StringValidationAttribute]
      public string crreasontydesc { get; set; }
      public int daysold { get; set; }
      [StringValidationAttribute]
      public string vendtype { get; set; }
      [StringValidationAttribute]
      public string vendordno { get; set; }
      [StringValidationAttribute]
      public string vendretauth { get; set; }
      [StringValidationAttribute]
      public string netbillty { get; set; }
      public DateTime? podoshipdt { get; set; }
      public string CompleteAddress { get { return this.vendoraddr1 + "," + this.vendorcity + "," + this.vendorstate + "," + this.vendorzip; } }


      public static Loadpoheaderresults BuildLoadpoheaderresultsFromRow(DataRow row)
      {
         Loadpoheaderresults entity = new Loadpoheaderresults();
         entity.vendorname = row.IsNull("vendorname") ? string.Empty : row.Field<string>("vendorname");
         entity.shipfm = row.IsNull("shipfm") ? string.Empty : row.Field<string>("shipfm");
         entity.vendoraddr1 = row.IsNull("vendoraddr1") ? string.Empty : row.Field<string>("vendoraddr1");
         entity.fromaddr1 = row.IsNull("fromaddr1") ? string.Empty : row.Field<string>("fromaddr1");
         entity.vendoraddr2 = row.IsNull("vendoraddr2") ? string.Empty : row.Field<string>("vendoraddr2");
         entity.fromaddr2 = row.IsNull("fromaddr2") ? string.Empty : row.Field<string>("fromaddr2");
         entity.vendoraddr3 = row.IsNull("vendoraddr3") ? string.Empty : row.Field<string>("vendoraddr3");
         entity.fromaddr3 = row.IsNull("fromaddr3") ? string.Empty : row.Field<string>("fromaddr3");
         entity.vendorcity = row.IsNull("vendorcity") ? string.Empty : row.Field<string>("vendorcity");
         entity.vendorstate = row.IsNull("vendorstate") ? string.Empty : row.Field<string>("vendorstate");
         entity.vendorzip = row.IsNull("vendorzip") ? string.Empty : row.Field<string>("vendorzip");
         entity.fromcity = row.IsNull("fromcity") ? string.Empty : row.Field<string>("fromcity");
         entity.fromstate = row.IsNull("fromstate") ? string.Empty : row.Field<string>("fromstate");
         entity.fromzip = row.IsNull("fromzip") ? string.Empty : row.Field<string>("fromzip");
         entity.vendorphone = row.IsNull("vendorphone") ? string.Empty : row.Field<string>("vendorphone");
         entity.fromphone = row.IsNull("fromphone") ? string.Empty : row.Field<string>("fromphone");
         entity.vendorfax = row.IsNull("vendorfax") ? string.Empty : row.Field<string>("vendorfax");
         entity.fromfax = row.IsNull("fromfax") ? string.Empty : row.Field<string>("fromfax");
         entity.vendorcountrycd = row.IsNull("vendorcountrycd") ? string.Empty : row.Field<string>("vendorcountrycd");
         entity.fromcountrycd = row.IsNull("fromcountrycd") ? string.Empty : row.Field<string>("fromcountrycd");
         entity.ackdt = row.Field<DateTime?>("ackdt");
         entity.ackrsn = row.IsNull("ackrsn") ? string.Empty : row.Field<string>("ackrsn");
         entity.shipinstr = row.IsNull("shipinstr") ? string.Empty : row.Field<string>("shipinstr");
         entity.extshipinstr = row.IsNull("extshipinstr") ? string.Empty : row.Field<string>("extshipinstr");
         entity.refer = row.IsNull("refer") ? string.Empty : row.Field<string>("refer");
         entity.orderaltno = row.IsNull("orderaltno") ? 0 : row.Field<int>("orderaltno");
         entity.orderaltsuf = row.IsNull("orderaltsuf") ? 0 : row.Field<int>("orderaltsuf");
         entity.shipviaty = row.IsNull("shipviaty") ? string.Empty : row.Field<string>("shipviaty");
         entity.shipviadesc = row.IsNull("shipviadesc") ? string.Empty : row.Field<string>("shipviadesc");
         entity.termstype = row.IsNull("termstype") ? string.Empty : row.Field<string>("termstype");
         entity.termstypedesc = row.IsNull("termstypedesc") ? string.Empty : row.Field<string>("termstypedesc");
         entity.jrnlno = row.IsNull("jrnlno") ? 0 : row.Field<int>("jrnlno");
         entity.receivemessage = row.IsNull("receivemessage") ? string.Empty : row.Field<string>("receivemessage");
         entity.rushfl = row.Field<bool>("rushfl");
         entity.confirmfl = row.Field<bool>("confirmfl");
         entity.createdby = row.IsNull("createdby") ? string.Empty : row.Field<string>("createdby");
         entity.reqshipdt = row.Field<DateTime?>("reqshipdt");
         entity.fobfl = row.Field<bool>("fobfl");
         entity.ignoreltfl = row.Field<bool>("ignoreltfl");
         entity.receiverno = row.IsNull("receiverno") ? string.Empty : row.Field<string>("receiverno");
         entity.expshipdt = row.Field<DateTime?>("expshipdt");
         entity.subfl = row.Field<bool>("subfl");
         entity.bofl = row.Field<bool>("bofl");
         entity.rcvoperinit = row.IsNull("rcvoperinit") ? string.Empty : row.Field<string>("rcvoperinit");
         entity.orderdispdesc = row.IsNull("orderdispdesc") ? string.Empty : row.Field<string>("orderdispdesc");
         entity.resalefl = row.Field<bool>("resalefl");
         entity.resaleno = row.IsNull("resaleno") ? string.Empty : row.Field<string>("resaleno");
         entity.openinit = row.IsNull("openinit") ? string.Empty : row.Field<string>("openinit");
         entity.contactid = row.IsNull("contactid") ? decimal.Zero : row.Field<decimal>("contactid");
         entity.jmjobid = row.IsNull("jmjobid") ? string.Empty : row.Field<string>("jmjobid");
         entity.jmjobrevno = row.IsNull("jmjobrevno") ? 0 : row.Field<int>("jmjobrevno");
         entity.contactname = row.IsNull("contactname") ? string.Empty : row.Field<string>("contactname");
         entity.jobidfull = row.IsNull("jobidfull") ? string.Empty : row.Field<string>("jobidfull");
         entity.jobidhidden = row.Field<bool>("jobidhidden");
         entity.orderaltnohidden = row.Field<bool>("orderaltnohidden");
         entity.ackoper = row.IsNull("ackoper") ? string.Empty : row.Field<string>("ackoper");
         entity.acktype = row.IsNull("acktype") ? string.Empty : row.Field<string>("acktype");
         entity.frttermscd = row.IsNull("frttermscd") ? string.Empty : row.Field<string>("frttermscd");
         entity.frttermscddesc = row.IsNull("frttermscddesc") ? string.Empty : row.Field<string>("frttermscddesc");
         entity.frtbillacct = row.IsNull("frtbillacct") ? string.Empty : row.Field<string>("frtbillacct");
         entity.transferloc = row.IsNull("transferloc") ? string.Empty : row.Field<string>("transferloc");
         entity.crreasonty = row.IsNull("crreasonty") ? string.Empty : row.Field<string>("crreasonty");
         entity.crreasontydesc = row.IsNull("crreasontydesc") ? string.Empty : row.Field<string>("crreasontydesc");
         entity.daysold = row.IsNull("daysold") ? 0 : row.Field<int>("daysold");
         entity.vendtype = row.IsNull("vendtype") ? string.Empty : row.Field<string>("vendtype");
         entity.vendordno = row.IsNull("vendordno") ? string.Empty : row.Field<string>("vendordno");
         entity.vendretauth = row.IsNull("vendretauth") ? string.Empty : row.Field<string>("vendretauth");
         entity.netbillty = row.IsNull("netbillty") ? string.Empty : row.Field<string>("netbillty");
         entity.podoshipdt = row.Field<DateTime?>("podoshipdt");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromLoadpoheaderresults(ref DataRow row, Loadpoheaderresults entity)
      {
         row.SetField("vendorname", entity.vendorname);
         row.SetField("shipfm", entity.shipfm);
         row.SetField("vendoraddr1", entity.vendoraddr1);
         row.SetField("fromaddr1", entity.fromaddr1);
         row.SetField("vendoraddr2", entity.vendoraddr2);
         row.SetField("fromaddr2", entity.fromaddr2);
         row.SetField("vendoraddr3", entity.vendoraddr3);
         row.SetField("fromaddr3", entity.fromaddr3);
         row.SetField("vendorcity", entity.vendorcity);
         row.SetField("vendorstate", entity.vendorstate);
         row.SetField("vendorzip", entity.vendorzip);
         row.SetField("fromcity", entity.fromcity);
         row.SetField("fromstate", entity.fromstate);
         row.SetField("fromzip", entity.fromzip);
         row.SetField("vendorphone", entity.vendorphone);
         row.SetField("fromphone", entity.fromphone);
         row.SetField("vendorfax", entity.vendorfax);
         row.SetField("fromfax", entity.fromfax);
         row.SetField("vendorcountrycd", entity.vendorcountrycd);
         row.SetField("fromcountrycd", entity.fromcountrycd);
         row.SetField("ackdt", entity.ackdt);
         row.SetField("ackrsn", entity.ackrsn);
         row.SetField("shipinstr", entity.shipinstr);
         row.SetField("extshipinstr", entity.extshipinstr);
         row.SetField("refer", entity.refer);
         row.SetField("orderaltno", entity.orderaltno);
         row.SetField("orderaltsuf", entity.orderaltsuf);
         row.SetField("shipviaty", entity.shipviaty);
         row.SetField("shipviadesc", entity.shipviadesc);
         row.SetField("termstype", entity.termstype);
         row.SetField("termstypedesc", entity.termstypedesc);
         row.SetField("jrnlno", entity.jrnlno);
         row.SetField("receivemessage", entity.receivemessage);
         row.SetField("rushfl", entity.rushfl);
         row.SetField("confirmfl", entity.confirmfl);
         row.SetField("createdby", entity.createdby);
         row.SetField("reqshipdt", entity.reqshipdt);
         row.SetField("fobfl", entity.fobfl);
         row.SetField("ignoreltfl", entity.ignoreltfl);
         row.SetField("receiverno", entity.receiverno);
         row.SetField("expshipdt", entity.expshipdt);
         row.SetField("subfl", entity.subfl);
         row.SetField("bofl", entity.bofl);
         row.SetField("rcvoperinit", entity.rcvoperinit);
         row.SetField("orderdispdesc", entity.orderdispdesc);
         row.SetField("resalefl", entity.resalefl);
         row.SetField("resaleno", entity.resaleno);
         row.SetField("openinit", entity.openinit);
         row.SetField("contactid", entity.contactid);
         row.SetField("jmjobid", entity.jmjobid);
         row.SetField("jmjobrevno", entity.jmjobrevno);
         row.SetField("contactname", entity.contactname);
         row.SetField("jobidfull", entity.jobidfull);
         row.SetField("jobidhidden", entity.jobidhidden);
         row.SetField("orderaltnohidden", entity.orderaltnohidden);
         row.SetField("ackoper", entity.ackoper);
         row.SetField("acktype", entity.acktype);
         row.SetField("frttermscd", entity.frttermscd);
         row.SetField("frttermscddesc", entity.frttermscddesc);
         row.SetField("frtbillacct", entity.frtbillacct);
         row.SetField("transferloc", entity.transferloc);
         row.SetField("crreasonty", entity.crreasonty);
         row.SetField("crreasontydesc", entity.crreasontydesc);
         row.SetField("daysold", entity.daysold);
         row.SetField("vendtype", entity.vendtype);
         row.SetField("vendordno", entity.vendordno);
         row.SetField("vendretauth", entity.vendretauth);
         row.SetField("netbillty", entity.netbillty);
         row.SetField("podoshipdt", entity.podoshipdt);

      }
   
   }
}
#pragma warning restore 1591