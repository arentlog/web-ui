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

namespace Infor.Sxe.GL.Data.Models.Complex
{
   using Models.Pdsglsfsetup;
   using Models.Pdsglsfsetuph;

   public partial class AsglsetupGLSFSetupHResponseAPI
   {
      public List<Glsfsetuphtype> glsfsetuphtype { get; set; }
      public Glsfsetupresults glsfsetupresults { get; set; }
      public Glsfsetuph glsfsetuph { get; set; }
 
    
      public AsglsetupGLSFSetupHResponseAPI()
      {
         this.glsfsetuphtype = new List<Glsfsetuphtype>(); 

      }
   }
}
#pragma warning restore 1591