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
using Infor.Sxe.Common.Data.Models.KP;
   

namespace Infor.Sxe.KP.Data.Models.Pdskpet
{
   [ModelName("Infor.Sxe.KP.Data.Models.Pdskpet.Kpet")]
   public partial class Kpet : KpetBase
   {
      public Icsp icspes { get; set; }


      public Kpet()
      {

      }

   
      /// <summary>
      /// Build a class from a database row
      /// </summary>   
      public static Kpet BuildKpetFromRow(DataRow row)
      {
         var entity = BuildKpetBaseFromRow<Kpet>(row);
         
         if (entity!=null)
         {
            var childRowP_ttblicsp  =  row.GetChildRows("P_ttblicsp").FirstOrDefault();
            if (childRowP_ttblicsp != null)
            {
               entity.icspes = (Icsp)SetKeyFields(entity, Icsp.BuildIcspFromRow(childRowP_ttblicsp), "cono,shipprod", "cono,prod");
            }
         }
         return entity;
      }

      /// <summary>
      /// Build a minimal row from a class (key fields only)
      /// </summary>
      public static void BuildMinimalRow(ref DataRow row, Kpet entity)
      {
         KpetBase.BuildMinimalRow(ref row, entity);
      }
      
      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromKpet(ref DataRow row, Kpet entity)
      {
         UpdateRowFromKpetBase(ref row, entity);
      }
   
   }
}
#pragma warning restore 1591