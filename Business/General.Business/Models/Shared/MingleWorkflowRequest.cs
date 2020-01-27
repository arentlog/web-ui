using ServiceInterfaceClient.Attributes;

namespace General.Business.Models.Shared
{
   public class MingleWorkflowRequest
   {
      [StringValidation]
      public string InstanceDescription { get; set; }
      [StringValidation]
      public string InstanceName { get; set; }
      public Startparameter[] StartParameters { get; set; }
      [StringValidation]
      public string WorkflowName { get; set; }
   }
}