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
       
namespace Infor.Sxe.Common.Data.Models.SM
{
   /// <summary>
   /// SM Customer History
   /// </summary>
   
   public partial class SmscBase: ModelBase, IUserFields
   {

      /// <summary>
      /// Company #
      /// </summary>
      [Key,Order]
      public int cono { get; set; }

      /// <summary>
      /// Customer #
      /// </summary>
      [Key,Order]
      public decimal custno { get; set; }

      /// <summary>
      /// Ship To
      /// </summary>
      [Key,Order,StringValidationAttribute]
      public string shipto { get; set; }

      /// <summary>
      /// Year
      /// </summary>
      [Key,Order]
      public int yr { get; set; }

      /// <summary>
      /// # of Invoices Ytd
      /// </summary>
      public int noinvbill { get; set; }

      /// <summary>
      /// # of Lines Ytd
      /// </summary>
      public int nolinebill { get; set; }

      /// <summary>
      /// Units Sold
      /// </summary>
      public decimal qtysold1 { get; set; }
      public decimal qtysold2 { get; set; }
      public decimal qtysold3 { get; set; }
      public decimal qtysold4 { get; set; }
      public decimal qtysold5 { get; set; }
      public decimal qtysold6 { get; set; }
      public decimal qtysold7 { get; set; }
      public decimal qtysold8 { get; set; }
      public decimal qtysold9 { get; set; }
      public decimal qtysold10 { get; set; }
      public decimal qtysold11 { get; set; }
      public decimal qtysold12 { get; set; }
      public decimal qtysold13 { get; set; }

      /// <summary>
      /// Net Sale
      /// </summary>
      public decimal salesamt1 { get; set; }
      public decimal salesamt2 { get; set; }
      public decimal salesamt3 { get; set; }
      public decimal salesamt4 { get; set; }
      public decimal salesamt5 { get; set; }
      public decimal salesamt6 { get; set; }
      public decimal salesamt7 { get; set; }
      public decimal salesamt8 { get; set; }
      public decimal salesamt9 { get; set; }
      public decimal salesamt10 { get; set; }
      public decimal salesamt11 { get; set; }
      public decimal salesamt12 { get; set; }
      public decimal salesamt13 { get; set; }

      /// <summary>
      /// Discount
      /// </summary>
      public decimal discamt1 { get; set; }
      public decimal discamt2 { get; set; }
      public decimal discamt3 { get; set; }
      public decimal discamt4 { get; set; }
      public decimal discamt5 { get; set; }
      public decimal discamt6 { get; set; }
      public decimal discamt7 { get; set; }
      public decimal discamt8 { get; set; }
      public decimal discamt9 { get; set; }
      public decimal discamt10 { get; set; }
      public decimal discamt11 { get; set; }
      public decimal discamt12 { get; set; }
      public decimal discamt13 { get; set; }

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
      /// Cost
      /// </summary>
      public decimal cogamt1 { get; set; }
      public decimal cogamt2 { get; set; }
      public decimal cogamt3 { get; set; }
      public decimal cogamt4 { get; set; }
      public decimal cogamt5 { get; set; }
      public decimal cogamt6 { get; set; }
      public decimal cogamt7 { get; set; }
      public decimal cogamt8 { get; set; }
      public decimal cogamt9 { get; set; }
      public decimal cogamt10 { get; set; }
      public decimal cogamt11 { get; set; }
      public decimal cogamt12 { get; set; }
      public decimal cogamt13 { get; set; }

      /// <summary>
      /// Budget
      /// </summary>
      public decimal budgetamt1 { get; set; }
      public decimal budgetamt2 { get; set; }
      public decimal budgetamt3 { get; set; }
      public decimal budgetamt4 { get; set; }
      public decimal budgetamt5 { get; set; }
      public decimal budgetamt6 { get; set; }
      public decimal budgetamt7 { get; set; }
      public decimal budgetamt8 { get; set; }
      public decimal budgetamt9 { get; set; }
      public decimal budgetamt10 { get; set; }
      public decimal budgetamt11 { get; set; }
      public decimal budgetamt12 { get; set; }
      public decimal budgetamt13 { get; set; }

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
      public static T BuildSmscBaseFromRow<T>(DataRow row) where T:SmscBase, new()
      {
         T entity = new T();
         entity.cono = row.IsNull("cono") ? 0 : row.Field<int>("cono");
         entity.custno = row.IsNull("custno") ? decimal.Zero : row.Field<decimal>("custno");
         entity.shipto = row.IsNull("shipto") ? string.Empty : row.Field<string>("shipto");
         entity.yr = row.IsNull("yr") ? 0 : row.Field<int>("yr");
         entity.noinvbill = row.IsNull("noinvbill") ? 0 : row.Field<int>("noinvbill");
         entity.nolinebill = row.IsNull("nolinebill") ? 0 : row.Field<int>("nolinebill");
         entity.qtysold1 = row.IsNull("qtysold1") ? decimal.Zero : row.Field<decimal>("qtysold1");
         entity.qtysold2 = row.IsNull("qtysold2") ? decimal.Zero : row.Field<decimal>("qtysold2");
         entity.qtysold3 = row.IsNull("qtysold3") ? decimal.Zero : row.Field<decimal>("qtysold3");
         entity.qtysold4 = row.IsNull("qtysold4") ? decimal.Zero : row.Field<decimal>("qtysold4");
         entity.qtysold5 = row.IsNull("qtysold5") ? decimal.Zero : row.Field<decimal>("qtysold5");
         entity.qtysold6 = row.IsNull("qtysold6") ? decimal.Zero : row.Field<decimal>("qtysold6");
         entity.qtysold7 = row.IsNull("qtysold7") ? decimal.Zero : row.Field<decimal>("qtysold7");
         entity.qtysold8 = row.IsNull("qtysold8") ? decimal.Zero : row.Field<decimal>("qtysold8");
         entity.qtysold9 = row.IsNull("qtysold9") ? decimal.Zero : row.Field<decimal>("qtysold9");
         entity.qtysold10 = row.IsNull("qtysold10") ? decimal.Zero : row.Field<decimal>("qtysold10");
         entity.qtysold11 = row.IsNull("qtysold11") ? decimal.Zero : row.Field<decimal>("qtysold11");
         entity.qtysold12 = row.IsNull("qtysold12") ? decimal.Zero : row.Field<decimal>("qtysold12");
         entity.qtysold13 = row.IsNull("qtysold13") ? decimal.Zero : row.Field<decimal>("qtysold13");
         entity.salesamt1 = row.IsNull("salesamt1") ? decimal.Zero : row.Field<decimal>("salesamt1");
         entity.salesamt2 = row.IsNull("salesamt2") ? decimal.Zero : row.Field<decimal>("salesamt2");
         entity.salesamt3 = row.IsNull("salesamt3") ? decimal.Zero : row.Field<decimal>("salesamt3");
         entity.salesamt4 = row.IsNull("salesamt4") ? decimal.Zero : row.Field<decimal>("salesamt4");
         entity.salesamt5 = row.IsNull("salesamt5") ? decimal.Zero : row.Field<decimal>("salesamt5");
         entity.salesamt6 = row.IsNull("salesamt6") ? decimal.Zero : row.Field<decimal>("salesamt6");
         entity.salesamt7 = row.IsNull("salesamt7") ? decimal.Zero : row.Field<decimal>("salesamt7");
         entity.salesamt8 = row.IsNull("salesamt8") ? decimal.Zero : row.Field<decimal>("salesamt8");
         entity.salesamt9 = row.IsNull("salesamt9") ? decimal.Zero : row.Field<decimal>("salesamt9");
         entity.salesamt10 = row.IsNull("salesamt10") ? decimal.Zero : row.Field<decimal>("salesamt10");
         entity.salesamt11 = row.IsNull("salesamt11") ? decimal.Zero : row.Field<decimal>("salesamt11");
         entity.salesamt12 = row.IsNull("salesamt12") ? decimal.Zero : row.Field<decimal>("salesamt12");
         entity.salesamt13 = row.IsNull("salesamt13") ? decimal.Zero : row.Field<decimal>("salesamt13");
         entity.discamt1 = row.IsNull("discamt1") ? decimal.Zero : row.Field<decimal>("discamt1");
         entity.discamt2 = row.IsNull("discamt2") ? decimal.Zero : row.Field<decimal>("discamt2");
         entity.discamt3 = row.IsNull("discamt3") ? decimal.Zero : row.Field<decimal>("discamt3");
         entity.discamt4 = row.IsNull("discamt4") ? decimal.Zero : row.Field<decimal>("discamt4");
         entity.discamt5 = row.IsNull("discamt5") ? decimal.Zero : row.Field<decimal>("discamt5");
         entity.discamt6 = row.IsNull("discamt6") ? decimal.Zero : row.Field<decimal>("discamt6");
         entity.discamt7 = row.IsNull("discamt7") ? decimal.Zero : row.Field<decimal>("discamt7");
         entity.discamt8 = row.IsNull("discamt8") ? decimal.Zero : row.Field<decimal>("discamt8");
         entity.discamt9 = row.IsNull("discamt9") ? decimal.Zero : row.Field<decimal>("discamt9");
         entity.discamt10 = row.IsNull("discamt10") ? decimal.Zero : row.Field<decimal>("discamt10");
         entity.discamt11 = row.IsNull("discamt11") ? decimal.Zero : row.Field<decimal>("discamt11");
         entity.discamt12 = row.IsNull("discamt12") ? decimal.Zero : row.Field<decimal>("discamt12");
         entity.discamt13 = row.IsNull("discamt13") ? decimal.Zero : row.Field<decimal>("discamt13");
         entity.transdt = row.Field<DateTime?>("transdt");
         entity.transtm = row.IsNull("transtm") ? string.Empty : row.Field<string>("transtm");
         entity.operinit = row.IsNull("operinit") ? string.Empty : row.Field<string>("operinit");
         entity.cogamt1 = row.IsNull("cogamt1") ? decimal.Zero : row.Field<decimal>("cogamt1");
         entity.cogamt2 = row.IsNull("cogamt2") ? decimal.Zero : row.Field<decimal>("cogamt2");
         entity.cogamt3 = row.IsNull("cogamt3") ? decimal.Zero : row.Field<decimal>("cogamt3");
         entity.cogamt4 = row.IsNull("cogamt4") ? decimal.Zero : row.Field<decimal>("cogamt4");
         entity.cogamt5 = row.IsNull("cogamt5") ? decimal.Zero : row.Field<decimal>("cogamt5");
         entity.cogamt6 = row.IsNull("cogamt6") ? decimal.Zero : row.Field<decimal>("cogamt6");
         entity.cogamt7 = row.IsNull("cogamt7") ? decimal.Zero : row.Field<decimal>("cogamt7");
         entity.cogamt8 = row.IsNull("cogamt8") ? decimal.Zero : row.Field<decimal>("cogamt8");
         entity.cogamt9 = row.IsNull("cogamt9") ? decimal.Zero : row.Field<decimal>("cogamt9");
         entity.cogamt10 = row.IsNull("cogamt10") ? decimal.Zero : row.Field<decimal>("cogamt10");
         entity.cogamt11 = row.IsNull("cogamt11") ? decimal.Zero : row.Field<decimal>("cogamt11");
         entity.cogamt12 = row.IsNull("cogamt12") ? decimal.Zero : row.Field<decimal>("cogamt12");
         entity.cogamt13 = row.IsNull("cogamt13") ? decimal.Zero : row.Field<decimal>("cogamt13");
         entity.budgetamt1 = row.IsNull("budgetamt1") ? decimal.Zero : row.Field<decimal>("budgetamt1");
         entity.budgetamt2 = row.IsNull("budgetamt2") ? decimal.Zero : row.Field<decimal>("budgetamt2");
         entity.budgetamt3 = row.IsNull("budgetamt3") ? decimal.Zero : row.Field<decimal>("budgetamt3");
         entity.budgetamt4 = row.IsNull("budgetamt4") ? decimal.Zero : row.Field<decimal>("budgetamt4");
         entity.budgetamt5 = row.IsNull("budgetamt5") ? decimal.Zero : row.Field<decimal>("budgetamt5");
         entity.budgetamt6 = row.IsNull("budgetamt6") ? decimal.Zero : row.Field<decimal>("budgetamt6");
         entity.budgetamt7 = row.IsNull("budgetamt7") ? decimal.Zero : row.Field<decimal>("budgetamt7");
         entity.budgetamt8 = row.IsNull("budgetamt8") ? decimal.Zero : row.Field<decimal>("budgetamt8");
         entity.budgetamt9 = row.IsNull("budgetamt9") ? decimal.Zero : row.Field<decimal>("budgetamt9");
         entity.budgetamt10 = row.IsNull("budgetamt10") ? decimal.Zero : row.Field<decimal>("budgetamt10");
         entity.budgetamt11 = row.IsNull("budgetamt11") ? decimal.Zero : row.Field<decimal>("budgetamt11");
         entity.budgetamt12 = row.IsNull("budgetamt12") ? decimal.Zero : row.Field<decimal>("budgetamt12");
         entity.budgetamt13 = row.IsNull("budgetamt13") ? decimal.Zero : row.Field<decimal>("budgetamt13");
         entity.user1 = row.IsNull("user1") ? string.Empty : row.Field<string>("user1");
         entity.user2 = row.IsNull("user2") ? string.Empty : row.Field<string>("user2");
         entity.user3 = row.IsNull("user3") ? string.Empty : row.Field<string>("user3");
         entity.user4 = row.IsNull("user4") ? string.Empty : row.Field<string>("user4");
         entity.user5 = row.IsNull("user5") ? string.Empty : row.Field<string>("user5");
         entity.user6 = row.Field<decimal?>("user6");
         entity.user7 = row.Field<decimal?>("user7");
         entity.user8 = row.Field<DateTime?>("user8");
         entity.user9 = row.Field<DateTime?>("user9");
         entity.transproc = row.IsNull("transproc") ? string.Empty : row.Field<string>("transproc");
         entity.rowID = row.Field<byte[]>("smscRowID").ToStringEncoded();
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromSmscBase(ref DataRow row, SmscBase entity)
      {
         row.SetField("cono", entity.cono);
         row.SetField("custno", entity.custno);
         row.SetField("shipto", entity.shipto);
         row.SetField("yr", entity.yr);
         row.SetField("noinvbill", entity.noinvbill);
         row.SetField("nolinebill", entity.nolinebill);
         row.SetField("qtysold1", entity.qtysold1);
         row.SetField("qtysold2", entity.qtysold2);
         row.SetField("qtysold3", entity.qtysold3);
         row.SetField("qtysold4", entity.qtysold4);
         row.SetField("qtysold5", entity.qtysold5);
         row.SetField("qtysold6", entity.qtysold6);
         row.SetField("qtysold7", entity.qtysold7);
         row.SetField("qtysold8", entity.qtysold8);
         row.SetField("qtysold9", entity.qtysold9);
         row.SetField("qtysold10", entity.qtysold10);
         row.SetField("qtysold11", entity.qtysold11);
         row.SetField("qtysold12", entity.qtysold12);
         row.SetField("qtysold13", entity.qtysold13);
         row.SetField("salesamt1", entity.salesamt1);
         row.SetField("salesamt2", entity.salesamt2);
         row.SetField("salesamt3", entity.salesamt3);
         row.SetField("salesamt4", entity.salesamt4);
         row.SetField("salesamt5", entity.salesamt5);
         row.SetField("salesamt6", entity.salesamt6);
         row.SetField("salesamt7", entity.salesamt7);
         row.SetField("salesamt8", entity.salesamt8);
         row.SetField("salesamt9", entity.salesamt9);
         row.SetField("salesamt10", entity.salesamt10);
         row.SetField("salesamt11", entity.salesamt11);
         row.SetField("salesamt12", entity.salesamt12);
         row.SetField("salesamt13", entity.salesamt13);
         row.SetField("discamt1", entity.discamt1);
         row.SetField("discamt2", entity.discamt2);
         row.SetField("discamt3", entity.discamt3);
         row.SetField("discamt4", entity.discamt4);
         row.SetField("discamt5", entity.discamt5);
         row.SetField("discamt6", entity.discamt6);
         row.SetField("discamt7", entity.discamt7);
         row.SetField("discamt8", entity.discamt8);
         row.SetField("discamt9", entity.discamt9);
         row.SetField("discamt10", entity.discamt10);
         row.SetField("discamt11", entity.discamt11);
         row.SetField("discamt12", entity.discamt12);
         row.SetField("discamt13", entity.discamt13);
         row.SetField("transdt", entity.transdt);
         row.SetField("transtm", entity.transtm);
         row.SetField("operinit", entity.operinit);
         row.SetField("cogamt1", entity.cogamt1);
         row.SetField("cogamt2", entity.cogamt2);
         row.SetField("cogamt3", entity.cogamt3);
         row.SetField("cogamt4", entity.cogamt4);
         row.SetField("cogamt5", entity.cogamt5);
         row.SetField("cogamt6", entity.cogamt6);
         row.SetField("cogamt7", entity.cogamt7);
         row.SetField("cogamt8", entity.cogamt8);
         row.SetField("cogamt9", entity.cogamt9);
         row.SetField("cogamt10", entity.cogamt10);
         row.SetField("cogamt11", entity.cogamt11);
         row.SetField("cogamt12", entity.cogamt12);
         row.SetField("cogamt13", entity.cogamt13);
         row.SetField("budgetamt1", entity.budgetamt1);
         row.SetField("budgetamt2", entity.budgetamt2);
         row.SetField("budgetamt3", entity.budgetamt3);
         row.SetField("budgetamt4", entity.budgetamt4);
         row.SetField("budgetamt5", entity.budgetamt5);
         row.SetField("budgetamt6", entity.budgetamt6);
         row.SetField("budgetamt7", entity.budgetamt7);
         row.SetField("budgetamt8", entity.budgetamt8);
         row.SetField("budgetamt9", entity.budgetamt9);
         row.SetField("budgetamt10", entity.budgetamt10);
         row.SetField("budgetamt11", entity.budgetamt11);
         row.SetField("budgetamt12", entity.budgetamt12);
         row.SetField("budgetamt13", entity.budgetamt13);
         row.SetField("user1", entity.user1);
         row.SetField("user2", entity.user2);
         row.SetField("user3", entity.user3);
         row.SetField("user4", entity.user4);
         row.SetField("user5", entity.user5);
         row.SetField("user6", entity.user6);
         row.SetField("user7", entity.user7);
         row.SetField("user8", entity.user8);
         row.SetField("user9", entity.user9);
         row.SetField("transproc", entity.transproc);
         row.SetField("smscRowID", entity.rowID.ToByteArray());
      }   
      
      /// <summary>
      /// Build a minimal row from a class (key fields only)
      /// </summary>
      public static void BuildMinimalRow(ref DataRow row, SmscBase entity)
      {
         row.SetField("cono", entity.cono);
         row.SetField("custno", entity.custno);
         row.SetField("shipto", entity.shipto);
         row.SetField("yr", entity.yr);
         row.SetField("smscRowID", entity.rowID.ToByteArray());
      }   
   }
}
#pragma warning restore 1591
	