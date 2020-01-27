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

namespace Infor.Sxe.AP.Data.Models.Pdsapeiinvdeterrors
{
   [ModelName("Infor.Sxe.AP.Data.Models.Pdsapeiinvdeterrors.Apeiinvdeterrors")]
   public partial class Apeiinvdeterrors : ModelBase
   {
      [StringValidationAttribute]
      public string errortype { get; set; }
      public int errornumber { get; set; }
      [StringValidationAttribute]
      public string errormessage { get; set; }
      [StringValidationAttribute]
      public string errordata { get; set; }
      public int seqno { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Apeiinvdeterrors BuildApeiinvdeterrorsFromRow(DataRow row)
      {
         Apeiinvdeterrors entity = new Apeiinvdeterrors();
         entity.errortype = row.IsNull("errortype") ? string.Empty : row.Field<string>("errortype");
         entity.errornumber = row.IsNull("errornumber") ? 0 : row.Field<int>("errornumber");
         entity.errormessage = row.IsNull("errormessage") ? string.Empty : row.Field<string>("errormessage");
         entity.errordata = row.IsNull("errordata") ? string.Empty : row.Field<string>("errordata");
         entity.seqno = row.IsNull("seqno") ? 0 : row.Field<int>("seqno");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromApeiinvdeterrors(ref DataRow row, Apeiinvdeterrors entity)
      {
         row.SetField("errortype", entity.errortype);
         row.SetField("errornumber", entity.errornumber);
         row.SetField("errormessage", entity.errormessage);
         row.SetField("errordata", entity.errordata);
         row.SetField("seqno", entity.seqno);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591