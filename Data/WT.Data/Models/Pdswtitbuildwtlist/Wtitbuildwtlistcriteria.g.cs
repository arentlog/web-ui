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

namespace Infor.Sxe.WT.Data.Models.Pdswtitbuildwtlist
{
   [ModelName("Infor.Sxe.WT.Data.Models.Pdswtitbuildwtlist.Wtitbuildwtlistcriteria")]
   public partial class Wtitbuildwtlistcriteria : ModelBase
   {
      [StringValidationAttribute]
      public string shipfmwhse { get; set; }
      [StringValidationAttribute]
      public string shiptowhse { get; set; }
      public int cono { get; set; }
      public int cono2 { get; set; }
      public DateTime? fromduedt { get; set; }
      public DateTime? fromenterdt { get; set; }
      public DateTime? fromorderdt { get; set; }
      public DateTime? fromshippeddt { get; set; }
      public DateTime? fromreceiptdt { get; set; }
      public DateTime? fromreqshipdt { get; set; }
      public DateTime? toduedt { get; set; }
      public DateTime? toenterdt { get; set; }
      public DateTime? toorderdt { get; set; }
      public DateTime? toshippeddt { get; set; }
      public DateTime? toreceiptdt { get; set; }
      public DateTime? toreqshipdt { get; set; }
      [StringValidationAttribute]
      public string transtypelist { get; set; }
      [StringValidationAttribute]
      public string stagelist { get; set; }
      [StringValidationAttribute]
      public string botype { get; set; }
      public int irecordcountlimit { get; set; }
      [StringValidationAttribute]
      public string customparam { get; set; }
      public int wtno { get; set; }
      public int wtsuf { get; set; }
      [StringValidationAttribute]
      public string reasoncode { get; set; }
      [StringValidationAttribute]
      public string lspinvregstatus { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Wtitbuildwtlistcriteria BuildWtitbuildwtlistcriteriaFromRow(DataRow row)
      {
         Wtitbuildwtlistcriteria entity = new Wtitbuildwtlistcriteria();
         entity.shipfmwhse = row.IsNull("shipfmwhse") ? string.Empty : row.Field<string>("shipfmwhse");
         entity.shiptowhse = row.IsNull("shiptowhse") ? string.Empty : row.Field<string>("shiptowhse");
         entity.cono = row.IsNull("cono") ? 0 : row.Field<int>("cono");
         entity.cono2 = row.IsNull("cono2") ? 0 : row.Field<int>("cono2");
         entity.fromduedt = row.Field<DateTime?>("fromduedt");
         entity.fromenterdt = row.Field<DateTime?>("fromenterdt");
         entity.fromorderdt = row.Field<DateTime?>("fromorderdt");
         entity.fromshippeddt = row.Field<DateTime?>("fromshippeddt");
         entity.fromreceiptdt = row.Field<DateTime?>("fromreceiptdt");
         entity.fromreqshipdt = row.Field<DateTime?>("fromreqshipdt");
         entity.toduedt = row.Field<DateTime?>("toduedt");
         entity.toenterdt = row.Field<DateTime?>("toenterdt");
         entity.toorderdt = row.Field<DateTime?>("toorderdt");
         entity.toshippeddt = row.Field<DateTime?>("toshippeddt");
         entity.toreceiptdt = row.Field<DateTime?>("toreceiptdt");
         entity.toreqshipdt = row.Field<DateTime?>("toreqshipdt");
         entity.transtypelist = row.IsNull("transtypelist") ? string.Empty : row.Field<string>("transtypelist");
         entity.stagelist = row.IsNull("stagelist") ? string.Empty : row.Field<string>("stagelist");
         entity.botype = row.IsNull("botype") ? string.Empty : row.Field<string>("botype");
         entity.irecordcountlimit = row.IsNull("irecordcountlimit") ? 0 : row.Field<int>("irecordcountlimit");
         entity.customparam = row.IsNull("customparam") ? string.Empty : row.Field<string>("customparam");
         entity.wtno = row.IsNull("wtno") ? 0 : row.Field<int>("wtno");
         entity.wtsuf = row.IsNull("wtsuf") ? 0 : row.Field<int>("wtsuf");
         entity.reasoncode = row.IsNull("reasoncode") ? string.Empty : row.Field<string>("reasoncode");
         entity.lspinvregstatus = row.IsNull("lspinvregstatus") ? string.Empty : row.Field<string>("lspinvregstatus");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromWtitbuildwtlistcriteria(ref DataRow row, Wtitbuildwtlistcriteria entity)
      {
         row.SetField("shipfmwhse", entity.shipfmwhse);
         row.SetField("shiptowhse", entity.shiptowhse);
         row.SetField("cono", entity.cono);
         row.SetField("cono2", entity.cono2);
         row.SetField("fromduedt", entity.fromduedt);
         row.SetField("fromenterdt", entity.fromenterdt);
         row.SetField("fromorderdt", entity.fromorderdt);
         row.SetField("fromshippeddt", entity.fromshippeddt);
         row.SetField("fromreceiptdt", entity.fromreceiptdt);
         row.SetField("fromreqshipdt", entity.fromreqshipdt);
         row.SetField("toduedt", entity.toduedt);
         row.SetField("toenterdt", entity.toenterdt);
         row.SetField("toorderdt", entity.toorderdt);
         row.SetField("toshippeddt", entity.toshippeddt);
         row.SetField("toreceiptdt", entity.toreceiptdt);
         row.SetField("toreqshipdt", entity.toreqshipdt);
         row.SetField("transtypelist", entity.transtypelist);
         row.SetField("stagelist", entity.stagelist);
         row.SetField("botype", entity.botype);
         row.SetField("irecordcountlimit", entity.irecordcountlimit);
         row.SetField("customparam", entity.customparam);
         row.SetField("wtno", entity.wtno);
         row.SetField("wtsuf", entity.wtsuf);
         row.SetField("reasoncode", entity.reasoncode);
         row.SetField("lspinvregstatus", entity.lspinvregstatus);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591