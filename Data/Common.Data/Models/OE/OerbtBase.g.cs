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
       
namespace Infor.Sxe.Common.Data.Models.OE
{
   /// <summary>
   /// Bill Trust Log
   /// </summary>
   
   public partial class OerbtBase: ModelBase, IUserFields
   {

      /// <summary>
      /// Company #
      /// </summary>
      [Key,Order]
      public int cono { get; set; }

      /// <summary>
      /// Type
      /// </summary>
      [Key,Order,StringValidationAttribute]
      public string type { get; set; }

      /// <summary>
      /// File Date
      /// </summary>
      [Key,Order,StringValidationAttribute]
      public string filedt { get; set; }

      /// <summary>
      /// File Time
      /// </summary>
      [Key,Order,StringValidationAttribute]
      public string filetm { get; set; }

      /// <summary>
      /// Customer #
      /// </summary>
      [Key,Order]
      public decimal custno { get; set; }

      /// <summary>
      /// Order #
      /// </summary>
      [Key,Order]
      public int orderno { get; set; }

      /// <summary>
      /// Order Suffix
      /// </summary>
      [Key,Order]
      public int ordersuf { get; set; }

      /// <summary>
      /// Invoice
      /// </summary>
      public DateTime? docdt { get; set; }

      /// <summary>
      /// Total
      /// </summary>
      public decimal totamt { get; set; }

      /// <summary>
      /// Method
      /// </summary>
      [StringValidationAttribute]
      public string method { get; set; }

      /// <summary>
      /// Match
      /// </summary>
      [StringValidationAttribute]
      public string match { get; set; }

      /// <summary>
      /// # Copies
      /// </summary>
      public int copies { get; set; }

      /// <summary>
      /// # Times Printed
      /// </summary>
      public int invcnt { get; set; }

      /// <summary>
      /// Option#
      /// </summary>
      public int optioncnt1 { get; set; }
      public int optioncnt2 { get; set; }
      public int optioncnt3 { get; set; }
      public int optioncnt4 { get; set; }
      public int optioncnt5 { get; set; }
      public int optioncnt6 { get; set; }
      public int optioncnt7 { get; set; }
      public int optioncnt8 { get; set; }
      public int optioncnt9 { get; set; }
      public int optioncnt10 { get; set; }
      public int optioncnt11 { get; set; }
      public int optioncnt12 { get; set; }
      public int optioncnt13 { get; set; }
      public int optioncnt14 { get; set; }
      public int optioncnt15 { get; set; }
      public int optioncnt16 { get; set; }
      public int optioncnt17 { get; set; }
      public int optioncnt18 { get; set; }
      public int optioncnt19 { get; set; }
      public int optioncnt20 { get; set; }

      /// <summary>
      /// Option Value
      /// </summary>
      [StringValidationAttribute]
      public string optvalue1 { get; set; }
      [StringValidationAttribute]
      public string optvalue2 { get; set; }
      [StringValidationAttribute]
      public string optvalue3 { get; set; }
      [StringValidationAttribute]
      public string optvalue4 { get; set; }
      [StringValidationAttribute]
      public string optvalue5 { get; set; }
      [StringValidationAttribute]
      public string optvalue6 { get; set; }
      [StringValidationAttribute]
      public string optvalue7 { get; set; }
      [StringValidationAttribute]
      public string optvalue8 { get; set; }
      [StringValidationAttribute]
      public string optvalue9 { get; set; }
      [StringValidationAttribute]
      public string optvalue10 { get; set; }
      [StringValidationAttribute]
      public string optvalue11 { get; set; }
      [StringValidationAttribute]
      public string optvalue12 { get; set; }
      [StringValidationAttribute]
      public string optvalue13 { get; set; }
      [StringValidationAttribute]
      public string optvalue14 { get; set; }
      [StringValidationAttribute]
      public string optvalue15 { get; set; }
      [StringValidationAttribute]
      public string optvalue16 { get; set; }
      [StringValidationAttribute]
      public string optvalue17 { get; set; }
      [StringValidationAttribute]
      public string optvalue18 { get; set; }
      [StringValidationAttribute]
      public string optvalue19 { get; set; }
      [StringValidationAttribute]
      public string optvalue20 { get; set; }

      /// <summary>
      /// Open Initials
      /// </summary>
      [StringValidationAttribute]
      public string openinit { get; set; }

      /// <summary>
      /// Last Change By
      /// </summary>
      [StringValidationAttribute]
      public string operinit { get; set; }

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
      /// Trans Proc
      /// </summary>
      [StringValidationAttribute]
      public string transproc { get; set; }

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
      /// Row ID
      /// </summary>
      [StringValidationAttribute]
      public string rowID { get; set; }



      /// <summary>
      /// Build a class from a database row
      /// </summary>
      public static T BuildOerbtBaseFromRow<T>(DataRow row) where T:OerbtBase, new()
      {
         T entity = new T();
         entity.cono = row.IsNull("cono") ? 0 : row.Field<int>("cono");
         entity.type = row.IsNull("type") ? string.Empty : row.Field<string>("type");
         entity.filedt = row.IsNull("filedt") ? string.Empty : row.Field<string>("filedt");
         entity.filetm = row.IsNull("filetm") ? string.Empty : row.Field<string>("filetm");
         entity.custno = row.IsNull("custno") ? decimal.Zero : row.Field<decimal>("custno");
         entity.orderno = row.IsNull("orderno") ? 0 : row.Field<int>("orderno");
         entity.ordersuf = row.IsNull("ordersuf") ? 0 : row.Field<int>("ordersuf");
         entity.docdt = row.Field<DateTime?>("docdt");
         entity.totamt = row.IsNull("totamt") ? decimal.Zero : row.Field<decimal>("totamt");
         entity.method = row.IsNull("method") ? string.Empty : row.Field<string>("method");
         entity.match = row.IsNull("match") ? string.Empty : row.Field<string>("match");
         entity.copies = row.IsNull("copies") ? 0 : row.Field<int>("copies");
         entity.invcnt = row.IsNull("invcnt") ? 0 : row.Field<int>("invcnt");
         entity.optioncnt1 = row.IsNull("optioncnt1") ? 0 : row.Field<int>("optioncnt1");
         entity.optioncnt2 = row.IsNull("optioncnt2") ? 0 : row.Field<int>("optioncnt2");
         entity.optioncnt3 = row.IsNull("optioncnt3") ? 0 : row.Field<int>("optioncnt3");
         entity.optioncnt4 = row.IsNull("optioncnt4") ? 0 : row.Field<int>("optioncnt4");
         entity.optioncnt5 = row.IsNull("optioncnt5") ? 0 : row.Field<int>("optioncnt5");
         entity.optioncnt6 = row.IsNull("optioncnt6") ? 0 : row.Field<int>("optioncnt6");
         entity.optioncnt7 = row.IsNull("optioncnt7") ? 0 : row.Field<int>("optioncnt7");
         entity.optioncnt8 = row.IsNull("optioncnt8") ? 0 : row.Field<int>("optioncnt8");
         entity.optioncnt9 = row.IsNull("optioncnt9") ? 0 : row.Field<int>("optioncnt9");
         entity.optioncnt10 = row.IsNull("optioncnt10") ? 0 : row.Field<int>("optioncnt10");
         entity.optioncnt11 = row.IsNull("optioncnt11") ? 0 : row.Field<int>("optioncnt11");
         entity.optioncnt12 = row.IsNull("optioncnt12") ? 0 : row.Field<int>("optioncnt12");
         entity.optioncnt13 = row.IsNull("optioncnt13") ? 0 : row.Field<int>("optioncnt13");
         entity.optioncnt14 = row.IsNull("optioncnt14") ? 0 : row.Field<int>("optioncnt14");
         entity.optioncnt15 = row.IsNull("optioncnt15") ? 0 : row.Field<int>("optioncnt15");
         entity.optioncnt16 = row.IsNull("optioncnt16") ? 0 : row.Field<int>("optioncnt16");
         entity.optioncnt17 = row.IsNull("optioncnt17") ? 0 : row.Field<int>("optioncnt17");
         entity.optioncnt18 = row.IsNull("optioncnt18") ? 0 : row.Field<int>("optioncnt18");
         entity.optioncnt19 = row.IsNull("optioncnt19") ? 0 : row.Field<int>("optioncnt19");
         entity.optioncnt20 = row.IsNull("optioncnt20") ? 0 : row.Field<int>("optioncnt20");
         entity.optvalue1 = row.IsNull("optvalue1") ? string.Empty : row.Field<string>("optvalue1");
         entity.optvalue2 = row.IsNull("optvalue2") ? string.Empty : row.Field<string>("optvalue2");
         entity.optvalue3 = row.IsNull("optvalue3") ? string.Empty : row.Field<string>("optvalue3");
         entity.optvalue4 = row.IsNull("optvalue4") ? string.Empty : row.Field<string>("optvalue4");
         entity.optvalue5 = row.IsNull("optvalue5") ? string.Empty : row.Field<string>("optvalue5");
         entity.optvalue6 = row.IsNull("optvalue6") ? string.Empty : row.Field<string>("optvalue6");
         entity.optvalue7 = row.IsNull("optvalue7") ? string.Empty : row.Field<string>("optvalue7");
         entity.optvalue8 = row.IsNull("optvalue8") ? string.Empty : row.Field<string>("optvalue8");
         entity.optvalue9 = row.IsNull("optvalue9") ? string.Empty : row.Field<string>("optvalue9");
         entity.optvalue10 = row.IsNull("optvalue10") ? string.Empty : row.Field<string>("optvalue10");
         entity.optvalue11 = row.IsNull("optvalue11") ? string.Empty : row.Field<string>("optvalue11");
         entity.optvalue12 = row.IsNull("optvalue12") ? string.Empty : row.Field<string>("optvalue12");
         entity.optvalue13 = row.IsNull("optvalue13") ? string.Empty : row.Field<string>("optvalue13");
         entity.optvalue14 = row.IsNull("optvalue14") ? string.Empty : row.Field<string>("optvalue14");
         entity.optvalue15 = row.IsNull("optvalue15") ? string.Empty : row.Field<string>("optvalue15");
         entity.optvalue16 = row.IsNull("optvalue16") ? string.Empty : row.Field<string>("optvalue16");
         entity.optvalue17 = row.IsNull("optvalue17") ? string.Empty : row.Field<string>("optvalue17");
         entity.optvalue18 = row.IsNull("optvalue18") ? string.Empty : row.Field<string>("optvalue18");
         entity.optvalue19 = row.IsNull("optvalue19") ? string.Empty : row.Field<string>("optvalue19");
         entity.optvalue20 = row.IsNull("optvalue20") ? string.Empty : row.Field<string>("optvalue20");
         entity.openinit = row.IsNull("openinit") ? string.Empty : row.Field<string>("openinit");
         entity.operinit = row.IsNull("operinit") ? string.Empty : row.Field<string>("operinit");
         entity.transdt = row.Field<DateTime?>("transdt");
         entity.transtm = row.IsNull("transtm") ? string.Empty : row.Field<string>("transtm");
         entity.transproc = row.IsNull("transproc") ? string.Empty : row.Field<string>("transproc");
         entity.user1 = row.IsNull("user1") ? string.Empty : row.Field<string>("user1");
         entity.user2 = row.IsNull("user2") ? string.Empty : row.Field<string>("user2");
         entity.user3 = row.IsNull("user3") ? string.Empty : row.Field<string>("user3");
         entity.user4 = row.IsNull("user4") ? string.Empty : row.Field<string>("user4");
         entity.user5 = row.IsNull("user5") ? string.Empty : row.Field<string>("user5");
         entity.user6 = row.Field<decimal?>("user6");
         entity.user7 = row.Field<decimal?>("user7");
         entity.user8 = row.Field<DateTime?>("user8");
         entity.user9 = row.Field<DateTime?>("user9");
         entity.rowID = row.Field<byte[]>("oerbtRowID").ToStringEncoded();
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromOerbtBase(ref DataRow row, OerbtBase entity)
      {
         row.SetField("cono", entity.cono);
         row.SetField("type", entity.type);
         row.SetField("filedt", entity.filedt);
         row.SetField("filetm", entity.filetm);
         row.SetField("custno", entity.custno);
         row.SetField("orderno", entity.orderno);
         row.SetField("ordersuf", entity.ordersuf);
         row.SetField("docdt", entity.docdt);
         row.SetField("totamt", entity.totamt);
         row.SetField("method", entity.method);
         row.SetField("match", entity.match);
         row.SetField("copies", entity.copies);
         row.SetField("invcnt", entity.invcnt);
         row.SetField("optioncnt1", entity.optioncnt1);
         row.SetField("optioncnt2", entity.optioncnt2);
         row.SetField("optioncnt3", entity.optioncnt3);
         row.SetField("optioncnt4", entity.optioncnt4);
         row.SetField("optioncnt5", entity.optioncnt5);
         row.SetField("optioncnt6", entity.optioncnt6);
         row.SetField("optioncnt7", entity.optioncnt7);
         row.SetField("optioncnt8", entity.optioncnt8);
         row.SetField("optioncnt9", entity.optioncnt9);
         row.SetField("optioncnt10", entity.optioncnt10);
         row.SetField("optioncnt11", entity.optioncnt11);
         row.SetField("optioncnt12", entity.optioncnt12);
         row.SetField("optioncnt13", entity.optioncnt13);
         row.SetField("optioncnt14", entity.optioncnt14);
         row.SetField("optioncnt15", entity.optioncnt15);
         row.SetField("optioncnt16", entity.optioncnt16);
         row.SetField("optioncnt17", entity.optioncnt17);
         row.SetField("optioncnt18", entity.optioncnt18);
         row.SetField("optioncnt19", entity.optioncnt19);
         row.SetField("optioncnt20", entity.optioncnt20);
         row.SetField("optvalue1", entity.optvalue1);
         row.SetField("optvalue2", entity.optvalue2);
         row.SetField("optvalue3", entity.optvalue3);
         row.SetField("optvalue4", entity.optvalue4);
         row.SetField("optvalue5", entity.optvalue5);
         row.SetField("optvalue6", entity.optvalue6);
         row.SetField("optvalue7", entity.optvalue7);
         row.SetField("optvalue8", entity.optvalue8);
         row.SetField("optvalue9", entity.optvalue9);
         row.SetField("optvalue10", entity.optvalue10);
         row.SetField("optvalue11", entity.optvalue11);
         row.SetField("optvalue12", entity.optvalue12);
         row.SetField("optvalue13", entity.optvalue13);
         row.SetField("optvalue14", entity.optvalue14);
         row.SetField("optvalue15", entity.optvalue15);
         row.SetField("optvalue16", entity.optvalue16);
         row.SetField("optvalue17", entity.optvalue17);
         row.SetField("optvalue18", entity.optvalue18);
         row.SetField("optvalue19", entity.optvalue19);
         row.SetField("optvalue20", entity.optvalue20);
         row.SetField("openinit", entity.openinit);
         row.SetField("operinit", entity.operinit);
         row.SetField("transdt", entity.transdt);
         row.SetField("transtm", entity.transtm);
         row.SetField("transproc", entity.transproc);
         row.SetField("user1", entity.user1);
         row.SetField("user2", entity.user2);
         row.SetField("user3", entity.user3);
         row.SetField("user4", entity.user4);
         row.SetField("user5", entity.user5);
         row.SetField("user6", entity.user6);
         row.SetField("user7", entity.user7);
         row.SetField("user8", entity.user8);
         row.SetField("user9", entity.user9);
         row.SetField("oerbtRowID", entity.rowID.ToByteArray());
      }   
      
      /// <summary>
      /// Build a minimal row from a class (key fields only)
      /// </summary>
      public static void BuildMinimalRow(ref DataRow row, OerbtBase entity)
      {
         row.SetField("cono", entity.cono);
         row.SetField("type", entity.type);
         row.SetField("filedt", entity.filedt);
         row.SetField("filetm", entity.filetm);
         row.SetField("custno", entity.custno);
         row.SetField("orderno", entity.orderno);
         row.SetField("ordersuf", entity.ordersuf);
         row.SetField("oerbtRowID", entity.rowID.ToByteArray());
      }   
   }
}
#pragma warning restore 1591
	