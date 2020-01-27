using System;
using ServiceInterfaceClient.Attributes;

namespace General.Business.Models.Shared
{
   public class Userdetaillist
   {
      [StringValidation]
      public string Email { get; set; }
      [StringValidation]
      public string FirstName { get; set; }
      [StringValidation]
      public string LastName { get; set; }
      [StringValidation]
      public string PersonId { get; set; }
      public int Status { get; set; }
      [StringValidation]
      public string Title { get; set; }
      public DateTime UpdatedDate { get; set; }
      [StringValidation]
      public string UserGUID { get; set; }
      public int UserId { get; set; }
      [StringValidation]
      public string UserName { get; set; }
   }
}