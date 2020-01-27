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

namespace Infor.Sxe.Shared.Data.Models.Pdsreptwizardvalsapbva
{
   [ModelName("Infor.Sxe.Shared.Data.Models.Pdsreptwizardvalsapbva.Reptwizardvalsapbva")]
   public partial class Reptwizardvalsapbva : ModelBase
   {
      [StringValidationAttribute]
      public string currproc { get; set; }
      public int vano { get; set; }
      public int vasuf { get; set; }
      public int seqno { get; set; }
      [StringValidationAttribute]
      public string sctntype { get; set; }
      [StringValidationAttribute]
      public string sctncode { get; set; }
      [StringValidationAttribute]
      public string descrip { get; set; }
      [StringValidationAttribute]
      public string vatype { get; set; }
      [StringValidationAttribute]
      public string statustype { get; set; }


      public static Reptwizardvalsapbva BuildReptwizardvalsapbvaFromRow(DataRow row)
      {
         Reptwizardvalsapbva entity = new Reptwizardvalsapbva();
         entity.currproc = row.IsNull("currproc") ? string.Empty : row.Field<string>("currproc");
         entity.vano = row.IsNull("vano") ? 0 : row.Field<int>("vano");
         entity.vasuf = row.IsNull("vasuf") ? 0 : row.Field<int>("vasuf");
         entity.seqno = row.IsNull("seqno") ? 0 : row.Field<int>("seqno");
         entity.sctntype = row.IsNull("sctntype") ? string.Empty : row.Field<string>("sctntype");
         entity.sctncode = row.IsNull("sctncode") ? string.Empty : row.Field<string>("sctncode");
         entity.descrip = row.IsNull("descrip") ? string.Empty : row.Field<string>("descrip");
         entity.vatype = row.IsNull("vatype") ? string.Empty : row.Field<string>("vatype");
         entity.statustype = row.IsNull("statustype") ? string.Empty : row.Field<string>("statustype");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromReptwizardvalsapbva(ref DataRow row, Reptwizardvalsapbva entity)
      {
         row.SetField("currproc", entity.currproc);
         row.SetField("vano", entity.vano);
         row.SetField("vasuf", entity.vasuf);
         row.SetField("seqno", entity.seqno);
         row.SetField("sctntype", entity.sctntype);
         row.SetField("sctncode", entity.sctncode);
         row.SetField("descrip", entity.descrip);
         row.SetField("vatype", entity.vatype);
         row.SetField("statustype", entity.statustype);

      }
   
   }
}
#pragma warning restore 1591
