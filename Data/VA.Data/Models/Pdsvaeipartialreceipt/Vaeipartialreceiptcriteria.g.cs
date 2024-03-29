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

namespace Infor.Sxe.VA.Data.Models.Pdsvaeipartialreceipt
{
   [ModelName("Infor.Sxe.VA.Data.Models.Pdsvaeipartialreceipt.Vaeipartialreceiptcriteria")]
   public partial class Vaeipartialreceiptcriteria : ModelBase
   {
      public int vano { get; set; }
      public int vasuf { get; set; }
      public bool wlwhsechgfl { get; set; }
      public bool laborcheckedfl { get; set; }
      public decimal shipqty { get; set; }
      public bool createbofl { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Vaeipartialreceiptcriteria BuildVaeipartialreceiptcriteriaFromRow(DataRow row)
      {
         Vaeipartialreceiptcriteria entity = new Vaeipartialreceiptcriteria();
         entity.vano = row.IsNull("vano") ? 0 : row.Field<int>("vano");
         entity.vasuf = row.IsNull("vasuf") ? 0 : row.Field<int>("vasuf");
         entity.wlwhsechgfl = row.Field<bool>("wlwhsechgfl");
         entity.laborcheckedfl = row.Field<bool>("laborcheckedfl");
         entity.shipqty = row.IsNull("shipqty") ? decimal.Zero : row.Field<decimal>("shipqty");
         entity.createbofl = row.Field<bool>("createbofl");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromVaeipartialreceiptcriteria(ref DataRow row, Vaeipartialreceiptcriteria entity)
      {
         row.SetField("vano", entity.vano);
         row.SetField("vasuf", entity.vasuf);
         row.SetField("wlwhsechgfl", entity.wlwhsechgfl);
         row.SetField("laborcheckedfl", entity.laborcheckedfl);
         row.SetField("shipqty", entity.shipqty);
         row.SetField("createbofl", entity.createbofl);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
