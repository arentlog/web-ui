using System.Data;

namespace Infor.Sxe.IC.Data.Adapters
{
   using Models.Pdsicsp;

   public partial class IcspAdapter
   {
      public new void ExtraUpdateToRow(ref DataRow row, object record)
      {
         var icspRecord = (record as Icsp);
         Icsp.UpdateRowWithExtraFields(ref row, icspRecord);
      }

      public new T BuildExtraFromRow<T>(T record, DataRow row)
      {
         return Icsp.BuildRecordWithExtraFields(record, row);
      }
   }
}