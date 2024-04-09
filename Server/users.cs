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

      var result = await cmd.ExecuteNonQueryAsync();
      return result > 0 ? Results.Ok(new { Message = "Användaren skapades framgångsrikt." }) : Results.Problem("Kunde inte skapa användaren.");
    }
  }

  public static async Task<IResult> UpdateUser(int id, UserRecord updatedUser)
  {
    using (var conn = new MySqlConnection("server=localhost;port=3306;uid=root;pwd=mypassword;database=mystery_inc"))
    {
      await conn.OpenAsync();
      using (var transaction = await conn.BeginTransactionAsync())
      {
        try
        {
          var cmd = new MySqlCommand("", conn);
          cmd.Transaction = transaction;

          // En lista för att samla ihop alla delar av vår UPDATE-sats.
          var updates = new List<string>();
          if (!string.IsNullOrWhiteSpace(updatedUser.Email)) updates.Add("email = @Email");
          // Antag att vi inte vill uppdatera lösenordet om ett nytt inte tillhandahålls.
          if (!string.IsNullOrWhiteSpace(updatedUser.Password)) updates.Add("password = @Password");
          if (!string.IsNullOrWhiteSpace(updatedUser.FirstName)) updates.Add("firstName = @FirstName");
          if (!string.IsNullOrWhiteSpace(updatedUser.LastName)) updates.Add("lastName = @LastName");
          if (!string.IsNullOrWhiteSpace(updatedUser.Address)) updates.Add("address = @Address");
          if (!string.IsNullOrWhiteSpace(updatedUser.City)) updates.Add("city = @City");
          if (!string.IsNullOrWhiteSpace(updatedUser.ZipCode)) updates.Add("zipCode = @Zipcode");
          if (!string.IsNullOrWhiteSpace(updatedUser.Country)) updates.Add("country = @Country");
          if (!string.IsNullOrWhiteSpace(updatedUser.Phone)) updates.Add("phone = @Phone");

          // Bygg vår SQL-sats dynamiskt baserat på vilka fält som ska uppdateras.
          cmd.CommandText = $"UPDATE users SET {string.Join(", ", updates)} WHERE id = @Id";

          // Bind parametrar
          cmd.Parameters.AddWithValue("@Id", id);
          if (!string.IsNullOrWhiteSpace(updatedUser.Email)) cmd.Parameters.AddWithValue("@Email", updatedUser.Email);
          if (!string.IsNullOrWhiteSpace(updatedUser.Password)) cmd.Parameters.AddWithValue("@Password", updatedUser.Password);
          if (!string.IsNullOrWhiteSpace(updatedUser.FirstName)) cmd.Parameters.AddWithValue("@FirstName", updatedUser.FirstName);
          if (!string.IsNullOrWhiteSpace(updatedUser.LastName)) cmd.Parameters.AddWithValue("@LastName", updatedUser.LastName);
          if (!string.IsNullOrWhiteSpace(updatedUser.Address)) cmd.Parameters.AddWithValue("@Address", updatedUser.Address);
          if (!string.IsNullOrWhiteSpace(updatedUser.City)) cmd.Parameters.AddWithValue("@City", updatedUser.City);
          if (!string.IsNullOrWhiteSpace(updatedUser.ZipCode)) cmd.Parameters.AddWithValue("@ZipCode", updatedUser.ZipCode);
          if (!string.IsNullOrWhiteSpace(updatedUser.Country)) cmd.Parameters.AddWithValue("@Country", updatedUser.Country);
          if (!string.IsNullOrWhiteSpace(updatedUser.Phone)) cmd.Parameters.AddWithValue("@Phone", updatedUser.Phone);

          var result = await cmd.ExecuteNonQueryAsync();
          if (result > 0)
          {
            await transaction.CommitAsync();
            return Results.Ok(new { Message = "Användaren uppdaterades framgångsrikt." });
          }
          else
          {
            return Results.Problem("Ingen användare uppdaterades, kontrollera att användar-ID:et är korrekt.");
          }
        }
        catch (MySqlException ex)
        {
          await transaction.RollbackAsync();
          Console.WriteLine(ex.Message);
          return Results.Problem("Ett fel uppstod vid uppdatering av användaren.");
        }
      }
    }
  }



}
