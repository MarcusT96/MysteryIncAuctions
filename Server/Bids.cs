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
}
