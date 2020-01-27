namespace General.Business.Models.Shared
{
   public class MingleWorkflowResponse
   {
      public int Status { get; set; }
      public Errorlist[] ErrorList { get; set; }
      public int WorkflowId { get; set; }
   }
}