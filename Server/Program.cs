using Server;
using System.Windows;
var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

MySql.Data.MySqlClient.MySqlConnection conn;
string myConnectionString;

myConnectionString = "server=localhost;port=3306;uid=root;pwd=batman01;database=mystery_inc";


try
{
  conn = new MySql.Data.MySqlClient.MySqlConnection(myConnectionString);
  conn.Open();
  Console.WriteLine("Sucess!");
}
catch (MySql.Data.MySqlClient.MySqlException ex)
{
  Console.WriteLine(ex);
}

app.MapGet("/", () => "Hello World!");
app.MapGet("/categories", CategoryOptions.GetCategories);
app.MapGet("/bids", Bid.GetBids);
app.MapGet("/bids/{id:int}", async (int id) => await Bid.GetBidById(id));
app.MapGet("/payment_options", PaymentOptions.PaymentOpts);
app.MapGet("/boxes", async () => await Boxes.All());

app.Run();
