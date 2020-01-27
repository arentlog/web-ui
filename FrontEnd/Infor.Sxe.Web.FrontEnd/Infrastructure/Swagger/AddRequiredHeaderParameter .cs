using System.Collections.Generic;
using System.Web.Http.Description;
using Swagger.Net;

namespace Infor.Sxe.Web.FrontEnd.Infrastructure.Swagger
{
   public class AddRequiredHeaderParameter : IOperationFilter
   {
      public void Apply(Operation operation, SchemaRegistry schemaRegistry, ApiDescription apiDescription)
      {
         if (operation.parameters == null)
            operation.parameters = new List<Parameter>();

         operation.parameters.Add(new Parameter
         {
            name = "Token",
            @in = "header",
            type = "string",
            required = true,
            description = "Authentication token, retrieved at login"
         });

         operation.parameters.Add(new Parameter
         {
            name = "Cookie",
            @in = "header",
            type = "string",
            required = false,
            description = "ADFS/Ping Cookie required for SSO"
         });

         operation.parameters.Add(new Parameter
         {
            name = "Content-Type",
            @in = "header",
            type = "string",
            required = true,
            example = "application/json"
         });
      }
   }
}