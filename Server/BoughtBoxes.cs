namespace Server;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

public class BoughtBoxesOptions
{
  public record BoughtBox(int Id, string Name, decimal Weight, decimal Price, DateTime Time, string Description, string Image, int BuyerId, bool Paid, bool Delivered);

  public static List<BoughtBox> GetBoughtBoxes()
  {
    List<BoughtBox> result = new List<BoughtBox>();

    string connectionString = "server=localhost;port=3306;database=mystery_practice;user=root;password=mypassword";

    using (var connection = new MySqlConnection(connectionString))
    {
      connection.Open();
      var command = new MySqlCommand("SELECT id, name, weight, price, time, description, image, buyer_id, paid, delivered FROM BoughtBoxes;", connection);

      using (var reader = command.ExecuteReader())
      {
        while (reader.Read())
        {
          var box = new BoughtBox(
              reader.GetInt32("id"),
              reader.GetString("name"),
              reader.GetDecimal("weight"),
              reader.GetDecimal("price"),
              reader.GetDateTime("time"),
              reader.GetString("description"),
              reader.GetString("image"),
              reader.GetInt32("buyer_id"),
              reader.GetBoolean("paid"),
              reader.GetBoolean("delivered"));
          result.Add(box);
        }
      }
    }
    return result;
  }
}
