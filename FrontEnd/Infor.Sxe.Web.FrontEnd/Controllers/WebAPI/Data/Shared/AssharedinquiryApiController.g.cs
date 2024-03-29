//------------------------------------------------------------------------------
// 
//     This code was generated by a tool.
//     Template version $Rev: 7622 $
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
//
//     (c) Infor Global Solutions 2018
// 
//------------------------------------------------------------------------------

#pragma warning disable 1591
using System;
using System.Collections.Generic;
using System.Web.Http;
using ServiceInterfaceClient.BaseClasses;
    
namespace Infor.Sxe.Web.FrontEnd.Controllers.WebAPI.Data.Shared
{  
   using Sxe.Shared.Data.Models.PdsContext;
   using Sxe.Shared.Data.Models.Pdscoresretorddet;
   using Sxe.Shared.Data.Models.Pdsgetaddrcontact;
   using Sxe.Shared.Data.Models.Pdsuserfieldsdefn;
   using Sxe.Shared.Data.Models.Pdstablecodealpha;
   using Sxe.Shared.Data.Models.Pdstablecodenumeric;
   using Sxe.Shared.Data.Models.Pdsuserlist;
   using Sxe.Shared.Data.Models.Pdsthirdpartyverify;
   using Sxe.Shared.Data.Models.Pdstiatcaddress;
   using Sxe.Shared.Data.Models.Pdstiatctax;
   using Sxe.Shared.Data.Models.Pdstiatdaddress;
   using Sxe.Shared.Data.Models.Pdscenposvars;
   using Sxe.Shared.Data.Models.Pdsccrecoversingle;
   using Sxe.Shared.Data.Models.Pdsdcaosrecord;
   using Sxe.Shared.Data.Models.Pdswebextendrecord;
   using Sxe.Shared.Data.Models.Pdswebextendcriteria;
   using Sxe.Shared.Data.Models.Pdswebextendupdatestatus;
   using Sxe.Shared.Data.Models.Complex;
   using Sxe.Shared.Data.Repositories;
    
   [RoutePrefix("api/shared/assharedinquiry")]
   public partial class AssharedinquiryApiController : ApiControllerBase
   {
      private readonly AssharedinquiryRepository repository;
    
      public AssharedinquiryApiController(AssharedinquiryRepository repository)
      {
         this.repository = repository;
         this.OnCreated();
      }
    
      partial void OnCreated();
    
      
      [Route("cenposcheckrecord")]
      [HttpGet]
      public bool CenPOSCheckRecord()
      {
         return this.repository.CenPOSCheckRecord();
      } 
  
      
      [Route("cenposclearrecord")]
      [HttpGet]
      public void CenPOSClearRecord()
      {
         this.repository.CenPOSClearRecord();
      } 
  
      
      [Route("cenposlogurl/{cURL}")]
      [HttpGet]
      public void CenPOSLogURL(string cURL)
      {
         this.repository.CenPOSLogURL(cURL);
      } 
  
      
      [Route("cenposlogtimeout")]
      [HttpGet]
      public void CenPOSLogTimeout()
      {
         this.repository.CenPOSLogTimeout();
      } 
  
      
      [Route("coresreturnorderdetails")]
      [HttpPost]
      public IEnumerable<Coresretorddetresults> CoresReturnOrderDetails(Coresretorddetcriteria coresretorddetcriteria)
      {
         return this.repository.CoresReturnOrderDetails(coresretorddetcriteria);
      } 
  
      
      [Route("getaddresscontact")]
      [HttpPost]
      public Getaddrcontactresults GetAddressContact(Getaddrcontactcriteria getaddrcontactcriteria)
      {
         return this.repository.GetAddressContact(getaddrcontactcriteria);
      } 
  
      
      [Route("getuserfieldsmetadata")]
      [HttpPost]
      public IEnumerable<Userfieldsdefnresults> GetUserFieldsMetaData(Userfieldsdefncriteria userfieldsdefncriteria)
      {
         return this.repository.GetUserFieldsMetaData(userfieldsdefncriteria);
      } 
  
      
      [Route("senddrillbackrequest/{cIONUserID}/{cDrillBackString}")]
      [HttpGet]
      public void SendDrillBackRequest(string cIONUserID, string cDrillBackString)
      {
         this.repository.SendDrillBackRequest(cIONUserID, cDrillBackString);
      } 
  
      
      [Route("tablecodealphanumeric/{cCodeType}")]
      [HttpGet]
      public IEnumerable<Tablecodealpha> TableCodeAlphanumeric(string cCodeType)
      {
         return this.repository.TableCodeAlphanumeric(cCodeType);
      } 
  
      
      [Route("tablecodenumeric/{cCodeType}")]
      [HttpGet]
      public IEnumerable<Tablecodenumeric> TableCodeNumeric(string cCodeType)
      {
         return this.repository.TableCodeNumeric(cCodeType);
      } 
  
      
      [Route("getuserlist/{cOperBegins}/{cNameBegins}/{cDeptBegins}")]
      [HttpGet]
      public IEnumerable<Userlist> GetUserList(string cOperBegins, string cNameBegins, string cDeptBegins)
      {
         return this.repository.GetUserList(cOperBegins, cNameBegins, cDeptBegins);
      } 
  
      
      [Route("getsingleuser/{cUserid}")]
      [HttpGet]
      public Userlist GetSingleUser(string cUserid)
      {
         return this.repository.GetSingleUser(cUserid);
      } 
  
      
      [Route("getsxversionnumbers")]
      [HttpGet]
      public AssharedinquiryGetSXVersionNumbersResponseAPI GetSXVersionNumbers()
      {
         return this.repository.GetSXVersionNumbers();
      } 
  
      
      [Route("thirdpartyverify")]
      [HttpPost]
      public Thirdpartyverify ThirdPartyVerify(Thirdpartyverify thirdpartyverify)
      {
         return this.repository.ThirdPartyVerify(thirdpartyverify);
      } 
  
      
      [Route("tiatccalculate")]
      [HttpPost]
      public Tiatctax TIATCCalculate(Tiatcaddress tiatcaddress)
      {
         return this.repository.TIATCCalculate(tiatcaddress);
      } 
  
      
      [Route("tiatcload")]
      [HttpGet]
      public Tiatcaddress TIATCLoad()
      {
         return this.repository.TIATCLoad();
      } 
  
      
      [Route("tiatdcalculate")]
      [HttpPost]
      public Tiatctax TIATDCalculate(Tiatdaddress tiatdaddress)
      {
         return this.repository.TIATDCalculate(tiatdaddress);
      } 
  
      
      [Route("tiatdfieldchange")]
      [HttpPost]
      public Tiatdaddress TIATDFieldChange(AssharedinquiryTIATDFieldChangeRequestAPI AssharedinquiryTIATDFieldChangeRequestAPI)
      {
         return this.repository.TIATDFieldChange(AssharedinquiryTIATDFieldChangeRequestAPI);
      } 
  
      
      [Route("tiatdload")]
      [HttpGet]
      public Tiatdaddress TIATDLoad()
      {
         return this.repository.TIATDLoad();
      } 
  
      
      [Route("cenpostokengenerate")]
      [HttpPost]
      public void CenPOSTokenGenerate(Cenposvars cenposvars)
      {
         this.repository.CenPOSTokenGenerate(cenposvars);
      } 
  
      
      [Route("getnextsequence/{cSequenceName}")]
      [HttpGet]
      public long GetNextSequence(string cSequenceName)
      {
         return this.repository.GetNextSequence(cSequenceName);
      } 
  
      
      [Route("getcurrentsequence/{cSequenceName}")]
      [HttpGet]
      public long GetCurrentSequence(string cSequenceName)
      {
         return this.repository.GetCurrentSequence(cSequenceName);
      } 
  
      
      [Route("ccrecovercreate")]
      [HttpPost]
      public void CCRecoverCreate(Ccrecoversingle ccrecoversingle)
      {
         this.repository.CCRecoverCreate(ccrecoversingle);
      } 
  
      
      [Route("ccrecoverdelete")]
      [HttpGet]
      public void CCRecoverDelete()
      {
         this.repository.CCRecoverDelete();
      } 
  
      
      [Route("ccrecovercheck")]
      [HttpGet]
      public void CCRecoverCheck()
      {
         this.repository.CCRecoverCheck();
      } 
  
      
      [Route("dcaossearch/{cAdminID}")]
      [HttpGet]
      public IEnumerable<Dcaosrecord> DCAOSSearch(string cAdminID)
      {
         return this.repository.DCAOSSearch(cAdminID);
      } 
  
      
      [Route("dcaoscreate")]
      [HttpPost]
      public Dcaosrecord DCAOSCreate(Dcaosrecord dcaosrecord)
      {
         return this.repository.DCAOSCreate(dcaosrecord);
      } 
  
      
      [Route("dcaosretrieve")]
      [HttpPost]
      public Dcaosrecord DCAOSRetrieve(Dcaosrecord dcaosrecord)
      {
         return this.repository.DCAOSRetrieve(dcaosrecord);
      } 
  
      
      [Route("dcaosdelete")]
      [HttpPost]
      public Dcaosrecord DCAOSDelete(Dcaosrecord dcaosrecord)
      {
         return this.repository.DCAOSDelete(dcaosrecord);
      } 
  
      
      [Route("dcaosupdate")]
      [HttpPost]
      public Dcaosrecord DCAOSUpdate(Dcaosrecord dcaosrecord)
      {
         return this.repository.DCAOSUpdate(dcaosrecord);
      } 
  
      
      [Route("webextensioncreate")]
      [HttpPost]
      public Webextendrecord WebExtensionCreate(Webextendrecord webextendrecord)
      {
         return this.repository.WebExtensionCreate(webextendrecord);
      } 
  
      
      [Route("getactivewebextension")]
      [HttpPost]
      public Webextendrecord GetActiveWebExtension(Webextendcriteria webextendcriteria)
      {
         return this.repository.GetActiveWebExtension(webextendcriteria);
      } 
  
      
      [Route("webextensiondelete")]
      [HttpPost]
      public void WebExtensionDelete(IEnumerable<Webextendrecord> webextendrecord)
      {
         this.repository.WebExtensionDelete(webextendrecord);
      } 
  
      
      [Route("webextensionupdate")]
      [HttpPost]
      public void WebExtensionUpdate(Webextendrecord webextendrecord)
      {
         this.repository.WebExtensionUpdate(webextendrecord);
      } 
  
      
      [Route("getwebextensionlist")]
      [HttpPost]
      public AssharedinquiryGetWebExtensionListResponseAPI GetWebExtensionList(Webextendcriteria webextendcriteria)
      {
         return this.repository.GetWebExtensionList(webextendcriteria);
      } 
  
      
      [Route("webextensionretrieve")]
      [HttpPost]
      public Webextendrecord WebExtensionRetrieve(Webextendcriteria webextendcriteria)
      {
         return this.repository.WebExtensionRetrieve(webextendcriteria);
      } 
  
      
      [Route("getactivejavascriptwebextension")]
      [HttpPost]
      public IEnumerable<Webextendrecord> GetActiveJavaScriptWebExtension(Webextendcriteria webextendcriteria)
      {
         return this.repository.GetActiveJavaScriptWebExtension(webextendcriteria);
      } 
  
      
      [Route("webextensioncreaterevision")]
      [HttpPost]
      public Webextendrecord WebExtensionCreateRevision(Webextendcriteria webextendcriteria)
      {
         return this.repository.WebExtensionCreateRevision(webextendcriteria);
      } 
  
      
      [Route("webextensionstatusupdate")]
      [HttpPost]
      public IEnumerable<Webextendupdatestatus> WebExtensionStatusUpdate(IEnumerable<Webextendupdatestatus> webextendupdatestatus)
      {
         return this.repository.WebExtensionStatusUpdate(webextendupdatestatus);
      } 
  
      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         this.repository?.Dispose();
         base.Dispose(true);
      }
   }   
}
#pragma warning restore 1591
  