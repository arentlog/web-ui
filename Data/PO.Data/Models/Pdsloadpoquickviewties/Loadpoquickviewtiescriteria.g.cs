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

namespace Infor.Sxe.PO.Data.Models.Pdsloadpoquickviewties
{
   [ModelName("Infor.Sxe.PO.Data.Models.Pdsloadpoquickviewties.Loadpoquickviewtiescriteria")]
   public partial class Loadpoquickviewtiescriteria : ModelBase
   {
      public int pono { get; set; }
      public int posuf { get; set; }
      public int lineno { get; set; }


      public static Loadpoquickviewtiescriteria BuildLoadpoquickviewtiescriteriaFromRow(DataRow row)
      {
         Loadpoquickviewtiescriteria entity = new Loadpoquickviewtiescriteria();
         entity.pono = row.IsNull("pono") ? 0 : row.Field<int>("pono");
         entity.posuf = row.IsNull("posuf") ? 0 : row.Field<int>("posuf");
         entity.lineno = row.IsNull("lineno") ? 0 : row.Field<int>("lineno");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromLoadpoquickviewtiescriteria(ref DataRow row, Loadpoquickviewtiescriteria entity)
      {
         row.SetField("pono", entity.pono);
         row.SetField("posuf", entity.posuf);
         row.SetField("lineno", entity.lineno);

      }
   
   }
}
#pragma warning restore 1591
