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

namespace Infor.Sxe.WL.Data.Models.Pdswlaicriteria
{
   [ModelName("Infor.Sxe.WL.Data.Models.Pdswlaicriteria.Wlaicriteria")]
   public partial class Wlaicriteria : ModelBase
   {
      [StringValidationAttribute]
      public string whse { get; set; }
      [StringValidationAttribute]
      public string prodcat { get; set; }
      [StringValidationAttribute]
      public string prodbeg { get; set; }
      [StringValidationAttribute]
      public string prodend { get; set; }
      public bool crtmasterfl { get; set; }
      public bool crtitemfl { get; set; }
      public bool crtbinsfl { get; set; }
      public bool crtbinsflSensitive { get; set; }
      public bool crtxrefitemfl { get; set; }
      public bool crtvendorfl { get; set; }
      public bool crttablesfl { get; set; }
      public bool wllivefl { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Wlaicriteria BuildWlaicriteriaFromRow(DataRow row)
      {
         Wlaicriteria entity = new Wlaicriteria();
         entity.whse = row.IsNull("whse") ? string.Empty : row.Field<string>("whse");
         entity.prodcat = row.IsNull("prodcat") ? string.Empty : row.Field<string>("prodcat");
         entity.prodbeg = row.IsNull("prodbeg") ? string.Empty : row.Field<string>("prodbeg");
         entity.prodend = row.IsNull("prodend") ? string.Empty : row.Field<string>("prodend");
         entity.crtmasterfl = row.Field<bool>("crtmasterfl");
         entity.crtitemfl = row.Field<bool>("crtitemfl");
         entity.crtbinsfl = row.Field<bool>("crtbinsfl");
         entity.crtbinsflSensitive = row.Field<bool>("crtbinsfl-sensitive");
         entity.crtxrefitemfl = row.Field<bool>("crtxrefitemfl");
         entity.crtvendorfl = row.Field<bool>("crtvendorfl");
         entity.crttablesfl = row.Field<bool>("crttablesfl");
         entity.wllivefl = row.Field<bool>("wllivefl");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromWlaicriteria(ref DataRow row, Wlaicriteria entity)
      {
         row.SetField("whse", entity.whse);
         row.SetField("prodcat", entity.prodcat);
         row.SetField("prodbeg", entity.prodbeg);
         row.SetField("prodend", entity.prodend);
         row.SetField("crtmasterfl", entity.crtmasterfl);
         row.SetField("crtitemfl", entity.crtitemfl);
         row.SetField("crtbinsfl", entity.crtbinsfl);
         row.SetField("crtbinsfl-sensitive", entity.crtbinsflSensitive);
         row.SetField("crtxrefitemfl", entity.crtxrefitemfl);
         row.SetField("crtvendorfl", entity.crtvendorfl);
         row.SetField("crttablesfl", entity.crttablesfl);
         row.SetField("wllivefl", entity.wllivefl);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
