﻿using System;
using System.Runtime.CompilerServices;

namespace ServiceInterfaceClient.Attributes
{
   [AttributeUsage(AttributeTargets.Property)]
   public sealed class OrderAttribute : Attribute
   {
      public OrderAttribute([CallerLineNumber]int order = 0)
      {
         Order = order;
      }

      public int Order { get; }
   }
}