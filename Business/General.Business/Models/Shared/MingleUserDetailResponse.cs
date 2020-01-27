namespace General.Business.Models.Shared
{
   class MingleUserDetailResponse
   {
      public object ErrorList { get; set; }
      public int Status { get; set; }
      public Userdetaillist[] UserDetailList { get; set; }
   }
}