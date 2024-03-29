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

namespace Infor.Sxe.GL.Data.Models.PdsContext
{
   [ModelName("Infor.Sxe.GL.Data.Models.PdsContext.Context")]
   public partial class Context : ModelBase
   {
      [StringValidationAttribute]
      public string contextTaskId { get; set; }
      [StringValidationAttribute]
      public string contextName { get; set; }
      [StringValidationAttribute]
      public string contextValue { get; set; }


      public static Context BuildContextFromRow(DataRow row)
      {
         Context entity = new Context();
         entity.contextTaskId = row.IsNull("ContextTaskId") ? string.Empty : row.Field<string>("ContextTaskId");
         entity.contextName = row.IsNull("ContextName") ? string.Empty : row.Field<string>("ContextName");
         entity.contextValue = row.IsNull("ContextValue") ? string.Empty : row.Field<string>("ContextValue");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromContext(ref DataRow row, Context entity)
      {
         row.SetField("ContextTaskId", entity.contextTaskId);
         row.SetField("ContextName", entity.contextName);
         row.SetField("ContextValue", entity.contextValue);

      }
   
   }
}
#pragma warning restore 1591
