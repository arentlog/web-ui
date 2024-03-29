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

namespace Infor.Sxe.TWL.Data.Models.Pdsdbfieldnamecriteria
{
   [ModelName("Infor.Sxe.TWL.Data.Models.Pdsdbfieldnamecriteria.Dbfieldnamecriteria")]
   public partial class Dbfieldnamecriteria : ModelBase
   {
      [StringValidationAttribute]
      public string tableName { get; set; }
      [StringValidationAttribute]
      public string fieldName { get; set; }
      [StringValidationAttribute]
      public string fieldnamecrituf { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Dbfieldnamecriteria BuildDbfieldnamecriteriaFromRow(DataRow row)
      {
         Dbfieldnamecriteria entity = new Dbfieldnamecriteria();
         entity.tableName = row.IsNull("tableName") ? string.Empty : row.Field<string>("tableName");
         entity.fieldName = row.IsNull("fieldName") ? string.Empty : row.Field<string>("fieldName");
         entity.fieldnamecrituf = row.IsNull("fieldnamecrituf") ? string.Empty : row.Field<string>("fieldnamecrituf");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromDbfieldnamecriteria(ref DataRow row, Dbfieldnamecriteria entity)
      {
         row.SetField("tableName", entity.tableName);
         row.SetField("fieldName", entity.fieldName);
         row.SetField("fieldnamecrituf", entity.fieldnamecrituf);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
