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
   using Models.Pdsglsfsetupz;

   public partial class AsglsetupGLSFSetupZResponseAPI
   {
      public List<Glsfsetupzacct> glsfsetupzacct { get; set; }
      public List<Glsfsetupzcol> glsfsetupzcol { get; set; }
      public Glsfsetupresults glsfsetupresults { get; set; }
      public Glsfsetupz glsfsetupz { get; set; }
 
    
      public AsglsetupGLSFSetupZResponseAPI()
      {
         this.glsfsetupzacct = new List<Glsfsetupzacct>(); 
         this.glsfsetupzcol = new List<Glsfsetupzcol>(); 

      }
   }
}
#pragma warning restore 1591
