using Microsoft.AspNetCore.Mvc;
using w4.Infrastructure;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddApiVersioning(o => { o.DefaultApiVersion = new ApiVersion(1, 0); o.AssumeDefaultVersionWhenUnspecified = true; o.ReportApiVersions = true; });
builder.Services.AddSingleton<InMemoryStore>();
var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI();


app.MapGet("/", () =>
    Results.Ok("W4 RESTful API is running. Open /swagger for API documentation."));

app.MapControllers();
app.Run();

public partial class Program { }
