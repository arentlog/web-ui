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

namespace Infor.Sxe.PO.Data.Models.Pdsporrarreptmergerun
{
   [ModelName("Infor.Sxe.PO.Data.Models.Pdsporrarreptmergerun.Porrarreptmergerunrepts")]
   public partial class Porrarreptmergerunrepts : ModelBase
   {
      [StringValidationAttribute]
      public string rowidPoerah { get; set; }


      public static Porrarreptmergerunrepts BuildPorrarreptmergerunreptsFromRow(DataRow row)
      {
         Porrarreptmergerunrepts entity = new Porrarreptmergerunrepts();
         entity.rowidPoerah = row.Field<byte[]>("rowid-poerah").ToStringEncoded();
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromPorrarreptmergerunrepts(ref DataRow row, Porrarreptmergerunrepts entity)
      {
         row.SetField("rowid-poerah", entity.rowidPoerah.ToByteArray());

      }
   
   }
}
#pragma warning restore 1591
