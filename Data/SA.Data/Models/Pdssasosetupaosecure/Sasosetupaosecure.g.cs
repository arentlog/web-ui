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

namespace Infor.Sxe.SA.Data.Models.Pdssasosetupaosecure
{
   [ModelName("Infor.Sxe.SA.Data.Models.Pdssasosetupaosecure.Sasosetupaosecure")]
   public partial class Sasosetupaosecure : ModelBase
   {
      [StringValidationAttribute]
      public string codeval { get; set; }
      [StringValidationAttribute]
      public string descrip { get; set; }
      public int seqno { get; set; }
      public bool selectedfl { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Sasosetupaosecure BuildSasosetupaosecureFromRow(DataRow row)
      {
         Sasosetupaosecure entity = new Sasosetupaosecure();
         entity.codeval = row.IsNull("codeval") ? string.Empty : row.Field<string>("codeval");
         entity.descrip = row.IsNull("descrip") ? string.Empty : row.Field<string>("descrip");
         entity.seqno = row.IsNull("seqno") ? 0 : row.Field<int>("seqno");
         entity.selectedfl = row.Field<bool>("selectedfl");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromSasosetupaosecure(ref DataRow row, Sasosetupaosecure entity)
      {
         row.SetField("codeval", entity.codeval);
         row.SetField("descrip", entity.descrip);
         row.SetField("seqno", entity.seqno);
         row.SetField("selectedfl", entity.selectedfl);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591