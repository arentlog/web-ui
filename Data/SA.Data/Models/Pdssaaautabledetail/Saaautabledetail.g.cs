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

namespace Infor.Sxe.SA.Data.Models.Pdssaaautabledetail
{
   [ModelName("Infor.Sxe.SA.Data.Models.Pdssaaautabledetail.Saaautabledetail")]
   public partial class Saaautabledetail : ModelBase
   {
      [StringValidationAttribute]
      public string fieldname { get; set; }
      [StringValidationAttribute]
      public string lbl { get; set; }
      [StringValidationAttribute]
      public string ty { get; set; }
      [StringValidationAttribute]
      public string fmt { get; set; }
      public bool selectfl { get; set; }
      [StringValidationAttribute]
      public string detailrowid { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Saaautabledetail BuildSaaautabledetailFromRow(DataRow row)
      {
         Saaautabledetail entity = new Saaautabledetail();
         entity.fieldname = row.IsNull("fieldname") ? string.Empty : row.Field<string>("fieldname");
         entity.lbl = row.IsNull("lbl") ? string.Empty : row.Field<string>("lbl");
         entity.ty = row.IsNull("ty") ? string.Empty : row.Field<string>("ty");
         entity.fmt = row.IsNull("fmt") ? string.Empty : row.Field<string>("fmt");
         entity.selectfl = row.Field<bool>("selectfl");
         entity.detailrowid = row.Field<byte[]>("detailrowid").ToStringEncoded();
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromSaaautabledetail(ref DataRow row, Saaautabledetail entity)
      {
         row.SetField("fieldname", entity.fieldname);
         row.SetField("lbl", entity.lbl);
         row.SetField("ty", entity.ty);
         row.SetField("fmt", entity.fmt);
         row.SetField("selectfl", entity.selectfl);
         row.SetField("detailrowid", entity.detailrowid.ToByteArray());
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
