using Microsoft.AspNetCore.Http;
using MySql.Data.MySqlClient;
using System.Collections.Generic;

namespace Server;

public record Review(int Id, int Score, string Title, string Description);

public class Reviews
{
  //Get reviews from database
  public static List<Review> GetAllReviews()
  {
    List<Review> reviews = new();

    string ConnectionString = "server=localhost;port=3306;uid=root;pwd=mypassword;database=mystery_inc";

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

  //Post Reviews to database

  public static bool PostReview(Review newReview)
  {
    string connectionString = "server=localhost;port=3306;uid=root;pwd=mypassword;database=mystery_inc";

    using (var connection = new MySqlConnection(connectionString))
    {
      connection.Open();
      var query = "INSERT INTO reviews (score, title, description) VALUES (@score, @title, @description)";
      using (var command = new MySqlCommand(query, connection))
      {
        command.Parameters.AddWithValue("@score", newReview.Score);
        command.Parameters.AddWithValue("@title", newReview.Title);
        command.Parameters.AddWithValue("@description", newReview.Description);

        try
        {
          command.ExecuteNonQuery();
          return true;
        }
        catch (Exception ex)
        {
          Console.WriteLine("Failed to post review to the database. Error: " + ex.Message);
          return false;
        }
      }
    }
  }

}

