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

namespace Infor.Sxe.PO.Data.Models.Pdsloadpoheaderaddlwhse
{
   [ModelName("Infor.Sxe.PO.Data.Models.Pdsloadpoheaderaddlwhse.Loadpoheaderaddlwhsecriteria")]
   public partial class Loadpoheaderaddlwhsecriteria : ModelBase
   {
      public int pono { get; set; }
      public int posuf { get; set; }


      public static Loadpoheaderaddlwhsecriteria BuildLoadpoheaderaddlwhsecriteriaFromRow(DataRow row)
      {
         Loadpoheaderaddlwhsecriteria entity = new Loadpoheaderaddlwhsecriteria();
         entity.pono = row.IsNull("pono") ? 0 : row.Field<int>("pono");
         entity.posuf = row.IsNull("posuf") ? 0 : row.Field<int>("posuf");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromLoadpoheaderaddlwhsecriteria(ref DataRow row, Loadpoheaderaddlwhsecriteria entity)
      {
         row.SetField("pono", entity.pono);
         row.SetField("posuf", entity.posuf);

      }
   
   }
}
#pragma warning restore 1591
