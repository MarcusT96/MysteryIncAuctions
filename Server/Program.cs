using Server;
using System.Windows;
var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

MySql.Data.MySqlClient.MySqlConnection conn;
string myConnectionString;

myConnectionString = "server=localhost;port=3306;uid=root;pwd=mypassword;database=mystery_inc";


try
{
  conn = new MySql.Data.MySqlClient.MySqlConnection(myConnectionString);
  conn.Open();
  Console.WriteLine("Success!");
}
catch (MySql.Data.MySqlClient.MySqlException ex)
{
  Console.WriteLine(ex);
}

app.MapGet("/", () => "Hello World!");
app.MapGet("/categories", CategoryOptions.GetCategories);
app.MapPost("/bids", async (HttpContext context) => await Bid.AddBid(context));


app.MapGet("/payment_options", PaymentOptions.PaymentOpts);
app.MapGet("/users/{id:int}", async (int id) => await User.GetUserById(id));



app.Run();
