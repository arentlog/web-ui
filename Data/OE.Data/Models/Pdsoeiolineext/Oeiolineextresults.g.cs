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

namespace Infor.Sxe.OE.Data.Models.Pdsoeiolineext
{
   [ModelName("Infor.Sxe.OE.Data.Models.Pdsoeiolineext.Oeiolineextresults")]
   public partial class Oeiolineextresults : ModelBase
   {
      public int crrmorderno { get; set; }
      public int crrmordersuf { get; set; }
      public int jrnlno { get; set; }
      [StringValidationAttribute]
      public string crnotesfl { get; set; }
      [StringValidationAttribute]
      public string transtype { get; set; }
      public int stagecd { get; set; }
      public int crlineno { get; set; }
      [StringValidationAttribute]
      public string specsnstype { get; set; }
      public bool crcommentfl { get; set; }
      [StringValidationAttribute]
      public string prod { get; set; }
      public decimal cqtyord { get; set; }
      public decimal cqtyship { get; set; }
      public decimal cprice { get; set; }
      [StringValidationAttribute]
      public string cunit { get; set; }
      public decimal cnetamt { get; set; }
      public decimal cdiscamt { get; set; }
      public decimal rebateamt { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Oeiolineextresults BuildOeiolineextresultsFromRow(DataRow row)
      {
         Oeiolineextresults entity = new Oeiolineextresults();
         entity.crrmorderno = row.IsNull("crrmorderno") ? 0 : row.Field<int>("crrmorderno");
         entity.crrmordersuf = row.IsNull("crrmordersuf") ? 0 : row.Field<int>("crrmordersuf");
         entity.jrnlno = row.IsNull("jrnlno") ? 0 : row.Field<int>("jrnlno");
         entity.crnotesfl = row.IsNull("crnotesfl") ? string.Empty : row.Field<string>("crnotesfl");
         entity.transtype = row.IsNull("transtype") ? string.Empty : row.Field<string>("transtype");
         entity.stagecd = row.IsNull("stagecd") ? 0 : row.Field<int>("stagecd");
         entity.crlineno = row.IsNull("crlineno") ? 0 : row.Field<int>("crlineno");
         entity.specsnstype = row.IsNull("specsnstype") ? string.Empty : row.Field<string>("specsnstype");
         entity.crcommentfl = row.Field<bool>("crcommentfl");
         entity.prod = row.IsNull("prod") ? string.Empty : row.Field<string>("prod");
         entity.cqtyord = row.IsNull("cqtyord") ? decimal.Zero : row.Field<decimal>("cqtyord");
         entity.cqtyship = row.IsNull("cqtyship") ? decimal.Zero : row.Field<decimal>("cqtyship");
         entity.cprice = row.IsNull("cprice") ? decimal.Zero : row.Field<decimal>("cprice");
         entity.cunit = row.IsNull("cunit") ? string.Empty : row.Field<string>("cunit");
         entity.cnetamt = row.IsNull("cnetamt") ? decimal.Zero : row.Field<decimal>("cnetamt");
         entity.cdiscamt = row.IsNull("cdiscamt") ? decimal.Zero : row.Field<decimal>("cdiscamt");
         entity.rebateamt = row.IsNull("rebateamt") ? decimal.Zero : row.Field<decimal>("rebateamt");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromOeiolineextresults(ref DataRow row, Oeiolineextresults entity)
      {
         row.SetField("crrmorderno", entity.crrmorderno);
         row.SetField("crrmordersuf", entity.crrmordersuf);
         row.SetField("jrnlno", entity.jrnlno);
         row.SetField("crnotesfl", entity.crnotesfl);
         row.SetField("transtype", entity.transtype);
         row.SetField("stagecd", entity.stagecd);
         row.SetField("crlineno", entity.crlineno);
         row.SetField("specsnstype", entity.specsnstype);
         row.SetField("crcommentfl", entity.crcommentfl);
         row.SetField("prod", entity.prod);
         row.SetField("cqtyord", entity.cqtyord);
         row.SetField("cqtyship", entity.cqtyship);
         row.SetField("cprice", entity.cprice);
         row.SetField("cunit", entity.cunit);
         row.SetField("cnetamt", entity.cnetamt);
         row.SetField("cdiscamt", entity.cdiscamt);
         row.SetField("rebateamt", entity.rebateamt);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
