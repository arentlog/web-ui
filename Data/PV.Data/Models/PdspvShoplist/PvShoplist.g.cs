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
using Infor.Sxe.Common.Data.Models.PV;
   

namespace Infor.Sxe.PV.Data.Models.PdspvShoplist
{
   [ModelName("Infor.Sxe.PV.Data.Models.PdspvShoplist.PvShoplist")]
   public partial class PvShoplist : PvShoplistBase
   {
      public Icsp icspes { get; set; }
      public Icsw icswes { get; set; }


      public PvShoplist()
      {

      }

   
      /// <summary>
      /// Build a class from a database row
      /// </summary>   
      public static PvShoplist BuildPvShoplistFromRow(DataRow row)
      {
         var entity = BuildPvShoplistBaseFromRow<PvShoplist>(row);
         
         if (entity!=null)
         {
            var childRowP_ttblicsp  =  row.GetChildRows("P_ttblicsp").FirstOrDefault();
            if (childRowP_ttblicsp != null)
            {
               entity.icspes = (Icsp)SetKeyFields(entity, Icsp.BuildIcspFromRow(childRowP_ttblicsp), "cono,prod", "cono,prod");
            }
            var childRowP_ttblicsw  =  row.GetChildRows("P_ttblicsw").FirstOrDefault();
            if (childRowP_ttblicsw != null)
            {
               entity.icswes = (Icsw)SetKeyFields(entity, Icsw.BuildIcswFromRow(childRowP_ttblicsw), "cono,whse,prod", "cono,whse,prod");
            }
         }
         return entity;
      }

      /// <summary>
      /// Build a minimal row from a class (key fields only)
      /// </summary>
      public static void BuildMinimalRow(ref DataRow row, PvShoplist entity)
      {
         PvShoplistBase.BuildMinimalRow(ref row, entity);
      }
      
      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromPvShoplist(ref DataRow row, PvShoplist entity)
      {
         UpdateRowFromPvShoplistBase(ref row, entity);
      }
   
   }
}
#pragma warning restore 1591