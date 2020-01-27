using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Web;
using Logging.Logging;
using NLog;
using Security.Security;
using ServiceInterfaceClient.Helpers;
using ServiceInterfaceClient.Interfaces;
using ServiceInterfaceClient.Progress;

namespace ServiceInterfaceClient.BaseClasses
{
   public class AdapterBase<TPdsContext> : IDisposable, IAdapter
       where TPdsContext : DataSet, new()
   {
      public int Cono { get; set; }

      protected bool disposed;
      private bool? pdsContextValidated;
      protected IProgressConnection connection;
      protected const string ParameterCompanyNumber = "cono";
      protected const string ParameterOperator = "operinit";
      protected const string ParameterSessionId = "SessionId";
      protected const string ParameterLanguageId = "LanguageId";
      protected Dictionary<Tuple<string, string>, TableControlParameters> tempTableControlParameters;
      protected TPdsContext pdsContext;
      protected int DefaultFetchWhereRowCount;
      protected static NLogLogger NLogLoggerP { get; private set; }
      protected static NLogLogger NLogLogger { get; private set; }

      public AdapterBase(IProgressConnection connection)
      {
         this.connection = connection;
         this.Cono = this.connection.CompanyNumber;
         this.tempTableControlParameters = new Dictionary<Tuple<string, string>, TableControlParameters>();
         NLogLoggerP = new NLogLogger("Performance", string.Empty);
         NLogLogger = new NLogLogger("Adapter", string.Empty);
         this.DefaultFetchWhereRowCount = connection.DefaultRecordCount != 0 ? connection.DefaultRecordCount : 50;
      }

      protected void SetRequiredContextParameters()
      {
         this.SetContextParameter("", ParameterSessionId, this.connection.SessionId);
         this.SetContextParameter("", ParameterCompanyNumber, this.connection.CompanyNumber);
         this.SetContextParameter("", ParameterOperator, this.connection.Operator);
         this.SetContextParameter("", ParameterLanguageId, this.connection.CurrentUiCulture);
      }

      public void SetContextParameter(string contextTaskId, string contextName, object value)
      {
         if (!this.ValidatePdsContext())
         {
            ErrorReportingHelper.ReportProgramErrors("The DataSet typed used for pdsContext does not match the required schema.");
         }
         var stringValue = value?.ToString() ?? string.Empty;
         var filterContextTaskIdContextNameExpression = $"ContextTaskId = '{contextTaskId}' AND ContextName = '{contextName}'";
         var ttblContext = this.pdsContext.Tables["ttblContext"];
         var contextRow = ttblContext.Select(filterContextTaskIdContextNameExpression).FirstOrDefault();
         if (contextRow == null)
         {
            ttblContext.LoadDataRow(new object[] { contextTaskId, contextName, stringValue }, LoadOption.OverwriteChanges);
         }
         else
         {
            contextRow["ContextValue"] = stringValue;
         }
      }

      public virtual void ExtraUpdateToRow(ref DataRow row, object record)
      {
      }

      public virtual T BuildExtraFromRow<T>(T record, DataRow row)
      {
         return record;
      }

      private bool ValidatePdsContext()
      {
         if (!pdsContextValidated.HasValue)
         {
            pdsContextValidated = (this.pdsContext != null) && (this.pdsContext.Tables.Count == 1)
                                  && (this.pdsContext.Tables.Contains("ttblContext"));
            if (this.pdsContext == null)
            {
               return false;
            }
            var columns = this.pdsContext.Tables["ttblContext"].Columns;
            foreach (var columnName in new[] { "ContextTaskId", "ContextName", "ContextValue" })
            {
               pdsContextValidated &= columns.Contains(columnName);
               pdsContextValidated &= columns[columnName].DataType == typeof(string);
            }
         }
         return pdsContextValidated != null && pdsContextValidated.Value;
      }

      protected void SetTableParametersOnContext(Tuple<string, string> tableKey, bool setMdc = false)
      {
         var controlParameters = this.GetTableParameters(tableKey);
         var tableName = tableKey.Item2;

         if (controlParameters == null)
         {
            return;
         }
         this.SetContextParameter(tableName, TableControlParameters.ParameterNameFillMode, controlParameters.FillMode);
         this.SetContextParameter(tableName, "WhereString", controlParameters.WhereClause);
         this.SetContextParameter(tableName, "BatchSize", controlParameters.PageSize);
         this.SetContextParameter(tableName, "FindSeq", controlParameters.FindSeq);
         this.SetContextParameter(tableName, "ActivateDataRelation", controlParameters.ActivateDataRelation);
         this.SetContextParameter(tableName, "IncludeFields", controlParameters.IncludeFields);
         this.SetContextParameter(tableName, "ExcludeFields", controlParameters.ExcludeFields);
         this.SetContextParameter(tableName, "DataRelationReposition", controlParameters.DataRelationReposition ? "yes" : "no");
         this.SetContextParameter(tableName, "cono", this.connection.CompanyNumber);
         this.SetContextParameter(tableName, "operinit", this.connection.Operator);
         this.SetContextParameter(tableName, "SavedRowID", controlParameters.SavedRowId);
         this.SetContextParameter(tableName, "RestartRowID", controlParameters.RestartRowId ? "yes" : "no");
         if (setMdc)
         {
            if (string.IsNullOrEmpty(controlParameters.IncludeFields))
            {
               MappedDiagnosticsContext.Set("fldlist", controlParameters.IncludeFields);
               MappedDiagnosticsContext.Set("exclude", "No");
            }
            if (string.IsNullOrEmpty(controlParameters.ExcludeFields))
            {
               MappedDiagnosticsContext.Set("fldlist", controlParameters.ExcludeFields);
               MappedDiagnosticsContext.Set("exclude", "Yes");
            }
            MappedDiagnosticsContext.Set("batchsize", controlParameters.PageSize.ToString());
         }
      }

      protected TableControlParameters CreateTableControlParameters(Tuple<string, string> tableKey)
      {
         if (this.tempTableControlParameters.ContainsKey(tableKey))
         {
            return this.tempTableControlParameters[tableKey];
         }
         var parameters = new TableControlParameters(tableKey.Item1, tableKey.Item2);
         this.tempTableControlParameters.Add(tableKey, parameters);
         return parameters;
      }

      protected TableControlParameters GetTableParameters(Tuple<string, string> tableKey)
      {
         return this.GetTableParameters(tableKey.Item1, tableKey.Item2);
      }

      protected TableControlParameters GetTableParameters(string dataSetName, string dataTableName)
      {
         var key = new Tuple<string, string>(dataSetName, dataTableName);
         if (this.tempTableControlParameters.ContainsKey(key))
         {
            return this.tempTableControlParameters[key];
         }

         var controlParameters = new TableControlParameters(dataSetName, dataTableName);
         this.tempTableControlParameters.Add(controlParameters.Key, controlParameters);
         return controlParameters;
      }

      protected void CreateTableControlParameters(DataSet dataSet)
      {
         if (dataSet == null) { return; }
         foreach (DataTable dataTable in dataSet.Tables)
         {
            this.CreateTableControlParameters(dataTable);
         }
      }

      protected void CreateTableControlParameters(DataTable dataTable)
      {
         if (dataTable == null)
         {
            return;
         }
         var dataSetName = string.Empty;

         if (dataTable.DataSet != null)
         {
            dataSetName = dataTable.DataSet.DataSetName;
         }

         var tableKey = new Tuple<string, string>(dataSetName, dataTable.TableName);
         this.CreateTableControlParameters(tableKey);
      }

      protected void SetFetchWhereParameters(Tuple<string, string> tableKey, string where, int pageSize, string fldlist)
      {
         var tableControlParameters = this.GetTableParameters(tableKey);
         if (tableControlParameters == null)
         {
            return;
         }
         tableControlParameters.UpdateParameters(@where, pageSize, true, true);
         tableControlParameters.IncludeFields = fldlist;
         tableControlParameters.ExcludeFields = string.Empty;
      }

      protected void SetFetchWhereParameters(Tuple<string, string> tableKey, bool fillmode)
      {
         var tableControlParameters = this.GetTableParameters(tableKey);
         tableControlParameters?.UpdateParameters(fillmode);
      }

      protected void ReportErrors(DataSet dataSet)
      {
         if (dataSet == null)
         {
            ErrorReportingHelper.ReportProgramErrors("null dataSet");
            return;
         }

         var errors = this.GetAllErrors(dataSet);
         if (!string.IsNullOrEmpty(errors))
         {
            ErrorReportingHelper.ReportErrors(errors);
         }
      }

      protected string GetAllErrors(DataSet dataSet)
      {
         if (dataSet == null)
         {
            ErrorReportingHelper.ReportProgramErrors("null dataSet");
            return string.Empty;
         }

         var allErrors = new StringBuilder();
         foreach (var tableError in dataSet.Tables.Cast<DataTable>().Select(this.GetAllErrors).Where(tableError => !string.IsNullOrEmpty(tableError)))
         {
            allErrors.Append(tableError);
         }
         return allErrors.ToString();
      }

      protected void ReportErrors(DataTable table)
      {
         if (table == null)
         {
            ErrorReportingHelper.ReportProgramErrors("null table");
            return;
         }

         var errors = this.GetAllErrors(table);
         if (!string.IsNullOrEmpty(errors))
         {
            ErrorReportingHelper.ReportErrors(errors);
         }
      }

      protected string GetAllErrors(DataTable table)
      {
         if (table == null)
         {
            ErrorReportingHelper.ReportProgramErrors("null table");
            return string.Empty;
         }

         var rowErrors = new StringBuilder();
         if (!table.HasErrors)
         {
            return rowErrors.ToString();
         }
         for (var rowIndex = 0; rowIndex < table.Rows.Count; rowIndex++)
         {
            if (table.Rows[rowIndex].HasErrors)
            {
               rowErrors.Append(table.Rows[rowIndex].RowError.Replace("\t", "<br />"));
            }
         }
         return rowErrors.ToString();
      }

      protected void ReportErrors(string errorMessage)
      {
         ErrorReportingHelper.ReportErrors(errorMessage);
      }

      public void Dispose()
      {
         this.Dispose(true);
         GC.SuppressFinalize(this);
      }

      protected virtual void Dispose(bool disposing)
      {
         if (this.disposed)
         {
            return;
         }

         this.disposed = true;
      }

      ~AdapterBase()
      {
         this.Dispose(false);
      }

      public void SetConnectionFromToken()
      {
         var tokenObject = ApplicationCookieUtilities.Principal(HttpContext.Current.User, out var _);
         this.connection.SessionId = tokenObject.Sessionid;
         this.connection.Operator = tokenObject.Oper;
         this.connection.CompanyNumber = tokenObject.Cono;
         this.connection.CurrentUiCulture = tokenObject.CurrentUiCulture;
      }
   }
}