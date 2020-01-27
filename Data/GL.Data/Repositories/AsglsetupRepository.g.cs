//------------------------------------------------------------------------------
// 
//     This code was generated by a tool.
//     Template version $Rev: 21496 $
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
using ServiceInterfaceClient.BaseClasses;
using ServiceInterfaceClient.Extensions;
using ServiceInterfaceClient.Interfaces;
using ServiceInterfaceClient.Progress;
    
namespace Infor.Sxe.GL.Data.Repositories
{
   using Infor.Sxe.GL.Data.Adapters;
   
   using Models.PdsContext;
   using Models.Pdsglaccountcreate;
   using Models.Pdsglaccountcopy;
   using Models.Pdsgldivisioncreate;
   using Models.Pdsmessaging;
   using Models.Pdsglbuildacctno;
   using Models.Pdsglsbreqinit;
   using Models.Pdsglsbreqcalc;
   using Models.Pdsglsbreqrecalc;
   using Models.Pdsglsbdivcreate;
   using Models.Pdsglsbsavechanges;
   using Models.Pdsglsbcreate;
   using Models.Pdsglsbcopy;
   using Models.Pdsglsdtrans;
   using Models.Pdsglsdloadtt;
   using Models.Pdsglsdtransloadtt;
   using Models.Pdsglsfadddesign;
   using Models.Pdsglsfdesign;
   using Models.Pdsglsfdeletedesign;
   using Models.Pdsglsfdelete;
   using Models.Pdsglsfdesigndesc;
   using Models.Pdsglsfduplicate;
   using Models.Pdsglsfgetdesign;
   using Models.Pdsglsfinsert;
   using Models.Pdsglsfmove;
   using Models.Pdsglsfrenumberdesign;
   using Models.Pdsglsfsetup;
   using Models.Pdsglsfsetupa;
   using Models.Pdsglsfsetupc;
   using Models.Pdsglsfsetupf;
   using Models.Pdsglsfsetuph;
   using Models.Pdsglsfsetupm;
   using Models.Pdsglsfsetupp;
   using Models.Pdsglsfsetups;
   using Models.Pdsglsfsetupslist;
   using Models.Pdsglsfsetupt;
   using Models.Pdsglsfsetupu;
   using Models.Pdsglsfsetupz;
   using Models.Pdsglsa;
   using Models.Pdsglvalidateparse;
   using Models.Complex;

   public partial class AsglsetupRepository : RepositoryBase
   {
      private AsglsetupAdapter adapter;
  
      public AsglsetupRepository(IProgressConnection connection)
      {
         this.adapter = new AsglsetupAdapter(connection);
         this.Cono = this.adapter.Cono;
         this.OnCreated();
      }
  
      partial void OnCreated();
      
      public Glaccountcreate GLAccountCreate(Glaccountcreate glaccountcreate)
      {
         return this.adapter.GLAccountCreate(glaccountcreate);
      }
  
      public Glaccountcopy GLAccountCopy(Glaccountcopy glaccountcopy)
      {
         return this.adapter.GLAccountCopy(glaccountcopy);
      }
  
      public IEnumerable<Messaging> GLDivisionCreate(Gldivisioncreate gldivisioncreate)
      {
         return this.adapter.GLDivisionCreate(gldivisioncreate);
      }
  
      public IEnumerable<Glbuildacctno> GLBuildAcctNo(IEnumerable<Glbuildacctno> glbuildacctno)
      {
         return this.adapter.GLBuildAcctNo(glbuildacctno);
      }
  
      public Glsbreqinitresults GLSBReqInit(Glsbreqinitcriteria glsbreqinitcriteria)
      {
         return this.adapter.GLSBReqInit(glsbreqinitcriteria);
      }
  
      public Glsbreqcalcresults GLSBReqCalc(Glsbreqcalccriteria glsbreqcalccriteria)
      {
         return this.adapter.GLSBReqCalc(glsbreqcalccriteria);
      }
  
      public Glsbreqrecalcresults GLSBReqRecalc(Glsbreqrecalccriteria glsbreqrecalccriteria)
      {
         return this.adapter.GLSBReqRecalc(glsbreqrecalccriteria);
      }
  
      public string GLSBDivCreate(Glsbdivcreate glsbdivcreate)
      {
         return this.adapter.GLSBDivCreate(glsbdivcreate);
      }
  
      public void GLSBSaveChanges(Glsbsavechanges glsbsavechanges)
      {
         this.adapter.GLSBSaveChanges(glsbsavechanges);
      }
  
      public Glsbcreateresults GLSBCreate(Glsbcreatecriteria glsbcreatecriteria)
      {
         return this.adapter.GLSBCreate(glsbcreatecriteria);
      }
  
      public Glsbcopyresults GLSBCopy(Glsbcopycriteria glsbcopycriteria)
      {
         return this.adapter.GLSBCopy(glsbcopycriteria);
      }
  
      public void GLSBDelete(AsglsetupGLSBDeleteRequestAPI AsglsetupGLSBDeleteRequestAPI)
      {
         this.adapter.GLSBDelete(AsglsetupGLSBDeleteRequestAPI);
      }
  
      public Glsdtrans GLSDCopy(AsglsetupGLSDCopyRequestAPI AsglsetupGLSDCopyRequestAPI)
      {
         return this.adapter.GLSDCopy(AsglsetupGLSDCopyRequestAPI);
      }
  
      public AsglsetupGLSDCreateResponseAPI GLSDCreate(Glsdloadttcriteria glsdloadttcriteria)
      {
         return this.adapter.GLSDCreate(glsdloadttcriteria);
      }
  
      public Glsdtrans GLSDLeaveField(AsglsetupGLSDLeaveFieldRequestAPI AsglsetupGLSDLeaveFieldRequestAPI)
      {
         return this.adapter.GLSDLeaveField(AsglsetupGLSDLeaveFieldRequestAPI);
      }
  
      public AsglsetupGLSDLoadTTResponseAPI GLSDLoadTT(Glsdloadttcriteria glsdloadttcriteria)
      {
         return this.adapter.GLSDLoadTT(glsdloadttcriteria);
      }
  
      public AsglsetupGLSDSaveResponseAPI GLSDSave(Glsdtrans glsdtrans)
      {
         return this.adapter.GLSDSave(glsdtrans);
      }
  
      public AsglsetupGLSDTransAddResponseAPI GLSDTransAdd(Glsdtrans glsdtrans)
      {
         return this.adapter.GLSDTransAdd(glsdtrans);
      }
  
      public Glsdtrans GLSDTransAddLeaveField(AsglsetupGLSDTransAddLeaveFieldRequestAPI AsglsetupGLSDTransAddLeaveFieldRequestAPI)
      {
         return this.adapter.GLSDTransAddLeaveField(AsglsetupGLSDTransAddLeaveFieldRequestAPI);
      }
  
      public IEnumerable<Glsdtrans> GLSDTransCancel(IEnumerable<Glsdtrans> glsdtrans)
      {
         return this.adapter.GLSDTransCancel(glsdtrans);
      }
  
      public AsglsetupGLSDTransDeleteResponseAPI GLSDTransDelete(Glsdtrans glsdtrans)
      {
         return this.adapter.GLSDTransDelete(glsdtrans);
      }
  
      public Glsdtrans GLSDTransLeaveField(AsglsetupGLSDTransLeaveFieldRequestAPI AsglsetupGLSDTransLeaveFieldRequestAPI)
      {
         return this.adapter.GLSDTransLeaveField(AsglsetupGLSDTransLeaveFieldRequestAPI);
      }
  
      public AsglsetupGLSDTransLoadTTResponseAPI GLSDTransLoadTT(Glsdtransloadttcriteria glsdtransloadttcriteria)
      {
         return this.adapter.GLSDTransLoadTT(glsdtransloadttcriteria);
      }
  
      public AsglsetupGLSDTransUpdateResponseAPI GLSDTransUpdate(Glsdtrans glsdtrans)
      {
         return this.adapter.GLSDTransUpdate(glsdtrans);
      }
  
      public AsglsetupGLSDValidateResponseAPI GLSDValidate(AsglsetupGLSDValidateRequestAPI AsglsetupGLSDValidateRequestAPI)
      {
         return this.adapter.GLSDValidate(AsglsetupGLSDValidateRequestAPI);
      }
  
      public AsglsetupGLSFAddDesignResponseAPI GLSFAddDesign(Glsfadddesigncriteria glsfadddesigncriteria)
      {
         return this.adapter.GLSFAddDesign(glsfadddesigncriteria);
      }
  
      public void GLSFDeleteDesign(IEnumerable<Glsfdeletedesigncriteria> glsfdeletedesigncriteria)
      {
         this.adapter.GLSFDeleteDesign(glsfdeletedesigncriteria);
      }
  
      public void GLSFDelete(IEnumerable<Glsfdeletecriteria> glsfdeletecriteria)
      {
         this.adapter.GLSFDelete(glsfdeletecriteria);
      }
  
      public void GLSFDesignDesc(Glsfdesigndesccriteria glsfdesigndesccriteria)
      {
         this.adapter.GLSFDesignDesc(glsfdesigndesccriteria);
      }
  
      public AsglsetupGLSFDuplicateResponseAPI GLSFDuplicate(AsglsetupGLSFDuplicateRequestAPI AsglsetupGLSFDuplicateRequestAPI)
      {
         return this.adapter.GLSFDuplicate(AsglsetupGLSFDuplicateRequestAPI);
      }
  
      public AsglsetupGLSFGetDesignResponseAPI GLSFGetDesign(Glsfgetdesigncriteria glsfgetdesigncriteria)
      {
         return this.adapter.GLSFGetDesign(glsfgetdesigncriteria);
      }
  
      public void GLSFInsert(Glsfinsertcriteria glsfinsertcriteria)
      {
         this.adapter.GLSFInsert(glsfinsertcriteria);
      }
  
      public void GLSFMove(IEnumerable<Glsfmovecriteria> glsfmovecriteria)
      {
         this.adapter.GLSFMove(glsfmovecriteria);
      }
  
      public void GLSFRenumberDesign(IEnumerable<Glsfrenumberdesigncriteria> glsfrenumberdesigncriteria)
      {
         this.adapter.GLSFRenumberDesign(glsfrenumberdesigncriteria);
      }
  
      public AsglsetupGLSFParseAccountResponseAPI GLSFParseAccount(string cGLString)
      {
         return this.adapter.GLSFParseAccount(cGLString);
      }
  
      public AsglsetupGLSFSetupAResponseAPI GLSFSetupA(AsglsetupGLSFSetupARequestAPI AsglsetupGLSFSetupARequestAPI)
      {
         return this.adapter.GLSFSetupA(AsglsetupGLSFSetupARequestAPI);
      }
  
      public AsglsetupGLSFSetupCResponseAPI GLSFSetupC(AsglsetupGLSFSetupCRequestAPI AsglsetupGLSFSetupCRequestAPI)
      {
         return this.adapter.GLSFSetupC(AsglsetupGLSFSetupCRequestAPI);
      }
  
      public AsglsetupGLSFSetupFResponseAPI GLSFSetupF(AsglsetupGLSFSetupFRequestAPI AsglsetupGLSFSetupFRequestAPI)
      {
         return this.adapter.GLSFSetupF(AsglsetupGLSFSetupFRequestAPI);
      }
  
      public AsglsetupGLSFSetupHResponseAPI GLSFSetupH(AsglsetupGLSFSetupHRequestAPI AsglsetupGLSFSetupHRequestAPI)
      {
         return this.adapter.GLSFSetupH(AsglsetupGLSFSetupHRequestAPI);
      }
  
      public AsglsetupGLSFSetupMResponseAPI GLSFSetupM(AsglsetupGLSFSetupMRequestAPI AsglsetupGLSFSetupMRequestAPI)
      {
         return this.adapter.GLSFSetupM(AsglsetupGLSFSetupMRequestAPI);
      }
  
      public AsglsetupGLSFSetupPResponseAPI GLSFSetupP(AsglsetupGLSFSetupPRequestAPI AsglsetupGLSFSetupPRequestAPI)
      {
         return this.adapter.GLSFSetupP(AsglsetupGLSFSetupPRequestAPI);
      }
  
      public AsglsetupGLSFSetupSResponseAPI GLSFSetupS(AsglsetupGLSFSetupSRequestAPI AsglsetupGLSFSetupSRequestAPI)
      {
         return this.adapter.GLSFSetupS(AsglsetupGLSFSetupSRequestAPI);
      }
  
      public AsglsetupGLSFSetupSListResponseAPI GLSFSetupSList(AsglsetupGLSFSetupSListRequestAPI AsglsetupGLSFSetupSListRequestAPI)
      {
         return this.adapter.GLSFSetupSList(AsglsetupGLSFSetupSListRequestAPI);
      }
  
      public AsglsetupGLSFSetupTResponseAPI GLSFSetupT(AsglsetupGLSFSetupTRequestAPI AsglsetupGLSFSetupTRequestAPI)
      {
         return this.adapter.GLSFSetupT(AsglsetupGLSFSetupTRequestAPI);
      }
  
      public AsglsetupGLSFSetupUResponseAPI GLSFSetupU(AsglsetupGLSFSetupURequestAPI AsglsetupGLSFSetupURequestAPI)
      {
         return this.adapter.GLSFSetupU(AsglsetupGLSFSetupURequestAPI);
      }
  
      public AsglsetupGLSFSetupZResponseAPI GLSFSetupZ(AsglsetupGLSFSetupZRequestAPI AsglsetupGLSFSetupZRequestAPI)
      {
         return this.adapter.GLSFSetupZ(AsglsetupGLSFSetupZRequestAPI);
      }
  
      public AsglsetupGLSASearchWordIndexResponseAPI GLSASearchWordIndex(int pvBatchsize, string pvSearchstring)
      {
         return this.adapter.GLSASearchWordIndex(pvBatchsize, pvSearchstring);
      }
  
      public Glvalidateparse GLValidateParse(Glvalidateparse glvalidateparse)
      {
         return this.adapter.GLValidateParse(glvalidateparse);
      }
  
      protected override void Dispose(bool disposing)
      {
         if (this.disposed) { return; }
         if (!disposing)
         {
            return;
         }
         this.adapter?.Dispose();	
         this.adapter = null;
         base.Dispose(true);
      }
   }
}
#pragma warning restore 1591
  