using Server;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddSingleton<DbConnect>(new DbConnect(builder.Configuration.GetConnectionString("DefaultConnection")));
builder.Services.AddScoped<PostboxService>();
var app = builder.Build();

app.MapGet("/", () => "Hello World!");
app.MapGet("/categories", CategoryOptions.GetCategories);
app.MapPost("/categories", CategoryOptions.CreateCategory);
app.MapPut("/categories/{id:int}", CategoryOptions.UpdateCategory);
app.MapPost("/bids", async (HttpContext context) => await Bid.AddBid(context));
app.MapGet("/payment_options", PaymentOptions.PaymentOpts);
app.MapGet("/payment_options/{id:int}", (int id) => PaymentOptions.GetPaymentOptsByUserId(id));
app.MapPost("/payment_options/", async (HttpContext context) => await PaymentOptions.AddPaymentOpt(context));
app.MapDelete("/payment_options/{id:int}", async (int id) => await PaymentOptions.DeletePaymentOpt(id));
app.MapGet("/users/{id:int}", async (int id) => await User.GetUserById(id));
app.MapGet("/mystery_boxes", async () => await Boxes.All());
app.MapGet("/mystery_boxes/{id:int}", async (int id) => await Boxes.GetById(id));
app.MapGet("/users", User.GetUsers);
app.MapPost("/users", async (User.UserRecord newUser) => await User.CreateUser(newUser));
app.MapPut("/users/{id:int}", async (int id, User.UserRecord updatedUser) => await User.UpdateUser(id, updatedUser));
app.MapGet("/bought_boxes", BoughtBoxesOptions.GetBoughtBoxes);
app.MapPost("/bought_boxes", BoughtBoxesOptions.CreateBoughtBox);
app.MapPut("/bought_boxes/{id:int}", BoughtBoxesOptions.UpdateBoughtBox);
app.MapGet("/reviews", () => Results.Ok(Reviews.GetAllReviews()));
app.MapPost("/postbox", async (Postbox postbox, PostboxService postboxService) => await postboxService.Add(postbox));
app.MapPost("/reviews", Reviews.PostReview);
app.MapDelete("/mystery_boxes/{id:int}", async (int id) => await Boxes.DeleteBox(id));

app.Run();