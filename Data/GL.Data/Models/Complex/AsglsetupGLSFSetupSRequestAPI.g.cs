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
   using Models.Pdsglsfsetups;

   public partial class AsglsetupGLSFSetupSRequestAPI
   {
      public List<Glsfsetupscono> glsfsetupscono { get; set; }
      public List<Glsfsetupsdeptno> glsfsetupsdeptno { get; set; }
      public List<Glsfsetupsdivno> glsfsetupsdivno { get; set; }
      public Glsfsetupcriteria glsfsetupcriteria { get; set; }
      public Glsfsetups glsfsetups { get; set; }
 
    
      public AsglsetupGLSFSetupSRequestAPI()
      {
         this.glsfsetupscono = new List<Glsfsetupscono>(); 
         this.glsfsetupsdeptno = new List<Glsfsetupsdeptno>(); 
         this.glsfsetupsdivno = new List<Glsfsetupsdivno>(); 

      }
   }
}
#pragma warning restore 1591
