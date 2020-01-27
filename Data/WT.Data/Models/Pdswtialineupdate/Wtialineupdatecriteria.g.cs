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

namespace Infor.Sxe.WT.Data.Models.Pdswtialineupdate
{
   [ModelName("Infor.Sxe.WT.Data.Models.Pdswtialineupdate.Wtialineupdatecriteria")]
   public partial class Wtialineupdatecriteria : ModelBase
   {
      [StringValidationAttribute]
      public string approvefl { get; set; }
      public decimal qtyship { get; set; }
      public bool bofl { get; set; }
      public bool setfl { get; set; }
      public bool lQuestionfl { get; set; }
      public bool lCountFl { get; set; }
      [StringValidationAttribute]
      public string prodtype { get; set; }
      public int wTNo { get; set; }
      public int wTSuf { get; set; }
      [StringValidationAttribute]
      public string rowidWtel { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Wtialineupdatecriteria BuildWtialineupdatecriteriaFromRow(DataRow row)
      {
         Wtialineupdatecriteria entity = new Wtialineupdatecriteria();
         entity.approvefl = row.IsNull("approvefl") ? string.Empty : row.Field<string>("approvefl");
         entity.qtyship = row.IsNull("qtyship") ? decimal.Zero : row.Field<decimal>("qtyship");
         entity.bofl = row.Field<bool>("bofl");
         entity.setfl = row.Field<bool>("setfl");
         entity.lQuestionfl = row.Field<bool>("lQuestionfl");
         entity.lCountFl = row.Field<bool>("lCountFl");
         entity.prodtype = row.IsNull("prodtype") ? string.Empty : row.Field<string>("prodtype");
         entity.wTNo = row.IsNull("WTNo") ? 0 : row.Field<int>("WTNo");
         entity.wTSuf = row.IsNull("WTSuf") ? 0 : row.Field<int>("WTSuf");
         entity.rowidWtel = row.Field<byte[]>("rowid-wtel").ToStringEncoded();
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromWtialineupdatecriteria(ref DataRow row, Wtialineupdatecriteria entity)
      {
         row.SetField("approvefl", entity.approvefl);
         row.SetField("qtyship", entity.qtyship);
         row.SetField("bofl", entity.bofl);
         row.SetField("setfl", entity.setfl);
         row.SetField("lQuestionfl", entity.lQuestionfl);
         row.SetField("lCountFl", entity.lCountFl);
         row.SetField("prodtype", entity.prodtype);
         row.SetField("WTNo", entity.wTNo);
         row.SetField("WTSuf", entity.wTSuf);
         row.SetField("rowid-wtel", entity.rowidWtel.ToByteArray());
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
