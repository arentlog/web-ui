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

namespace Infor.Sxe.PO.Data.Models.Pdsloadpoquickview
{
   [ModelName("Infor.Sxe.PO.Data.Models.Pdsloadpoquickview.Loadpoquickviewsingle")]
   public partial class Loadpoquickviewsingle : ModelBase, IUserFields
   {
      [StringValidationAttribute]
      public string tiedordertype { get; set; }
      public int orderaltno { get; set; }
      public int orderaltsuf { get; set; }
      [StringValidationAttribute]
      public string vendname { get; set; }
      [StringValidationAttribute]
      public string billtoname { get; set; }
      [StringValidationAttribute]
      public string shipfromname { get; set; }
      [StringValidationAttribute]
      public string shiptoname { get; set; }
      public DateTime? duedt { get; set; }
      [StringValidationAttribute]
      public string custholdtxt { get; set; }
      [StringValidationAttribute]
      public string headinfo { get; set; }
      [StringValidationAttribute]
      public string transtype { get; set; }
      public int stagecd { get; set; }
      public bool isLate { get; set; }
      public bool isValueAdd { get; set; }
      public int nolineitem { get; set; }
      public decimal totlineamt { get; set; }
      [StringValidationAttribute]
      public string cCurrSymbol { get; set; }
      [StringValidationAttribute]
      public string shipviaty { get; set; }
      [StringValidationAttribute]
      public string shipviatyDesc { get; set; }
      [StringValidationAttribute]
      public string receiverno { get; set; }
      [StringValidationAttribute]
      public string shipinstr { get; set; }
      [StringValidationAttribute]
      public string refer { get; set; }
      [StringValidationAttribute]
      public string orderdisp { get; set; }
      public bool rushfl { get; set; }
      public bool isNotForResale { get; set; }
      public bool ignoreltfl { get; set; }
      public bool subfl { get; set; }
      public bool bofl { get; set; }
      public bool isTiesExist { get; set; }
      [StringValidationAttribute]
      public string user1 { get; set; }
      [StringValidationAttribute]
      public string user2 { get; set; }
      [StringValidationAttribute]
      public string user3 { get; set; }
      [StringValidationAttribute]
      public string user4 { get; set; }
      [StringValidationAttribute]
      public string user5 { get; set; }
      public decimal? user6 { get; set; }
      public decimal? user7 { get; set; }
      public DateTime? user8 { get; set; }
      public DateTime? user9 { get; set; }
      public decimal vendno { get; set; }
      public int shipfmno { get; set; }
      [StringValidationAttribute]
      public string billtowhse { get; set; }
      public bool isReceiving { get; set; }
      [StringValidationAttribute]
      public string userField { get; set; }


      public static Loadpoquickviewsingle BuildLoadpoquickviewsingleFromRow(DataRow row)
      {
         Loadpoquickviewsingle entity = new Loadpoquickviewsingle();
         entity.tiedordertype = row.IsNull("tiedordertype") ? string.Empty : row.Field<string>("tiedordertype");
         entity.orderaltno = row.IsNull("orderaltno") ? 0 : row.Field<int>("orderaltno");
         entity.orderaltsuf = row.IsNull("orderaltsuf") ? 0 : row.Field<int>("orderaltsuf");
         entity.vendname = row.IsNull("vendname") ? string.Empty : row.Field<string>("vendname");
         entity.billtoname = row.IsNull("billtoname") ? string.Empty : row.Field<string>("billtoname");
         entity.shipfromname = row.IsNull("shipfromname") ? string.Empty : row.Field<string>("shipfromname");
         entity.shiptoname = row.IsNull("shiptoname") ? string.Empty : row.Field<string>("shiptoname");
         entity.duedt = row.Field<DateTime?>("duedt");
         entity.custholdtxt = row.IsNull("custholdtxt") ? string.Empty : row.Field<string>("custholdtxt");
         entity.headinfo = row.IsNull("headinfo") ? string.Empty : row.Field<string>("headinfo");
         entity.transtype = row.IsNull("transtype") ? string.Empty : row.Field<string>("transtype");
         entity.stagecd = row.IsNull("stagecd") ? 0 : row.Field<int>("stagecd");
         entity.isLate = row.Field<bool>("isLate");
         entity.isValueAdd = row.Field<bool>("isValueAdd");
         entity.nolineitem = row.IsNull("nolineitem") ? 0 : row.Field<int>("nolineitem");
         entity.totlineamt = row.IsNull("totlineamt") ? decimal.Zero : row.Field<decimal>("totlineamt");
         entity.cCurrSymbol = row.IsNull("cCurrSymbol") ? string.Empty : row.Field<string>("cCurrSymbol");
         entity.shipviaty = row.IsNull("shipviaty") ? string.Empty : row.Field<string>("shipviaty");
         entity.shipviatyDesc = row.IsNull("shipviatyDesc") ? string.Empty : row.Field<string>("shipviatyDesc");
         entity.receiverno = row.IsNull("receiverno") ? string.Empty : row.Field<string>("receiverno");
         entity.shipinstr = row.IsNull("shipinstr") ? string.Empty : row.Field<string>("shipinstr");
         entity.refer = row.IsNull("refer") ? string.Empty : row.Field<string>("refer");
         entity.orderdisp = row.IsNull("orderdisp") ? string.Empty : row.Field<string>("orderdisp");
         entity.rushfl = row.Field<bool>("rushfl");
         entity.isNotForResale = row.Field<bool>("isNotForResale");
         entity.ignoreltfl = row.Field<bool>("ignoreltfl");
         entity.subfl = row.Field<bool>("subfl");
         entity.bofl = row.Field<bool>("bofl");
         entity.isTiesExist = row.Field<bool>("isTiesExist");
         entity.user1 = row.IsNull("user1") ? string.Empty : row.Field<string>("user1");
         entity.user2 = row.IsNull("user2") ? string.Empty : row.Field<string>("user2");
         entity.user3 = row.IsNull("user3") ? string.Empty : row.Field<string>("user3");
         entity.user4 = row.IsNull("user4") ? string.Empty : row.Field<string>("user4");
         entity.user5 = row.IsNull("user5") ? string.Empty : row.Field<string>("user5");
         entity.user6 = row.Field<decimal?>("user6");
         entity.user7 = row.Field<decimal?>("user7");
         entity.user8 = row.Field<DateTime?>("user8");
         entity.user9 = row.Field<DateTime?>("user9");
         entity.vendno = row.IsNull("vendno") ? decimal.Zero : row.Field<decimal>("vendno");
         entity.shipfmno = row.IsNull("shipfmno") ? 0 : row.Field<int>("shipfmno");
         entity.billtowhse = row.IsNull("billtowhse") ? string.Empty : row.Field<string>("billtowhse");
         entity.isReceiving = row.Field<bool>("isReceiving");
         entity.userField = row.IsNull("userField") ? string.Empty : row.Field<string>("userField");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromLoadpoquickviewsingle(ref DataRow row, Loadpoquickviewsingle entity)
      {
         row.SetField("tiedordertype", entity.tiedordertype);
         row.SetField("orderaltno", entity.orderaltno);
         row.SetField("orderaltsuf", entity.orderaltsuf);
         row.SetField("vendname", entity.vendname);
         row.SetField("billtoname", entity.billtoname);
         row.SetField("shipfromname", entity.shipfromname);
         row.SetField("shiptoname", entity.shiptoname);
         row.SetField("duedt", entity.duedt);
         row.SetField("custholdtxt", entity.custholdtxt);
         row.SetField("headinfo", entity.headinfo);
         row.SetField("transtype", entity.transtype);
         row.SetField("stagecd", entity.stagecd);
         row.SetField("isLate", entity.isLate);
         row.SetField("isValueAdd", entity.isValueAdd);
         row.SetField("nolineitem", entity.nolineitem);
         row.SetField("totlineamt", entity.totlineamt);
         row.SetField("cCurrSymbol", entity.cCurrSymbol);
         row.SetField("shipviaty", entity.shipviaty);
         row.SetField("shipviatyDesc", entity.shipviatyDesc);
         row.SetField("receiverno", entity.receiverno);
         row.SetField("shipinstr", entity.shipinstr);
         row.SetField("refer", entity.refer);
         row.SetField("orderdisp", entity.orderdisp);
         row.SetField("rushfl", entity.rushfl);
         row.SetField("isNotForResale", entity.isNotForResale);
         row.SetField("ignoreltfl", entity.ignoreltfl);
         row.SetField("subfl", entity.subfl);
         row.SetField("bofl", entity.bofl);
         row.SetField("isTiesExist", entity.isTiesExist);
         row.SetField("user1", entity.user1);
         row.SetField("user2", entity.user2);
         row.SetField("user3", entity.user3);
         row.SetField("user4", entity.user4);
         row.SetField("user5", entity.user5);
         row.SetField("user6", entity.user6);
         row.SetField("user7", entity.user7);
         row.SetField("user8", entity.user8);
         row.SetField("user9", entity.user9);
         row.SetField("vendno", entity.vendno);
         row.SetField("shipfmno", entity.shipfmno);
         row.SetField("billtowhse", entity.billtowhse);
         row.SetField("isReceiving", entity.isReceiving);
         row.SetField("userField", entity.userField);

      }
   
   }
}
#pragma warning restore 1591