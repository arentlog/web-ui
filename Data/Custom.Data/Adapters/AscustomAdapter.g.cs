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
using System.Data;
using System.Linq;
using System.Text;
using NLog;
using ServiceInterfaceClient.BaseClasses;
using ServiceInterfaceClient.Extensions;
using ServiceInterfaceClient.Helpers;
using ServiceInterfaceClient.Progress;
    
namespace Infor.Sxe.Custom.Data.Adapters
{
   using com.infor.sxproxy.customproxy;
   using com.infor.sxproxy.customproxy.StrongTypesNS;
    
   using Models.PdsContext;
   using Models.Pdscustom;
   using Models.Complex;

   public partial class AscustomAdapter : AdapterBase<pdsContextDataSet>
   {
      private CustomProxyAppObject proxyAppObject;
      
      public AscustomAdapter(IProgressConnection connection) : base(connection)
      {
         try 
         {
            this.proxyAppObject = new CustomProxyAppObject(connection.Connection);
            this.pdsContext = new pdsContextDataSet();
            
            this.OnCreated();
         }
         catch (Exception ex)
         {
            NLogLogger.ErrorException("Failed in adapter ", ex);
            ErrorReportingHelper.ReportProgramErrors($"Error in AscustomAdapter constructor - {ex.Message}");
         }
      }
  
      partial void OnCreated();
    
      public IEnumerable<Custom> CustomCall(AscustomCustomCallRequestAPI AscustomCustomCallRequestAPI)
      {   
         var results = new List<Custom>();
         
         var pdscustom = new pdscustomDataSet();
            
         string cErrorMessage = string.Empty;
   
         foreach (var obj in AscustomCustomCallRequestAPI.custom)
         {
            DataRow ttblcustomRow = pdscustom.ttblcustom.NewttblcustomRow();
            Custom.UpdateRowFromCustom(ref ttblcustomRow, obj);
            pdscustom.ttblcustom.AddttblcustomRow((pdscustomDataSet.ttblcustomRow)ttblcustomRow);
         }
          
         var  cOperation = AscustomCustomCallRequestAPI.cOperation;
            
         
         NLogLoggerP.Trace("CustomCall - Ascustom - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poAscustomproxy = this.proxyAppObject.CreatePO_ascustomproxy())
               {
                   this.SetRequiredContextParameters();
                   poAscustomproxy.CustomCall(ref pdsContext, ref pdscustom,  cOperation, out cErrorMessage);
               }
            });
         NLogLoggerP.Info("CustomCall - Ascustom - After Call");

         
         this.ReportErrors(cErrorMessage);
         this.ReportErrors(this.pdsContext);
         this.ReportErrors(pdscustom); 
    
            foreach (DataRow row in pdscustom.ttblcustom)
            {
                results.Add(Custom.BuildCustomFromRow(row));
            }
            return results;
        
      }

      protected override void Dispose(bool disposing)
      {
         if (this.disposed) { return; }
         if (!disposing)
         {
            return;
         }	
         this.proxyAppObject?.Dispose();

         base.Dispose(true);
      }
  
   }
}
#pragma warning restore 1591
  