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

namespace Infor.Sxe.VA.Data.Models.Pdsvasectionlookup
{
   [ModelName("Infor.Sxe.VA.Data.Models.Pdsvasectionlookup.Vasectionlookupcriteria")]
   public partial class Vasectionlookupcriteria : ModelBase
   {
      public bool activeonly { get; set; }
      public int vano { get; set; }
      public int vasuf { get; set; }
      public int seqno { get; set; }
      public int recordcountlimit { get; set; }


      public static Vasectionlookupcriteria BuildVasectionlookupcriteriaFromRow(DataRow row)
      {
         Vasectionlookupcriteria entity = new Vasectionlookupcriteria();
         entity.activeonly = row.Field<bool>("activeonly");
         entity.vano = row.IsNull("vano") ? 0 : row.Field<int>("vano");
         entity.vasuf = row.IsNull("vasuf") ? 0 : row.Field<int>("vasuf");
         entity.seqno = row.IsNull("seqno") ? 0 : row.Field<int>("seqno");
         entity.recordcountlimit = row.IsNull("recordcountlimit") ? 0 : row.Field<int>("recordcountlimit");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromVasectionlookupcriteria(ref DataRow row, Vasectionlookupcriteria entity)
      {
         row.SetField("activeonly", entity.activeonly);
         row.SetField("vano", entity.vano);
         row.SetField("vasuf", entity.vasuf);
         row.SetField("seqno", entity.seqno);
         row.SetField("recordcountlimit", entity.recordcountlimit);

      }
   
   }
}
#pragma warning restore 1591
