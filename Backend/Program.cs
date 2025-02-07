using Microsoft.EntityFrameworkCore;
using TaskManagementBackend.Data;
using Pomelo.EntityFrameworkCore.MySql;
using Microsoft.OpenApi.Models; // For Swagger
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Hosting;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseMySql(builder.Configuration.GetConnectionString("DefaultConnection"),
    ServerVersion.AutoDetect(builder.Configuration.GetConnectionString("DefaultConnection"))));

// Enable CORS for React app
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

// Add controllers
builder.Services.AddControllers();

//Add Swagger for API documentation (optional, but useful for testing)
 builder.Services.AddSwaggerGen(c =>
 {
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "Task Management API", Version = "v1" });
 });

 var app = builder.Build();

 // Configure the HTTP request pipeline.
 if (app.Environment.IsDevelopment())
 {
     app.UseSwagger();
     app.UseSwaggerUI(c =>
     {
         c.SwaggerEndpoint("/swagger/v1/swagger.json", "Task Management API V1");
         c.RoutePrefix = string.Empty;  // Set Swagger UI to be at root URL
     });
 }

 // Use CORS middleware
 app.UseCors("AllowReactApp");

 app.UseRouting(); // Make sure this is called before UseAuthorization and MapControllers

 app.UseAuthorization();

 app.MapControllers();

 // Set the listening port
 app.Urls.Add("http://localhost:5194");

 app.Run();

