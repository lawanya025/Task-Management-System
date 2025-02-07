using Microsoft.EntityFrameworkCore;
using TaskManagementBackend.Data;
using Pomelo.EntityFrameworkCore.MySql;
using Microsoft.OpenApi.Models; // For Swagger
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Hosting;


var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseMySql(builder.Configuration.GetConnectionString("DefaultConnection"),
    ServerVersion.AutoDetect(builder.Configuration.GetConnectionString("DefaultConnection"))));

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", policy =>
    {
        policy.WithOrigins("http://localhost:5174") // React app port
              .AllowAnyMethod()
              .AllowAnyHeader()
              .AllowCredentials();
    });
});

builder.Services.AddControllers();

 builder.Services.AddSwaggerGen(c =>
 {
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "Task Management API", Version = "v1" });
 });

 var app = builder.Build();

 if (app.Environment.IsDevelopment())
 {
     app.UseSwagger();
     app.UseSwaggerUI(c =>
     {
         c.SwaggerEndpoint("/swagger/v1/swagger.json", "Task Management API V1");
         c.RoutePrefix = string.Empty;  // Set Swagger UI to be at root URL
     });
 }

 app.UseCors("AllowReactApp");

 app.UseRouting(); 

 app.UseAuthorization();

 app.MapControllers();

 // listening port
 app.Urls.Add("http://localhost:5194");

 app.Run();

