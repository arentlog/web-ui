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

namespace Infor.Sxe.PO.Data.Models.Pdspoblanketupdate
{
   [ModelName("Infor.Sxe.PO.Data.Models.Pdspoblanketupdate.Poblanketupdateresults")]
   public partial class Poblanketupdateresults : ModelBase
   {
      public int pono { get; set; }
      public int posuf { get; set; }
      [StringValidationAttribute]
      public string name { get; set; }
      [StringValidationAttribute]
      public string descrip { get; set; }
      [StringValidationAttribute]
      public string apsvrowid { get; set; }
      [StringValidationAttribute]
      public string apssrowid { get; set; }


      public static Poblanketupdateresults BuildPoblanketupdateresultsFromRow(DataRow row)
      {
         Poblanketupdateresults entity = new Poblanketupdateresults();
         entity.pono = row.IsNull("pono") ? 0 : row.Field<int>("pono");
         entity.posuf = row.IsNull("posuf") ? 0 : row.Field<int>("posuf");
         entity.name = row.IsNull("name") ? string.Empty : row.Field<string>("name");
         entity.descrip = row.IsNull("descrip") ? string.Empty : row.Field<string>("descrip");
         entity.apsvrowid = row.Field<byte[]>("apsvrowid").ToStringEncoded();
         entity.apssrowid = row.Field<byte[]>("apssrowid").ToStringEncoded();
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromPoblanketupdateresults(ref DataRow row, Poblanketupdateresults entity)
      {
         row.SetField("pono", entity.pono);
         row.SetField("posuf", entity.posuf);
         row.SetField("name", entity.name);
         row.SetField("descrip", entity.descrip);
         row.SetField("apsvrowid", entity.apsvrowid.ToByteArray());
         row.SetField("apssrowid", entity.apssrowid.ToByteArray());

      }
   
   }
}
#pragma warning restore 1591