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

namespace Infor.Sxe.AP.Data.Models.Pdsapeiinvdetaddonpoaddons
{
   [ModelName("Infor.Sxe.AP.Data.Models.Pdsapeiinvdetaddonpoaddons.Apeiinvdetaddonpoaddons")]
   public partial class Apeiinvdetaddonpoaddons : ModelBase
   {
      public int seqno { get; set; }
      public int addonno { get; set; }
      public decimal addonamt { get; set; }
      public bool addontype { get; set; }
      [StringValidationAttribute]
      public string addontypedisplay { get; set; }
      public bool addoncapfl { get; set; }
      [StringValidationAttribute]
      public string addoncapfldisplay { get; set; }
      [StringValidationAttribute]
      public string addondistr { get; set; }
      [StringValidationAttribute]
      public string addondistrdisplay { get; set; }
      public decimal addonnet { get; set; }
      [StringValidationAttribute]
      public string addondesc { get; set; }
      public int pono { get; set; }
      public int posuf { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Apeiinvdetaddonpoaddons BuildApeiinvdetaddonpoaddonsFromRow(DataRow row)
      {
         Apeiinvdetaddonpoaddons entity = new Apeiinvdetaddonpoaddons();
         entity.seqno = row.IsNull("seqno") ? 0 : row.Field<int>("seqno");
         entity.addonno = row.IsNull("addonno") ? 0 : row.Field<int>("addonno");
         entity.addonamt = row.IsNull("addonamt") ? decimal.Zero : row.Field<decimal>("addonamt");
         entity.addontype = row.Field<bool>("addontype");
         entity.addontypedisplay = row.IsNull("addontypedisplay") ? string.Empty : row.Field<string>("addontypedisplay");
         entity.addoncapfl = row.Field<bool>("addoncapfl");
         entity.addoncapfldisplay = row.IsNull("addoncapfldisplay") ? string.Empty : row.Field<string>("addoncapfldisplay");
         entity.addondistr = row.IsNull("addondistr") ? string.Empty : row.Field<string>("addondistr");
         entity.addondistrdisplay = row.IsNull("addondistrdisplay") ? string.Empty : row.Field<string>("addondistrdisplay");
         entity.addonnet = row.IsNull("addonnet") ? decimal.Zero : row.Field<decimal>("addonnet");
         entity.addondesc = row.IsNull("addondesc") ? string.Empty : row.Field<string>("addondesc");
         entity.pono = row.IsNull("pono") ? 0 : row.Field<int>("pono");
         entity.posuf = row.IsNull("posuf") ? 0 : row.Field<int>("posuf");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromApeiinvdetaddonpoaddons(ref DataRow row, Apeiinvdetaddonpoaddons entity)
      {
         row.SetField("seqno", entity.seqno);
         row.SetField("addonno", entity.addonno);
         row.SetField("addonamt", entity.addonamt);
         row.SetField("addontype", entity.addontype);
         row.SetField("addontypedisplay", entity.addontypedisplay);
         row.SetField("addoncapfl", entity.addoncapfl);
         row.SetField("addoncapfldisplay", entity.addoncapfldisplay);
         row.SetField("addondistr", entity.addondistr);
         row.SetField("addondistrdisplay", entity.addondistrdisplay);
         row.SetField("addonnet", entity.addonnet);
         row.SetField("addondesc", entity.addondesc);
         row.SetField("pono", entity.pono);
         row.SetField("posuf", entity.posuf);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
