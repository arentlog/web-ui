using System;
using System.Text;

namespace Infor.Sxe.Shared.Data.Models.PdstriggerSetup
{
   public partial class TriggerSetup
   {
      public string ProgListDisplay
      {
         get
         {
            StringBuilder sb = new StringBuilder();
            if (!String.IsNullOrEmpty(this.proglist1))
            {
               sb.Append(", ").Append(this.proglist1);
            }
            if (!String.IsNullOrEmpty(this.proglist2))
            {
               sb.Append(", ").Append(this.proglist2);
            }
            if (!String.IsNullOrEmpty(this.proglist3))
            {
               sb.Append(", ").Append(this.proglist3);
            }
            if (!String.IsNullOrEmpty(this.proglist4))
            {
               sb.Append(", ").Append(this.proglist4);
            }
            if (!String.IsNullOrEmpty(this.proglist5))
            {
               sb.Append(", ").Append(this.proglist5);
            }
            if (!String.IsNullOrEmpty(this.proglist6))
            {
               sb.Append(", ").Append(this.proglist6);
            }
            if (!String.IsNullOrEmpty(this.proglist7))
            {
               sb.Append(", ").Append(this.proglist7);
            }
            if (!String.IsNullOrEmpty(this.proglist8))
            {
               sb.Append(", ").Append(this.proglist8);
            }
            if (!String.IsNullOrEmpty(this.proglist9))
            {
               sb.Append(", ").Append(this.proglist9);
            }
            if (!String.IsNullOrEmpty(this.proglist10))
            {
               sb.Append(", ").Append(this.proglist10);
            }

            return sb.ToString().TrimStart(',').Trim();
         }
      }

      public string TableListDisplay
      {
         get
         {
            StringBuilder sb = new StringBuilder();
            if (!String.IsNullOrEmpty(this.tablelist1))
            {
               sb.Append(", ").Append(this.tablelist1);
            }
            if (!String.IsNullOrEmpty(this.tablelist2))
            {
               sb.Append(", ").Append(this.tablelist2);
            }
            if (!String.IsNullOrEmpty(this.tablelist3))
            {
               sb.Append(", ").Append(this.tablelist3);
            }
            if (!String.IsNullOrEmpty(this.tablelist4))
            {
               sb.Append(", ").Append(this.tablelist4);
            }
            if (!String.IsNullOrEmpty(this.tablelist5))
            {
               sb.Append(", ").Append(this.tablelist5);
            }
            if (!String.IsNullOrEmpty(this.tablelist6))
            {
               sb.Append(", ").Append(this.tablelist6);
            }
            if (!String.IsNullOrEmpty(this.tablelist7))
            {
               sb.Append(", ").Append(this.tablelist7);
            }
            if (!String.IsNullOrEmpty(this.tablelist8))
            {
               sb.Append(", ").Append(this.tablelist8);
            }
            if (!String.IsNullOrEmpty(this.tablelist9))
            {
               sb.Append(", ").Append(this.tablelist9);
            }
            if (!String.IsNullOrEmpty(this.tablelist10))
            {
               sb.Append(", ").Append(this.tablelist10);
            }

            return sb.ToString().TrimStart(',').Trim();
         }
      }
   }
}
