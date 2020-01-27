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

namespace Infor.Sxe.IC.Data.Models.Pdsicspecprccostlookup
{
   [ModelName("Infor.Sxe.IC.Data.Models.Pdsicspecprccostlookup.Icspecprccostlookupresults")]
   public partial class Icspecprccostlookupresults : ModelBase, IUserFields
   {
      [StringValidationAttribute]
      public string prod { get; set; }
      [StringValidationAttribute]
      public string speccostty { get; set; }
      [StringValidationAttribute]
      public string speccosttydisplay { get; set; }
      public decimal csunperstk { get; set; }
      [StringValidationAttribute]
      public string prccostper { get; set; }
      [StringValidationAttribute]
      public string defaulttype { get; set; }
      public bool statusfl { get; set; }
      public int icspecrecno { get; set; }
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
      [StringValidationAttribute]
      public string rowidIcss { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Icspecprccostlookupresults BuildIcspecprccostlookupresultsFromRow(DataRow row)
      {
         Icspecprccostlookupresults entity = new Icspecprccostlookupresults();
         entity.prod = row.IsNull("prod") ? string.Empty : row.Field<string>("prod");
         entity.speccostty = row.IsNull("speccostty") ? string.Empty : row.Field<string>("speccostty");
         entity.speccosttydisplay = row.IsNull("speccosttydisplay") ? string.Empty : row.Field<string>("speccosttydisplay");
         entity.csunperstk = row.IsNull("csunperstk") ? decimal.Zero : row.Field<decimal>("csunperstk");
         entity.prccostper = row.IsNull("prccostper") ? string.Empty : row.Field<string>("prccostper");
         entity.defaulttype = row.IsNull("defaulttype") ? string.Empty : row.Field<string>("defaulttype");
         entity.statusfl = row.Field<bool>("statusfl");
         entity.icspecrecno = row.IsNull("icspecrecno") ? 0 : row.Field<int>("icspecrecno");
         entity.user1 = row.IsNull("user1") ? string.Empty : row.Field<string>("user1");
         entity.user2 = row.IsNull("user2") ? string.Empty : row.Field<string>("user2");
         entity.user3 = row.IsNull("user3") ? string.Empty : row.Field<string>("user3");
         entity.user4 = row.IsNull("user4") ? string.Empty : row.Field<string>("user4");
         entity.user5 = row.IsNull("user5") ? string.Empty : row.Field<string>("user5");
         entity.user6 = row.Field<decimal?>("user6");
         entity.user7 = row.Field<decimal?>("user7");
         entity.user8 = row.Field<DateTime?>("user8");
         entity.user9 = row.Field<DateTime?>("user9");
         entity.rowidIcss = row.Field<byte[]>("rowid-icss").ToStringEncoded();
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromIcspecprccostlookupresults(ref DataRow row, Icspecprccostlookupresults entity)
      {
         row.SetField("prod", entity.prod);
         row.SetField("speccostty", entity.speccostty);
         row.SetField("speccosttydisplay", entity.speccosttydisplay);
         row.SetField("csunperstk", entity.csunperstk);
         row.SetField("prccostper", entity.prccostper);
         row.SetField("defaulttype", entity.defaulttype);
         row.SetField("statusfl", entity.statusfl);
         row.SetField("icspecrecno", entity.icspecrecno);
         row.SetField("user1", entity.user1);
         row.SetField("user2", entity.user2);
         row.SetField("user3", entity.user3);
         row.SetField("user4", entity.user4);
         row.SetField("user5", entity.user5);
         row.SetField("user6", entity.user6);
         row.SetField("user7", entity.user7);
         row.SetField("user8", entity.user8);
         row.SetField("user9", entity.user9);
         row.SetField("rowid-icss", entity.rowidIcss.ToByteArray());
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591