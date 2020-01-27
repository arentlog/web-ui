using System;
using System.Collections.Generic;
using Infor.Sxe.Shared.Data.Models.Pdswebextendrecord;
using Infor.Sxe.Shared.Data.Models.Pdswebmodrecord;

namespace General.Business.Interfaces.Shared
{
   public interface IJsonViewService : IDisposable
   {
      byte[] ExportExtensions(IEnumerable<string> rowIds);

      IEnumerable<Webextendrecord> ImportExtensionsPartOne(byte[] zipFile);

      void ImportExtensionsPartTwo(IEnumerable<Webextendrecord> webextendrecords);

      byte[] ExportWebModifications(IEnumerable<string> rowIds);

      IEnumerable<Webmodrecord> ImportWebModificationsPartOne(byte[] zipFile);

      void ImportWebModificationsPartTwo(IEnumerable<Webmodrecord> webmodrecords);
   }
}