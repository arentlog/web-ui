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

namespace Infor.Sxe.IC.Data.Models.Pdsicsrcostmatrix
{
   [ModelName("Infor.Sxe.IC.Data.Models.Pdsicsrcostmatrix.Icsrcostmatrix")]
   public partial class Icsrcostmatrix : ModelBase
   {
      public int usagelevel { get; set; }
      public decimal usagerate { get; set; }
      public decimal costge1 { get; set; }
      public int newop1 { get; set; }
      public int newlp1 { get; set; }
      public int newqty1 { get; set; }
      public decimal costge2 { get; set; }
      public int newop2 { get; set; }
      public int newlp2 { get; set; }
      public int newqty2 { get; set; }
      public decimal costge3 { get; set; }
      public int newop3 { get; set; }
      public int newlp3 { get; set; }
      public int newqty3 { get; set; }
      public decimal costge4 { get; set; }
      public int newop4 { get; set; }
      public int newlp4 { get; set; }
      public int newqty4 { get; set; }
      public decimal costge5 { get; set; }
      public int newop5 { get; set; }
      public int newlp5 { get; set; }
      public int newqty5 { get; set; }
      public decimal costge6 { get; set; }
      public int newop6 { get; set; }
      public int newlp6 { get; set; }
      public int newqty6 { get; set; }
      public decimal costge7 { get; set; }
      public int newop7 { get; set; }
      public int newlp7 { get; set; }
      public int newqty7 { get; set; }
      public decimal costge8 { get; set; }
      public int newop8 { get; set; }
      public int newlp8 { get; set; }
      public int newqty8 { get; set; }
      public decimal costge9 { get; set; }
      public int newop9 { get; set; }
      public int newlp9 { get; set; }
      public int newqty9 { get; set; }
      public decimal costge10 { get; set; }
      public int newop10 { get; set; }
      public int newlp10 { get; set; }
      public int newqty10 { get; set; }
      [StringValidationAttribute]
      public string icsrurowid { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Icsrcostmatrix BuildIcsrcostmatrixFromRow(DataRow row)
      {
         Icsrcostmatrix entity = new Icsrcostmatrix();
         entity.usagelevel = row.IsNull("usagelevel") ? 0 : row.Field<int>("usagelevel");
         entity.usagerate = row.IsNull("usagerate") ? decimal.Zero : row.Field<decimal>("usagerate");
         entity.costge1 = row.IsNull("costge1") ? decimal.Zero : row.Field<decimal>("costge1");
         entity.newop1 = row.IsNull("newop1") ? 0 : row.Field<int>("newop1");
         entity.newlp1 = row.IsNull("newlp1") ? 0 : row.Field<int>("newlp1");
         entity.newqty1 = row.IsNull("newqty1") ? 0 : row.Field<int>("newqty1");
         entity.costge2 = row.IsNull("costge2") ? decimal.Zero : row.Field<decimal>("costge2");
         entity.newop2 = row.IsNull("newop2") ? 0 : row.Field<int>("newop2");
         entity.newlp2 = row.IsNull("newlp2") ? 0 : row.Field<int>("newlp2");
         entity.newqty2 = row.IsNull("newqty2") ? 0 : row.Field<int>("newqty2");
         entity.costge3 = row.IsNull("costge3") ? decimal.Zero : row.Field<decimal>("costge3");
         entity.newop3 = row.IsNull("newop3") ? 0 : row.Field<int>("newop3");
         entity.newlp3 = row.IsNull("newlp3") ? 0 : row.Field<int>("newlp3");
         entity.newqty3 = row.IsNull("newqty3") ? 0 : row.Field<int>("newqty3");
         entity.costge4 = row.IsNull("costge4") ? decimal.Zero : row.Field<decimal>("costge4");
         entity.newop4 = row.IsNull("newop4") ? 0 : row.Field<int>("newop4");
         entity.newlp4 = row.IsNull("newlp4") ? 0 : row.Field<int>("newlp4");
         entity.newqty4 = row.IsNull("newqty4") ? 0 : row.Field<int>("newqty4");
         entity.costge5 = row.IsNull("costge5") ? decimal.Zero : row.Field<decimal>("costge5");
         entity.newop5 = row.IsNull("newop5") ? 0 : row.Field<int>("newop5");
         entity.newlp5 = row.IsNull("newlp5") ? 0 : row.Field<int>("newlp5");
         entity.newqty5 = row.IsNull("newqty5") ? 0 : row.Field<int>("newqty5");
         entity.costge6 = row.IsNull("costge6") ? decimal.Zero : row.Field<decimal>("costge6");
         entity.newop6 = row.IsNull("newop6") ? 0 : row.Field<int>("newop6");
         entity.newlp6 = row.IsNull("newlp6") ? 0 : row.Field<int>("newlp6");
         entity.newqty6 = row.IsNull("newqty6") ? 0 : row.Field<int>("newqty6");
         entity.costge7 = row.IsNull("costge7") ? decimal.Zero : row.Field<decimal>("costge7");
         entity.newop7 = row.IsNull("newop7") ? 0 : row.Field<int>("newop7");
         entity.newlp7 = row.IsNull("newlp7") ? 0 : row.Field<int>("newlp7");
         entity.newqty7 = row.IsNull("newqty7") ? 0 : row.Field<int>("newqty7");
         entity.costge8 = row.IsNull("costge8") ? decimal.Zero : row.Field<decimal>("costge8");
         entity.newop8 = row.IsNull("newop8") ? 0 : row.Field<int>("newop8");
         entity.newlp8 = row.IsNull("newlp8") ? 0 : row.Field<int>("newlp8");
         entity.newqty8 = row.IsNull("newqty8") ? 0 : row.Field<int>("newqty8");
         entity.costge9 = row.IsNull("costge9") ? decimal.Zero : row.Field<decimal>("costge9");
         entity.newop9 = row.IsNull("newop9") ? 0 : row.Field<int>("newop9");
         entity.newlp9 = row.IsNull("newlp9") ? 0 : row.Field<int>("newlp9");
         entity.newqty9 = row.IsNull("newqty9") ? 0 : row.Field<int>("newqty9");
         entity.costge10 = row.IsNull("costge10") ? decimal.Zero : row.Field<decimal>("costge10");
         entity.newop10 = row.IsNull("newop10") ? 0 : row.Field<int>("newop10");
         entity.newlp10 = row.IsNull("newlp10") ? 0 : row.Field<int>("newlp10");
         entity.newqty10 = row.IsNull("newqty10") ? 0 : row.Field<int>("newqty10");
         entity.icsrurowid = row.Field<byte[]>("icsrurowid").ToStringEncoded();
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromIcsrcostmatrix(ref DataRow row, Icsrcostmatrix entity)
      {
         row.SetField("usagelevel", entity.usagelevel);
         row.SetField("usagerate", entity.usagerate);
         row.SetField("costge1", entity.costge1);
         row.SetField("newop1", entity.newop1);
         row.SetField("newlp1", entity.newlp1);
         row.SetField("newqty1", entity.newqty1);
         row.SetField("costge2", entity.costge2);
         row.SetField("newop2", entity.newop2);
         row.SetField("newlp2", entity.newlp2);
         row.SetField("newqty2", entity.newqty2);
         row.SetField("costge3", entity.costge3);
         row.SetField("newop3", entity.newop3);
         row.SetField("newlp3", entity.newlp3);
         row.SetField("newqty3", entity.newqty3);
         row.SetField("costge4", entity.costge4);
         row.SetField("newop4", entity.newop4);
         row.SetField("newlp4", entity.newlp4);
         row.SetField("newqty4", entity.newqty4);
         row.SetField("costge5", entity.costge5);
         row.SetField("newop5", entity.newop5);
         row.SetField("newlp5", entity.newlp5);
         row.SetField("newqty5", entity.newqty5);
         row.SetField("costge6", entity.costge6);
         row.SetField("newop6", entity.newop6);
         row.SetField("newlp6", entity.newlp6);
         row.SetField("newqty6", entity.newqty6);
         row.SetField("costge7", entity.costge7);
         row.SetField("newop7", entity.newop7);
         row.SetField("newlp7", entity.newlp7);
         row.SetField("newqty7", entity.newqty7);
         row.SetField("costge8", entity.costge8);
         row.SetField("newop8", entity.newop8);
         row.SetField("newlp8", entity.newlp8);
         row.SetField("newqty8", entity.newqty8);
         row.SetField("costge9", entity.costge9);
         row.SetField("newop9", entity.newop9);
         row.SetField("newlp9", entity.newlp9);
         row.SetField("newqty9", entity.newqty9);
         row.SetField("costge10", entity.costge10);
         row.SetField("newop10", entity.newop10);
         row.SetField("newlp10", entity.newlp10);
         row.SetField("newqty10", entity.newqty10);
         row.SetField("icsrurowid", entity.icsrurowid.ToByteArray());
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
