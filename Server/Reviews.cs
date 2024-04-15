using Microsoft.AspNetCore.Http;
using MySql.Data.MySqlClient;
using System.Collections.Generic;

namespace Server;

public record Review(int Id, int Score, string Title, string Description);

public class Reviews
{

  public static List<Review> GetAllReviews()
  {
    List<Review> reviews = new();

    string ConnectionString = "server=localhost;port=3306;uid=root;pwd=batman01;database=mystery_inc";

    using (var conn = new MySqlConnection(ConnectionString))
    {
      conn.Open();
      var query = "SELECT id, score, title, description FROM reviews";
      using (var cmd = new MySqlCommand(query, conn))
      using (var reader = cmd.ExecuteReader())
      {
        while (reader.Read())
        {
          reviews.Add(new Review(
              reader.GetInt32("id"),
              reader.GetInt32("score"),
              reader.GetString("title"),
              reader.GetString("description")
          ));
        }
      }
    }
    return reviews;
  }
}
