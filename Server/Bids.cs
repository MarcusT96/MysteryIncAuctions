namespace Server;
using System.Data;
using MySql.Data.MySqlClient;

public class Bid
{
  public record BoxBids(int BoxId, int Value, int UserId);

  public static List<BoxBids> GetBids()
  {

    List<BoxBids> result = new()
            {
                new(1, 100, 101),
                new(2, 150, 102),
                new(3, 200, 103),
                new(4, 250, 104),
                new(5, 300, 105),
                new(6, 350, 106),
                new(7, 400, 107),
                new(8, 450, 108)
            };

    return result;
    //MySqlCommand cmd = new("select BoxId, value from bids where BoxId = @BoxId", state.DB);
    //cmd.Parameters.AddWithValue("@BoxId", BoxId);
    //using var reader = cmd.ExecuteReader();
    //bool found = reader.Read();
    //if (found)
    //{
    //  return new(reader.GetInt("BoxId", "value"));
    //}
    //else{
    //return null;



  }
}
