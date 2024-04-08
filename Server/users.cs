namespace Server;
using System.Data;
using MySql.Data.MySqlClient;

public class User
{
  public record UserRecord(
      int Id,
      string Email,
      string Password, // Notera: Detta bör vara en hashad representation
      string FirstName,
      string LastName,
      string Address,
      string City,
      string ZipCode,
      string Country,
      string Phone,
      bool IsAdmin);

  public static List<UserRecord> GetUsers()
  {
    List<UserRecord> users = new List<UserRecord>();
    using (MySqlConnection conn = new MySqlConnection("server=localhost;port=3306;uid=root;pwd=mypassword;database=mystery_inc"))
    {
      conn.Open();
      MySqlCommand cmd = new MySqlCommand("SELECT id, email, password, firstName, lastName, address, city, zipCode, country, phone, isAdmin FROM users", conn);

      using (MySqlDataReader reader = cmd.ExecuteReader())
      {
        while (reader.Read())
        {
          users.Add(new UserRecord(
              reader.GetInt32("id"),
              reader.GetString("email"),
              reader.GetString("password"), // Kom ihåg: detta bör vara hashat
              reader.GetString("firstName"),
              reader.GetString("lastName"),
              reader.GetString("address"),
              reader.GetString("city"),
              reader.GetString("zipCode"),
              reader.GetString("country"),
              reader.GetString("phone"),
              reader.GetBoolean("isAdmin")));
        }
      }
    }
    return users;
  }

  public static async Task<IResult> GetUserById(int id)
  {
    UserRecord? user = null;
    using (var conn = new MySqlConnection("server=localhost;port=3306;uid=root;pwd=mypassword;database=mystery_inc"))
    {
      await conn.OpenAsync();
      var cmd = new MySqlCommand("SELECT id, email, password, firstName, lastName, address, city, zipCode, country, phone, isAdmin FROM users WHERE id = @id", conn);
      cmd.Parameters.AddWithValue("@id", id);

      using (var reader = await cmd.ExecuteReaderAsync())
      {
        if (await reader.ReadAsync())
        {
          user = new UserRecord(
              reader.GetInt32("id"),
              reader.GetString("email"),
              reader.GetString("password"), // Kom ihåg: detta bör vara hashat
              reader.GetString("firstName"),
              reader.GetString("lastName"),
              reader.GetString("address"),
              reader.GetString("city"),
              reader.GetString("zipCode"),
              reader.GetString("country"),
              reader.GetString("phone"),
              reader.GetBoolean("isAdmin"));
          return Results.Ok(user);
        }
      }
    }
    return Results.NotFound();
  }
}
