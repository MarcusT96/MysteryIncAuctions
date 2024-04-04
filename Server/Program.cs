using Server;

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapGet("/", () => "Hello World!");
app.MapGet("/payment_options", PaymentOptions.PaymentOpts);

app.Run();
