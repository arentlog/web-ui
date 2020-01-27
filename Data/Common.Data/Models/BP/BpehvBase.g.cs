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
       
namespace Infor.Sxe.Common.Data.Models.BP
{
   /// <summary>
   /// Bid Prep Vendor Quote Header
   /// </summary>
   
   public partial class BpehvBase: ModelBase, IUserFields
   {

      /// <summary>
      /// Company #
      /// </summary>
      [Key,Order]
      public int cono { get; set; }

      /// <summary>
      /// Bid Identifier
      /// </summary>
      [Key,Order,StringValidationAttribute]
      public string bpid { get; set; }

      /// <summary>
      /// Vendor #
      /// </summary>
      [Key,Order]
      public decimal vendno { get; set; }

      /// <summary>
      /// Ship From
      /// </summary>
      [Key,Order]
      public int shipfmno { get; set; }

      /// <summary>
      /// Contact Name
      /// </summary>
      [StringValidationAttribute]
      public string contactnm { get; set; }

      /// <summary>
      /// User 8
      /// </summary>
      public DateTime? user9 { get; set; }

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
      /// Last Change Date
      /// </summary>
      public DateTime? transdt { get; set; }

      /// <summary>
      /// Last Change Time
      /// </summary>
      [StringValidationAttribute]
      public string transtm { get; set; }

      /// <summary>
      /// Last Changed By
      /// </summary>
      [StringValidationAttribute]
      public string operinit { get; set; }

      /// <summary>
      /// Terms
      /// </summary>
      [StringValidationAttribute]
      public string termstype { get; set; }

      /// <summary>
      /// Quote Received Type
      /// </summary>
      [StringValidationAttribute]
      public string rcvtype { get; set; }

      /// <summary>
      /// Notes
      /// </summary>
      [StringValidationAttribute]
      public string notesfl { get; set; }

      /// <summary>
      /// User 3
      /// </summary>
      [StringValidationAttribute]
      public string user3 { get; set; }

      /// <summary>
      /// User 3
      /// </summary>
      [StringValidationAttribute]
      public string user5 { get; set; }

      /// <summary>
      /// user6
      /// </summary>
      public decimal? user6 { get; set; }

      /// <summary>
      /// user7
      /// </summary>
      public decimal? user7 { get; set; }

      /// <summary>
      /// User 8
      /// </summary>
      public DateTime? user8 { get; set; }

      /// <summary>
      /// User 3
      /// </summary>
      [StringValidationAttribute]
      public string user4 { get; set; }

      /// <summary>
      /// Ship Via
      /// </summary>
      [StringValidationAttribute]
      public string shipviaty { get; set; }

      /// <summary>
      /// Free on Board Destination
      /// </summary>
      public bool fobfl { get; set; }

      /// <summary>
      /// Confirming PO
      /// </summary>
      public bool confirmfl { get; set; }

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
      public static T BuildBpehvBaseFromRow<T>(DataRow row) where T:BpehvBase, new()
      {
         T entity = new T();
         entity.cono = row.IsNull("cono") ? 0 : row.Field<int>("cono");
         entity.bpid = row.IsNull("bpid") ? string.Empty : row.Field<string>("bpid");
         entity.contactnm = row.IsNull("contactnm") ? string.Empty : row.Field<string>("contactnm");
         entity.user9 = row.Field<DateTime?>("user9");
         entity.user1 = row.IsNull("user1") ? string.Empty : row.Field<string>("user1");
         entity.user2 = row.IsNull("user2") ? string.Empty : row.Field<string>("user2");
         entity.transdt = row.Field<DateTime?>("transdt");
         entity.transtm = row.IsNull("transtm") ? string.Empty : row.Field<string>("transtm");
         entity.operinit = row.IsNull("operinit") ? string.Empty : row.Field<string>("operinit");
         entity.termstype = row.IsNull("termstype") ? string.Empty : row.Field<string>("termstype");
         entity.vendno = row.IsNull("vendno") ? decimal.Zero : row.Field<decimal>("vendno");
         entity.rcvtype = row.IsNull("rcvtype") ? string.Empty : row.Field<string>("rcvtype");
         entity.notesfl = row.IsNull("notesfl") ? string.Empty : row.Field<string>("notesfl");
         entity.user3 = row.IsNull("user3") ? string.Empty : row.Field<string>("user3");
         entity.user5 = row.IsNull("user5") ? string.Empty : row.Field<string>("user5");
         entity.user6 = row.Field<decimal?>("user6");
         entity.user7 = row.Field<decimal?>("user7");
         entity.user8 = row.Field<DateTime?>("user8");
         entity.user4 = row.IsNull("user4") ? string.Empty : row.Field<string>("user4");
         entity.shipviaty = row.IsNull("shipviaty") ? string.Empty : row.Field<string>("shipviaty");
         entity.fobfl = row.Field<bool>("fobfl");
         entity.confirmfl = row.Field<bool>("confirmfl");
         entity.shipfmno = row.IsNull("shipfmno") ? 0 : row.Field<int>("shipfmno");
         entity.transproc = row.IsNull("transproc") ? string.Empty : row.Field<string>("transproc");
         entity.rowID = row.Field<byte[]>("bpehvRowID").ToStringEncoded();
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromBpehvBase(ref DataRow row, BpehvBase entity)
      {
         row.SetField("cono", entity.cono);
         row.SetField("bpid", entity.bpid);
         row.SetField("contactnm", entity.contactnm);
         row.SetField("user9", entity.user9);
         row.SetField("user1", entity.user1);
         row.SetField("user2", entity.user2);
         row.SetField("transdt", entity.transdt);
         row.SetField("transtm", entity.transtm);
         row.SetField("operinit", entity.operinit);
         row.SetField("termstype", entity.termstype);
         row.SetField("vendno", entity.vendno);
         row.SetField("rcvtype", entity.rcvtype);
         row.SetField("notesfl", entity.notesfl);
         row.SetField("user3", entity.user3);
         row.SetField("user5", entity.user5);
         row.SetField("user6", entity.user6);
         row.SetField("user7", entity.user7);
         row.SetField("user8", entity.user8);
         row.SetField("user4", entity.user4);
         row.SetField("shipviaty", entity.shipviaty);
         row.SetField("fobfl", entity.fobfl);
         row.SetField("confirmfl", entity.confirmfl);
         row.SetField("shipfmno", entity.shipfmno);
         row.SetField("transproc", entity.transproc);
         row.SetField("bpehvRowID", entity.rowID.ToByteArray());
      }   
      
      /// <summary>
      /// Build a minimal row from a class (key fields only)
      /// </summary>
      public static void BuildMinimalRow(ref DataRow row, BpehvBase entity)
      {
         row.SetField("cono", entity.cono);
         row.SetField("bpid", entity.bpid);
         row.SetField("vendno", entity.vendno);
         row.SetField("shipfmno", entity.shipfmno);
         row.SetField("bpehvRowID", entity.rowID.ToByteArray());
      }   
   }
}
#pragma warning restore 1591
	