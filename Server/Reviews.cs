using Microsoft.AspNetCore.Http;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Server;

public record Review(int Id, int Score, string Title, string Description);

public class Reviews
{
  public static List<Review> GetAllReviews(State state)
  {
    List<Review> reviews = new List<Review>();
    using (var conn = new MySqlConnection(state.DB))
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

  public static async Task<bool> PostReview(State state, Review newReview)
  {
    using (var conn = new MySqlConnection(state.DB))
    {
      await conn.OpenAsync();
      var query = "INSERT INTO reviews (score, title, description) VALUES (@score, @title, @description)";
      using (var command = new MySqlCommand(query, conn))
      {
        command.Parameters.AddWithValue("@score", newReview.Score);
        command.Parameters.AddWithValue("@title", newReview.Title);
        command.Parameters.AddWithValue("@description", newReview.Description);

        try
        {
          int result = await command.ExecuteNonQueryAsync();
          return result > 0;
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

