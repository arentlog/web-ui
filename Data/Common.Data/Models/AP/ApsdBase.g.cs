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
       
namespace Infor.Sxe.Common.Data.Models.AP
{
   /// <summary>
   /// Accounts Payable Setup defaults
   /// </summary>
   
   public partial class ApsdBase: ModelBase, IUserFields
   {

      /// <summary>
      /// Company #
      /// </summary>
      [Key,Order]
      public int cono { get; set; }

      /// <summary>
      /// Source Row Pointer
      /// </summary>
      [Key,Order,StringValidationAttribute]
      public string srcrowpointer { get; set; }

      /// <summary>
      /// Ship Via
      /// </summary>
      [Key,Order,StringValidationAttribute]
      public string shipviaty { get; set; }

      /// <summary>
      /// Minimum Lead Days
      /// </summary>
      public int minleaddays { get; set; }

      /// <summary>
      /// Delivery Handling Code
      /// </summary>
      [StringValidationAttribute]
      public string deliverycd { get; set; }

      /// <summary>
      /// Ship Service Code
      /// </summary>
      [StringValidationAttribute]
      public string shipsrvcd { get; set; }

      /// <summary>
      /// Expensed Addon #
      /// </summary>
      public int addonno1 { get; set; }
      public int addonno2 { get; set; }

      /// <summary>
      /// Expensed Addon Amt
      /// </summary>
      public decimal addonamt1 { get; set; }
      public decimal addonamt2 { get; set; }

      /// <summary>
      /// Expensed Addon Type
      /// </summary>
      public bool addontype1 { get; set; }
      public bool addontype2 { get; set; }

      /// <summary>
      /// Capitalized Addon #
      /// </summary>
      public int capaddonno1 { get; set; }
      public int capaddonno2 { get; set; }
      public int capaddonno3 { get; set; }
      public int capaddonno4 { get; set; }

      /// <summary>
      /// Capitalized Addon Amt
      /// </summary>
      public decimal capaddonamt1 { get; set; }
      public decimal capaddonamt2 { get; set; }
      public decimal capaddonamt3 { get; set; }
      public decimal capaddonamt4 { get; set; }

      /// <summary>
      /// Capitalized Addon Type
      /// </summary>
      public bool capaddontype1 { get; set; }
      public bool capaddontype2 { get; set; }
      public bool capaddontype3 { get; set; }
      public bool capaddontype4 { get; set; }

      /// <summary>
      /// Direct Expensed Addon #
      /// </summary>
      public int diraddonno1 { get; set; }
      public int diraddonno2 { get; set; }

      /// <summary>
      /// Direct Expensed Addon Amt
      /// </summary>
      public decimal diraddonamt1 { get; set; }
      public decimal diraddonamt2 { get; set; }

      /// <summary>
      /// Direct Expensed Addon Type
      /// </summary>
      public bool diraddontype1 { get; set; }
      public bool diraddontype2 { get; set; }

      /// <summary>
      /// Direct Capitalized Addon #
      /// </summary>
      public int dircapaddonno1 { get; set; }
      public int dircapaddonno2 { get; set; }
      public int dircapaddonno3 { get; set; }
      public int dircapaddonno4 { get; set; }

      /// <summary>
      /// Direct Capitalized Addon Amt
      /// </summary>
      public decimal dircapaddonamt1 { get; set; }
      public decimal dircapaddonamt2 { get; set; }
      public decimal dircapaddonamt3 { get; set; }
      public decimal dircapaddonamt4 { get; set; }

      /// <summary>
      /// Direct Capitalized Addon Type
      /// </summary>
      public bool dircapaddontype1 { get; set; }
      public bool dircapaddontype2 { get; set; }
      public bool dircapaddontype3 { get; set; }
      public bool dircapaddontype4 { get; set; }

      /// <summary>
      /// WO Disc%
      /// </summary>
      public decimal wodiscpct { get; set; }

      /// <summary>
      /// Order Disc Type
      /// </summary>
      public bool wodisctype { get; set; }

      /// <summary>
      /// Use APSD WO disc
      /// </summary>
      public bool usewodisc { get; set; }

      /// <summary>
      /// Use APSD Addons
      /// </summary>
      public bool useaddons { get; set; }

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
      /// Last Change By
      /// </summary>
      [StringValidationAttribute]
      public string operinit { get; set; }

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
      /// Direct PO Addons
      /// </summary>
      public bool dirpoaddonfl { get; set; }
      
      /// <summary>
      /// Row ID
      /// </summary>
      [StringValidationAttribute]
      public string rowID { get; set; }



      /// <summary>
      /// Build a class from a database row
      /// </summary>
      public static T BuildApsdBaseFromRow<T>(DataRow row) where T:ApsdBase, new()
      {
         T entity = new T();
         entity.cono = row.IsNull("cono") ? 0 : row.Field<int>("cono");
         entity.srcrowpointer = row.IsNull("srcrowpointer") ? string.Empty : row.Field<string>("srcrowpointer");
         entity.shipviaty = row.IsNull("shipviaty") ? string.Empty : row.Field<string>("shipviaty");
         entity.minleaddays = row.IsNull("minleaddays") ? 0 : row.Field<int>("minleaddays");
         entity.deliverycd = row.IsNull("deliverycd") ? string.Empty : row.Field<string>("deliverycd");
         entity.shipsrvcd = row.IsNull("shipsrvcd") ? string.Empty : row.Field<string>("shipsrvcd");
         entity.addonno1 = row.IsNull("addonno1") ? 0 : row.Field<int>("addonno1");
         entity.addonno2 = row.IsNull("addonno2") ? 0 : row.Field<int>("addonno2");
         entity.addonamt1 = row.IsNull("addonamt1") ? decimal.Zero : row.Field<decimal>("addonamt1");
         entity.addonamt2 = row.IsNull("addonamt2") ? decimal.Zero : row.Field<decimal>("addonamt2");
         entity.addontype1 = row.Field<bool>("addontype1");
         entity.addontype2 = row.Field<bool>("addontype2");
         entity.capaddonno1 = row.IsNull("capaddonno1") ? 0 : row.Field<int>("capaddonno1");
         entity.capaddonno2 = row.IsNull("capaddonno2") ? 0 : row.Field<int>("capaddonno2");
         entity.capaddonno3 = row.IsNull("capaddonno3") ? 0 : row.Field<int>("capaddonno3");
         entity.capaddonno4 = row.IsNull("capaddonno4") ? 0 : row.Field<int>("capaddonno4");
         entity.capaddonamt1 = row.IsNull("capaddonamt1") ? decimal.Zero : row.Field<decimal>("capaddonamt1");
         entity.capaddonamt2 = row.IsNull("capaddonamt2") ? decimal.Zero : row.Field<decimal>("capaddonamt2");
         entity.capaddonamt3 = row.IsNull("capaddonamt3") ? decimal.Zero : row.Field<decimal>("capaddonamt3");
         entity.capaddonamt4 = row.IsNull("capaddonamt4") ? decimal.Zero : row.Field<decimal>("capaddonamt4");
         entity.capaddontype1 = row.Field<bool>("capaddontype1");
         entity.capaddontype2 = row.Field<bool>("capaddontype2");
         entity.capaddontype3 = row.Field<bool>("capaddontype3");
         entity.capaddontype4 = row.Field<bool>("capaddontype4");
         entity.diraddonno1 = row.IsNull("diraddonno1") ? 0 : row.Field<int>("diraddonno1");
         entity.diraddonno2 = row.IsNull("diraddonno2") ? 0 : row.Field<int>("diraddonno2");
         entity.diraddonamt1 = row.IsNull("diraddonamt1") ? decimal.Zero : row.Field<decimal>("diraddonamt1");
         entity.diraddonamt2 = row.IsNull("diraddonamt2") ? decimal.Zero : row.Field<decimal>("diraddonamt2");
         entity.diraddontype1 = row.Field<bool>("diraddontype1");
         entity.diraddontype2 = row.Field<bool>("diraddontype2");
         entity.dircapaddonno1 = row.IsNull("dircapaddonno1") ? 0 : row.Field<int>("dircapaddonno1");
         entity.dircapaddonno2 = row.IsNull("dircapaddonno2") ? 0 : row.Field<int>("dircapaddonno2");
         entity.dircapaddonno3 = row.IsNull("dircapaddonno3") ? 0 : row.Field<int>("dircapaddonno3");
         entity.dircapaddonno4 = row.IsNull("dircapaddonno4") ? 0 : row.Field<int>("dircapaddonno4");
         entity.dircapaddonamt1 = row.IsNull("dircapaddonamt1") ? decimal.Zero : row.Field<decimal>("dircapaddonamt1");
         entity.dircapaddonamt2 = row.IsNull("dircapaddonamt2") ? decimal.Zero : row.Field<decimal>("dircapaddonamt2");
         entity.dircapaddonamt3 = row.IsNull("dircapaddonamt3") ? decimal.Zero : row.Field<decimal>("dircapaddonamt3");
         entity.dircapaddonamt4 = row.IsNull("dircapaddonamt4") ? decimal.Zero : row.Field<decimal>("dircapaddonamt4");
         entity.dircapaddontype1 = row.Field<bool>("dircapaddontype1");
         entity.dircapaddontype2 = row.Field<bool>("dircapaddontype2");
         entity.dircapaddontype3 = row.Field<bool>("dircapaddontype3");
         entity.dircapaddontype4 = row.Field<bool>("dircapaddontype4");
         entity.wodiscpct = row.IsNull("wodiscpct") ? decimal.Zero : row.Field<decimal>("wodiscpct");
         entity.wodisctype = row.Field<bool>("wodisctype");
         entity.usewodisc = row.Field<bool>("usewodisc");
         entity.useaddons = row.Field<bool>("useaddons");
         entity.transdt = row.Field<DateTime?>("transdt");
         entity.transtm = row.IsNull("transtm") ? string.Empty : row.Field<string>("transtm");
         entity.transproc = row.IsNull("transproc") ? string.Empty : row.Field<string>("transproc");
         entity.operinit = row.IsNull("operinit") ? string.Empty : row.Field<string>("operinit");
         entity.user1 = row.IsNull("user1") ? string.Empty : row.Field<string>("user1");
         entity.user2 = row.IsNull("user2") ? string.Empty : row.Field<string>("user2");
         entity.user3 = row.IsNull("user3") ? string.Empty : row.Field<string>("user3");
         entity.user4 = row.IsNull("user4") ? string.Empty : row.Field<string>("user4");
         entity.user5 = row.IsNull("user5") ? string.Empty : row.Field<string>("user5");
         entity.user6 = row.Field<decimal?>("user6");
         entity.user7 = row.Field<decimal?>("user7");
         entity.user8 = row.Field<DateTime?>("user8");
         entity.user9 = row.Field<DateTime?>("user9");
         entity.dirpoaddonfl = row.Field<bool>("dirpoaddonfl");
         entity.rowID = row.Field<byte[]>("apsdRowID").ToStringEncoded();
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromApsdBase(ref DataRow row, ApsdBase entity)
      {
         row.SetField("cono", entity.cono);
         row.SetField("srcrowpointer", entity.srcrowpointer);
         row.SetField("shipviaty", entity.shipviaty);
         row.SetField("minleaddays", entity.minleaddays);
         row.SetField("deliverycd", entity.deliverycd);
         row.SetField("shipsrvcd", entity.shipsrvcd);
         row.SetField("addonno1", entity.addonno1);
         row.SetField("addonno2", entity.addonno2);
         row.SetField("addonamt1", entity.addonamt1);
         row.SetField("addonamt2", entity.addonamt2);
         row.SetField("addontype1", entity.addontype1);
         row.SetField("addontype2", entity.addontype2);
         row.SetField("capaddonno1", entity.capaddonno1);
         row.SetField("capaddonno2", entity.capaddonno2);
         row.SetField("capaddonno3", entity.capaddonno3);
         row.SetField("capaddonno4", entity.capaddonno4);
         row.SetField("capaddonamt1", entity.capaddonamt1);
         row.SetField("capaddonamt2", entity.capaddonamt2);
         row.SetField("capaddonamt3", entity.capaddonamt3);
         row.SetField("capaddonamt4", entity.capaddonamt4);
         row.SetField("capaddontype1", entity.capaddontype1);
         row.SetField("capaddontype2", entity.capaddontype2);
         row.SetField("capaddontype3", entity.capaddontype3);
         row.SetField("capaddontype4", entity.capaddontype4);
         row.SetField("diraddonno1", entity.diraddonno1);
         row.SetField("diraddonno2", entity.diraddonno2);
         row.SetField("diraddonamt1", entity.diraddonamt1);
         row.SetField("diraddonamt2", entity.diraddonamt2);
         row.SetField("diraddontype1", entity.diraddontype1);
         row.SetField("diraddontype2", entity.diraddontype2);
         row.SetField("dircapaddonno1", entity.dircapaddonno1);
         row.SetField("dircapaddonno2", entity.dircapaddonno2);
         row.SetField("dircapaddonno3", entity.dircapaddonno3);
         row.SetField("dircapaddonno4", entity.dircapaddonno4);
         row.SetField("dircapaddonamt1", entity.dircapaddonamt1);
         row.SetField("dircapaddonamt2", entity.dircapaddonamt2);
         row.SetField("dircapaddonamt3", entity.dircapaddonamt3);
         row.SetField("dircapaddonamt4", entity.dircapaddonamt4);
         row.SetField("dircapaddontype1", entity.dircapaddontype1);
         row.SetField("dircapaddontype2", entity.dircapaddontype2);
         row.SetField("dircapaddontype3", entity.dircapaddontype3);
         row.SetField("dircapaddontype4", entity.dircapaddontype4);
         row.SetField("wodiscpct", entity.wodiscpct);
         row.SetField("wodisctype", entity.wodisctype);
         row.SetField("usewodisc", entity.usewodisc);
         row.SetField("useaddons", entity.useaddons);
         row.SetField("transdt", entity.transdt);
         row.SetField("transtm", entity.transtm);
         row.SetField("transproc", entity.transproc);
         row.SetField("operinit", entity.operinit);
         row.SetField("user1", entity.user1);
         row.SetField("user2", entity.user2);
         row.SetField("user3", entity.user3);
         row.SetField("user4", entity.user4);
         row.SetField("user5", entity.user5);
         row.SetField("user6", entity.user6);
         row.SetField("user7", entity.user7);
         row.SetField("user8", entity.user8);
         row.SetField("user9", entity.user9);
         row.SetField("dirpoaddonfl", entity.dirpoaddonfl);
         row.SetField("apsdRowID", entity.rowID.ToByteArray());
      }   
      
      /// <summary>
      /// Build a minimal row from a class (key fields only)
      /// </summary>
      public static void BuildMinimalRow(ref DataRow row, ApsdBase entity)
      {
         row.SetField("cono", entity.cono);
         row.SetField("srcrowpointer", entity.srcrowpointer);
         row.SetField("shipviaty", entity.shipviaty);
         row.SetField("apsdRowID", entity.rowID.ToByteArray());
      }   
   }
}
#pragma warning restore 1591
	