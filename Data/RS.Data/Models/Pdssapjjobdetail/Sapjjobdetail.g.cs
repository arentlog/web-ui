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

namespace Infor.Sxe.RS.Data.Models.Pdssapjjobdetail
{
   [ModelName("Infor.Sxe.RS.Data.Models.Pdssapjjobdetail.Sapjjobdetail")]
   public partial class Sapjjobdetail : ModelBase
   {
      public int printerno { get; set; }
      [StringValidationAttribute]
      public string printernm { get; set; }
      [StringValidationAttribute]
      public string jobnm { get; set; }
      public bool filefl { get; set; }
      [StringValidationAttribute]
      public string faxphoneno { get; set; }
      [StringValidationAttribute]
      public string faxto1 { get; set; }
      [StringValidationAttribute]
      public string faxto2 { get; set; }
      [StringValidationAttribute]
      public string faxfrom { get; set; }
      public bool faxpriority { get; set; }
      [StringValidationAttribute]
      public string faxcom { get; set; }
      [StringValidationAttribute]
      public string faxtag1 { get; set; }
      [StringValidationAttribute]
      public string faxtag2 { get; set; }
      [StringValidationAttribute]
      public string emailaddr { get; set; }
      [StringValidationAttribute]
      public string emailcom { get; set; }
      public bool faxhidden { get; set; }
      public bool emailhidden { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Sapjjobdetail BuildSapjjobdetailFromRow(DataRow row)
      {
         Sapjjobdetail entity = new Sapjjobdetail();
         entity.printerno = row.IsNull("printerno") ? 0 : row.Field<int>("printerno");
         entity.printernm = row.IsNull("printernm") ? string.Empty : row.Field<string>("printernm");
         entity.jobnm = row.IsNull("jobnm") ? string.Empty : row.Field<string>("jobnm");
         entity.filefl = row.Field<bool>("filefl");
         entity.faxphoneno = row.IsNull("faxphoneno") ? string.Empty : row.Field<string>("faxphoneno");
         entity.faxto1 = row.IsNull("faxto1") ? string.Empty : row.Field<string>("faxto1");
         entity.faxto2 = row.IsNull("faxto2") ? string.Empty : row.Field<string>("faxto2");
         entity.faxfrom = row.IsNull("faxfrom") ? string.Empty : row.Field<string>("faxfrom");
         entity.faxpriority = row.Field<bool>("faxpriority");
         entity.faxcom = row.IsNull("faxcom") ? string.Empty : row.Field<string>("faxcom");
         entity.faxtag1 = row.IsNull("faxtag1") ? string.Empty : row.Field<string>("faxtag1");
         entity.faxtag2 = row.IsNull("faxtag2") ? string.Empty : row.Field<string>("faxtag2");
         entity.emailaddr = row.IsNull("emailaddr") ? string.Empty : row.Field<string>("emailaddr");
         entity.emailcom = row.IsNull("emailcom") ? string.Empty : row.Field<string>("emailcom");
         entity.faxhidden = row.Field<bool>("faxhidden");
         entity.emailhidden = row.Field<bool>("emailhidden");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromSapjjobdetail(ref DataRow row, Sapjjobdetail entity)
      {
         row.SetField("printerno", entity.printerno);
         row.SetField("printernm", entity.printernm);
         row.SetField("jobnm", entity.jobnm);
         row.SetField("filefl", entity.filefl);
         row.SetField("faxphoneno", entity.faxphoneno);
         row.SetField("faxto1", entity.faxto1);
         row.SetField("faxto2", entity.faxto2);
         row.SetField("faxfrom", entity.faxfrom);
         row.SetField("faxpriority", entity.faxpriority);
         row.SetField("faxcom", entity.faxcom);
         row.SetField("faxtag1", entity.faxtag1);
         row.SetField("faxtag2", entity.faxtag2);
         row.SetField("emailaddr", entity.emailaddr);
         row.SetField("emailcom", entity.emailcom);
         row.SetField("faxhidden", entity.faxhidden);
         row.SetField("emailhidden", entity.emailhidden);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
