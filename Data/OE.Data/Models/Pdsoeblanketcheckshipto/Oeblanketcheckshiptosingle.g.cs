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

namespace Infor.Sxe.OE.Data.Models.Pdsoeblanketcheckshipto
{
   [ModelName("Infor.Sxe.OE.Data.Models.Pdsoeblanketcheckshipto.Oeblanketcheckshiptosingle")]
   public partial class Oeblanketcheckshiptosingle : ModelBase
   {
      [StringValidationAttribute]
      public string name { get; set; }
      [StringValidationAttribute]
      public string shipviaty { get; set; }
      [StringValidationAttribute]
      public string shipviadesc { get; set; }
      [StringValidationAttribute]
      public string shiptonotesfl { get; set; }
      [StringValidationAttribute]
      public string arssrowid { get; set; }


      public static Oeblanketcheckshiptosingle BuildOeblanketcheckshiptosingleFromRow(DataRow row)
      {
         Oeblanketcheckshiptosingle entity = new Oeblanketcheckshiptosingle();
         entity.name = row.IsNull("name") ? string.Empty : row.Field<string>("name");
         entity.shipviaty = row.IsNull("shipviaty") ? string.Empty : row.Field<string>("shipviaty");
         entity.shipviadesc = row.IsNull("shipviadesc") ? string.Empty : row.Field<string>("shipviadesc");
         entity.shiptonotesfl = row.IsNull("shiptonotesfl") ? string.Empty : row.Field<string>("shiptonotesfl");
         entity.arssrowid = row.Field<byte[]>("arssrowid").ToStringEncoded();
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromOeblanketcheckshiptosingle(ref DataRow row, Oeblanketcheckshiptosingle entity)
      {
         row.SetField("name", entity.name);
         row.SetField("shipviaty", entity.shipviaty);
         row.SetField("shipviadesc", entity.shipviadesc);
         row.SetField("shiptonotesfl", entity.shiptonotesfl);
         row.SetField("arssrowid", entity.arssrowid.ToByteArray());

      }
   
   }
}
#pragma warning restore 1591
