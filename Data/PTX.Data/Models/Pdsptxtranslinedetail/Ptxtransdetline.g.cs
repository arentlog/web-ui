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

namespace Infor.Sxe.PTX.Data.Models.Pdsptxtranslinedetail
{
   [ModelName("Infor.Sxe.PTX.Data.Models.Pdsptxtranslinedetail.Ptxtransdetline")]
   public partial class Ptxtransdetline : ModelBase, IUserFields
   {
      [StringValidationAttribute]
      public string distpartnerid { get; set; }
      public decimal vendno { get; set; }
      [StringValidationAttribute]
      public string vendnotesfl { get; set; }
      public int shipfmno { get; set; }
      public int distinvno { get; set; }
      public int distinvsuf { get; set; }
      public int distinvseqno { get; set; }
      [StringValidationAttribute]
      public string distinvnotesfl { get; set; }
      public int distinvlineno { get; set; }
      [StringValidationAttribute]
      public string distinvlinecommfl { get; set; }
      [StringValidationAttribute]
      public string custpartnerid { get; set; }
      public decimal custno { get; set; }
      [StringValidationAttribute]
      public string custnotesfl { get; set; }
      [StringValidationAttribute]
      public string shipto { get; set; }
      [StringValidationAttribute]
      public string shipnotesfl { get; set; }
      [StringValidationAttribute]
      public string whse { get; set; }
      [StringValidationAttribute]
      public string whsename { get; set; }
      [StringValidationAttribute]
      public string specnstype { get; set; }
      [StringValidationAttribute]
      public string shipprod { get; set; }
      [StringValidationAttribute]
      public string shipprodnotesfl { get; set; }
      [StringValidationAttribute]
      public string sellerprod { get; set; }
      [StringValidationAttribute]
      public string buyerprod { get; set; }
      public decimal qtyord { get; set; }
      [StringValidationAttribute]
      public string proddesc { get; set; }
      [StringValidationAttribute]
      public string unit { get; set; }
      public decimal price { get; set; }
      [StringValidationAttribute]
      public string prcunit { get; set; }
      public decimal netord { get; set; }
      public decimal netamt { get; set; }
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
      [StringValidationAttribute]
      public string user10 { get; set; }
      [StringValidationAttribute]
      public string user11 { get; set; }
      [StringValidationAttribute]
      public string user12 { get; set; }
      [StringValidationAttribute]
      public string user13 { get; set; }
      [StringValidationAttribute]
      public string user14 { get; set; }
      [StringValidationAttribute]
      public string user15 { get; set; }
      [StringValidationAttribute]
      public string user16 { get; set; }
      [StringValidationAttribute]
      public string user17 { get; set; }
      [StringValidationAttribute]
      public string user18 { get; set; }
      [StringValidationAttribute]
      public string user19 { get; set; }
      [StringValidationAttribute]
      public string user20 { get; set; }
      [StringValidationAttribute]
      public string user21 { get; set; }
      [StringValidationAttribute]
      public string user22 { get; set; }
      [StringValidationAttribute]
      public string user23 { get; set; }
      [StringValidationAttribute]
      public string user24 { get; set; }
      [StringValidationAttribute]
      public string rwidptxtransln { get; set; }


      public static Ptxtransdetline BuildPtxtransdetlineFromRow(DataRow row)
      {
         Ptxtransdetline entity = new Ptxtransdetline();
         entity.distpartnerid = row.IsNull("distpartnerid") ? string.Empty : row.Field<string>("distpartnerid");
         entity.vendno = row.IsNull("vendno") ? decimal.Zero : row.Field<decimal>("vendno");
         entity.vendnotesfl = row.IsNull("vendnotesfl") ? string.Empty : row.Field<string>("vendnotesfl");
         entity.shipfmno = row.IsNull("shipfmno") ? 0 : row.Field<int>("shipfmno");
         entity.distinvno = row.IsNull("distinvno") ? 0 : row.Field<int>("distinvno");
         entity.distinvsuf = row.IsNull("distinvsuf") ? 0 : row.Field<int>("distinvsuf");
         entity.distinvseqno = row.IsNull("distinvseqno") ? 0 : row.Field<int>("distinvseqno");
         entity.distinvnotesfl = row.IsNull("distinvnotesfl") ? string.Empty : row.Field<string>("distinvnotesfl");
         entity.distinvlineno = row.IsNull("distinvlineno") ? 0 : row.Field<int>("distinvlineno");
         entity.distinvlinecommfl = row.IsNull("distinvlinecommfl") ? string.Empty : row.Field<string>("distinvlinecommfl");
         entity.custpartnerid = row.IsNull("custpartnerid") ? string.Empty : row.Field<string>("custpartnerid");
         entity.custno = row.IsNull("custno") ? decimal.Zero : row.Field<decimal>("custno");
         entity.custnotesfl = row.IsNull("custnotesfl") ? string.Empty : row.Field<string>("custnotesfl");
         entity.shipto = row.IsNull("shipto") ? string.Empty : row.Field<string>("shipto");
         entity.shipnotesfl = row.IsNull("shipnotesfl") ? string.Empty : row.Field<string>("shipnotesfl");
         entity.whse = row.IsNull("whse") ? string.Empty : row.Field<string>("whse");
         entity.whsename = row.IsNull("whsename") ? string.Empty : row.Field<string>("whsename");
         entity.specnstype = row.IsNull("specnstype") ? string.Empty : row.Field<string>("specnstype");
         entity.shipprod = row.IsNull("shipprod") ? string.Empty : row.Field<string>("shipprod");
         entity.shipprodnotesfl = row.IsNull("shipprodnotesfl") ? string.Empty : row.Field<string>("shipprodnotesfl");
         entity.sellerprod = row.IsNull("sellerprod") ? string.Empty : row.Field<string>("sellerprod");
         entity.buyerprod = row.IsNull("buyerprod") ? string.Empty : row.Field<string>("buyerprod");
         entity.qtyord = row.IsNull("qtyord") ? decimal.Zero : row.Field<decimal>("qtyord");
         entity.proddesc = row.IsNull("proddesc") ? string.Empty : row.Field<string>("proddesc");
         entity.unit = row.IsNull("unit") ? string.Empty : row.Field<string>("unit");
         entity.price = row.IsNull("price") ? decimal.Zero : row.Field<decimal>("price");
         entity.prcunit = row.IsNull("prcunit") ? string.Empty : row.Field<string>("prcunit");
         entity.netord = row.IsNull("netord") ? decimal.Zero : row.Field<decimal>("netord");
         entity.netamt = row.IsNull("netamt") ? decimal.Zero : row.Field<decimal>("netamt");
         entity.user1 = row.IsNull("user1") ? string.Empty : row.Field<string>("user1");
         entity.user2 = row.IsNull("user2") ? string.Empty : row.Field<string>("user2");
         entity.user3 = row.IsNull("user3") ? string.Empty : row.Field<string>("user3");
         entity.user4 = row.IsNull("user4") ? string.Empty : row.Field<string>("user4");
         entity.user5 = row.IsNull("user5") ? string.Empty : row.Field<string>("user5");
         entity.user6 = row.Field<decimal?>("user6");
         entity.user7 = row.Field<decimal?>("user7");
         entity.user8 = row.Field<DateTime?>("user8");
         entity.user9 = row.Field<DateTime?>("user9");
         entity.user10 = row.IsNull("user10") ? string.Empty : row.Field<string>("user10");
         entity.user11 = row.IsNull("user11") ? string.Empty : row.Field<string>("user11");
         entity.user12 = row.IsNull("user12") ? string.Empty : row.Field<string>("user12");
         entity.user13 = row.IsNull("user13") ? string.Empty : row.Field<string>("user13");
         entity.user14 = row.IsNull("user14") ? string.Empty : row.Field<string>("user14");
         entity.user15 = row.IsNull("user15") ? string.Empty : row.Field<string>("user15");
         entity.user16 = row.IsNull("user16") ? string.Empty : row.Field<string>("user16");
         entity.user17 = row.IsNull("user17") ? string.Empty : row.Field<string>("user17");
         entity.user18 = row.IsNull("user18") ? string.Empty : row.Field<string>("user18");
         entity.user19 = row.IsNull("user19") ? string.Empty : row.Field<string>("user19");
         entity.user20 = row.IsNull("user20") ? string.Empty : row.Field<string>("user20");
         entity.user21 = row.IsNull("user21") ? string.Empty : row.Field<string>("user21");
         entity.user22 = row.IsNull("user22") ? string.Empty : row.Field<string>("user22");
         entity.user23 = row.IsNull("user23") ? string.Empty : row.Field<string>("user23");
         entity.user24 = row.IsNull("user24") ? string.Empty : row.Field<string>("user24");
         entity.rwidptxtransln = row.Field<byte[]>("rwidptxtransln").ToStringEncoded();
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromPtxtransdetline(ref DataRow row, Ptxtransdetline entity)
      {
         row.SetField("distpartnerid", entity.distpartnerid);
         row.SetField("vendno", entity.vendno);
         row.SetField("vendnotesfl", entity.vendnotesfl);
         row.SetField("shipfmno", entity.shipfmno);
         row.SetField("distinvno", entity.distinvno);
         row.SetField("distinvsuf", entity.distinvsuf);
         row.SetField("distinvseqno", entity.distinvseqno);
         row.SetField("distinvnotesfl", entity.distinvnotesfl);
         row.SetField("distinvlineno", entity.distinvlineno);
         row.SetField("distinvlinecommfl", entity.distinvlinecommfl);
         row.SetField("custpartnerid", entity.custpartnerid);
         row.SetField("custno", entity.custno);
         row.SetField("custnotesfl", entity.custnotesfl);
         row.SetField("shipto", entity.shipto);
         row.SetField("shipnotesfl", entity.shipnotesfl);
         row.SetField("whse", entity.whse);
         row.SetField("whsename", entity.whsename);
         row.SetField("specnstype", entity.specnstype);
         row.SetField("shipprod", entity.shipprod);
         row.SetField("shipprodnotesfl", entity.shipprodnotesfl);
         row.SetField("sellerprod", entity.sellerprod);
         row.SetField("buyerprod", entity.buyerprod);
         row.SetField("qtyord", entity.qtyord);
         row.SetField("proddesc", entity.proddesc);
         row.SetField("unit", entity.unit);
         row.SetField("price", entity.price);
         row.SetField("prcunit", entity.prcunit);
         row.SetField("netord", entity.netord);
         row.SetField("netamt", entity.netamt);
         row.SetField("user1", entity.user1);
         row.SetField("user2", entity.user2);
         row.SetField("user3", entity.user3);
         row.SetField("user4", entity.user4);
         row.SetField("user5", entity.user5);
         row.SetField("user6", entity.user6);
         row.SetField("user7", entity.user7);
         row.SetField("user8", entity.user8);
         row.SetField("user9", entity.user9);
         row.SetField("user10", entity.user10);
         row.SetField("user11", entity.user11);
         row.SetField("user12", entity.user12);
         row.SetField("user13", entity.user13);
         row.SetField("user14", entity.user14);
         row.SetField("user15", entity.user15);
         row.SetField("user16", entity.user16);
         row.SetField("user17", entity.user17);
         row.SetField("user18", entity.user18);
         row.SetField("user19", entity.user19);
         row.SetField("user20", entity.user20);
         row.SetField("user21", entity.user21);
         row.SetField("user22", entity.user22);
         row.SetField("user23", entity.user23);
         row.SetField("user24", entity.user24);
         row.SetField("rwidptxtransln", entity.rwidptxtransln.ToByteArray());

      }
   
   }
}
#pragma warning restore 1591