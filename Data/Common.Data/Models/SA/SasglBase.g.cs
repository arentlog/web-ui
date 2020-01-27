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
       
namespace Infor.Sxe.Common.Data.Models.SA
{
   /// <summary>
   /// Gov't, Local
   /// </summary>
   
   public partial class SasglBase: ModelBase, IUserFields
   {

      /// <summary>
      /// Company #
      /// </summary>
      [Key,Order]
      public int cono { get; set; }

      /// <summary>
      /// State
      /// </summary>
      [Key,Order,StringValidationAttribute]
      public string state { get; set; }

      /// <summary>
      /// Tax Authority
      /// </summary>
      [Key,Order,StringValidationAttribute]
      public string taxauth { get; set; }

      /// <summary>
      /// Description
      /// </summary>
      [StringValidationAttribute]
      public string descrip { get; set; }

      /// <summary>
      /// Div#
      /// </summary>
      public int gldivno1 { get; set; }
      public int gldivno2 { get; set; }
      public int gldivno3 { get; set; }
      public int gldivno4 { get; set; }

      /// <summary>
      /// Dept#
      /// </summary>
      public int gldeptno1 { get; set; }
      public int gldeptno2 { get; set; }
      public int gldeptno3 { get; set; }
      public int gldeptno4 { get; set; }

      /// <summary>
      /// Acct#
      /// </summary>
      public int glacctno1 { get; set; }
      public int glacctno2 { get; set; }
      public int glacctno3 { get; set; }
      public int glacctno4 { get; set; }

      /// <summary>
      /// Sub#
      /// </summary>
      public int glsubno1 { get; set; }
      public int glsubno2 { get; set; }
      public int glsubno3 { get; set; }
      public int glsubno4 { get; set; }

      /// <summary>
      /// County
      /// </summary>
      public decimal saletaxn1 { get; set; }
      public decimal saletaxn2 { get; set; }
      public decimal saletaxn3 { get; set; }
      public decimal saletaxn4 { get; set; }
      public decimal saletaxn5 { get; set; }

      /// <summary>
      /// City
      /// </summary>
      public decimal saletaxc1 { get; set; }
      public decimal saletaxc2 { get; set; }
      public decimal saletaxc3 { get; set; }
      public decimal saletaxc4 { get; set; }
      public decimal saletaxc5 { get; set; }

      /// <summary>
      /// Other
      /// </summary>
      public decimal saletaxo1 { get; set; }
      public decimal saletaxo2 { get; set; }
      public decimal saletaxo3 { get; set; }
      public decimal saletaxo4 { get; set; }
      public decimal saletaxo5 { get; set; }

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
      public static T BuildSasglBaseFromRow<T>(DataRow row) where T:SasglBase, new()
      {
         T entity = new T();
         entity.cono = row.IsNull("cono") ? 0 : row.Field<int>("cono");
         entity.state = row.IsNull("state") ? string.Empty : row.Field<string>("state");
         entity.taxauth = row.IsNull("taxauth") ? string.Empty : row.Field<string>("taxauth");
         entity.descrip = row.IsNull("descrip") ? string.Empty : row.Field<string>("descrip");
         entity.gldivno1 = row.IsNull("gldivno1") ? 0 : row.Field<int>("gldivno1");
         entity.gldivno2 = row.IsNull("gldivno2") ? 0 : row.Field<int>("gldivno2");
         entity.gldivno3 = row.IsNull("gldivno3") ? 0 : row.Field<int>("gldivno3");
         entity.gldivno4 = row.IsNull("gldivno4") ? 0 : row.Field<int>("gldivno4");
         entity.gldeptno1 = row.IsNull("gldeptno1") ? 0 : row.Field<int>("gldeptno1");
         entity.gldeptno2 = row.IsNull("gldeptno2") ? 0 : row.Field<int>("gldeptno2");
         entity.gldeptno3 = row.IsNull("gldeptno3") ? 0 : row.Field<int>("gldeptno3");
         entity.gldeptno4 = row.IsNull("gldeptno4") ? 0 : row.Field<int>("gldeptno4");
         entity.glacctno1 = row.IsNull("glacctno1") ? 0 : row.Field<int>("glacctno1");
         entity.glacctno2 = row.IsNull("glacctno2") ? 0 : row.Field<int>("glacctno2");
         entity.glacctno3 = row.IsNull("glacctno3") ? 0 : row.Field<int>("glacctno3");
         entity.glacctno4 = row.IsNull("glacctno4") ? 0 : row.Field<int>("glacctno4");
         entity.glsubno1 = row.IsNull("glsubno1") ? 0 : row.Field<int>("glsubno1");
         entity.glsubno2 = row.IsNull("glsubno2") ? 0 : row.Field<int>("glsubno2");
         entity.glsubno3 = row.IsNull("glsubno3") ? 0 : row.Field<int>("glsubno3");
         entity.glsubno4 = row.IsNull("glsubno4") ? 0 : row.Field<int>("glsubno4");
         entity.saletaxn1 = row.IsNull("saletaxn1") ? decimal.Zero : row.Field<decimal>("saletaxn1");
         entity.saletaxn2 = row.IsNull("saletaxn2") ? decimal.Zero : row.Field<decimal>("saletaxn2");
         entity.saletaxn3 = row.IsNull("saletaxn3") ? decimal.Zero : row.Field<decimal>("saletaxn3");
         entity.saletaxn4 = row.IsNull("saletaxn4") ? decimal.Zero : row.Field<decimal>("saletaxn4");
         entity.saletaxn5 = row.IsNull("saletaxn5") ? decimal.Zero : row.Field<decimal>("saletaxn5");
         entity.saletaxc1 = row.IsNull("saletaxc1") ? decimal.Zero : row.Field<decimal>("saletaxc1");
         entity.saletaxc2 = row.IsNull("saletaxc2") ? decimal.Zero : row.Field<decimal>("saletaxc2");
         entity.saletaxc3 = row.IsNull("saletaxc3") ? decimal.Zero : row.Field<decimal>("saletaxc3");
         entity.saletaxc4 = row.IsNull("saletaxc4") ? decimal.Zero : row.Field<decimal>("saletaxc4");
         entity.saletaxc5 = row.IsNull("saletaxc5") ? decimal.Zero : row.Field<decimal>("saletaxc5");
         entity.saletaxo1 = row.IsNull("saletaxo1") ? decimal.Zero : row.Field<decimal>("saletaxo1");
         entity.saletaxo2 = row.IsNull("saletaxo2") ? decimal.Zero : row.Field<decimal>("saletaxo2");
         entity.saletaxo3 = row.IsNull("saletaxo3") ? decimal.Zero : row.Field<decimal>("saletaxo3");
         entity.saletaxo4 = row.IsNull("saletaxo4") ? decimal.Zero : row.Field<decimal>("saletaxo4");
         entity.saletaxo5 = row.IsNull("saletaxo5") ? decimal.Zero : row.Field<decimal>("saletaxo5");
         entity.operinit = row.IsNull("operinit") ? string.Empty : row.Field<string>("operinit");
         entity.transdt = row.Field<DateTime?>("transdt");
         entity.transtm = row.IsNull("transtm") ? string.Empty : row.Field<string>("transtm");
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
         entity.rowID = row.Field<byte[]>("sasglRowID").ToStringEncoded();
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromSasglBase(ref DataRow row, SasglBase entity)
      {
         row.SetField("cono", entity.cono);
         row.SetField("state", entity.state);
         row.SetField("taxauth", entity.taxauth);
         row.SetField("descrip", entity.descrip);
         row.SetField("gldivno1", entity.gldivno1);
         row.SetField("gldivno2", entity.gldivno2);
         row.SetField("gldivno3", entity.gldivno3);
         row.SetField("gldivno4", entity.gldivno4);
         row.SetField("gldeptno1", entity.gldeptno1);
         row.SetField("gldeptno2", entity.gldeptno2);
         row.SetField("gldeptno3", entity.gldeptno3);
         row.SetField("gldeptno4", entity.gldeptno4);
         row.SetField("glacctno1", entity.glacctno1);
         row.SetField("glacctno2", entity.glacctno2);
         row.SetField("glacctno3", entity.glacctno3);
         row.SetField("glacctno4", entity.glacctno4);
         row.SetField("glsubno1", entity.glsubno1);
         row.SetField("glsubno2", entity.glsubno2);
         row.SetField("glsubno3", entity.glsubno3);
         row.SetField("glsubno4", entity.glsubno4);
         row.SetField("saletaxn1", entity.saletaxn1);
         row.SetField("saletaxn2", entity.saletaxn2);
         row.SetField("saletaxn3", entity.saletaxn3);
         row.SetField("saletaxn4", entity.saletaxn4);
         row.SetField("saletaxn5", entity.saletaxn5);
         row.SetField("saletaxc1", entity.saletaxc1);
         row.SetField("saletaxc2", entity.saletaxc2);
         row.SetField("saletaxc3", entity.saletaxc3);
         row.SetField("saletaxc4", entity.saletaxc4);
         row.SetField("saletaxc5", entity.saletaxc5);
         row.SetField("saletaxo1", entity.saletaxo1);
         row.SetField("saletaxo2", entity.saletaxo2);
         row.SetField("saletaxo3", entity.saletaxo3);
         row.SetField("saletaxo4", entity.saletaxo4);
         row.SetField("saletaxo5", entity.saletaxo5);
         row.SetField("operinit", entity.operinit);
         row.SetField("transdt", entity.transdt);
         row.SetField("transtm", entity.transtm);
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
         row.SetField("sasglRowID", entity.rowID.ToByteArray());
      }   
      
      /// <summary>
      /// Build a minimal row from a class (key fields only)
      /// </summary>
      public static void BuildMinimalRow(ref DataRow row, SasglBase entity)
      {
         row.SetField("cono", entity.cono);
         row.SetField("state", entity.state);
         row.SetField("taxauth", entity.taxauth);
         row.SetField("sasglRowID", entity.rowID.ToByteArray());
      }   
   }
}
#pragma warning restore 1591
	