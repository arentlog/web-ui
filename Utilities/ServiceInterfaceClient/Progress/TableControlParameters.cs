using System;
using System.Diagnostics.CodeAnalysis;
using Logging.Logging;

namespace ServiceInterfaceClient.Progress
{
   /// <summary>
   /// Provides parameters that control the behavior of the progress Service Interface call.
   /// </summary>
   [Serializable]
   public class TableControlParameters
   {
      private Tuple<string, string> key;

      public const string FillModeNoFill = "NO-FILL";
      public const string FillModeMerge = "MERGE";
      public const string FillModeEmpty = "EMPTY";
      public const string FillModeAppend = "APPEND";
      public const string FillModeReplace = "REPLACE";
      public const string ParameterNameFillMode = "Fill-Mode";

      public string DataSetName { get; set; }
      public string TableName { get; set; } // BufferName

      public string WhereClause { get; set; }
      public int PageSize { get; set; } // BatchSize
      public bool RestartRowId { get; set; } // RestartRowid

      public string FillMode { get; set; } // fillmode for the buffer - Default NO-FILL
      public string FindSeq { get; set; } // Find options("",First,Last,Prev,Next,prev-first,next-last)
      public string SavedRowId { get; set; }
      public bool DataRelationReposition { get; set; }
      public string ActivateDataRelation { get; set; } // data relations to be activated where the proxy table is the parent in a relation

      public string IncludeFields { get; set; } // Fields to be included in the query for the prodataset fill operation
      public string ExcludeFields { get; set; } // Fields to be Excluded in the query for the prodataset fill operation

      public string QuerySort { get; set; }
      public string QueryFilter { get; set; }
      public string ClientSortPhrase { get; set; }
      public int LastResultCount { get; set; }

      /// <summary>Reposition to the SavedRowId</summary>
      /// <value>YES: don't want to reposition to the Saved Rowid. NO: use the SavedRowid to reposition.</value>
      [SuppressMessage("StyleCop.CSharp.DocumentationRules", "SA1650:ElementDocumentationMustBeSpelledCorrectly", Justification = "Reviewed.")]
      public string RestartRowid => this.RestartRowId ? "YES" : "NO";

      /// <summary>The name of the buffer.</summary>
      public string BufferName => this.TableName;

      public string BatchSize => this.PageSize.ToString();

      private TableControlParameters()
      {
      }

      public TableControlParameters(string dataSetName, string dataTableName)
      {
         if (string.IsNullOrEmpty(dataSetName))
         {
            // PMC 02/14/2018 - IBM AppScan - This has been manually reviewed and passed as being safe - Does not reveal error, logs securely
            var nLogLogger = new NLogLogger("ReportErrors");
            nLogLogger.Error("dataSetName");
            throw new ArgumentNullException(nameof(dataSetName));
         }
         if (string.IsNullOrEmpty(dataTableName))
         {
            // PMC 02/14/2018 - IBM AppScan - This has been manually reviewed and passed as being safe - Does not reveal error, logs securely
            var nLogLogger = new NLogLogger("ReportErrors");
            nLogLogger.Error("dataTableName");
            throw new ArgumentNullException(nameof(dataTableName));
         }

         this.DataSetName = dataSetName;
         this.TableName = dataTableName;

         // Set initial default values
         this.ResetToDefaults();
      }

      public void ResetToDefaults()
      {
         this.PageSize = 50;
         this.FillMode = FillModeNoFill;
         this.DataRelationReposition = false;
         this.WhereClause = string.Empty;
         this.RestartRowId = false;
         this.FindSeq = string.Empty;
         this.SavedRowId = string.Empty;
         this.DataRelationReposition = false;
         this.ActivateDataRelation = string.Empty;
         this.IncludeFields = string.Empty;
         this.ExcludeFields = string.Empty;
         this.QuerySort = string.Empty;
         this.QueryFilter = string.Empty;
         this.ClientSortPhrase = string.Empty;
         this.LastResultCount = 0;
      }

      public void UpdateParameters(string where, int pageSize, bool restartRowId, bool fillmode)
      {
         this.WhereClause = where;
         this.PageSize = pageSize;
         this.FillMode = fillmode ? FillModeMerge : FillModeNoFill;
         this.RestartRowId = restartRowId;
      }

      public void UpdateParameters(bool fillmode)
      {
         this.FillMode = fillmode ? FillModeMerge : FillModeNoFill;
      }

      public Tuple<string, string> Key => this.key ?? (this.key = new Tuple<string, string>(this.DataSetName, this.TableName));
   }
}