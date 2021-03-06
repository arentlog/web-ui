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

namespace Infor.Sxe.Shared.Data.Models.Pdcrtsasoofromifs
{
   [ModelName("Infor.Sxe.Shared.Data.Models.Pdcrtsasoofromifs.Crtsasoofromifs")]
   public partial class Crtsasoofromifs : ModelBase
   {
      [StringValidationAttribute]
      public string ifsuser { get; set; }
      [StringValidationAttribute]
      public string tenantid { get; set; }
      [StringValidationAttribute]
      public string emailaddr { get; set; }
      [StringValidationAttribute]
      public string firstname { get; set; }
      [StringValidationAttribute]
      public string lastname { get; set; }
      [StringValidationAttribute]
      public string aecompanies { get; set; }
      public int initcono { get; set; }
      [StringValidationAttribute]
      public string securityroles { get; set; }
      [StringValidationAttribute]
      public string erpuserid { get; set; }
      public int createdcono { get; set; }
      [StringValidationAttribute]
      public string createdoperinit { get; set; }
      [StringValidationAttribute]
      public string sessionid { get; set; }
      [StringValidationAttribute]
      public string expiration { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Crtsasoofromifs BuildCrtsasoofromifsFromRow(DataRow row)
      {
         Crtsasoofromifs entity = new Crtsasoofromifs();
         entity.ifsuser = row.IsNull("ifsuser") ? string.Empty : row.Field<string>("ifsuser");
         entity.tenantid = row.IsNull("tenantid") ? string.Empty : row.Field<string>("tenantid");
         entity.emailaddr = row.IsNull("emailaddr") ? string.Empty : row.Field<string>("emailaddr");
         entity.firstname = row.IsNull("firstname") ? string.Empty : row.Field<string>("firstname");
         entity.lastname = row.IsNull("lastname") ? string.Empty : row.Field<string>("lastname");
         entity.aecompanies = row.IsNull("aecompanies") ? string.Empty : row.Field<string>("aecompanies");
         entity.initcono = row.IsNull("initcono") ? 0 : row.Field<int>("initcono");
         entity.securityroles = row.IsNull("securityroles") ? string.Empty : row.Field<string>("securityroles");
         entity.erpuserid = row.IsNull("erpuserid") ? string.Empty : row.Field<string>("erpuserid");
         entity.createdcono = row.IsNull("createdcono") ? 0 : row.Field<int>("createdcono");
         entity.createdoperinit = row.IsNull("createdoperinit") ? string.Empty : row.Field<string>("createdoperinit");
         entity.sessionid = row.IsNull("sessionid") ? string.Empty : row.Field<string>("sessionid");
         entity.expiration = row.IsNull("expiration") ? string.Empty : row.Field<string>("expiration");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromCrtsasoofromifs(ref DataRow row, Crtsasoofromifs entity)
      {
         row.SetField("ifsuser", entity.ifsuser);
         row.SetField("tenantid", entity.tenantid);
         row.SetField("emailaddr", entity.emailaddr);
         row.SetField("firstname", entity.firstname);
         row.SetField("lastname", entity.lastname);
         row.SetField("aecompanies", entity.aecompanies);
         row.SetField("initcono", entity.initcono);
         row.SetField("securityroles", entity.securityroles);
         row.SetField("erpuserid", entity.erpuserid);
         row.SetField("createdcono", entity.createdcono);
         row.SetField("createdoperinit", entity.createdoperinit);
         row.SetField("sessionid", entity.sessionid);
         row.SetField("expiration", entity.expiration);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
