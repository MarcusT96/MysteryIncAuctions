using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;

namespace Server
{
  public class User
  {
    public int Id { get; set; }
    public string Email { get; set; }
    public string Password { get; set; } // Notera: Lösenord bör hashas
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Address { get; set; }
    public string City { get; set; }
    public string ZipCode { get; set; }
    public string Country { get; set; }
    public string Phone { get; set; }
    public bool IsAdmin { get; set; }

    // Metoder för databashantering skulle placeras här.
  }

  public class UsersDatabaseHandler
  {
    private MySqlConnection connection;

    public UsersDatabaseHandler(MySqlConnection connection)
    {
      this.connection = connection;
    }

    public List<User> GetAllUsers()
    {
      var users = new List<User>();
      var cmd = new MySqlCommand("SELECT * FROM users", connection);
      using (var reader = cmd.ExecuteReader())
      {
        while (reader.Read())
        {
          users.Add(new User
          {
            Id = reader.GetInt32("id"),
            Email = reader.GetString("email"),
            Password = reader.GetString("password"), // Kom ihåg att hashningen bör ske innan lagring
            FirstName = reader.GetString("firstName"),
            LastName = reader.GetString("lastName"),
            Address = reader.GetString("address"),
            City = reader.GetString("city"),
            ZipCode = reader.GetString("zipCode"),
            Country = reader.GetString("country"),
            Phone = reader.GetString("phone"),
            IsAdmin = reader.GetBoolean("isAdmin")
          });
        }
      }
      return users;
    }

    // Metoder för att lägga till, uppdatera och ta bort användare ska också definieras här?
  }
}
