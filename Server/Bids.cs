namespace Server;
using System.Data;
using MySql.Data.MySqlClient;

public class Bid
{
  public record BoxBids(int id, int Value, int UserId);

  public static List<BoxBids> GetBids()
  {
    List<BoxBids> bids = new List<BoxBids>();
    using (MySqlConnection conn = new MySqlConnection("server=localhost;port=3306;uid=root;pwd=batman01;database=mystery_inc"))
    {
      conn.Open();
      MySqlCommand cmd = new MySqlCommand("SELECT id, value, userId FROM bids", conn);

      using (MySqlDataReader reader = cmd.ExecuteReader())
      {
        while (reader.Read())
        {
          bids.Add(new BoxBids(reader.GetInt32("id"), reader.GetInt32("value"), reader.GetInt32("userId")));
        }
      }
    }
    return bids;
  }

  // New method to fetch a specific bid by id
  public static async Task<IResult> GetBidById(int id)
  {
    BoxBids? bid = null;
    using (var conn = new MySqlConnection("server=localhost;port=3306;uid=root;pwd=batman01;database=mystery_inc"))
    {
      await conn.OpenAsync();
      var cmd = new MySqlCommand("SELECT id, value, userId FROM bids WHERE id = @id", conn);
      cmd.Parameters.AddWithValue("@id", id);

      using (var reader = await cmd.ExecuteReaderAsync())
      {
        if (await reader.ReadAsync())
        {
          bid = new BoxBids(reader.GetInt32("id"), reader.GetInt32("value"), reader.GetInt32("userId"));
          return Results.Ok(bid);
        }
      }
    }
    return Results.NotFound();
  }

}
