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

namespace Infor.Sxe.EDI.Data.Models.Pdsetccdeterrorscorrection
{
   [ModelName("Infor.Sxe.EDI.Data.Models.Pdsetccdeterrorscorrection.Etccdeterrorscorrection")]
   public partial class Etccdeterrorscorrection : ModelBase
   {
      [StringValidationAttribute]
      public string sxxmldocRowid { get; set; }
      [StringValidationAttribute]
      public string edierowid { get; set; }
      [StringValidationAttribute]
      public string errdesc { get; set; }
      public bool corrected { get; set; }
      [StringValidationAttribute]
      public string errty { get; set; }
      public bool refresherrorcounts { get; set; }
      public bool refreshapprovty { get; set; }
      [StringValidationAttribute]
      public string approvty { get; set; }
      [StringValidationAttribute]
      public string approvmsg { get; set; }
      public bool rebuildtt { get; set; }
      public bool rebuildttrefresh { get; set; }
      public bool refreshgrid { get; set; }
      [StringValidationAttribute]
      public string placeeholdques { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Etccdeterrorscorrection BuildEtccdeterrorscorrectionFromRow(DataRow row)
      {
         Etccdeterrorscorrection entity = new Etccdeterrorscorrection();
         entity.sxxmldocRowid = row.Field<byte[]>("sxxmldoc-rowid").ToStringEncoded();
         entity.edierowid = row.Field<byte[]>("edierowid").ToStringEncoded();
         entity.errdesc = row.IsNull("errdesc") ? string.Empty : row.Field<string>("errdesc");
         entity.corrected = row.Field<bool>("corrected");
         entity.errty = row.IsNull("errty") ? string.Empty : row.Field<string>("errty");
         entity.refresherrorcounts = row.Field<bool>("refresherrorcounts");
         entity.refreshapprovty = row.Field<bool>("refreshapprovty");
         entity.approvty = row.IsNull("approvty") ? string.Empty : row.Field<string>("approvty");
         entity.approvmsg = row.IsNull("approvmsg") ? string.Empty : row.Field<string>("approvmsg");
         entity.rebuildtt = row.Field<bool>("rebuildtt");
         entity.rebuildttrefresh = row.Field<bool>("rebuildttrefresh");
         entity.refreshgrid = row.Field<bool>("refreshgrid");
         entity.placeeholdques = row.IsNull("placeeholdques") ? string.Empty : row.Field<string>("placeeholdques");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromEtccdeterrorscorrection(ref DataRow row, Etccdeterrorscorrection entity)
      {
         row.SetField("sxxmldoc-rowid", entity.sxxmldocRowid.ToByteArray());
         row.SetField("edierowid", entity.edierowid.ToByteArray());
         row.SetField("errdesc", entity.errdesc);
         row.SetField("corrected", entity.corrected);
         row.SetField("errty", entity.errty);
         row.SetField("refresherrorcounts", entity.refresherrorcounts);
         row.SetField("refreshapprovty", entity.refreshapprovty);
         row.SetField("approvty", entity.approvty);
         row.SetField("approvmsg", entity.approvmsg);
         row.SetField("rebuildtt", entity.rebuildtt);
         row.SetField("rebuildttrefresh", entity.rebuildttrefresh);
         row.SetField("refreshgrid", entity.refreshgrid);
         row.SetField("placeeholdques", entity.placeeholdques);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
