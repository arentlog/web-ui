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

namespace Infor.Sxe.IC.Data.Models.Pdsicsvcontrol
{
   [ModelName("Infor.Sxe.IC.Data.Models.Pdsicsvcontrol.Icsvcontrol")]
   public partial class Icsvcontrol : ModelBase
   {
      [StringValidationAttribute]
      public string upcdelim { get; set; }
      [StringValidationAttribute]
      public string upcprompt { get; set; }
      [StringValidationAttribute]
      public string upclabel1 { get; set; }
      [StringValidationAttribute]
      public string upclabel2 { get; set; }
      [StringValidationAttribute]
      public string upclabel3 { get; set; }
      [StringValidationAttribute]
      public string upclabel4 { get; set; }
      [StringValidationAttribute]
      public string upclabel5 { get; set; }
      [StringValidationAttribute]
      public string upclabel6 { get; set; }
      public int upclength1 { get; set; }
      public int upclength2 { get; set; }
      public int upclength3 { get; set; }
      public int upclength4 { get; set; }
      public int upclength5 { get; set; }
      public int upclength6 { get; set; }
      public bool upclabel1hidden { get; set; }
      public bool upclabel2hidden { get; set; }
      public bool upclabel3hidden { get; set; }
      public bool upclabel4hidden { get; set; }
      public bool upclabel5hidden { get; set; }
      public bool upclabel6hidden { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Icsvcontrol BuildIcsvcontrolFromRow(DataRow row)
      {
         Icsvcontrol entity = new Icsvcontrol();
         entity.upcdelim = row.IsNull("upcdelim") ? string.Empty : row.Field<string>("upcdelim");
         entity.upcprompt = row.IsNull("upcprompt") ? string.Empty : row.Field<string>("upcprompt");
         entity.upclabel1 = row.IsNull("upclabel1") ? string.Empty : row.Field<string>("upclabel1");
         entity.upclabel2 = row.IsNull("upclabel2") ? string.Empty : row.Field<string>("upclabel2");
         entity.upclabel3 = row.IsNull("upclabel3") ? string.Empty : row.Field<string>("upclabel3");
         entity.upclabel4 = row.IsNull("upclabel4") ? string.Empty : row.Field<string>("upclabel4");
         entity.upclabel5 = row.IsNull("upclabel5") ? string.Empty : row.Field<string>("upclabel5");
         entity.upclabel6 = row.IsNull("upclabel6") ? string.Empty : row.Field<string>("upclabel6");
         entity.upclength1 = row.IsNull("upclength1") ? 0 : row.Field<int>("upclength1");
         entity.upclength2 = row.IsNull("upclength2") ? 0 : row.Field<int>("upclength2");
         entity.upclength3 = row.IsNull("upclength3") ? 0 : row.Field<int>("upclength3");
         entity.upclength4 = row.IsNull("upclength4") ? 0 : row.Field<int>("upclength4");
         entity.upclength5 = row.IsNull("upclength5") ? 0 : row.Field<int>("upclength5");
         entity.upclength6 = row.IsNull("upclength6") ? 0 : row.Field<int>("upclength6");
         entity.upclabel1hidden = row.Field<bool>("upclabel1hidden");
         entity.upclabel2hidden = row.Field<bool>("upclabel2hidden");
         entity.upclabel3hidden = row.Field<bool>("upclabel3hidden");
         entity.upclabel4hidden = row.Field<bool>("upclabel4hidden");
         entity.upclabel5hidden = row.Field<bool>("upclabel5hidden");
         entity.upclabel6hidden = row.Field<bool>("upclabel6hidden");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromIcsvcontrol(ref DataRow row, Icsvcontrol entity)
      {
         row.SetField("upcdelim", entity.upcdelim);
         row.SetField("upcprompt", entity.upcprompt);
         row.SetField("upclabel1", entity.upclabel1);
         row.SetField("upclabel2", entity.upclabel2);
         row.SetField("upclabel3", entity.upclabel3);
         row.SetField("upclabel4", entity.upclabel4);
         row.SetField("upclabel5", entity.upclabel5);
         row.SetField("upclabel6", entity.upclabel6);
         row.SetField("upclength1", entity.upclength1);
         row.SetField("upclength2", entity.upclength2);
         row.SetField("upclength3", entity.upclength3);
         row.SetField("upclength4", entity.upclength4);
         row.SetField("upclength5", entity.upclength5);
         row.SetField("upclength6", entity.upclength6);
         row.SetField("upclabel1hidden", entity.upclabel1hidden);
         row.SetField("upclabel2hidden", entity.upclabel2hidden);
         row.SetField("upclabel3hidden", entity.upclabel3hidden);
         row.SetField("upclabel4hidden", entity.upclabel4hidden);
         row.SetField("upclabel5hidden", entity.upclabel5hidden);
         row.SetField("upclabel6hidden", entity.upclabel6hidden);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591