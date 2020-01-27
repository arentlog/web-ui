using System;

namespace ServiceInterfaceClient.Interfaces
{
   public interface IUserFields
   {
      string user1 { get; set; }
      string user2 { get; set; }
      string user3 { get; set; }
      string user4 { get; set; }
      string user5 { get; set; }
      decimal? user6 { get; set; }
      decimal? user7 { get; set; }
      DateTime? user8 { get; set; }
      DateTime? user9 { get; set; }
   }
}