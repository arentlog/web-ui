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

namespace Infor.Sxe.AR.Data.Models.Pdsarsc
{
   [ModelName("Infor.Sxe.AR.Data.Models.Pdsarsc.ArscCustomerbalance")]
   public partial class ArscCustomerbalance : ModelBase
   {
      [Key,Order]
      public int cono { get; set; }
      [Key,Order]
      public decimal custno { get; set; }
      [StringValidationAttribute]
      public string pbperiod1text { get; set; }
      public decimal pbperiod1bal { get; set; }
      [StringValidationAttribute]
      public string pbperiod2text { get; set; }
      public decimal pbperiod2bal { get; set; }
      [StringValidationAttribute]
      public string pbperiod3text { get; set; }
      public decimal pbperiod3bal { get; set; }
      [StringValidationAttribute]
      public string pbperiod4text { get; set; }
      public decimal pbperiod4bal { get; set; }
      [StringValidationAttribute]
      public string pbperiod5text { get; set; }
      public decimal pbperiod5bal { get; set; }
      [StringValidationAttribute]
      public string pbfutbaltext { get; set; }
      public decimal pbfutbal { get; set; }
      [StringValidationAttribute]
      public string pbper1tottext { get; set; }
      public decimal pbperiod1tot { get; set; }
      [StringValidationAttribute]
      public string pbper2tottext { get; set; }
      public decimal pbperiod2tot { get; set; }
      [StringValidationAttribute]
      public string pbper3tottext { get; set; }
      public decimal pbperiod3tot { get; set; }
      [StringValidationAttribute]
      public string pbper4tottext { get; set; }
      public decimal pbperiod4tot { get; set; }
      [StringValidationAttribute]
      public string pbper5tottext { get; set; }
      public decimal pbperiod5tot { get; set; }
      [StringValidationAttribute]
      public string arscRowID { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static ArscCustomerbalance BuildArscCustomerbalanceFromRow(DataRow row)
      {
         ArscCustomerbalance entity = new ArscCustomerbalance();
         entity.cono = row.IsNull("cono") ? 0 : row.Field<int>("cono");
         entity.custno = row.IsNull("custno") ? decimal.Zero : row.Field<decimal>("custno");
         entity.pbperiod1text = row.IsNull("pbperiod1text") ? string.Empty : row.Field<string>("pbperiod1text");
         entity.pbperiod1bal = row.IsNull("pbperiod1bal") ? decimal.Zero : row.Field<decimal>("pbperiod1bal");
         entity.pbperiod2text = row.IsNull("pbperiod2text") ? string.Empty : row.Field<string>("pbperiod2text");
         entity.pbperiod2bal = row.IsNull("pbperiod2bal") ? decimal.Zero : row.Field<decimal>("pbperiod2bal");
         entity.pbperiod3text = row.IsNull("pbperiod3text") ? string.Empty : row.Field<string>("pbperiod3text");
         entity.pbperiod3bal = row.IsNull("pbperiod3bal") ? decimal.Zero : row.Field<decimal>("pbperiod3bal");
         entity.pbperiod4text = row.IsNull("pbperiod4text") ? string.Empty : row.Field<string>("pbperiod4text");
         entity.pbperiod4bal = row.IsNull("pbperiod4bal") ? decimal.Zero : row.Field<decimal>("pbperiod4bal");
         entity.pbperiod5text = row.IsNull("pbperiod5text") ? string.Empty : row.Field<string>("pbperiod5text");
         entity.pbperiod5bal = row.IsNull("pbperiod5bal") ? decimal.Zero : row.Field<decimal>("pbperiod5bal");
         entity.pbfutbaltext = row.IsNull("pbfutbaltext") ? string.Empty : row.Field<string>("pbfutbaltext");
         entity.pbfutbal = row.IsNull("pbfutbal") ? decimal.Zero : row.Field<decimal>("pbfutbal");
         entity.pbper1tottext = row.IsNull("pbper1tottext") ? string.Empty : row.Field<string>("pbper1tottext");
         entity.pbperiod1tot = row.IsNull("pbperiod1tot") ? decimal.Zero : row.Field<decimal>("pbperiod1tot");
         entity.pbper2tottext = row.IsNull("pbper2tottext") ? string.Empty : row.Field<string>("pbper2tottext");
         entity.pbperiod2tot = row.IsNull("pbperiod2tot") ? decimal.Zero : row.Field<decimal>("pbperiod2tot");
         entity.pbper3tottext = row.IsNull("pbper3tottext") ? string.Empty : row.Field<string>("pbper3tottext");
         entity.pbperiod3tot = row.IsNull("pbperiod3tot") ? decimal.Zero : row.Field<decimal>("pbperiod3tot");
         entity.pbper4tottext = row.IsNull("pbper4tottext") ? string.Empty : row.Field<string>("pbper4tottext");
         entity.pbperiod4tot = row.IsNull("pbperiod4tot") ? decimal.Zero : row.Field<decimal>("pbperiod4tot");
         entity.pbper5tottext = row.IsNull("pbper5tottext") ? string.Empty : row.Field<string>("pbper5tottext");
         entity.pbperiod5tot = row.IsNull("pbperiod5tot") ? decimal.Zero : row.Field<decimal>("pbperiod5tot");
         entity.arscRowID = row.Field<byte[]>("arscRowID").ToStringEncoded();
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromArscCustomerbalance(ref DataRow row, ArscCustomerbalance entity)
      {
         row.SetField("cono", entity.cono);
         row.SetField("custno", entity.custno);
         row.SetField("pbperiod1text", entity.pbperiod1text);
         row.SetField("pbperiod1bal", entity.pbperiod1bal);
         row.SetField("pbperiod2text", entity.pbperiod2text);
         row.SetField("pbperiod2bal", entity.pbperiod2bal);
         row.SetField("pbperiod3text", entity.pbperiod3text);
         row.SetField("pbperiod3bal", entity.pbperiod3bal);
         row.SetField("pbperiod4text", entity.pbperiod4text);
         row.SetField("pbperiod4bal", entity.pbperiod4bal);
         row.SetField("pbperiod5text", entity.pbperiod5text);
         row.SetField("pbperiod5bal", entity.pbperiod5bal);
         row.SetField("pbfutbaltext", entity.pbfutbaltext);
         row.SetField("pbfutbal", entity.pbfutbal);
         row.SetField("pbper1tottext", entity.pbper1tottext);
         row.SetField("pbperiod1tot", entity.pbperiod1tot);
         row.SetField("pbper2tottext", entity.pbper2tottext);
         row.SetField("pbperiod2tot", entity.pbperiod2tot);
         row.SetField("pbper3tottext", entity.pbper3tottext);
         row.SetField("pbperiod3tot", entity.pbperiod3tot);
         row.SetField("pbper4tottext", entity.pbper4tottext);
         row.SetField("pbperiod4tot", entity.pbperiod4tot);
         row.SetField("pbper5tottext", entity.pbper5tottext);
         row.SetField("pbperiod5tot", entity.pbperiod5tot);
         row.SetField("arscRowID", entity.arscRowID.ToByteArray());
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591