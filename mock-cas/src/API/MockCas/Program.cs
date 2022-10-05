using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;
using MockCas.Models;
using NSwag;
using NSwag.AspNetCore;
using NSwag.Generation.Processors.Security;

var builder = WebApplication.CreateBuilder(args);
var connectionString = builder.Configuration.GetConnectionString("MockCas") ?? "Data Source=MockCas.db";
builder.Services.AddSqlite<MockCasDb>(connectionString);
// Add services to the container.
builder.Services.AddControllers().AddJsonOptions(x =>
                x.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles);

builder.Services.Configure<OpenApiDocumentMiddlewareSettings>(options =>
{
    options.Path = "/api/openapi/{documentName}/openapi.json";
    options.DocumentName = "Mock CAS API";
    options.PostProcess = (document, req) =>
    {
        document.Info.Title = "Mock CAS API";
    };
});

builder.Services.Configure<SwaggerUi3Settings>(options =>
{
    options.Path = "/api/openapi";
    options.DocumentTitle = "responders Portal API Documentation";
    options.DocumentPath = "/api/openapi/{documentName}/openapi.json";
});

builder.Services.AddOpenApiDocument(document =>
{
    document.AddSecurity("bearer token", Array.Empty<string>(), new OpenApiSecurityScheme
    {
        Type = OpenApiSecuritySchemeType.Http,
        Scheme = "Bearer",
        BearerFormat = "paste token here",
        In = OpenApiSecurityApiKeyLocation.Header
    });

    document.OperationProcessors.Add(new AspNetCoreOperationSecurityScopeProcessor("bearer token"));
    document.GenerateAbstractProperties = true;
});

builder.Services.AddCors(opts =>
{
    opts.AddPolicy(name: "test",
                      policy =>
                      {
                          policy.WithOrigins("https://localhost:1200").AllowAnyHeader().AllowAnyMethod();
                      });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseOpenApi();
    app.UseSwaggerUi3();
}

app.UseHttpsRedirection();
app.UseCors("test");
app.UseAuthorization();
app.UseStaticFiles();
app.UseRouting();

app.MapControllers();

using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;

    var context = services.GetRequiredService<MockCasDb>();
    if (context.Database.GetPendingMigrations().Any())
    {
        context.Database.Migrate();
    }
}

app.Run();