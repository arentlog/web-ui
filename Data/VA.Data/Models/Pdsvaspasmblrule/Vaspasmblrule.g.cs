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

namespace Infor.Sxe.VA.Data.Models.Pdsvaspasmblrule
{
   [ModelName("Infor.Sxe.VA.Data.Models.Pdsvaspasmblrule.Vaspasmblrule")]
   public partial class Vaspasmblrule : ModelBase
   {
      [StringValidationAttribute]
      public string shipprod { get; set; }
      [StringValidationAttribute]
      public string whse { get; set; }
      public int verno { get; set; }
      public int segment { get; set; }
      public int sequence { get; set; }
      [StringValidationAttribute]
      public string rule1 { get; set; }
      [StringValidationAttribute]
      public string rule2 { get; set; }
      [StringValidationAttribute]
      public string rule3 { get; set; }
      [StringValidationAttribute]
      public string rule4 { get; set; }
      [StringValidationAttribute]
      public string ruleequality1 { get; set; }
      [StringValidationAttribute]
      public string ruleequality2 { get; set; }
      [StringValidationAttribute]
      public string ruleequality3 { get; set; }
      [StringValidationAttribute]
      public string ruleequality4 { get; set; }
      [StringValidationAttribute]
      public string ruleerrormsg { get; set; }
      public int rulesegment1 { get; set; }
      public int rulesegment2 { get; set; }
      public int rulesegment3 { get; set; }
      public int rulesegment4 { get; set; }
      public bool ruleunion1 { get; set; }
      public bool ruleunion2 { get; set; }
      public bool ruleunion3 { get; set; }
      public bool ruleunion4 { get; set; }
      [StringValidationAttribute]
      public string rulevaliddata { get; set; }
      public bool newrulefl { get; set; }
      [StringValidationAttribute]
      public string rowid { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Vaspasmblrule BuildVaspasmblruleFromRow(DataRow row)
      {
         Vaspasmblrule entity = new Vaspasmblrule();
         entity.shipprod = row.IsNull("shipprod") ? string.Empty : row.Field<string>("shipprod");
         entity.whse = row.IsNull("whse") ? string.Empty : row.Field<string>("whse");
         entity.verno = row.IsNull("verno") ? 0 : row.Field<int>("verno");
         entity.segment = row.IsNull("segment") ? 0 : row.Field<int>("segment");
         entity.sequence = row.IsNull("sequence") ? 0 : row.Field<int>("sequence");
         entity.rule1 = row.IsNull("rule1") ? string.Empty : row.Field<string>("rule1");
         entity.rule2 = row.IsNull("rule2") ? string.Empty : row.Field<string>("rule2");
         entity.rule3 = row.IsNull("rule3") ? string.Empty : row.Field<string>("rule3");
         entity.rule4 = row.IsNull("rule4") ? string.Empty : row.Field<string>("rule4");
         entity.ruleequality1 = row.IsNull("ruleequality1") ? string.Empty : row.Field<string>("ruleequality1");
         entity.ruleequality2 = row.IsNull("ruleequality2") ? string.Empty : row.Field<string>("ruleequality2");
         entity.ruleequality3 = row.IsNull("ruleequality3") ? string.Empty : row.Field<string>("ruleequality3");
         entity.ruleequality4 = row.IsNull("ruleequality4") ? string.Empty : row.Field<string>("ruleequality4");
         entity.ruleerrormsg = row.IsNull("ruleerrormsg") ? string.Empty : row.Field<string>("ruleerrormsg");
         entity.rulesegment1 = row.IsNull("rulesegment1") ? 0 : row.Field<int>("rulesegment1");
         entity.rulesegment2 = row.IsNull("rulesegment2") ? 0 : row.Field<int>("rulesegment2");
         entity.rulesegment3 = row.IsNull("rulesegment3") ? 0 : row.Field<int>("rulesegment3");
         entity.rulesegment4 = row.IsNull("rulesegment4") ? 0 : row.Field<int>("rulesegment4");
         entity.ruleunion1 = row.Field<bool>("ruleunion1");
         entity.ruleunion2 = row.Field<bool>("ruleunion2");
         entity.ruleunion3 = row.Field<bool>("ruleunion3");
         entity.ruleunion4 = row.Field<bool>("ruleunion4");
         entity.rulevaliddata = row.IsNull("rulevaliddata") ? string.Empty : row.Field<string>("rulevaliddata");
         entity.newrulefl = row.Field<bool>("newrulefl");
         entity.rowid = row.Field<byte[]>("rowid").ToStringEncoded();
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromVaspasmblrule(ref DataRow row, Vaspasmblrule entity)
      {
         row.SetField("shipprod", entity.shipprod);
         row.SetField("whse", entity.whse);
         row.SetField("verno", entity.verno);
         row.SetField("segment", entity.segment);
         row.SetField("sequence", entity.sequence);
         row.SetField("rule1", entity.rule1);
         row.SetField("rule2", entity.rule2);
         row.SetField("rule3", entity.rule3);
         row.SetField("rule4", entity.rule4);
         row.SetField("ruleequality1", entity.ruleequality1);
         row.SetField("ruleequality2", entity.ruleequality2);
         row.SetField("ruleequality3", entity.ruleequality3);
         row.SetField("ruleequality4", entity.ruleequality4);
         row.SetField("ruleerrormsg", entity.ruleerrormsg);
         row.SetField("rulesegment1", entity.rulesegment1);
         row.SetField("rulesegment2", entity.rulesegment2);
         row.SetField("rulesegment3", entity.rulesegment3);
         row.SetField("rulesegment4", entity.rulesegment4);
         row.SetField("ruleunion1", entity.ruleunion1);
         row.SetField("ruleunion2", entity.ruleunion2);
         row.SetField("ruleunion3", entity.ruleunion3);
         row.SetField("ruleunion4", entity.ruleunion4);
         row.SetField("rulevaliddata", entity.rulevaliddata);
         row.SetField("newrulefl", entity.newrulefl);
         row.SetField("rowid", entity.rowid.ToByteArray());
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591