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

namespace Infor.Sxe.OE.Data.Models.Pdsoeioloadordtax
{
   [ModelName("Infor.Sxe.OE.Data.Models.Pdsoeioloadordtax.Oeioloadordtax")]
   public partial class Oeioloadordtax : ModelBase
   {
      [StringValidationAttribute]
      public string cTaxMethodTy { get; set; }
      [StringValidationAttribute]
      public string nontaxtext { get; set; }
      [StringValidationAttribute]
      public string taxovertext { get; set; }
      [StringValidationAttribute]
      public string taxdefaulttext { get; set; }
      [StringValidationAttribute]
      public string spectaxcd { get; set; }
      public bool spectaxcdhidden { get; set; }
      [StringValidationAttribute]
      public string statecd { get; set; }
      public bool statecdhidden { get; set; }
      [StringValidationAttribute]
      public string statecdlabel { get; set; }
      [StringValidationAttribute]
      public string taxauth { get; set; }
      public bool taxauthhidden { get; set; }
      [StringValidationAttribute]
      public string pstlicenseno { get; set; }
      public bool pstlicensenohidden { get; set; }
      public decimal gsttaxamount { get; set; }
      public bool gsttaxamounthidden { get; set; }
      [StringValidationAttribute]
      public string gsttaxamountlabel { get; set; }
      public decimal psttaxamount { get; set; }
      public bool psttaxamounthidden { get; set; }
      [StringValidationAttribute]
      public string psttaxamountlabel { get; set; }
      [StringValidationAttribute]
      public string txtlabel { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Oeioloadordtax BuildOeioloadordtaxFromRow(DataRow row)
      {
         Oeioloadordtax entity = new Oeioloadordtax();
         entity.cTaxMethodTy = row.IsNull("cTaxMethodTy") ? string.Empty : row.Field<string>("cTaxMethodTy");
         entity.nontaxtext = row.IsNull("nontaxtext") ? string.Empty : row.Field<string>("nontaxtext");
         entity.taxovertext = row.IsNull("taxovertext") ? string.Empty : row.Field<string>("taxovertext");
         entity.taxdefaulttext = row.IsNull("taxdefaulttext") ? string.Empty : row.Field<string>("taxdefaulttext");
         entity.spectaxcd = row.IsNull("spectaxcd") ? string.Empty : row.Field<string>("spectaxcd");
         entity.spectaxcdhidden = row.Field<bool>("spectaxcdhidden");
         entity.statecd = row.IsNull("statecd") ? string.Empty : row.Field<string>("statecd");
         entity.statecdhidden = row.Field<bool>("statecdhidden");
         entity.statecdlabel = row.IsNull("statecdlabel") ? string.Empty : row.Field<string>("statecdlabel");
         entity.taxauth = row.IsNull("taxauth") ? string.Empty : row.Field<string>("taxauth");
         entity.taxauthhidden = row.Field<bool>("taxauthhidden");
         entity.pstlicenseno = row.IsNull("pstlicenseno") ? string.Empty : row.Field<string>("pstlicenseno");
         entity.pstlicensenohidden = row.Field<bool>("pstlicensenohidden");
         entity.gsttaxamount = row.IsNull("gsttaxamount") ? decimal.Zero : row.Field<decimal>("gsttaxamount");
         entity.gsttaxamounthidden = row.Field<bool>("gsttaxamounthidden");
         entity.gsttaxamountlabel = row.IsNull("gsttaxamountlabel") ? string.Empty : row.Field<string>("gsttaxamountlabel");
         entity.psttaxamount = row.IsNull("psttaxamount") ? decimal.Zero : row.Field<decimal>("psttaxamount");
         entity.psttaxamounthidden = row.Field<bool>("psttaxamounthidden");
         entity.psttaxamountlabel = row.IsNull("psttaxamountlabel") ? string.Empty : row.Field<string>("psttaxamountlabel");
         entity.txtlabel = row.IsNull("txtlabel") ? string.Empty : row.Field<string>("txtlabel");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromOeioloadordtax(ref DataRow row, Oeioloadordtax entity)
      {
         row.SetField("cTaxMethodTy", entity.cTaxMethodTy);
         row.SetField("nontaxtext", entity.nontaxtext);
         row.SetField("taxovertext", entity.taxovertext);
         row.SetField("taxdefaulttext", entity.taxdefaulttext);
         row.SetField("spectaxcd", entity.spectaxcd);
         row.SetField("spectaxcdhidden", entity.spectaxcdhidden);
         row.SetField("statecd", entity.statecd);
         row.SetField("statecdhidden", entity.statecdhidden);
         row.SetField("statecdlabel", entity.statecdlabel);
         row.SetField("taxauth", entity.taxauth);
         row.SetField("taxauthhidden", entity.taxauthhidden);
         row.SetField("pstlicenseno", entity.pstlicenseno);
         row.SetField("pstlicensenohidden", entity.pstlicensenohidden);
         row.SetField("gsttaxamount", entity.gsttaxamount);
         row.SetField("gsttaxamounthidden", entity.gsttaxamounthidden);
         row.SetField("gsttaxamountlabel", entity.gsttaxamountlabel);
         row.SetField("psttaxamount", entity.psttaxamount);
         row.SetField("psttaxamounthidden", entity.psttaxamounthidden);
         row.SetField("psttaxamountlabel", entity.psttaxamountlabel);
         row.SetField("txtlabel", entity.txtlabel);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591