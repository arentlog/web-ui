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
   using Models.Pdsglsfsetupc;
   using Models.Pdsglsfsetup;

   public partial class AsglsetupGLSFSetupCResponseAPI
   {
      public List<Glsfsetupc> glsfsetupc { get; set; }
      public List<Glsfsetupcfield> glsfsetupcfield { get; set; }
      public Glsfsetupresults glsfsetupresults { get; set; }
      [StringValidation]
      public string cComment { get; set; }
 
    
      public AsglsetupGLSFSetupCResponseAPI()
      {
         this.glsfsetupc = new List<Glsfsetupc>(); 
         this.glsfsetupcfield = new List<Glsfsetupcfield>(); 

      }
   }
}
#pragma warning restore 1591
