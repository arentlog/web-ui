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

namespace Infor.Sxe.IC.Data.Models.Pdsicamuexception
{
   [ModelName("Infor.Sxe.IC.Data.Models.Pdsicamuexception.Icamuexceptioncriteria")]
   public partial class Icamuexceptioncriteria : ModelBase
   {
      public int secure { get; set; }
      [StringValidationAttribute]
      public string icamueRowID { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Icamuexceptioncriteria BuildIcamuexceptioncriteriaFromRow(DataRow row)
      {
         Icamuexceptioncriteria entity = new Icamuexceptioncriteria();
         entity.secure = row.IsNull("secure") ? 0 : row.Field<int>("secure");
         entity.icamueRowID = row.Field<byte[]>("icamueRowID").ToStringEncoded();
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromIcamuexceptioncriteria(ref DataRow row, Icamuexceptioncriteria entity)
      {
         row.SetField("secure", entity.secure);
         row.SetField("icamueRowID", entity.icamueRowID.ToByteArray());
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
