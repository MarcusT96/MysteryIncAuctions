using Server;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddSingleton<DbConnect>(new DbConnect(builder.Configuration.GetConnectionString("DefaultConnection")));
builder.Services.AddScoped<PostboxService>();
builder.Services.AddScoped<Boxes>();
builder.Services.AddScoped<Reviews>();
builder.Services.AddScoped<User>();
var app = builder.Build();

// Categories
app.MapGet("/categories", CategoryOptions.GetCategories);
app.MapPost("/categories", CategoryOptions.CreateCategory);
app.MapPut("/categories/{id:int}", CategoryOptions.UpdateCategory);

// Bids
app.MapPost("/bids", async (HttpContext context) => await Bid.AddBid(context));

// Payment options
app.MapGet("/payment_options", PaymentOptions.PaymentOpts);
app.MapGet("/payment_options/{id:int}", (int id) => PaymentOptions.GetPaymentOptsByUserId(id));
app.MapPost("/payment_options/", async (HttpContext context) => await PaymentOptions.AddPaymentOpt(context));
app.MapDelete("/payment_options/{id:int}", async (int id) => await PaymentOptions.DeletePaymentOpt(id));

// Users
app.MapGet("/users/{id:int}", async (int id, User userService) => await userService.GetUserById(id));
app.MapGet("/users", async (User users) => await users.GetUsers());
app.MapPost("/users", async (HttpContext context, User userService, UserRecord newUser) => await userService.CreateUser(newUser));
app.MapPut("/users/{id:int}", async (int id, User userService, UserRecord updatedUser) => await userService.UpdateUser(id, updatedUser));

// Bought boxes
app.MapGet("/bought_boxes", BoughtBoxesOptions.GetBoughtBoxes);
app.MapGet("/bought_boxes/{id:int}", async (int id) => await BoughtBoxesOptions.GetBoughtBoxesById(id));
app.MapPost("/bought_boxes", BoughtBoxesOptions.CreateBoughtBox);
app.MapPut("/bought_boxes/{id:int}", BoughtBoxesOptions.UpdateBoughtBox);

// Mystery boxes
app.MapPost("/mystery_boxes", async (Postbox postbox, PostboxService postboxService) => await postboxService.Add(postbox));
app.MapDelete("/mystery_boxes/{id:int}", async (int id, Boxes boxes) => await boxes.DeleteBox(id));
app.MapPut("/mystery_boxes/{id:int}", async (int id, HttpContext context, Boxes boxService) => await boxService.UpdateBoxes(id, context));
app.MapGet("/mystery_boxes", async (Boxes boxes) => await boxes.All());
app.MapGet("/mystery_boxes/{id:int}", async (int id, Boxes boxes) => await boxes.GetById(id));

// Reviews
app.MapGet("/reviews", async (Reviews reviews) => Results.Ok(await reviews.GetAllReviews()));
app.MapPost("/reviews", async (Review review, Reviews reviews) => await reviews.PostReview(review));

app.Run();