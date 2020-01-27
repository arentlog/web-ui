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

namespace Infor.Sxe.GL.Data.Models.Pdsglifdetailhist
{
   [ModelName("Infor.Sxe.GL.Data.Models.Pdsglifdetailhist.Glifdetailhistcriteria")]
   public partial class Glifdetailhistcriteria : ModelBase
   {
      [StringValidationAttribute]
      public string cdesign { get; set; }
      [StringValidationAttribute]
      public string creportnm { get; set; }
      [StringValidationAttribute]
      public string cprtline { get; set; }
      public int iseqno { get; set; }
      public int icolumnno { get; set; }
      public int icurryr { get; set; }
      public int iperiod { get; set; }
      public int icyear { get; set; }
      public int iperfisc { get; set; }
      [StringValidationAttribute]
      public string cacct { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Glifdetailhistcriteria BuildGlifdetailhistcriteriaFromRow(DataRow row)
      {
         Glifdetailhistcriteria entity = new Glifdetailhistcriteria();
         entity.cdesign = row.IsNull("cdesign") ? string.Empty : row.Field<string>("cdesign");
         entity.creportnm = row.IsNull("creportnm") ? string.Empty : row.Field<string>("creportnm");
         entity.cprtline = row.IsNull("cprtline") ? string.Empty : row.Field<string>("cprtline");
         entity.iseqno = row.IsNull("iseqno") ? 0 : row.Field<int>("iseqno");
         entity.icolumnno = row.IsNull("icolumnno") ? 0 : row.Field<int>("icolumnno");
         entity.icurryr = row.IsNull("icurryr") ? 0 : row.Field<int>("icurryr");
         entity.iperiod = row.IsNull("iperiod") ? 0 : row.Field<int>("iperiod");
         entity.icyear = row.IsNull("icyear") ? 0 : row.Field<int>("icyear");
         entity.iperfisc = row.IsNull("iperfisc") ? 0 : row.Field<int>("iperfisc");
         entity.cacct = row.IsNull("cacct") ? string.Empty : row.Field<string>("cacct");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromGlifdetailhistcriteria(ref DataRow row, Glifdetailhistcriteria entity)
      {
         row.SetField("cdesign", entity.cdesign);
         row.SetField("creportnm", entity.creportnm);
         row.SetField("cprtline", entity.cprtline);
         row.SetField("iseqno", entity.iseqno);
         row.SetField("icolumnno", entity.icolumnno);
         row.SetField("icurryr", entity.icurryr);
         row.SetField("iperiod", entity.iperiod);
         row.SetField("icyear", entity.icyear);
         row.SetField("iperfisc", entity.iperfisc);
         row.SetField("cacct", entity.cacct);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
