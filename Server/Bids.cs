using Microsoft.AspNetCore.Http;
using MySql.Data.MySqlClient;
using System.Text.Json;
using System.IO;
using System.Text.Json.Serialization;

namespace Server;

public class Bid
{

  private readonly DbConnect _dbConnect;

  public Bid(DbConnect dbConnect)
  {
    _dbConnect = dbConnect;
  }
  public record BidData(
      [property: JsonPropertyName("Value")] int Value,
      [property: JsonPropertyName("UserId")] int UserId,
      [property: JsonPropertyName("BoxId")] int BoxId
  );
  //testkommentar
  public static async Task<IResult> AddBid(HttpContext context)
  {
    try
    {
      var requestBody = await new StreamReader(context.Request.Body).ReadToEndAsync();

      var bidData = JsonSerializer.Deserialize<BidData>(requestBody);

      if (bidData == null)
      {
        return Results.BadRequest("Invalid bid data");
      }

      using (var conn = new MySqlConnection("server=localhost;port=3306;uid=root;pwd=batman01;database=mystery_inc"))
      {
        await conn.OpenAsync();

        using (var transaction = conn.BeginTransaction())
        {
          var insertCmd = new MySqlCommand("INSERT INTO bids (value, userId, boxId) VALUES (@value, @userId, @boxId)", conn, transaction);
          insertCmd.Parameters.AddWithValue("@value", bidData.Value);
          insertCmd.Parameters.AddWithValue("@userId", bidData.UserId);
          insertCmd.Parameters.AddWithValue("@boxId", bidData.BoxId);
          await insertCmd.ExecuteNonQueryAsync();

          var updateCmd = new MySqlCommand("UPDATE mystery_boxes SET price = @price WHERE id = @boxId", conn, transaction);
          updateCmd.Parameters.AddWithValue("@price", bidData.Value);
          updateCmd.Parameters.AddWithValue("@boxId", bidData.BoxId);
          var updateResult = await updateCmd.ExecuteNonQueryAsync();

          if (updateResult == 0)
          {
            transaction.Rollback();
            return Results.NotFound("Box not found.");
          }

          transaction.Commit();
        }
      }

      return Results.Ok(new { Message = "Bid added and box price updated successfully" });
    }
    catch (Exception ex)
    {
      Console.WriteLine(ex.ToString());
      return Results.Problem("An error occurred while processing the request.");
    }
  }
}
