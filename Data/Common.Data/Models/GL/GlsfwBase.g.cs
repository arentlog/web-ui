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
       
namespace Infor.Sxe.Common.Data.Models.GL
{
   /// <summary>
   /// GLSF Work File
   /// </summary>
   
   public partial class GlsfwBase: ModelBase, IUserFields
   {

      /// <summary>
      /// Operator
      /// </summary>
      [StringValidationAttribute]
      public string oper2 { get; set; }

      /// <summary>
      /// Store As
      /// </summary>
      [StringValidationAttribute]
      public string reportnm { get; set; }

      /// <summary>
      /// Row #
      /// </summary>
      public int rowno { get; set; }

      /// <summary>
      /// Company #
      /// </summary>
      public int cono { get; set; }

      /// <summary>
      /// Div#
      /// </summary>
      public int gldivno { get; set; }

      /// <summary>
      /// Dept#
      /// </summary>
      public int gldeptno { get; set; }

      /// <summary>
      /// Acct#
      /// </summary>
      public int glacctno { get; set; }

      /// <summary>
      /// Sub#
      /// </summary>
      public int glsubno { get; set; }

      /// <summary>
      /// Year
      /// </summary>
      public int yr { get; set; }

      /// <summary>
      /// Cono Running
      /// </summary>
      public int runcono { get; set; }

      /// <summary>
      /// Sort Order
      /// </summary>
      [StringValidationAttribute]
      public string sortorder { get; set; }

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
      [Key,StringValidationAttribute]
      public string rowID { get; set; }



      /// <summary>
      /// Build a class from a database row
      /// </summary>
      public static T BuildGlsfwBaseFromRow<T>(DataRow row) where T:GlsfwBase, new()
      {
         T entity = new T();
         entity.oper2 = row.IsNull("oper2") ? string.Empty : row.Field<string>("oper2");
         entity.reportnm = row.IsNull("reportnm") ? string.Empty : row.Field<string>("reportnm");
         entity.rowno = row.IsNull("rowno") ? 0 : row.Field<int>("rowno");
         entity.cono = row.IsNull("cono") ? 0 : row.Field<int>("cono");
         entity.gldivno = row.IsNull("gldivno") ? 0 : row.Field<int>("gldivno");
         entity.gldeptno = row.IsNull("gldeptno") ? 0 : row.Field<int>("gldeptno");
         entity.glacctno = row.IsNull("glacctno") ? 0 : row.Field<int>("glacctno");
         entity.glsubno = row.IsNull("glsubno") ? 0 : row.Field<int>("glsubno");
         entity.yr = row.IsNull("yr") ? 0 : row.Field<int>("yr");
         entity.runcono = row.IsNull("runcono") ? 0 : row.Field<int>("runcono");
         entity.sortorder = row.IsNull("sortorder") ? string.Empty : row.Field<string>("sortorder");
         entity.user1 = row.IsNull("user1") ? string.Empty : row.Field<string>("user1");
         entity.user2 = row.IsNull("user2") ? string.Empty : row.Field<string>("user2");
         entity.user3 = row.IsNull("user3") ? string.Empty : row.Field<string>("user3");
         entity.user4 = row.IsNull("user4") ? string.Empty : row.Field<string>("user4");
         entity.user5 = row.IsNull("user5") ? string.Empty : row.Field<string>("user5");
         entity.user6 = row.Field<decimal?>("user6");
         entity.user7 = row.Field<decimal?>("user7");
         entity.user8 = row.Field<DateTime?>("user8");
         entity.user9 = row.Field<DateTime?>("user9");
         entity.rowID = row.Field<byte[]>("glsfwRowID").ToStringEncoded();
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromGlsfwBase(ref DataRow row, GlsfwBase entity)
      {
         row.SetField("oper2", entity.oper2);
         row.SetField("reportnm", entity.reportnm);
         row.SetField("rowno", entity.rowno);
         row.SetField("cono", entity.cono);
         row.SetField("gldivno", entity.gldivno);
         row.SetField("gldeptno", entity.gldeptno);
         row.SetField("glacctno", entity.glacctno);
         row.SetField("glsubno", entity.glsubno);
         row.SetField("yr", entity.yr);
         row.SetField("runcono", entity.runcono);
         row.SetField("sortorder", entity.sortorder);
         row.SetField("user1", entity.user1);
         row.SetField("user2", entity.user2);
         row.SetField("user3", entity.user3);
         row.SetField("user4", entity.user4);
         row.SetField("user5", entity.user5);
         row.SetField("user6", entity.user6);
         row.SetField("user7", entity.user7);
         row.SetField("user8", entity.user8);
         row.SetField("user9", entity.user9);
         row.SetField("glsfwRowID", entity.rowID.ToByteArray());
      }   
      
      /// <summary>
      /// Build a minimal row from a class (key fields only)
      /// </summary>
      public static void BuildMinimalRow(ref DataRow row, GlsfwBase entity)
      {
         row.SetField("glsfwRowID", entity.rowID.ToByteArray());
      }   
   }
}
#pragma warning restore 1591
	