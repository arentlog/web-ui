//------------------------------------------------------------------------------
// 
//     This code was generated by a tool.
//     Template version $Rev: 21496 $
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
using ServiceInterfaceClient.BaseClasses;
using ServiceInterfaceClient.Extensions;
using ServiceInterfaceClient.Interfaces;
using ServiceInterfaceClient.Progress;
    
namespace Infor.Sxe.TWL.Data.Repositories
{
   using Infor.Sxe.TWL.Data.Adapters;
   
   using Models.PdsContext;
   using Models.Pdscomment;

   public partial class CommentRepository : RepositoryBase
   {
      private CommentAdapter adapter;
  
      public CommentRepository(IProgressConnection connection)
      {
         this.adapter = new CommentAdapter(connection);
         this.Cono = this.adapter.Cono;
         this.OnCreated();
      }
  
      partial void OnCreated();
      
      public Comment GetByRowId(string rowId, string fldList)
      {
         return this.adapter.GetByRowId(rowId, fldList);
      }

      public IEnumerable<Comment> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
      {
         return this.adapter.GetListByRowIdList(rowIds, batchsize, fldList);
      }
        
      public Comment Get(string type, int id, int line, int lineSequence, int commentLine, int batchsize, string fldList)
      {
         return this.adapter.Get(type, id, line, lineSequence, commentLine, batchsize, fldList);
      }
      
      public IEnumerable<Comment> GetList(string where, int batchsize, string fldList)
      {
         return this.adapter.GetList(where, batchsize, fldList);
      }
  
      public IEnumerable<Comment> GetListByCommentNum(int commentNum, int batchsize, string fldList)
      {
         return this.adapter.GetListByCommentNum(commentNum, batchsize, fldList);
      }

      public Comment Insert(Comment record)
      {
         return this.adapter.Insert(record);        
      }
  
      public Comment Update(Comment record)
      {
         return this.adapter.Update(record);
      }
  
      public void Delete(Comment record)
      {
         this.adapter.Delete(record);
      }
  
      public void DeleteListByRowIds(List<string> rowIds)
      {
         this.adapter.DeleteListByRowIds(rowIds);
      }
	  
      protected override void Dispose(bool disposing)
      {
         if (this.disposed) { return; }
         if (!disposing)
         {
            return;
         }
         this.adapter?.Dispose();	
         this.adapter = null;
         base.Dispose(true);
      }
   }
}
#pragma warning restore 1591
  