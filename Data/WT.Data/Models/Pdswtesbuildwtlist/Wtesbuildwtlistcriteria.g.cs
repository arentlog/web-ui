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

namespace Infor.Sxe.WT.Data.Models.Pdswtesbuildwtlist
{
   [ModelName("Infor.Sxe.WT.Data.Models.Pdswtesbuildwtlist.Wtesbuildwtlistcriteria")]
   public partial class Wtesbuildwtlistcriteria : ModelBase
   {
      public int wtno { get; set; }
      public int wtsuf { get; set; }
      [StringValidationAttribute]
      public string shipfmwhse { get; set; }
      [StringValidationAttribute]
      public string shiptowhse { get; set; }
      public int tocono { get; set; }
      public DateTime? fromduedt { get; set; }
      public DateTime? toduedt { get; set; }
      [StringValidationAttribute]
      public string stagelist { get; set; }
      [StringValidationAttribute]
      public string dotype { get; set; }
      [StringValidationAttribute]
      public string wttype { get; set; }
      [StringValidationAttribute]
      public string product { get; set; }
      public int jrnlno { get; set; }
      public int irecordcountlimit { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Wtesbuildwtlistcriteria BuildWtesbuildwtlistcriteriaFromRow(DataRow row)
      {
         Wtesbuildwtlistcriteria entity = new Wtesbuildwtlistcriteria();
         entity.wtno = row.IsNull("wtno") ? 0 : row.Field<int>("wtno");
         entity.wtsuf = row.IsNull("wtsuf") ? 0 : row.Field<int>("wtsuf");
         entity.shipfmwhse = row.IsNull("shipfmwhse") ? string.Empty : row.Field<string>("shipfmwhse");
         entity.shiptowhse = row.IsNull("shiptowhse") ? string.Empty : row.Field<string>("shiptowhse");
         entity.tocono = row.IsNull("tocono") ? 0 : row.Field<int>("tocono");
         entity.fromduedt = row.Field<DateTime?>("fromduedt");
         entity.toduedt = row.Field<DateTime?>("toduedt");
         entity.stagelist = row.IsNull("stagelist") ? string.Empty : row.Field<string>("stagelist");
         entity.dotype = row.IsNull("dotype") ? string.Empty : row.Field<string>("dotype");
         entity.wttype = row.IsNull("wttype") ? string.Empty : row.Field<string>("wttype");
         entity.product = row.IsNull("product") ? string.Empty : row.Field<string>("product");
         entity.jrnlno = row.IsNull("jrnlno") ? 0 : row.Field<int>("jrnlno");
         entity.irecordcountlimit = row.IsNull("irecordcountlimit") ? 0 : row.Field<int>("irecordcountlimit");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromWtesbuildwtlistcriteria(ref DataRow row, Wtesbuildwtlistcriteria entity)
      {
         row.SetField("wtno", entity.wtno);
         row.SetField("wtsuf", entity.wtsuf);
         row.SetField("shipfmwhse", entity.shipfmwhse);
         row.SetField("shiptowhse", entity.shiptowhse);
         row.SetField("tocono", entity.tocono);
         row.SetField("fromduedt", entity.fromduedt);
         row.SetField("toduedt", entity.toduedt);
         row.SetField("stagelist", entity.stagelist);
         row.SetField("dotype", entity.dotype);
         row.SetField("wttype", entity.wttype);
         row.SetField("product", entity.product);
         row.SetField("jrnlno", entity.jrnlno);
         row.SetField("irecordcountlimit", entity.irecordcountlimit);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
