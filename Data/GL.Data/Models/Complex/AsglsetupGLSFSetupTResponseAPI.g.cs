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
   using Models.Pdsglsfsetupt;

   public partial class AsglsetupGLSFSetupTResponseAPI
   {
      public List<Glsfsetuptcol> glsfsetuptcol { get; set; }
      public Glsfsetupresults glsfsetupresults { get; set; }
      public Glsfsetupt glsfsetupt { get; set; }
 
    
      public AsglsetupGLSFSetupTResponseAPI()
      {
         this.glsfsetuptcol = new List<Glsfsetuptcol>(); 

      }
   }
}
#pragma warning restore 1591
