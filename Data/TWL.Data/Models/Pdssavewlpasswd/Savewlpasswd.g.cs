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

namespace Infor.Sxe.TWL.Data.Models.Pdssavewlpasswd
{
   [ModelName("Infor.Sxe.TWL.Data.Models.Pdssavewlpasswd.Savewlpasswd")]
   public partial class Savewlpasswd : ModelBase
   {
      public int pwmaxdays { get; set; }
      public int pwmindays { get; set; }
      public int pwmaxlength { get; set; }
      public int pwminlength { get; set; }
      public int pwminalpha { get; set; }
      public int pwminnumeric { get; set; }
      public int pwminspecial { get; set; }
      public int pwminprev { get; set; }
      [StringValidationAttribute]
      public string empNum { get; set; }
      [StringValidationAttribute]
      public string savewlpasswduserfield { get; set; }


      public static Savewlpasswd BuildSavewlpasswdFromRow(DataRow row)
      {
         Savewlpasswd entity = new Savewlpasswd();
         entity.pwmaxdays = row.IsNull("pwmaxdays") ? 0 : row.Field<int>("pwmaxdays");
         entity.pwmindays = row.IsNull("pwmindays") ? 0 : row.Field<int>("pwmindays");
         entity.pwmaxlength = row.IsNull("pwmaxlength") ? 0 : row.Field<int>("pwmaxlength");
         entity.pwminlength = row.IsNull("pwminlength") ? 0 : row.Field<int>("pwminlength");
         entity.pwminalpha = row.IsNull("pwminalpha") ? 0 : row.Field<int>("pwminalpha");
         entity.pwminnumeric = row.IsNull("pwminnumeric") ? 0 : row.Field<int>("pwminnumeric");
         entity.pwminspecial = row.IsNull("pwminspecial") ? 0 : row.Field<int>("pwminspecial");
         entity.pwminprev = row.IsNull("pwminprev") ? 0 : row.Field<int>("pwminprev");
         entity.empNum = row.IsNull("emp_num") ? string.Empty : row.Field<string>("emp_num");
         entity.savewlpasswduserfield = row.IsNull("savewlpasswduserfield") ? string.Empty : row.Field<string>("savewlpasswduserfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromSavewlpasswd(ref DataRow row, Savewlpasswd entity)
      {
         row.SetField("pwmaxdays", entity.pwmaxdays);
         row.SetField("pwmindays", entity.pwmindays);
         row.SetField("pwmaxlength", entity.pwmaxlength);
         row.SetField("pwminlength", entity.pwminlength);
         row.SetField("pwminalpha", entity.pwminalpha);
         row.SetField("pwminnumeric", entity.pwminnumeric);
         row.SetField("pwminspecial", entity.pwminspecial);
         row.SetField("pwminprev", entity.pwminprev);
         row.SetField("emp_num", entity.empNum);
         row.SetField("savewlpasswduserfield", entity.savewlpasswduserfield);

      }
   
   }
}
#pragma warning restore 1591
