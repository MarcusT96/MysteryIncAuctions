using Microsoft.AspNetCore.Http;
using MySql.Data.MySqlClient;
using System.Text.Json;
using System.IO;

namespace Server;

public class Bid
{
  public record BidData(int Value, int UserId, int BoxId);

  public static async Task<IResult> AddBid(HttpContext context)
  {
    try
    {
      // Läser in och "deserializerar" datan
      var requestBody = await new StreamReader(context.Request.Body).ReadToEndAsync();
      var bidData = JsonSerializer.Deserialize<BidData>(requestBody);

      if (bidData == null)
      {
        return Results.BadRequest("Invalid bid data");
      }

      using (var conn = new MySqlConnection("server=localhost;port=3306;uid=root;pwd=batman01;database=mystery_inc"))
      {
        await conn.OpenAsync();
        var cmd = new MySqlCommand("INSERT INTO bids (value, userId, boxId) VALUES (@value, @userId, @boxId)", conn);
        cmd.Parameters.AddWithValue("@value", bidData.Value);
        cmd.Parameters.AddWithValue("@userId", bidData.UserId);
        cmd.Parameters.AddWithValue("@boxId", bidData.BoxId);

        int result = await cmd.ExecuteNonQueryAsync();
        if (result > 0)
        {
          return Results.Ok(new { Message = "Bid added successfully" });
        }
        else
        {
          return Results.BadRequest(new { Message = "Failed to add bid" });
        }
      }
    }
    catch (Exception ex)
    {
      Console.WriteLine(ex.ToString());
      return Results.Problem("An error occurred while processing the request.");
    }
  }
}
