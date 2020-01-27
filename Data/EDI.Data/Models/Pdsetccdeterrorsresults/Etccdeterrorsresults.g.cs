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

namespace Infor.Sxe.EDI.Data.Models.Pdsetccdeterrorsresults
{
   [ModelName("Infor.Sxe.EDI.Data.Models.Pdsetccdeterrorsresults.Etccdeterrorsresults")]
   public partial class Etccdeterrorsresults : ModelBase
   {
      public bool corrected { get; set; }
      public bool level { get; set; }
      [StringValidationAttribute]
      public string leveldisplay { get; set; }
      public int lineno { get; set; }
      [StringValidationAttribute]
      public string edilineno { get; set; }
      [StringValidationAttribute]
      public string errty { get; set; }
      [StringValidationAttribute]
      public string fieldid { get; set; }
      [StringValidationAttribute]
      public string fieldty { get; set; }
      [StringValidationAttribute]
      public string errdesc { get; set; }
      [StringValidationAttribute]
      public string edivalue { get; set; }
      [StringValidationAttribute]
      public string sxevalue { get; set; }
      [StringValidationAttribute]
      public string edierowid { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Etccdeterrorsresults BuildEtccdeterrorsresultsFromRow(DataRow row)
      {
         Etccdeterrorsresults entity = new Etccdeterrorsresults();
         entity.corrected = row.Field<bool>("corrected");
         entity.level = row.Field<bool>("level");
         entity.leveldisplay = row.IsNull("leveldisplay") ? string.Empty : row.Field<string>("leveldisplay");
         entity.lineno = row.IsNull("lineno") ? 0 : row.Field<int>("lineno");
         entity.edilineno = row.IsNull("edilineno") ? string.Empty : row.Field<string>("edilineno");
         entity.errty = row.IsNull("errty") ? string.Empty : row.Field<string>("errty");
         entity.fieldid = row.IsNull("fieldid") ? string.Empty : row.Field<string>("fieldid");
         entity.fieldty = row.IsNull("fieldty") ? string.Empty : row.Field<string>("fieldty");
         entity.errdesc = row.IsNull("errdesc") ? string.Empty : row.Field<string>("errdesc");
         entity.edivalue = row.IsNull("edivalue") ? string.Empty : row.Field<string>("edivalue");
         entity.sxevalue = row.IsNull("sxevalue") ? string.Empty : row.Field<string>("sxevalue");
         entity.edierowid = row.Field<byte[]>("edierowid").ToStringEncoded();
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromEtccdeterrorsresults(ref DataRow row, Etccdeterrorsresults entity)
      {
         row.SetField("corrected", entity.corrected);
         row.SetField("level", entity.level);
         row.SetField("leveldisplay", entity.leveldisplay);
         row.SetField("lineno", entity.lineno);
         row.SetField("edilineno", entity.edilineno);
         row.SetField("errty", entity.errty);
         row.SetField("fieldid", entity.fieldid);
         row.SetField("fieldty", entity.fieldty);
         row.SetField("errdesc", entity.errdesc);
         row.SetField("edivalue", entity.edivalue);
         row.SetField("sxevalue", entity.sxevalue);
         row.SetField("edierowid", entity.edierowid.ToByteArray());
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591