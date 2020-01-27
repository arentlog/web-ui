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

namespace Infor.Sxe.IC.Data.Models.Pdsiceandefaultoffsetacct
{
   [ModelName("Infor.Sxe.IC.Data.Models.Pdsiceandefaultoffsetacct.Iceandfltoffsetacctcriteria")]
   public partial class Iceandfltoffsetacctcriteria : ModelBase
   {
      public int jrnlno { get; set; }
      [StringValidationAttribute]
      public string icenhRowid { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Iceandfltoffsetacctcriteria BuildIceandfltoffsetacctcriteriaFromRow(DataRow row)
      {
         Iceandfltoffsetacctcriteria entity = new Iceandfltoffsetacctcriteria();
         entity.jrnlno = row.IsNull("jrnlno") ? 0 : row.Field<int>("jrnlno");
         entity.icenhRowid = row.Field<byte[]>("icenh-rowid").ToStringEncoded();
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromIceandfltoffsetacctcriteria(ref DataRow row, Iceandfltoffsetacctcriteria entity)
      {
         row.SetField("jrnlno", entity.jrnlno);
         row.SetField("icenh-rowid", entity.icenhRowid.ToByteArray());
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
