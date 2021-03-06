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

namespace Infor.Sxe.WT.Data.Models.Pdswtprint
{
   [ModelName("Infor.Sxe.WT.Data.Models.Pdswtprint.Wtprintcriteria")]
   public partial class Wtprintcriteria : ModelBase
   {
      public int wtno { get; set; }
      public int wtsuf { get; set; }
      public bool pickprintfl { get; set; }
      [StringValidationAttribute]
      public string printernm { get; set; }
      [StringValidationAttribute]
      public string name { get; set; }
      [StringValidationAttribute]
      public string faxto1 { get; set; }
      [StringValidationAttribute]
      public string faxto2 { get; set; }
      [StringValidationAttribute]
      public string faxphoneno { get; set; }
      [StringValidationAttribute]
      public string faxfrom { get; set; }
      [StringValidationAttribute]
      public string faxcom { get; set; }
      public bool faxpriority { get; set; }
      public bool wide { get; set; }
      public bool filefl { get; set; }
      public bool printoptfl { get; set; }
      [StringValidationAttribute]
      public string queue { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Wtprintcriteria BuildWtprintcriteriaFromRow(DataRow row)
      {
         Wtprintcriteria entity = new Wtprintcriteria();
         entity.wtno = row.IsNull("wtno") ? 0 : row.Field<int>("wtno");
         entity.wtsuf = row.IsNull("wtsuf") ? 0 : row.Field<int>("wtsuf");
         entity.pickprintfl = row.Field<bool>("pickprintfl");
         entity.printernm = row.IsNull("printernm") ? string.Empty : row.Field<string>("printernm");
         entity.name = row.IsNull("name") ? string.Empty : row.Field<string>("name");
         entity.faxto1 = row.IsNull("faxto1") ? string.Empty : row.Field<string>("faxto1");
         entity.faxto2 = row.IsNull("faxto2") ? string.Empty : row.Field<string>("faxto2");
         entity.faxphoneno = row.IsNull("faxphoneno") ? string.Empty : row.Field<string>("faxphoneno");
         entity.faxfrom = row.IsNull("faxfrom") ? string.Empty : row.Field<string>("faxfrom");
         entity.faxcom = row.IsNull("faxcom") ? string.Empty : row.Field<string>("faxcom");
         entity.faxpriority = row.Field<bool>("faxpriority");
         entity.wide = row.Field<bool>("wide");
         entity.filefl = row.Field<bool>("filefl");
         entity.printoptfl = row.Field<bool>("printoptfl");
         entity.queue = row.IsNull("queue") ? string.Empty : row.Field<string>("queue");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromWtprintcriteria(ref DataRow row, Wtprintcriteria entity)
      {
         row.SetField("wtno", entity.wtno);
         row.SetField("wtsuf", entity.wtsuf);
         row.SetField("pickprintfl", entity.pickprintfl);
         row.SetField("printernm", entity.printernm);
         row.SetField("name", entity.name);
         row.SetField("faxto1", entity.faxto1);
         row.SetField("faxto2", entity.faxto2);
         row.SetField("faxphoneno", entity.faxphoneno);
         row.SetField("faxfrom", entity.faxfrom);
         row.SetField("faxcom", entity.faxcom);
         row.SetField("faxpriority", entity.faxpriority);
         row.SetField("wide", entity.wide);
         row.SetField("filefl", entity.filefl);
         row.SetField("printoptfl", entity.printoptfl);
         row.SetField("queue", entity.queue);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
