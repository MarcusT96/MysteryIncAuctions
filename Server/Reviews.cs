using Microsoft.AspNetCore.Http;
using MySql.Data.MySqlClient;
using System.Collections.Generic;
using System.Data;

namespace Server;

public record Review(int Id, int Score, string Title, string Description);


public class Reviews
  {
    private readonly DbConnect _dbConnect;

    public Reviews(DbConnect dbConnect)
    {
      _dbConnect = dbConnect;
    }

    public async Task<List<Review>> GetAllReviews()
    {
      List<Review> reviews = new();
      await using (var conn = await _dbConnect.GetConnectionAsync())
      {
        var query = "SELECT id, score, title, description FROM reviews";
        await using (var cmd = new MySqlCommand(query, conn))
        await using (var reader = await cmd.ExecuteReaderAsync())
        {
          while (await reader.ReadAsync())
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

  public async Task<bool> PostReview(Review newReview)
  {
    await using (var conn = await _dbConnect.GetConnectionAsync())
    {
      var query = "INSERT INTO reviews (score, title, description) VALUES (@score, @title, @description)";
      await using (var command = new MySqlCommand(query, conn))
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

