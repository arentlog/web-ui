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

namespace Infor.Sxe.Shared.Data.Models.Pdsaowarehousetransfers
{
   [ModelName("Infor.Sxe.Shared.Data.Models.Pdsaowarehousetransfers.Aowarehousetransfers")]
   public partial class Aowarehousetransfers : ModelBase
   {
      public int cono { get; set; }
      public bool intercofl { get; set; }
      [StringValidationAttribute]
      public string cAccount { get; set; }
      [StringValidationAttribute]
      public string cAccountDesc { get; set; }
      public int wtleadtm { get; set; }
      public int wtbostage { get; set; }
      public bool wtqtyrcvfl { get; set; }
      public bool wtnonstkfl { get; set; }
      [StringValidationAttribute]
      public string wtslentryty1 { get; set; }
      [StringValidationAttribute]
      public string wtslentryty2 { get; set; }
      public int wtrraraccp { get; set; }
      [StringValidationAttribute]
      public string wtpushlev { get; set; }
      public bool wtmrgrptfl { get; set; }
      public bool wtuseroqfl { get; set; }
      public bool wtpickheadfl { get; set; }
      public int wtpickfrmt { get; set; }
      public bool wtshipintautofl { get; set; }
      public bool wtlinemarkupaddons { get; set; }
      [StringValidationAttribute]
      public string wtlinemarkupcost { get; set; }
      public bool wtlinemarkupproduct { get; set; }
      public bool wtlinemarkupprodline { get; set; }
      public bool wtlinemarkupprodcat { get; set; }
      public bool wtlinemarkupprodprcty { get; set; }
      public bool wtlinemarkupaltprodgroup { get; set; }
      [StringValidationAttribute]
      public string wtlinemarkuphierarchycd { get; set; }
      [StringValidationAttribute]
      public string wtlinemarkuphierarchydflt { get; set; }
      [StringValidationAttribute]
      public string sascRowid { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }
      [StringValidationAttribute]
      public string pickTicketOutputType { get; set; }
      [StringValidationAttribute]
      public string pickTicketExtraDataLevel1 { get; set; }
      [StringValidationAttribute]
      public string pickTicketExtraDataLevel2 { get; set; }
      [StringValidationAttribute]
      public string pickTicketIDMDocTypeID { get; set; }
      [StringValidationAttribute]
      public string pickTicketIDMTemplateName { get; set; }
      [StringValidationAttribute]
      public string pickTicketIDMFromEmailAddr { get; set; }
      [StringValidationAttribute]
      public string pickTicketIDMFromEmailName { get; set; }
      [StringValidationAttribute]
      public string bulkPickTicketIDMDocTypeID { get; set; }
      [StringValidationAttribute]
      public string bulkPickTicketIDMTemplateName { get; set; }


      public static Aowarehousetransfers BuildAowarehousetransfersFromRow(DataRow row)
      {
         Aowarehousetransfers entity = new Aowarehousetransfers();
         entity.cono = row.IsNull("cono") ? 0 : row.Field<int>("cono");
         entity.intercofl = row.Field<bool>("intercofl");
         entity.cAccount = row.IsNull("cAccount") ? string.Empty : row.Field<string>("cAccount");
         entity.cAccountDesc = row.IsNull("cAccountDesc") ? string.Empty : row.Field<string>("cAccountDesc");
         entity.wtleadtm = row.IsNull("wtleadtm") ? 0 : row.Field<int>("wtleadtm");
         entity.wtbostage = row.IsNull("wtbostage") ? 0 : row.Field<int>("wtbostage");
         entity.wtqtyrcvfl = row.Field<bool>("wtqtyrcvfl");
         entity.wtnonstkfl = row.Field<bool>("wtnonstkfl");
         entity.wtslentryty1 = row.IsNull("wtslentryty1") ? string.Empty : row.Field<string>("wtslentryty1");
         entity.wtslentryty2 = row.IsNull("wtslentryty2") ? string.Empty : row.Field<string>("wtslentryty2");
         entity.wtrraraccp = row.IsNull("wtrraraccp") ? 0 : row.Field<int>("wtrraraccp");
         entity.wtpushlev = row.IsNull("wtpushlev") ? string.Empty : row.Field<string>("wtpushlev");
         entity.wtmrgrptfl = row.Field<bool>("wtmrgrptfl");
         entity.wtuseroqfl = row.Field<bool>("wtuseroqfl");
         entity.wtpickheadfl = row.Field<bool>("wtpickheadfl");
         entity.wtpickfrmt = row.IsNull("wtpickfrmt") ? 0 : row.Field<int>("wtpickfrmt");
         entity.wtshipintautofl = row.Field<bool>("wtshipintautofl");
         entity.wtlinemarkupaddons = row.Field<bool>("wtlinemarkupaddons");
         entity.wtlinemarkupcost = row.IsNull("wtlinemarkupcost") ? string.Empty : row.Field<string>("wtlinemarkupcost");
         entity.wtlinemarkupproduct = row.Field<bool>("wtlinemarkupproduct");
         entity.wtlinemarkupprodline = row.Field<bool>("wtlinemarkupprodline");
         entity.wtlinemarkupprodcat = row.Field<bool>("wtlinemarkupprodcat");
         entity.wtlinemarkupprodprcty = row.Field<bool>("wtlinemarkupprodprcty");
         entity.wtlinemarkupaltprodgroup = row.Field<bool>("wtlinemarkupaltprodgroup");
         entity.wtlinemarkuphierarchycd = row.IsNull("wtlinemarkuphierarchycd") ? string.Empty : row.Field<string>("wtlinemarkuphierarchycd");
         entity.wtlinemarkuphierarchydflt = row.IsNull("wtlinemarkuphierarchydflt") ? string.Empty : row.Field<string>("wtlinemarkuphierarchydflt");
         entity.sascRowid = row.Field<byte[]>("sasc-rowid").ToStringEncoded();
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         entity.pickTicketOutputType = row.IsNull("PickTicketOutputType") ? string.Empty : row.Field<string>("PickTicketOutputType");
         entity.pickTicketExtraDataLevel1 = row.IsNull("PickTicketExtraDataLevel1") ? string.Empty : row.Field<string>("PickTicketExtraDataLevel1");
         entity.pickTicketExtraDataLevel2 = row.IsNull("PickTicketExtraDataLevel2") ? string.Empty : row.Field<string>("PickTicketExtraDataLevel2");
         entity.pickTicketIDMDocTypeID = row.IsNull("PickTicketIDMDocTypeID") ? string.Empty : row.Field<string>("PickTicketIDMDocTypeID");
         entity.pickTicketIDMTemplateName = row.IsNull("PickTicketIDMTemplateName") ? string.Empty : row.Field<string>("PickTicketIDMTemplateName");
         entity.pickTicketIDMFromEmailAddr = row.IsNull("PickTicketIDMFromEmailAddr") ? string.Empty : row.Field<string>("PickTicketIDMFromEmailAddr");
         entity.pickTicketIDMFromEmailName = row.IsNull("PickTicketIDMFromEmailName") ? string.Empty : row.Field<string>("PickTicketIDMFromEmailName");
         entity.bulkPickTicketIDMDocTypeID = row.IsNull("BulkPickTicketIDMDocTypeID") ? string.Empty : row.Field<string>("BulkPickTicketIDMDocTypeID");
         entity.bulkPickTicketIDMTemplateName = row.IsNull("BulkPickTicketIDMTemplateName") ? string.Empty : row.Field<string>("BulkPickTicketIDMTemplateName");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromAowarehousetransfers(ref DataRow row, Aowarehousetransfers entity)
      {
         row.SetField("cono", entity.cono);
         row.SetField("intercofl", entity.intercofl);
         row.SetField("cAccount", entity.cAccount);
         row.SetField("cAccountDesc", entity.cAccountDesc);
         row.SetField("wtleadtm", entity.wtleadtm);
         row.SetField("wtbostage", entity.wtbostage);
         row.SetField("wtqtyrcvfl", entity.wtqtyrcvfl);
         row.SetField("wtnonstkfl", entity.wtnonstkfl);
         row.SetField("wtslentryty1", entity.wtslentryty1);
         row.SetField("wtslentryty2", entity.wtslentryty2);
         row.SetField("wtrraraccp", entity.wtrraraccp);
         row.SetField("wtpushlev", entity.wtpushlev);
         row.SetField("wtmrgrptfl", entity.wtmrgrptfl);
         row.SetField("wtuseroqfl", entity.wtuseroqfl);
         row.SetField("wtpickheadfl", entity.wtpickheadfl);
         row.SetField("wtpickfrmt", entity.wtpickfrmt);
         row.SetField("wtshipintautofl", entity.wtshipintautofl);
         row.SetField("wtlinemarkupaddons", entity.wtlinemarkupaddons);
         row.SetField("wtlinemarkupcost", entity.wtlinemarkupcost);
         row.SetField("wtlinemarkupproduct", entity.wtlinemarkupproduct);
         row.SetField("wtlinemarkupprodline", entity.wtlinemarkupprodline);
         row.SetField("wtlinemarkupprodcat", entity.wtlinemarkupprodcat);
         row.SetField("wtlinemarkupprodprcty", entity.wtlinemarkupprodprcty);
         row.SetField("wtlinemarkupaltprodgroup", entity.wtlinemarkupaltprodgroup);
         row.SetField("wtlinemarkuphierarchycd", entity.wtlinemarkuphierarchycd);
         row.SetField("wtlinemarkuphierarchydflt", entity.wtlinemarkuphierarchydflt);
         row.SetField("sasc-rowid", entity.sascRowid.ToByteArray());
         row.SetField("userfield", entity.userfield);
         row.SetField("PickTicketOutputType", entity.pickTicketOutputType);
         row.SetField("PickTicketExtraDataLevel1", entity.pickTicketExtraDataLevel1);
         row.SetField("PickTicketExtraDataLevel2", entity.pickTicketExtraDataLevel2);
         row.SetField("PickTicketIDMDocTypeID", entity.pickTicketIDMDocTypeID);
         row.SetField("PickTicketIDMTemplateName", entity.pickTicketIDMTemplateName);
         row.SetField("PickTicketIDMFromEmailAddr", entity.pickTicketIDMFromEmailAddr);
         row.SetField("PickTicketIDMFromEmailName", entity.pickTicketIDMFromEmailName);
         row.SetField("BulkPickTicketIDMDocTypeID", entity.bulkPickTicketIDMDocTypeID);
         row.SetField("BulkPickTicketIDMTemplateName", entity.bulkPickTicketIDMTemplateName);

      }
   
   }
}
#pragma warning restore 1591
