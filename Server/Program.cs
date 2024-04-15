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
app.MapPost("/categories", CategoryOptions.CreateCategory);
app.MapPut("/categories/{id:int}", CategoryOptions.UpdateCategory);
app.MapPost("/bids", async (HttpContext context) => await Bid.AddBid(context));
app.MapGet("/payment_options", PaymentOptions.PaymentOpts);
app.MapGet("/payment_options/{id:int}", (int id) => PaymentOptions.GetPaymentOptsByUserId(id));
app.MapPost("/payment_options/", async (HttpContext context) => await PaymentOptions.AddPaymentOpt(context));
app.MapGet("/users/{id:int}", async (int id) => await User.GetUserById(id));
app.MapGet("/mystery_boxes", async () => await Boxes.All());
app.MapGet("/mystery_boxes/{id:int}", async (int id) => await Boxes.GetById(id));
app.MapGet("/users", User.GetUsers);
app.MapPost("/users", async (User.UserRecord newUser) => await User.CreateUser(newUser));
app.MapPut("/users/{id:int}", async (int id, User.UserRecord updatedUser) => await User.UpdateUser(id, updatedUser));
app.MapGet("/boughtboxes", BoughtBoxesOptions.GetBoughtBoxes);
app.MapPost("/boughtboxes", BoughtBoxesOptions.CreateBoughtBox);
app.MapPut("/boughtboxes/{id:int}", BoughtBoxesOptions.UpdateBoughtBox);
app.MapGet("/reviews", () => Results.Ok(Reviews.GetAllReviews()));

app.Run();