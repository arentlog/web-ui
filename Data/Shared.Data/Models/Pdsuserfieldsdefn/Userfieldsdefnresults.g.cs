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

namespace Infor.Sxe.Shared.Data.Models.Pdsuserfieldsdefn
{
   [ModelName("Infor.Sxe.Shared.Data.Models.Pdsuserfieldsdefn.Userfieldsdefnresults")]
   public partial class Userfieldsdefnresults : ModelBase, IUserFields
   {
      [StringValidationAttribute]
      public string tablename { get; set; }
      [StringValidationAttribute]
      public string fieldname { get; set; }
      [StringValidationAttribute]
      public string fieldhelp { get; set; }
      [StringValidationAttribute]
      public string fieldlabel { get; set; }
      public int fieldmaxlength { get; set; }
      [StringValidationAttribute]
      public string fieldvalidvalues { get; set; }
      public DateTime? datemin { get; set; }
      public DateTime? datemax { get; set; }
      public int numbermin { get; set; }
      public int numbermax { get; set; }
      public int fieldseqno { get; set; }
      [StringValidationAttribute]
      public string user1 { get; set; }
      [StringValidationAttribute]
      public string user2 { get; set; }
      [StringValidationAttribute]
      public string user3 { get; set; }
      [StringValidationAttribute]
      public string user4 { get; set; }
      [StringValidationAttribute]
      public string user5 { get; set; }
      public decimal? user6 { get; set; }
      public decimal? user7 { get; set; }
      public DateTime? user8 { get; set; }
      public DateTime? user9 { get; set; }


      public static Userfieldsdefnresults BuildUserfieldsdefnresultsFromRow(DataRow row)
      {
         Userfieldsdefnresults entity = new Userfieldsdefnresults();
         entity.tablename = row.IsNull("tablename") ? string.Empty : row.Field<string>("tablename");
         entity.fieldname = row.IsNull("fieldname") ? string.Empty : row.Field<string>("fieldname");
         entity.fieldhelp = row.IsNull("fieldhelp") ? string.Empty : row.Field<string>("fieldhelp");
         entity.fieldlabel = row.IsNull("fieldlabel") ? string.Empty : row.Field<string>("fieldlabel");
         entity.fieldmaxlength = row.IsNull("fieldmaxlength") ? 0 : row.Field<int>("fieldmaxlength");
         entity.fieldvalidvalues = row.IsNull("fieldvalidvalues") ? string.Empty : row.Field<string>("fieldvalidvalues");
         entity.datemin = row.Field<DateTime?>("datemin");
         entity.datemax = row.Field<DateTime?>("datemax");
         entity.numbermin = row.IsNull("numbermin") ? 0 : row.Field<int>("numbermin");
         entity.numbermax = row.IsNull("numbermax") ? 0 : row.Field<int>("numbermax");
         entity.fieldseqno = row.IsNull("fieldseqno") ? 0 : row.Field<int>("fieldseqno");
         entity.user1 = row.IsNull("user1") ? string.Empty : row.Field<string>("user1");
         entity.user2 = row.IsNull("user2") ? string.Empty : row.Field<string>("user2");
         entity.user3 = row.IsNull("user3") ? string.Empty : row.Field<string>("user3");
         entity.user4 = row.IsNull("user4") ? string.Empty : row.Field<string>("user4");
         entity.user5 = row.IsNull("user5") ? string.Empty : row.Field<string>("user5");
         entity.user6 = row.Field<decimal?>("user6");
         entity.user7 = row.Field<decimal?>("user7");
         entity.user8 = row.Field<DateTime?>("user8");
         entity.user9 = row.Field<DateTime?>("user9");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromUserfieldsdefnresults(ref DataRow row, Userfieldsdefnresults entity)
      {
         row.SetField("tablename", entity.tablename);
         row.SetField("fieldname", entity.fieldname);
         row.SetField("fieldhelp", entity.fieldhelp);
         row.SetField("fieldlabel", entity.fieldlabel);
         row.SetField("fieldmaxlength", entity.fieldmaxlength);
         row.SetField("fieldvalidvalues", entity.fieldvalidvalues);
         row.SetField("datemin", entity.datemin);
         row.SetField("datemax", entity.datemax);
         row.SetField("numbermin", entity.numbermin);
         row.SetField("numbermax", entity.numbermax);
         row.SetField("fieldseqno", entity.fieldseqno);
         row.SetField("user1", entity.user1);
         row.SetField("user2", entity.user2);
         row.SetField("user3", entity.user3);
         row.SetField("user4", entity.user4);
         row.SetField("user5", entity.user5);
         row.SetField("user6", entity.user6);
         row.SetField("user7", entity.user7);
         row.SetField("user8", entity.user8);
         row.SetField("user9", entity.user9);

      }
   
   }
}
#pragma warning restore 1591
