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
       
namespace Infor.Sxe.Common.Data.Models.CM
{
   /// <summary>
   /// R&D Qualification Answers
   /// </summary>
   
   public partial class CmsaBase: ModelBase, IUserFields
   {

      /// <summary>
      /// Prospect #
      /// </summary>
      public decimal prosno { get; set; }

      /// <summary>
      /// Campaign
      /// </summary>
      [StringValidationAttribute]
      public string campaigncd { get; set; }

      /// <summary>
      /// Answer
      /// </summary>
      [StringValidationAttribute]
      public string answer1 { get; set; }
      [StringValidationAttribute]
      public string answer2 { get; set; }
      [StringValidationAttribute]
      public string answer3 { get; set; }
      [StringValidationAttribute]
      public string answer4 { get; set; }
      [StringValidationAttribute]
      public string answer5 { get; set; }
      [StringValidationAttribute]
      public string answer6 { get; set; }

      /// <summary>
      /// Page #
      /// </summary>
      public int pageno { get; set; }

      /// <summary>
      /// Qualified
      /// </summary>
      public bool qualifiedfl { get; set; }

      /// <summary>
      /// Last Change By
      /// </summary>
      [StringValidationAttribute]
      public string operinit { get; set; }

      /// <summary>
      /// Last Change Time
      /// </summary>
      [StringValidationAttribute]
      public string transtm { get; set; }

      /// <summary>
      /// Last Change Date
      /// </summary>
      public DateTime? transdt { get; set; }

      /// <summary>
      /// Rank
      /// </summary>
      public int rank1 { get; set; }
      public int rank2 { get; set; }
      public int rank3 { get; set; }
      public int rank4 { get; set; }
      public int rank5 { get; set; }
      public int rank6 { get; set; }

      /// <summary>
      /// Total Rank
      /// </summary>
      public int totrank { get; set; }

      /// <summary>
      /// sequenceno
      /// </summary>
      public int sequenceno { get; set; }

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
      [Key,StringValidationAttribute]
      public string rowID { get; set; }



      /// <summary>
      /// Build a class from a database row
      /// </summary>
      public static T BuildCmsaBaseFromRow<T>(DataRow row) where T:CmsaBase, new()
      {
         T entity = new T();
         entity.prosno = row.IsNull("prosno") ? decimal.Zero : row.Field<decimal>("prosno");
         entity.campaigncd = row.IsNull("campaigncd") ? string.Empty : row.Field<string>("campaigncd");
         entity.answer1 = row.IsNull("answer1") ? string.Empty : row.Field<string>("answer1");
         entity.answer2 = row.IsNull("answer2") ? string.Empty : row.Field<string>("answer2");
         entity.answer3 = row.IsNull("answer3") ? string.Empty : row.Field<string>("answer3");
         entity.answer4 = row.IsNull("answer4") ? string.Empty : row.Field<string>("answer4");
         entity.answer5 = row.IsNull("answer5") ? string.Empty : row.Field<string>("answer5");
         entity.answer6 = row.IsNull("answer6") ? string.Empty : row.Field<string>("answer6");
         entity.pageno = row.IsNull("pageno") ? 0 : row.Field<int>("pageno");
         entity.qualifiedfl = row.Field<bool>("qualifiedfl");
         entity.operinit = row.IsNull("operinit") ? string.Empty : row.Field<string>("operinit");
         entity.transtm = row.IsNull("transtm") ? string.Empty : row.Field<string>("transtm");
         entity.transdt = row.Field<DateTime?>("transdt");
         entity.rank1 = row.IsNull("rank1") ? 0 : row.Field<int>("rank1");
         entity.rank2 = row.IsNull("rank2") ? 0 : row.Field<int>("rank2");
         entity.rank3 = row.IsNull("rank3") ? 0 : row.Field<int>("rank3");
         entity.rank4 = row.IsNull("rank4") ? 0 : row.Field<int>("rank4");
         entity.rank5 = row.IsNull("rank5") ? 0 : row.Field<int>("rank5");
         entity.rank6 = row.IsNull("rank6") ? 0 : row.Field<int>("rank6");
         entity.totrank = row.IsNull("totrank") ? 0 : row.Field<int>("totrank");
         entity.sequenceno = row.IsNull("sequenceno") ? 0 : row.Field<int>("sequenceno");
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
         entity.rowID = row.Field<byte[]>("cmsaRowID").ToStringEncoded();
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromCmsaBase(ref DataRow row, CmsaBase entity)
      {
         row.SetField("prosno", entity.prosno);
         row.SetField("campaigncd", entity.campaigncd);
         row.SetField("answer1", entity.answer1);
         row.SetField("answer2", entity.answer2);
         row.SetField("answer3", entity.answer3);
         row.SetField("answer4", entity.answer4);
         row.SetField("answer5", entity.answer5);
         row.SetField("answer6", entity.answer6);
         row.SetField("pageno", entity.pageno);
         row.SetField("qualifiedfl", entity.qualifiedfl);
         row.SetField("operinit", entity.operinit);
         row.SetField("transtm", entity.transtm);
         row.SetField("transdt", entity.transdt);
         row.SetField("rank1", entity.rank1);
         row.SetField("rank2", entity.rank2);
         row.SetField("rank3", entity.rank3);
         row.SetField("rank4", entity.rank4);
         row.SetField("rank5", entity.rank5);
         row.SetField("rank6", entity.rank6);
         row.SetField("totrank", entity.totrank);
         row.SetField("sequenceno", entity.sequenceno);
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
         row.SetField("cmsaRowID", entity.rowID.ToByteArray());
      }   
      
      /// <summary>
      /// Build a minimal row from a class (key fields only)
      /// </summary>
      public static void BuildMinimalRow(ref DataRow row, CmsaBase entity)
      {
         row.SetField("cmsaRowID", entity.rowID.ToByteArray());
      }   
   }
}
#pragma warning restore 1591
	