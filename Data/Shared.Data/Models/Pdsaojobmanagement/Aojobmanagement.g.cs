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

namespace Infor.Sxe.Shared.Data.Models.Pdsaojobmanagement
{
   [ModelName("Infor.Sxe.Shared.Data.Models.Pdsaojobmanagement.Aojobmanagement")]
   public partial class Aojobmanagement : ModelBase
   {
      public int cono { get; set; }
      public int jmcprtfrmt { get; set; }
      public int jmcfaxfrmt { get; set; }
      public bool jmcheadfl { get; set; }
      public int jmvprtfrmt { get; set; }
      public int jmvfaxfrmt { get; set; }
      public bool jmvheadfl { get; set; }
      public bool jmapprovfl { get; set; }
      [StringValidationAttribute]
      public string sascRowid { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Aojobmanagement BuildAojobmanagementFromRow(DataRow row)
      {
         Aojobmanagement entity = new Aojobmanagement();
         entity.cono = row.IsNull("cono") ? 0 : row.Field<int>("cono");
         entity.jmcprtfrmt = row.IsNull("jmcprtfrmt") ? 0 : row.Field<int>("jmcprtfrmt");
         entity.jmcfaxfrmt = row.IsNull("jmcfaxfrmt") ? 0 : row.Field<int>("jmcfaxfrmt");
         entity.jmcheadfl = row.Field<bool>("jmcheadfl");
         entity.jmvprtfrmt = row.IsNull("jmvprtfrmt") ? 0 : row.Field<int>("jmvprtfrmt");
         entity.jmvfaxfrmt = row.IsNull("jmvfaxfrmt") ? 0 : row.Field<int>("jmvfaxfrmt");
         entity.jmvheadfl = row.Field<bool>("jmvheadfl");
         entity.jmapprovfl = row.Field<bool>("jmapprovfl");
         entity.sascRowid = row.Field<byte[]>("sasc-rowid").ToStringEncoded();
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromAojobmanagement(ref DataRow row, Aojobmanagement entity)
      {
         row.SetField("cono", entity.cono);
         row.SetField("jmcprtfrmt", entity.jmcprtfrmt);
         row.SetField("jmcfaxfrmt", entity.jmcfaxfrmt);
         row.SetField("jmcheadfl", entity.jmcheadfl);
         row.SetField("jmvprtfrmt", entity.jmvprtfrmt);
         row.SetField("jmvfaxfrmt", entity.jmvfaxfrmt);
         row.SetField("jmvheadfl", entity.jmvheadfl);
         row.SetField("jmapprovfl", entity.jmapprovfl);
         row.SetField("sasc-rowid", entity.sascRowid.ToByteArray());
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591