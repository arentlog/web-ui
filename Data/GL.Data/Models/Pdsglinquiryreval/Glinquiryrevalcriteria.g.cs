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

namespace Infor.Sxe.GL.Data.Models.Pdsglinquiryreval
{
   [ModelName("Infor.Sxe.GL.Data.Models.Pdsglinquiryreval.Glinquiryrevalcriteria")]
   public partial class Glinquiryrevalcriteria : ModelBase
   {
      public int jrnlno { get; set; }
      public int setno { get; set; }
      [StringValidationAttribute]
      public string sourcecd { get; set; }
      public int divno { get; set; }
      public int recordcountlimit { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Glinquiryrevalcriteria BuildGlinquiryrevalcriteriaFromRow(DataRow row)
      {
         Glinquiryrevalcriteria entity = new Glinquiryrevalcriteria();
         entity.jrnlno = row.IsNull("jrnlno") ? 0 : row.Field<int>("jrnlno");
         entity.setno = row.IsNull("setno") ? 0 : row.Field<int>("setno");
         entity.sourcecd = row.IsNull("sourcecd") ? string.Empty : row.Field<string>("sourcecd");
         entity.divno = row.IsNull("divno") ? 0 : row.Field<int>("divno");
         entity.recordcountlimit = row.IsNull("recordcountlimit") ? 0 : row.Field<int>("recordcountlimit");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromGlinquiryrevalcriteria(ref DataRow row, Glinquiryrevalcriteria entity)
      {
         row.SetField("jrnlno", entity.jrnlno);
         row.SetField("setno", entity.setno);
         row.SetField("sourcecd", entity.sourcecd);
         row.SetField("divno", entity.divno);
         row.SetField("recordcountlimit", entity.recordcountlimit);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
