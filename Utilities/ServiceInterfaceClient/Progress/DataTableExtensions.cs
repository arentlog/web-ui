using System;
using System.Data;

namespace ServiceInterfaceClient.Progress
{
    public static class DataTableExtensions
    {
        public static Tuple<string, string> GetTableControlParametersKey(this DataTable table)
        {
            if (table?.DataSet != null)
            {
                return new Tuple<string, string>(table.DataSet.DataSetName, table.TableName);
            }
            return new Tuple<string, string>("", "");
        }
    }
}
