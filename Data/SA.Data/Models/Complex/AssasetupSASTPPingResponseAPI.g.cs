//------------------------------------------------------------------------------
// 
//     This code was generated by a tool.
//     Template version $Rev: 6149 $
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
using ServiceInterfaceClient.Attributes;

namespace Infor.Sxe.SA.Data.Models.Complex
{


   public partial class AssasetupSASTPPingResponseAPI
   {
      public bool lPingSuccessful { get; set; }
      [StringValidation]
      public string cWarningMessage { get; set; }
 
    
      public AssasetupSASTPPingResponseAPI()
      {

      }
   }
}
#pragma warning restore 1591