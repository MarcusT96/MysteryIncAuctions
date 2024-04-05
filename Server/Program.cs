using Server;

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapGet("/", () => "Hello World!");
app.MapGet("/api/categories", CategoryOptions.GetCategories);
app.MapGet("/api/bids", Bid.GetBids);
app.Run();
