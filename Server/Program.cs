using Server;
using MySql.Data.MySqlClient;
using System.Data;

State state = new("server=localhost;port=3306;uid=root;pwd=mypassword;database=mystery_inc");

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddSingleton(state);
builder.Services.AddSingleton<DbConnect>(new DbConnect(builder.Configuration.GetConnectionString("DefaultConnection")));
builder.Services.AddScoped<PostboxService>();
builder.Services.AddScoped<Boxes>();
builder.Services.AddScoped<Reviews>();
builder.Services.AddScoped<User>();
var app = builder.Build();

// Categories
app.MapGet("/categories", (State state) => CategoryOptions.GetCategories(state.DB));
app.MapPost("/categories", (HttpContext context, State state) => CategoryOptions.CreateCategory(context, state.DB));
app.MapPut("/categories/{id:int}", (HttpContext context, State state, int id) => CategoryOptions.UpdateCategory(id, context, state.DB));

// Bids
app.MapPost("/bids", async (HttpContext context, State state) => await Bid.AddBid(context, state.DB));

// Payment options
app.MapGet("/payment_options", (State state) => PaymentOptions.PaymentOpts(state.DB));
app.MapGet("/payment_options/{id:int}", (State state, int id) => PaymentOptions.GetPaymentOptsByUserId(id, state.DB));
app.MapPost("/payment_options/", async (HttpContext context, State state) => await PaymentOptions.AddPaymentOpt(context, state.DB));
app.MapDelete("/payment_options/{id:int}", async (State state, int id) => await PaymentOptions.DeletePaymentOpt(id, state.DB));

// Users
app.MapGet("/users/{id:int}", async (State state, int id) => await User.GetUserById(id, state.DB));
app.MapGet("/users", async (State state) => await User.GetUsers(state.DB));
app.MapPost("/users", async (HttpContext context, State state, UserRecord newUser) => await User.CreateUser(newUser, state.DB));
app.MapPut("/users/{id:int}", async (State state, int id, UserRecord updatedUser) => await User.UpdateUser(id, updatedUser, state.DB));

// Bought boxes
app.MapGet("/bought_boxes", (State state) => BoughtBoxesOptions.GetBoughtBoxes(state.DB));
app.MapGet("/bought_boxes/{id:int}", async (State state, int id) => await BoughtBoxesOptions.GetBoughtBoxesById(id, state.DB));
app.MapPost("/bought_boxes", (HttpContext context, State state) => BoughtBoxesOptions.CreateBoughtBox(context, state.DB));
app.MapPut("/bought_boxes/{id:int}", (int id, HttpContext context, State state) => BoughtBoxesOptions.UpdateBoughtBox(id, context, state.DB));

// Mystery boxes FIX STATE
app.MapPost("/mystery_boxes", async (Postbox postbox, PostboxService postboxService) => await postboxService.Add(postbox));
app.MapDelete("/mystery_boxes/{id:int}", async (int id, Boxes boxes) => await boxes.DeleteBox(id));
app.MapPut("/mystery_boxes/{id:int}", async (int id, HttpContext context, Boxes boxService) => await boxService.UpdateBoxes(id, context));
app.MapGet("/mystery_boxes", async (Boxes boxes) => await boxes.All());
app.MapGet("/mystery_boxes/{id:int}", async (int id, Boxes boxes) => await boxes.GetById(id));

// Reviews
app.MapGet("/reviews", (State state) => Results.Ok(Reviews.GetAllReviews(state.DB)));
app.MapPost("/reviews", async (State state, Review review) => await Reviews.PostReview(review, state.DB));

app.Run();

public record State(string DB);