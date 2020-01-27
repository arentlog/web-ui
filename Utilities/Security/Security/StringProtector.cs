using System;
using System.IO;
using System.Security.Cryptography;
using System.Text;

namespace Security.Security
{
   public static class StringProtector
   {
      public static string Protect(string unprotectedText, string encryptKey, string encryptIv)
      {
         var bytes = Encoding.UTF8.GetBytes(unprotectedText);
         using (var cryptoServiceProvider = new AesCryptoServiceProvider())
         {
            cryptoServiceProvider.Key = Convert.FromBase64String(encryptKey);
            cryptoServiceProvider.IV = Convert.FromBase64String(encryptIv);
            using (var memoryStream = new MemoryStream())
            {
               var cryptoStream = new CryptoStream(memoryStream, cryptoServiceProvider.CreateEncryptor(), CryptoStreamMode.Write);
               var buffer = bytes;
               var length = bytes.Length;
               // PMC 02/14/2018 - IBM AppScan - This has been manually reviewed and passed as being safe
               cryptoStream.Write(buffer, 0, length);
               cryptoStream.Close();
               memoryStream.Close();
               return Convert.ToBase64String(memoryStream.ToArray());
            }
         }
      }

      public static string Unprotect(string protectedText, string encryptKey, string encryptIv)
      {
         if (string.IsNullOrEmpty(protectedText))
         {
            return string.Empty;
         }

         try
         {
            var bytes = Convert.FromBase64String(protectedText);
            using (var cryptoServiceProvider = new AesCryptoServiceProvider())
            {
               cryptoServiceProvider.Key = Convert.FromBase64String(encryptKey);
               cryptoServiceProvider.IV = Convert.FromBase64String(encryptIv);
               var decryptor =
                  cryptoServiceProvider.CreateDecryptor(cryptoServiceProvider.Key, cryptoServiceProvider.IV);
               using (var memoryStream = new MemoryStream(bytes))
               {
                  using (var cryptoStream = new CryptoStream(memoryStream, decryptor, CryptoStreamMode.Read))
                  {
                     using (var streamReader = new StreamReader(cryptoStream))
                        return streamReader.ReadToEnd();
                  }
               }
            }
         }
         catch
         {
            return string.Empty;
         }
      }
   }
}