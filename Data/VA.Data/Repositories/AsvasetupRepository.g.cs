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
    
namespace Infor.Sxe.VA.Data.Repositories
{
   using Infor.Sxe.VA.Data.Adapters;
   
   using Models.PdsContext;
   using Models.Pdsvaspasmblsegments;
   using Models.Pdsvaspasmblruledelete;
   using Models.Pdsvaspasmblrule;
   using Models.Pdsvaspasmblvalidate;
   using Models.Pdsvaspheaderadd;
   using Models.Pdsvaspheaderchangeupdate;
   using Models.Pdsvaspheadercompload;
   using Models.Pdsvaheaderallcomponent;
   using Models.Pdsvaspheaderdelete;
   using Models.Pdsvaspheaderfind;
   using Models.Pdsvaspheaderlist;
   using Models.Pdsvasplineadd;
   using Models.Pdsvasplinelist;
   using Models.Pdsvasplinechange;
   using Models.Pdsvasplinedelete;
   using Models.Pdsvasplinenonstock;
   using Models.Pdsvaspsectionaddsctn;
   using Models.Pdsvaspsectionautocrt;
   using Models.Pdsvaspsectiondelete;
   using Models.Pdsvaspsectionextendex;
   using Models.Pdsvaspsectionextendin;
   using Models.Pdsvaspsectionlist;
   using Models.Pdsvaspsectionnextsctn;
   using Models.Pdsvaspsectionrowupdate;
   using Models.Pdsmessaging;
   using Models.Pdsvaspsectionspecinit;
   using Models.Pdsvaspsectionspecupdate;
   using Models.Complex;

   public partial class AsvasetupRepository : RepositoryBase
   {
      private AsvasetupAdapter adapter;
  
      public AsvasetupRepository(IProgressConnection connection)
      {
         this.adapter = new AsvasetupAdapter(connection);
         this.Cono = this.adapter.Cono;
         this.OnCreated();
      }
  
      partial void OnCreated();
      
      public AsvasetupVAFabWhseARPResponseAPI VAFabWhseARP(string cFabWhse)
      {
         return this.adapter.VAFabWhseARP(cFabWhse);
      }
  
      public Vaspasmblsegments VASPAssemblyRetrieve(AsvasetupVASPAssemblyRetrieveRequestAPI AsvasetupVASPAssemblyRetrieveRequestAPI)
      {
         return this.adapter.VASPAssemblyRetrieve(AsvasetupVASPAssemblyRetrieveRequestAPI);
      }
  
      public void VASPAssemblyUpdate(Vaspasmblsegments vaspasmblsegments)
      {
         this.adapter.VASPAssemblyUpdate(vaspasmblsegments);
      }
  
      public void VASPAssemblyRuleDelete(Vaspasmblruledelete vaspasmblruledelete)
      {
         this.adapter.VASPAssemblyRuleDelete(vaspasmblruledelete);
      }
  
      public Vaspasmblrule VASPAssemblyRuleRetrieve(string vaprod, string vawhse, int vaverno, int segment, int sequence)
      {
         return this.adapter.VASPAssemblyRuleRetrieve(vaprod, vawhse, vaverno, segment, sequence);
      }
  
      public void VASPAssemblyRuleUpdate(Vaspasmblrule vaspasmblrule)
      {
         this.adapter.VASPAssemblyRuleUpdate(vaspasmblrule);
      }
  
      public Vaspasmblvalidate VASPAssemblyValRetrieve(AsvasetupVASPAssemblyValRetrieveRequestAPI AsvasetupVASPAssemblyValRetrieveRequestAPI)
      {
         return this.adapter.VASPAssemblyValRetrieve(AsvasetupVASPAssemblyValRetrieveRequestAPI);
      }
  
      public void VASPAssemblyValUpdate(Vaspasmblvalidate vaspasmblvalidate)
      {
         this.adapter.VASPAssemblyValUpdate(vaspasmblvalidate);
      }
  
      public Vaspheaderaddcriteria VASPHeaderAdd(Vaspheaderaddcriteria vaspheaderaddcriteria)
      {
         return this.adapter.VASPHeaderAdd(vaspheaderaddcriteria);
      }
  
      public Vaspheaderchangeupdate VASPHeaderChangeUpdate(Vaspheaderchangeupdate vaspheaderchangeupdate)
      {
         return this.adapter.VASPHeaderChangeUpdate(vaspheaderchangeupdate);
      }
  
      public IEnumerable<Vaheaderallcomponent> VASPHeaderCompLoad(Vaspheadercompload vaspheadercompload)
      {
         return this.adapter.VASPHeaderCompLoad(vaspheadercompload);
      }
  
      public void VASPHeaderDelete(Vaspheaderdelete vaspheaderdelete)
      {
         this.adapter.VASPHeaderDelete(vaspheaderdelete);
      }
  
      public Vaspheaderfindresults VASPHeaderFind(Vaspheaderfindcriteria vaspheaderfindcriteria)
      {
         return this.adapter.VASPHeaderFind(vaspheaderfindcriteria);
      }
  
      public AsvasetupVASPHeaderListResponseAPI VASPHeaderList(Vaspheaderlistcriteria vaspheaderlistcriteria)
      {
         return this.adapter.VASPHeaderList(vaspheaderlistcriteria);
      }
  
      public void VASPHeaderValidate(Vaspheaderdelete vaspheaderdelete)
      {
         this.adapter.VASPHeaderValidate(vaspheaderdelete);
      }
  
      public int VASPCreateNewVersion(AsvasetupVASPCreateNewVersionRequestAPI AsvasetupVASPCreateNewVersionRequestAPI)
      {
         return this.adapter.VASPCreateNewVersion(AsvasetupVASPCreateNewVersionRequestAPI);
      }
  
      public AsvasetupVASPHeaderLookupResponseAPI VASPHeaderLookup(Vaspheaderlistcriteria vaspheaderlistcriteria)
      {
         return this.adapter.VASPHeaderLookup(vaspheaderlistcriteria);
      }
  
      public Vasplineadd VASPLineAddInit(AsvasetupVASPLineAddInitRequestAPI AsvasetupVASPLineAddInitRequestAPI)
      {
         return this.adapter.VASPLineAddInit(AsvasetupVASPLineAddInitRequestAPI);
      }
  
      public AsvasetupVASPLineAddLeaveFieldResponseAPI VASPLineAddLeaveField(AsvasetupVASPLineAddLeaveFieldRequestAPI AsvasetupVASPLineAddLeaveFieldRequestAPI)
      {
         return this.adapter.VASPLineAddLeaveField(AsvasetupVASPLineAddLeaveFieldRequestAPI);
      }
  
      public AsvasetupVASPLineAddLineResponseAPI VASPLineAddLine(Vasplineadd vasplineadd)
      {
         return this.adapter.VASPLineAddLine(vasplineadd);
      }
  
      public void VASPLineChange(Vasplinechange vasplinechange)
      {
         this.adapter.VASPLineChange(vasplinechange);
      }
  
      public Vasplinechange VASPLineChangeInit(string vaprod, string vawhse, int vaverno, int seqno, int lineno)
      {
         return this.adapter.VASPLineChangeInit(vaprod, vawhse, vaverno, seqno, lineno);
      }
  
      public void VASPLineDelete(Vasplinedelete vasplinedelete)
      {
         this.adapter.VASPLineDelete(vasplinedelete);
      }
  
      public Vasplinechange VASPLineLaborChgProd(Vasplinechange vasplinechange)
      {
         return this.adapter.VASPLineLaborChgProd(vasplinechange);
      }
  
      public void VASPLineExtendUpdate(Vasplinechange vasplinechange)
      {
         this.adapter.VASPLineExtendUpdate(vasplinechange);
      }
  
      public Vasplinechange VASPLineEXLaborUpdate(Vasplinechange vasplinechange)
      {
         return this.adapter.VASPLineEXLaborUpdate(vasplinechange);
      }
  
      public Vasplinechange VASPLineINLaborUpdate(Vasplinechange vasplinechange)
      {
         return this.adapter.VASPLineINLaborUpdate(vasplinechange);
      }
  
      public Vasplinechange VASPLineLeaveFab(Vasplinechange vasplinechange)
      {
         return this.adapter.VASPLineLeaveFab(vasplinechange);
      }
  
      public AsvasetupVASPLineLeaveProdResponseAPI VASPLineLeaveProd(Vasplinechange vasplinechange)
      {
         return this.adapter.VASPLineLeaveProd(vasplinechange);
      }
  
      public Vasplinechange VASPLineLeaveUnit(Vasplinechange vasplinechange)
      {
         return this.adapter.VASPLineLeaveUnit(vasplinechange);
      }
  
      public AsvasetupVASPLineListResponseAPI VASPLineList(AsvasetupVASPLineListRequestAPI AsvasetupVASPLineListRequestAPI)
      {
         return this.adapter.VASPLineList(AsvasetupVASPLineListRequestAPI);
      }
  
      public Vasplinenonstock VASPLineNonstock(Vasplinenonstock vasplinenonstock)
      {
         return this.adapter.VASPLineNonstock(vasplinenonstock);
      }
  
      public Vasplinenonstock VASPLineNonstockVal(Vasplinenonstock vasplinenonstock)
      {
         return this.adapter.VASPLineNonstockVal(vasplinenonstock);
      }
  
      public Vaspsectionaddsctn VASPSectionAddSctn(Vaspsectionaddsctn vaspsectionaddsctn)
      {
         return this.adapter.VASPSectionAddSctn(vaspsectionaddsctn);
      }
  
      public Vaspsectionautocrt VASPSectionAutoCreate(Vaspsectionautocrt vaspsectionautocrt)
      {
         return this.adapter.VASPSectionAutoCreate(vaspsectionautocrt);
      }
  
      public void VASPSectionDelete(Vaspsectiondelete vaspsectiondelete)
      {
         this.adapter.VASPSectionDelete(vaspsectiondelete);
      }
  
      public Vaspsectionextendex VASPSectionExtendEXChange(Vaspsectionextendex vaspsectionextendex)
      {
         return this.adapter.VASPSectionExtendEXChange(vaspsectionextendex);
      }
  
      public Vaspsectionextendex VASPSectionExtendEXInit(Vaspsectionextendex vaspsectionextendex)
      {
         return this.adapter.VASPSectionExtendEXInit(vaspsectionextendex);
      }
  
      public void VASPSectionExtendEXUpdate(Vaspsectionextendex vaspsectionextendex)
      {
         this.adapter.VASPSectionExtendEXUpdate(vaspsectionextendex);
      }
  
      public Vaspsectionextendin VASPSectionExtendINChg(Vaspsectionextendin vaspsectionextendin)
      {
         return this.adapter.VASPSectionExtendINChg(vaspsectionextendin);
      }
  
      public Vaspsectionextendin VASPSectionExtendINInit(Vaspsectionextendin vaspsectionextendin)
      {
         return this.adapter.VASPSectionExtendINInit(vaspsectionextendin);
      }
  
      public void VASPSectionExtendINUpdate(Vaspsectionextendin vaspsectionextendin)
      {
         this.adapter.VASPSectionExtendINUpdate(vaspsectionextendin);
      }
  
      public AsvasetupVASPSectionListResponseAPI VASPSectionList(Vaspsectionlistcriteria vaspsectionlistcriteria)
      {
         return this.adapter.VASPSectionList(vaspsectionlistcriteria);
      }
  
      public Vaspsectionnextsctn VASPSectionNextSctn(Vaspsectionnextsctn vaspsectionnextsctn)
      {
         return this.adapter.VASPSectionNextSctn(vaspsectionnextsctn);
      }
  
      public IEnumerable<Messaging> VASPSectionRowUpdate(Vaspsectionrowupdate vaspsectionrowupdate)
      {
         return this.adapter.VASPSectionRowUpdate(vaspsectionrowupdate);
      }
  
      public Vaspsectionspecresults VASPSectionSpecificationInit(Vaspsectionspeccriteria vaspsectionspeccriteria)
      {
         return this.adapter.VASPSectionSpecificationInit(vaspsectionspeccriteria);
      }
  
      public void VASPSectionSpecificationUpdate(Vaspsectionspecupdate vaspsectionspecupdate)
      {
         this.adapter.VASPSectionSpecificationUpdate(vaspsectionspecupdate);
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
  