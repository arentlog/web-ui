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
   using Models.Pdsglsfsetupslist;

   public partial class AsglsetupGLSFSetupSListResponseAPI
   {
      public List<Glsfsetupsdeptlist> glsfsetupsdeptlist { get; set; }
      public List<Glsfsetupsdivlist> glsfsetupsdivlist { get; set; }
      public List<Glsfsetupslistcono> glsfsetupslistcono { get; set; }
 
    
      public AsglsetupGLSFSetupSListResponseAPI()
      {
         this.glsfsetupsdeptlist = new List<Glsfsetupsdeptlist>(); 
         this.glsfsetupsdivlist = new List<Glsfsetupsdivlist>(); 
         this.glsfsetupslistcono = new List<Glsfsetupslistcono>(); 

      }
   }
}
#pragma warning restore 1591