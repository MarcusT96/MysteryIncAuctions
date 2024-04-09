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
          int id = reader.GetInt32("id");
          string email = reader.IsDBNull(reader.GetOrdinal("email")) ? string.Empty : reader.GetString("email");
          string password = reader.IsDBNull(reader.GetOrdinal("password")) ? string.Empty : reader.GetString("password");
          string firstName = reader.IsDBNull(reader.GetOrdinal("firstName")) ? string.Empty : reader.GetString("firstName");
          string lastName = reader.IsDBNull(reader.GetOrdinal("lastName")) ? string.Empty : reader.GetString("lastName");
          string address = reader.IsDBNull(reader.GetOrdinal("address")) ? string.Empty : reader.GetString("address");
          string city = reader.IsDBNull(reader.GetOrdinal("city")) ? string.Empty : reader.GetString("city");
          string zipCode = reader.IsDBNull(reader.GetOrdinal("zipCode")) ? string.Empty : reader.GetString("zipCode");
          string country = reader.IsDBNull(reader.GetOrdinal("country")) ? string.Empty : reader.GetString("country");
          string phone = reader.IsDBNull(reader.GetOrdinal("phone")) ? string.Empty : reader.GetString("phone");
          bool isAdmin = reader.IsDBNull(reader.GetOrdinal("isAdmin")) ? false : reader.GetBoolean("isAdmin");

          users.Add(new UserRecord(id, email, password, firstName, lastName, address, city, zipCode, country, phone, isAdmin));
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

  public static async Task<IResult> CreateUser(UserRecord newUser)
  {
    using (var conn = new MySqlConnection("server=localhost;port=3306;uid=root;pwd=mypassword;database=mystery_inc"))
    {
      await conn.OpenAsync();
      var cmd = new MySqlCommand("INSERT INTO users (email, password, firstName, lastName) VALUES (@Email, @Password, @FirstName, @LastName)", conn);

      cmd.Parameters.AddWithValue("@Email", newUser.Email);
      cmd.Parameters.AddWithValue("@Password", newUser.Password); // Observera: Lösenord bör hashas
      cmd.Parameters.AddWithValue("@FirstName", newUser.FirstName);
      cmd.Parameters.AddWithValue("@LastName", newUser.LastName);
      // Fortsätt att lägga till parametrar för resten av fälten

      var result = await cmd.ExecuteNonQueryAsync();
      return result > 0 ? Results.Ok(new { Message = "Användaren skapades framgångsrikt." }) : Results.Problem("Kunde inte skapa användaren.");
    }
  }


}
