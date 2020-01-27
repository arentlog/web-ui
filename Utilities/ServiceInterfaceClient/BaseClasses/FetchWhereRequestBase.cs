using ServiceInterfaceClient.Attributes;

namespace ServiceInterfaceClient.BaseClasses
{
   public class FetchWhereRequestBase
   {
      public FetchWhereRequestBase()
      {
         this.batchsize = 0;
         this.fldlist = string.Empty;
      }

      public int batchsize { get; set; }

      [StringValidation]
      public string fldlist { get; set; }
   }
}