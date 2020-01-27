//------------------------------------------------------------------------------
// 
//     This code was generated by a tool.
//     Template version $Rev: 12700 $
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
using ServiceInterfaceClient.Attributes;
using ServiceInterfaceClient.BaseClasses;
using ServiceInterfaceClient.Helpers;
using ServiceInterfaceClient.Interfaces;
       
namespace Infor.Sxe.Common.Data.Models.VA
{
   /// <summary>
   /// Value Add Setup Product Defaults Version Sections
   /// </summary>
   
   public partial class VaspsvBase: ModelBase, IUserFields
   {

      /// <summary>
      /// Company #
      /// </summary>
      [Key,Order]
      public int cono { get; set; }

      /// <summary>
      /// Product
      /// </summary>
      [Key,Order,StringValidationAttribute]
      public string shipprod { get; set; }

      /// <summary>
      /// Default Whse
      /// </summary>
      [Key,Order,StringValidationAttribute]
      public string whse { get; set; }

      /// <summary>
      /// Version #
      /// </summary>
      [Key,Order]
      public int verno { get; set; }

      /// <summary>
      /// Seq#
      /// </summary>
      [Key,Order]
      public int seqno { get; set; }

      /// <summary>
      /// Section Type
      /// </summary>
      [StringValidationAttribute]
      public string sctntype { get; set; }

      /// <summary>
      /// Section Code
      /// </summary>
      [StringValidationAttribute]
      public string sctncode { get; set; }

      /// <summary>
      /// Destination Vendor #
      /// </summary>
      public decimal destvendno { get; set; }

      /// <summary>
      /// User 1
      /// </summary>
      [StringValidationAttribute]
      public string user1 { get; set; }

      /// <summary>
      /// User 2
      /// </summary>
      [StringValidationAttribute]
      public string user2 { get; set; }

      /// <summary>
      /// User 3
      /// </summary>
      [StringValidationAttribute]
      public string user3 { get; set; }

      /// <summary>
      /// User 4
      /// </summary>
      [StringValidationAttribute]
      public string user4 { get; set; }

      /// <summary>
      /// User 5
      /// </summary>
      [StringValidationAttribute]
      public string user5 { get; set; }

      /// <summary>
      /// User 6
      /// </summary>
      public decimal? user6 { get; set; }

      /// <summary>
      /// User 7
      /// </summary>
      public decimal? user7 { get; set; }

      /// <summary>
      /// User 8
      /// </summary>
      public DateTime? user8 { get; set; }

      /// <summary>
      /// User 9
      /// </summary>
      public DateTime? user9 { get; set; }

      /// <summary>
      /// Last Change Date
      /// </summary>
      public DateTime? transdt { get; set; }

      /// <summary>
      /// Last Change Time
      /// </summary>
      [StringValidationAttribute]
      public string transtm { get; set; }

      /// <summary>
      /// Last Change By
      /// </summary>
      [StringValidationAttribute]
      public string operinit { get; set; }

      /// <summary>
      /// Staging Area
      /// </summary>
      [StringValidationAttribute]
      public string stagearea { get; set; }

      /// <summary>
      /// Destination Whse
      /// </summary>
      [StringValidationAttribute]
      public string destwhse { get; set; }

      /// <summary>
      /// Destination Ship From
      /// </summary>
      public int destshipfmno { get; set; }

      /// <summary>
      /// Instructions
      /// </summary>
      [StringValidationAttribute]
      public string shipinstr { get; set; }

      /// <summary>
      /// Ref
      /// </summary>
      [StringValidationAttribute]
      public string refer { get; set; }

      /// <summary>
      /// Ship
      /// </summary>
      [StringValidationAttribute]
      public string shipviaty { get; set; }

      /// <summary>
      /// Specifications/Instructions
      /// </summary>
      [StringValidationAttribute]
      public string specdata { get; set; }

      /// <summary>
      /// Specifications Print Type
      /// </summary>
      [StringValidationAttribute]
      public string specprtty { get; set; }

      /// <summary>
      /// External Vendor #
      /// </summary>
      public decimal extrvendno { get; set; }

      /// <summary>
      /// External Ship From
      /// </summary>
      public int extrshipfmno { get; set; }

      /// <summary>
      /// Internal Whse
      /// </summary>
      [StringValidationAttribute]
      public string intrwhse { get; set; }

      /// <summary>
      /// Disposition
      /// </summary>
      [StringValidationAttribute]
      public string orderdisp { get; set; }

      /// <summary>
      /// Destination Type
      /// </summary>
      [StringValidationAttribute]
      public string desttype { get; set; }

      /// <summary>
      /// Goal Product
      /// </summary>
      [StringValidationAttribute]
      public string goalprod { get; set; }

      /// <summary>
      /// Goal Description
      /// </summary>
      [StringValidationAttribute]
      public string goaldesc { get; set; }

      /// <summary>
      /// Print Flag
      /// </summary>
      public bool specprtfl { get; set; }

      /// <summary>
      /// Notes
      /// </summary>
      [StringValidationAttribute]
      public string notesfl { get; set; }

      /// <summary>
      /// Route/Day/Stop
      /// </summary>
      [StringValidationAttribute]
      public string route { get; set; }

      /// <summary>
      /// Trans Proc
      /// </summary>
      [StringValidationAttribute]
      public string transproc { get; set; }
      
      /// <summary>
      /// Row ID
      /// </summary>
      [StringValidationAttribute]
      public string rowID { get; set; }



      /// <summary>
      /// Build a class from a database row
      /// </summary>
      public static T BuildVaspsvBaseFromRow<T>(DataRow row) where T:VaspsvBase, new()
      {
         T entity = new T();
         entity.cono = row.IsNull("cono") ? 0 : row.Field<int>("cono");
         entity.shipprod = row.IsNull("shipprod") ? string.Empty : row.Field<string>("shipprod");
         entity.whse = row.IsNull("whse") ? string.Empty : row.Field<string>("whse");
         entity.verno = row.IsNull("verno") ? 0 : row.Field<int>("verno");
         entity.seqno = row.IsNull("seqno") ? 0 : row.Field<int>("seqno");
         entity.sctntype = row.IsNull("sctntype") ? string.Empty : row.Field<string>("sctntype");
         entity.sctncode = row.IsNull("sctncode") ? string.Empty : row.Field<string>("sctncode");
         entity.destvendno = row.IsNull("destvendno") ? decimal.Zero : row.Field<decimal>("destvendno");
         entity.user1 = row.IsNull("user1") ? string.Empty : row.Field<string>("user1");
         entity.user2 = row.IsNull("user2") ? string.Empty : row.Field<string>("user2");
         entity.user3 = row.IsNull("user3") ? string.Empty : row.Field<string>("user3");
         entity.user4 = row.IsNull("user4") ? string.Empty : row.Field<string>("user4");
         entity.user5 = row.IsNull("user5") ? string.Empty : row.Field<string>("user5");
         entity.user6 = row.Field<decimal?>("user6");
         entity.user7 = row.Field<decimal?>("user7");
         entity.user8 = row.Field<DateTime?>("user8");
         entity.user9 = row.Field<DateTime?>("user9");
         entity.transdt = row.Field<DateTime?>("transdt");
         entity.transtm = row.IsNull("transtm") ? string.Empty : row.Field<string>("transtm");
         entity.operinit = row.IsNull("operinit") ? string.Empty : row.Field<string>("operinit");
         entity.stagearea = row.IsNull("stagearea") ? string.Empty : row.Field<string>("stagearea");
         entity.destwhse = row.IsNull("destwhse") ? string.Empty : row.Field<string>("destwhse");
         entity.destshipfmno = row.IsNull("destshipfmno") ? 0 : row.Field<int>("destshipfmno");
         entity.shipinstr = row.IsNull("shipinstr") ? string.Empty : row.Field<string>("shipinstr");
         entity.refer = row.IsNull("refer") ? string.Empty : row.Field<string>("refer");
         entity.shipviaty = row.IsNull("shipviaty") ? string.Empty : row.Field<string>("shipviaty");
         entity.specdata = row.IsNull("specdata") ? string.Empty : row.Field<string>("specdata");
         entity.specprtty = row.IsNull("specprtty") ? string.Empty : row.Field<string>("specprtty");
         entity.extrvendno = row.IsNull("extrvendno") ? decimal.Zero : row.Field<decimal>("extrvendno");
         entity.extrshipfmno = row.IsNull("extrshipfmno") ? 0 : row.Field<int>("extrshipfmno");
         entity.intrwhse = row.IsNull("intrwhse") ? string.Empty : row.Field<string>("intrwhse");
         entity.orderdisp = row.IsNull("orderdisp") ? string.Empty : row.Field<string>("orderdisp");
         entity.desttype = row.IsNull("desttype") ? string.Empty : row.Field<string>("desttype");
         entity.goalprod = row.IsNull("goalprod") ? string.Empty : row.Field<string>("goalprod");
         entity.goaldesc = row.IsNull("goaldesc") ? string.Empty : row.Field<string>("goaldesc");
         entity.specprtfl = row.Field<bool>("specprtfl");
         entity.notesfl = row.IsNull("notesfl") ? string.Empty : row.Field<string>("notesfl");
         entity.route = row.IsNull("route") ? string.Empty : row.Field<string>("route");
         entity.transproc = row.IsNull("transproc") ? string.Empty : row.Field<string>("transproc");
         entity.rowID = row.Field<byte[]>("vaspsvRowID").ToStringEncoded();
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromVaspsvBase(ref DataRow row, VaspsvBase entity)
      {
         row.SetField("cono", entity.cono);
         row.SetField("shipprod", entity.shipprod);
         row.SetField("whse", entity.whse);
         row.SetField("verno", entity.verno);
         row.SetField("seqno", entity.seqno);
         row.SetField("sctntype", entity.sctntype);
         row.SetField("sctncode", entity.sctncode);
         row.SetField("destvendno", entity.destvendno);
         row.SetField("user1", entity.user1);
         row.SetField("user2", entity.user2);
         row.SetField("user3", entity.user3);
         row.SetField("user4", entity.user4);
         row.SetField("user5", entity.user5);
         row.SetField("user6", entity.user6);
         row.SetField("user7", entity.user7);
         row.SetField("user8", entity.user8);
         row.SetField("user9", entity.user9);
         row.SetField("transdt", entity.transdt);
         row.SetField("transtm", entity.transtm);
         row.SetField("operinit", entity.operinit);
         row.SetField("stagearea", entity.stagearea);
         row.SetField("destwhse", entity.destwhse);
         row.SetField("destshipfmno", entity.destshipfmno);
         row.SetField("shipinstr", entity.shipinstr);
         row.SetField("refer", entity.refer);
         row.SetField("shipviaty", entity.shipviaty);
         row.SetField("specdata", entity.specdata);
         row.SetField("specprtty", entity.specprtty);
         row.SetField("extrvendno", entity.extrvendno);
         row.SetField("extrshipfmno", entity.extrshipfmno);
         row.SetField("intrwhse", entity.intrwhse);
         row.SetField("orderdisp", entity.orderdisp);
         row.SetField("desttype", entity.desttype);
         row.SetField("goalprod", entity.goalprod);
         row.SetField("goaldesc", entity.goaldesc);
         row.SetField("specprtfl", entity.specprtfl);
         row.SetField("notesfl", entity.notesfl);
         row.SetField("route", entity.route);
         row.SetField("transproc", entity.transproc);
         row.SetField("vaspsvRowID", entity.rowID.ToByteArray());
      }   
      
      /// <summary>
      /// Build a minimal row from a class (key fields only)
      /// </summary>
      public static void BuildMinimalRow(ref DataRow row, VaspsvBase entity)
      {
         row.SetField("cono", entity.cono);
         row.SetField("shipprod", entity.shipprod);
         row.SetField("whse", entity.whse);
         row.SetField("verno", entity.verno);
         row.SetField("seqno", entity.seqno);
         row.SetField("vaspsvRowID", entity.rowID.ToByteArray());
      }   
   }
}
#pragma warning restore 1591
	