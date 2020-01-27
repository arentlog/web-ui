using System.Globalization;

namespace ServiceInterfaceClient.Helpers
{
   public class GlAccountFormatter
   {
      #region Fields

      private readonly string _glDelim1;

      private readonly string _glDelim2;

      private readonly string _glDelim3;

      private readonly int _glSize1;

      private readonly int _glSize2;

      private readonly int _glSize3;

      private readonly int _glSize4;

      public int FullComposedLength
      {
         get
         {
            var allSizes = this._glSize1 + this._glSize2 + this._glSize3 + this._glSize4;
            if (this._glSize4 > 0)
            {
               allSizes++;
            }
            if (this._glSize3 > 0)
            {
               allSizes++;
            }
            if (this._glSize2 > 0)
            {
               allSizes++;
            }
            return allSizes;
         }
      }

      public int SpecialComposedLength
      {
         get
         {
            var allSizes = this._glSize3 + this._glSize4;
            if (this._glSize4 > 0)
            {
               allSizes++;
            }
            return allSizes;
         }
      }

      #endregion

      #region Constructors and Destructors

      public GlAccountFormatter(
         int glSize1,
         int glSize2,
         int glSize3,
         int glSize4,
         string glDelim1,
         string glDelim2,
         string glDelim3)
      {
         this._glSize1 = glSize1;
         this._glSize2 = glSize2;
         this._glSize3 = glSize3;
         this._glSize4 = glSize4;
         this._glDelim1 = string.IsNullOrEmpty(glDelim1) ? " " : glDelim1;
         this._glDelim2 = string.IsNullOrEmpty(glDelim2) ? " " : glDelim2;
         this._glDelim3 = string.IsNullOrEmpty(glDelim3) ? " " : glDelim3;
      }

      #endregion

      #region Public Methods and Operators

      public string ReturnFormattedAccount(int gldivno, int gldeptno, int glacctno, int glsubno, bool specialCompose = false)
      {
         var sGlacctno = PadAsNeccesary(glacctno, this._glSize3);
         var sGlsubno = PadAsNeccesary(glsubno, this._glSize4);
         if (specialCompose)
         {
            return $"{sGlacctno}{(string.IsNullOrEmpty(sGlacctno) ? string.Empty : this._glDelim3)}{sGlsubno}";
         }
         else
         {
            var sGldivno = PadAsNeccesary(gldivno, this._glSize1);
            var sGldeptno = PadAsNeccesary(gldeptno, this._glSize2);
            return
               $"{sGldivno}{(string.IsNullOrEmpty(sGldivno) ? string.Empty : this._glDelim1)}{sGldeptno}{(string.IsNullOrEmpty(sGldeptno) ? string.Empty : this._glDelim2)}{sGlacctno}{(string.IsNullOrEmpty(sGlacctno) ? string.Empty : this._glDelim3)}{sGlsubno}";
         }
      }

      public GlAccountStructure DecomposeFormattedAccount(string glNo, bool specialDecompose = false)
      {
         if (string.IsNullOrEmpty(glNo)) return new GlAccountStructure();
         var gLAccountStructure = new GlAccountStructure();
         if (specialDecompose)
         {
            gLAccountStructure.Glacctno = ProcessString(ref glNo, this._glSize3);
         }
         else
         {
            gLAccountStructure.Gldivno = ProcessString(ref glNo, this._glSize1);
            gLAccountStructure.Gldeptno = ProcessString(ref glNo, this._glSize2);
            gLAccountStructure.Glacctno = ProcessString(ref glNo, this._glSize3);
            gLAccountStructure.Glsubno = ProcessString(ref glNo, this._glSize4);
         }
         if (!string.IsNullOrEmpty(glNo))
         {
            return gLAccountStructure;
         }
         int outNo;
         if (int.TryParse(glNo, out outNo))
         {
            gLAccountStructure.Glsubno = outNo;
         }
         return gLAccountStructure;
      }

      #endregion

      #region Methods

      private static string PadAsNeccesary(int value, int size)
      {
         return size == 0
                   ? string.Empty
                   : value.ToString(CultureInfo.InvariantCulture).PadLeft(size, '0');
      }

      private static int ProcessString(ref string returnedString, int size)
      {
         var returnValue = 0;
         if (size == 0 || returnedString.Length < size)
         {
            return returnValue;
         }
         var sNo = returnedString.Substring(0, size);
         int outNo;
         if (int.TryParse(sNo, out outNo))
         {
            returnValue = outNo;
         }
         var removeChar = 0;
         if (returnedString.Length > size)
         {
            removeChar = 1;
         }
         returnedString = returnedString.Remove(0, size + removeChar);
         return returnValue;
      }

      #endregion
   }
}