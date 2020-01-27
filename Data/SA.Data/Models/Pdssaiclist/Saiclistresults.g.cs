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

namespace Infor.Sxe.SA.Data.Models.Pdssaiclist
{
   [ModelName("Infor.Sxe.SA.Data.Models.Pdssaiclist.Saiclistresults")]
   public partial class Saiclistresults : ModelBase
   {
      public int connectUsr { get; set; }
      [StringValidationAttribute]
      public string connectType { get; set; }
      [StringValidationAttribute]
      public string connectName { get; set; }
      [StringValidationAttribute]
      public string connectDevice { get; set; }
      [StringValidationAttribute]
      public string connectTime { get; set; }
      public int connectPid { get; set; }
      public int connectServer { get; set; }
      public int connectTransid { get; set; }
      [StringValidationAttribute]
      public string connectBatch { get; set; }
      [StringValidationAttribute]
      public string connectIpaddress { get; set; }
      [StringValidationAttribute]
      public string cGUID { get; set; }
      [StringValidationAttribute]
      public string cUserGroup { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Saiclistresults BuildSaiclistresultsFromRow(DataRow row)
      {
         Saiclistresults entity = new Saiclistresults();
         entity.connectUsr = row.IsNull("_connect-usr") ? 0 : row.Field<int>("_connect-usr");
         entity.connectType = row.IsNull("_connect-type") ? string.Empty : row.Field<string>("_connect-type");
         entity.connectName = row.IsNull("_connect-name") ? string.Empty : row.Field<string>("_connect-name");
         entity.connectDevice = row.IsNull("_connect-device") ? string.Empty : row.Field<string>("_connect-device");
         entity.connectTime = row.IsNull("_connect-time") ? string.Empty : row.Field<string>("_connect-time");
         entity.connectPid = row.IsNull("_connect-pid") ? 0 : row.Field<int>("_connect-pid");
         entity.connectServer = row.IsNull("_connect-server") ? 0 : row.Field<int>("_connect-server");
         entity.connectTransid = row.IsNull("_connect-transid") ? 0 : row.Field<int>("_connect-transid");
         entity.connectBatch = row.IsNull("_connect-batch") ? string.Empty : row.Field<string>("_connect-batch");
         entity.connectIpaddress = row.IsNull("_connect-ipaddress") ? string.Empty : row.Field<string>("_connect-ipaddress");
         entity.cGUID = row.IsNull("cGUID") ? string.Empty : row.Field<string>("cGUID");
         entity.cUserGroup = row.IsNull("cUserGroup") ? string.Empty : row.Field<string>("cUserGroup");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromSaiclistresults(ref DataRow row, Saiclistresults entity)
      {
         row.SetField("_connect-usr", entity.connectUsr);
         row.SetField("_connect-type", entity.connectType);
         row.SetField("_connect-name", entity.connectName);
         row.SetField("_connect-device", entity.connectDevice);
         row.SetField("_connect-time", entity.connectTime);
         row.SetField("_connect-pid", entity.connectPid);
         row.SetField("_connect-server", entity.connectServer);
         row.SetField("_connect-transid", entity.connectTransid);
         row.SetField("_connect-batch", entity.connectBatch);
         row.SetField("_connect-ipaddress", entity.connectIpaddress);
         row.SetField("cGUID", entity.cGUID);
         row.SetField("cUserGroup", entity.cUserGroup);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591