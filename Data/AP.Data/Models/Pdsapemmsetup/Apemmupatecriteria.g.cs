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

namespace Infor.Sxe.AP.Data.Models.Pdsapemmsetup
{
   [ModelName("Infor.Sxe.AP.Data.Models.Pdsapemmsetup.Apemmupatecriteria")]
   public partial class Apemmupatecriteria : ModelBase
   {
      [StringValidationAttribute]
      public string apetRowID { get; set; }


      public static Apemmupatecriteria BuildApemmupatecriteriaFromRow(DataRow row)
      {
         Apemmupatecriteria entity = new Apemmupatecriteria();
         entity.apetRowID = row.Field<byte[]>("apetRowID").ToStringEncoded();
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromApemmupatecriteria(ref DataRow row, Apemmupatecriteria entity)
      {
         row.SetField("apetRowID", entity.apetRowID.ToByteArray());

      }
   
   }
}
#pragma warning restore 1591
