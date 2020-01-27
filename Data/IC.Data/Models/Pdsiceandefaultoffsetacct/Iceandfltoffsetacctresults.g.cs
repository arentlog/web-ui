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

namespace Infor.Sxe.IC.Data.Models.Pdsiceandefaultoffsetacct
{
   [ModelName("Infor.Sxe.IC.Data.Models.Pdsiceandefaultoffsetacct.Iceandfltoffsetacctresults")]
   public partial class Iceandfltoffsetacctresults : ModelBase
   {
      public int seqno { get; set; }
      [StringValidationAttribute]
      public string glaccount { get; set; }
      [StringValidationAttribute]
      public string lookupnm { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Iceandfltoffsetacctresults BuildIceandfltoffsetacctresultsFromRow(DataRow row)
      {
         Iceandfltoffsetacctresults entity = new Iceandfltoffsetacctresults();
         entity.seqno = row.IsNull("seqno") ? 0 : row.Field<int>("seqno");
         entity.glaccount = row.IsNull("glaccount") ? string.Empty : row.Field<string>("glaccount");
         entity.lookupnm = row.IsNull("lookupnm") ? string.Empty : row.Field<string>("lookupnm");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromIceandfltoffsetacctresults(ref DataRow row, Iceandfltoffsetacctresults entity)
      {
         row.SetField("seqno", entity.seqno);
         row.SetField("glaccount", entity.glaccount);
         row.SetField("lookupnm", entity.lookupnm);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
