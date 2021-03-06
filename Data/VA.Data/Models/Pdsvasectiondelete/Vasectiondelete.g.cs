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

namespace Infor.Sxe.VA.Data.Models.Pdsvasectiondelete
{
   [ModelName("Infor.Sxe.VA.Data.Models.Pdsvasectiondelete.Vasectiondelete")]
   public partial class Vasectiondelete : ModelBase
   {
      public int vano { get; set; }
      public int vasuf { get; set; }
      public int seqno { get; set; }
      [StringValidationAttribute]
      public string mode { get; set; }
      public bool skipfl { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Vasectiondelete BuildVasectiondeleteFromRow(DataRow row)
      {
         Vasectiondelete entity = new Vasectiondelete();
         entity.vano = row.IsNull("vano") ? 0 : row.Field<int>("vano");
         entity.vasuf = row.IsNull("vasuf") ? 0 : row.Field<int>("vasuf");
         entity.seqno = row.IsNull("seqno") ? 0 : row.Field<int>("seqno");
         entity.mode = row.IsNull("mode") ? string.Empty : row.Field<string>("mode");
         entity.skipfl = row.Field<bool>("skipfl");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromVasectiondelete(ref DataRow row, Vasectiondelete entity)
      {
         row.SetField("vano", entity.vano);
         row.SetField("vasuf", entity.vasuf);
         row.SetField("seqno", entity.seqno);
         row.SetField("mode", entity.mode);
         row.SetField("skipfl", entity.skipfl);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
