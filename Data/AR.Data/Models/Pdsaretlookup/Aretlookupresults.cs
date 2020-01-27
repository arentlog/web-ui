namespace Infor.Sxe.AR.Data.Models.Pdsaretlookup
{
   public partial class Aretlookupresults
   {
      public int jrnlno { get; set; }
      public string arscName { get; set; }
      public string arssName { get; set; }
      public string displayDate => this.invdt?.ToString("yyyy/MM/dd");
      public string shipto { get; set; }
   }
}