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
       
namespace Infor.Sxe.Common.Data.Models.SHARED
{
   /// <summary>
   /// Tempory file for reports
   /// </summary>
   
   public partial class ViewerBase: ModelBase
   {

      /// <summary>
      /// Company #
      /// </summary>
      public int cono { get; set; }

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
      /// c2
      /// </summary>
      [StringValidationAttribute]
      public string c2 { get; set; }

      /// <summary>
      /// c4
      /// </summary>
      [StringValidationAttribute]
      public string c4 { get; set; }

      /// <summary>
      /// i7
      /// </summary>
      public int i7 { get; set; }

      /// <summary>
      /// i2
      /// </summary>
      public int i2 { get; set; }

      /// <summary>
      /// c1
      /// </summary>
      [StringValidationAttribute]
      public string c1 { get; set; }

      /// <summary>
      /// dt
      /// </summary>
      public DateTime? dt { get; set; }

      /// <summary>
      /// dt-2
      /// </summary>
      public DateTime? dt2 { get; set; }

      /// <summary>
      /// c13
      /// </summary>
      [StringValidationAttribute]
      public string c13 { get; set; }

      /// <summary>
      /// c15
      /// </summary>
      [StringValidationAttribute]
      public string c15 { get; set; }

      /// <summary>
      /// c4-2
      /// </summary>
      [StringValidationAttribute]
      public string c42 { get; set; }

      /// <summary>
      /// c2-2
      /// </summary>
      [StringValidationAttribute]
      public string c22 { get; set; }

      /// <summary>
      /// de9d2s
      /// </summary>
      public decimal de9d2s { get; set; }

      /// <summary>
      /// c2-3
      /// </summary>
      [StringValidationAttribute]
      public string c23 { get; set; }

      /// <summary>
      /// de9d2s-2
      /// </summary>
      public decimal de9d2s2 { get; set; }

      /// <summary>
      /// c6
      /// </summary>
      [StringValidationAttribute]
      public string c6 { get; set; }

      /// <summary>
      /// l
      /// </summary>
      public bool l { get; set; }

      /// <summary>
      /// c24
      /// </summary>
      [StringValidationAttribute]
      public string c24 { get; set; }

      /// <summary>
      /// c24-2
      /// </summary>
      [StringValidationAttribute]
      public string c242 { get; set; }

      /// <summary>
      /// d12d0
      /// </summary>
      public decimal de12d0 { get; set; }

      /// <summary>
      /// de12d5
      /// </summary>
      public decimal de12d5 { get; set; }

      /// <summary>
      /// i4
      /// </summary>
      public int i4 { get; set; }

      /// <summary>
      /// i3
      /// </summary>
      public int i3 { get; set; }

      /// <summary>
      /// de2d3
      /// </summary>
      public decimal de2d3 { get; set; }

      /// <summary>
      /// c24-3
      /// </summary>
      [StringValidationAttribute]
      public string c243 { get; set; }

      /// <summary>
      /// c20
      /// </summary>
      [StringValidationAttribute]
      public string c20 { get; set; }

      /// <summary>
      /// rid
      /// </summary>
      public long rid { get; set; }

      /// <summary>
      /// c20-2
      /// </summary>
      [StringValidationAttribute]
      public string c202 { get; set; }

      /// <summary>
      /// dt-3
      /// </summary>
      public DateTime? dt3 { get; set; }

      /// <summary>
      /// dt-4
      /// </summary>
      public DateTime? dt4 { get; set; }

      /// <summary>
      /// de9d2s-3
      /// </summary>
      public decimal de9d2s3 { get; set; }

      /// <summary>
      /// de2d3-2
      /// </summary>
      public decimal de2d32 { get; set; }

      /// <summary>
      /// de2d3-3
      /// </summary>
      public decimal de2d33 { get; set; }

      /// <summary>
      /// de2d3-4
      /// </summary>
      public decimal de2d34 { get; set; }

      /// <summary>
      /// de2d3-5
      /// </summary>
      public decimal de2d35 { get; set; }

      /// <summary>
      /// de12d5-2
      /// </summary>
      public decimal de12d52 { get; set; }

      /// <summary>
      /// de12d5-3
      /// </summary>
      public decimal de12d53 { get; set; }

      /// <summary>
      /// de12d5-4
      /// </summary>
      public decimal de12d54 { get; set; }

      /// <summary>
      /// Fax Flag
      /// </summary>
      public bool faxfl { get; set; }

      /// <summary>
      /// Output Type
      /// </summary>
      [StringValidationAttribute]
      public string outputty { get; set; }

      /// <summary>
      /// c12
      /// </summary>
      [StringValidationAttribute]
      public string c12 { get; set; }

      /// <summary>
      /// i8
      /// </summary>
      public int i8 { get; set; }
      
      /// <summary>
      /// Row ID
      /// </summary>
      [Key,StringValidationAttribute]
      public string rowID { get; set; }



      /// <summary>
      /// Build a class from a database row
      /// </summary>
      public static T BuildViewerBaseFromRow<T>(DataRow row) where T:ViewerBase, new()
      {
         T entity = new T();
         entity.cono = row.IsNull("cono") ? 0 : row.Field<int>("cono");
         entity.oper2 = row.IsNull("oper2") ? string.Empty : row.Field<string>("oper2");
         entity.reportnm = row.IsNull("reportnm") ? string.Empty : row.Field<string>("reportnm");
         entity.c2 = row.IsNull("c2") ? string.Empty : row.Field<string>("c2");
         entity.c4 = row.IsNull("c4") ? string.Empty : row.Field<string>("c4");
         entity.i7 = row.IsNull("i7") ? 0 : row.Field<int>("i7");
         entity.i2 = row.IsNull("i2") ? 0 : row.Field<int>("i2");
         entity.c1 = row.IsNull("c1") ? string.Empty : row.Field<string>("c1");
         entity.dt = row.Field<DateTime?>("dt");
         entity.dt2 = row.Field<DateTime?>("dt-2");
         entity.c13 = row.IsNull("c13") ? string.Empty : row.Field<string>("c13");
         entity.c15 = row.IsNull("c15") ? string.Empty : row.Field<string>("c15");
         entity.c42 = row.IsNull("c4-2") ? string.Empty : row.Field<string>("c4-2");
         entity.c22 = row.IsNull("c2-2") ? string.Empty : row.Field<string>("c2-2");
         entity.de9d2s = row.IsNull("de9d2s") ? decimal.Zero : row.Field<decimal>("de9d2s");
         entity.c23 = row.IsNull("c2-3") ? string.Empty : row.Field<string>("c2-3");
         entity.de9d2s2 = row.IsNull("de9d2s-2") ? decimal.Zero : row.Field<decimal>("de9d2s-2");
         entity.c6 = row.IsNull("c6") ? string.Empty : row.Field<string>("c6");
         entity.l = row.Field<bool>("l");
         entity.c24 = row.IsNull("c24") ? string.Empty : row.Field<string>("c24");
         entity.c242 = row.IsNull("c24-2") ? string.Empty : row.Field<string>("c24-2");
         entity.de12d0 = row.IsNull("de12d0") ? decimal.Zero : row.Field<decimal>("de12d0");
         entity.de12d5 = row.IsNull("de12d5") ? decimal.Zero : row.Field<decimal>("de12d5");
         entity.i4 = row.IsNull("i4") ? 0 : row.Field<int>("i4");
         entity.i3 = row.IsNull("i3") ? 0 : row.Field<int>("i3");
         entity.de2d3 = row.IsNull("de2d3") ? decimal.Zero : row.Field<decimal>("de2d3");
         entity.c243 = row.IsNull("c24-3") ? string.Empty : row.Field<string>("c24-3");
         entity.c20 = row.IsNull("c20") ? string.Empty : row.Field<string>("c20");
         entity.rid = row.IsNull("rid") ? 0 : row.Field<long>("rid");
         entity.c202 = row.IsNull("c20-2") ? string.Empty : row.Field<string>("c20-2");
         entity.dt3 = row.Field<DateTime?>("dt-3");
         entity.dt4 = row.Field<DateTime?>("dt-4");
         entity.de9d2s3 = row.IsNull("de9d2s-3") ? decimal.Zero : row.Field<decimal>("de9d2s-3");
         entity.de2d32 = row.IsNull("de2d3-2") ? decimal.Zero : row.Field<decimal>("de2d3-2");
         entity.de2d33 = row.IsNull("de2d3-3") ? decimal.Zero : row.Field<decimal>("de2d3-3");
         entity.de2d34 = row.IsNull("de2d3-4") ? decimal.Zero : row.Field<decimal>("de2d3-4");
         entity.de2d35 = row.IsNull("de2d3-5") ? decimal.Zero : row.Field<decimal>("de2d3-5");
         entity.de12d52 = row.IsNull("de12d5-2") ? decimal.Zero : row.Field<decimal>("de12d5-2");
         entity.de12d53 = row.IsNull("de12d5-3") ? decimal.Zero : row.Field<decimal>("de12d5-3");
         entity.de12d54 = row.IsNull("de12d5-4") ? decimal.Zero : row.Field<decimal>("de12d5-4");
         entity.faxfl = row.Field<bool>("faxfl");
         entity.outputty = row.IsNull("outputty") ? string.Empty : row.Field<string>("outputty");
         entity.c12 = row.IsNull("c12") ? string.Empty : row.Field<string>("c12");
         entity.i8 = row.IsNull("i8") ? 0 : row.Field<int>("i8");
         entity.rowID = row.Field<byte[]>("viewerRowID").ToStringEncoded();
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromViewerBase(ref DataRow row, ViewerBase entity)
      {
         row.SetField("cono", entity.cono);
         row.SetField("oper2", entity.oper2);
         row.SetField("reportnm", entity.reportnm);
         row.SetField("c2", entity.c2);
         row.SetField("c4", entity.c4);
         row.SetField("i7", entity.i7);
         row.SetField("i2", entity.i2);
         row.SetField("c1", entity.c1);
         row.SetField("dt", entity.dt);
         row.SetField("dt-2", entity.dt2);
         row.SetField("c13", entity.c13);
         row.SetField("c15", entity.c15);
         row.SetField("c4-2", entity.c42);
         row.SetField("c2-2", entity.c22);
         row.SetField("de9d2s", entity.de9d2s);
         row.SetField("c2-3", entity.c23);
         row.SetField("de9d2s-2", entity.de9d2s2);
         row.SetField("c6", entity.c6);
         row.SetField("l", entity.l);
         row.SetField("c24", entity.c24);
         row.SetField("c24-2", entity.c242);
         row.SetField("de12d0", entity.de12d0);
         row.SetField("de12d5", entity.de12d5);
         row.SetField("i4", entity.i4);
         row.SetField("i3", entity.i3);
         row.SetField("de2d3", entity.de2d3);
         row.SetField("c24-3", entity.c243);
         row.SetField("c20", entity.c20);
         row.SetField("rid", entity.rid);
         row.SetField("c20-2", entity.c202);
         row.SetField("dt-3", entity.dt3);
         row.SetField("dt-4", entity.dt4);
         row.SetField("de9d2s-3", entity.de9d2s3);
         row.SetField("de2d3-2", entity.de2d32);
         row.SetField("de2d3-3", entity.de2d33);
         row.SetField("de2d3-4", entity.de2d34);
         row.SetField("de2d3-5", entity.de2d35);
         row.SetField("de12d5-2", entity.de12d52);
         row.SetField("de12d5-3", entity.de12d53);
         row.SetField("de12d5-4", entity.de12d54);
         row.SetField("faxfl", entity.faxfl);
         row.SetField("outputty", entity.outputty);
         row.SetField("c12", entity.c12);
         row.SetField("i8", entity.i8);
         row.SetField("viewerRowID", entity.rowID.ToByteArray());
      }   
      
      /// <summary>
      /// Build a minimal row from a class (key fields only)
      /// </summary>
      public static void BuildMinimalRow(ref DataRow row, ViewerBase entity)
      {
         row.SetField("viewerRowID", entity.rowID.ToByteArray());
      }   
   }
}
#pragma warning restore 1591
	