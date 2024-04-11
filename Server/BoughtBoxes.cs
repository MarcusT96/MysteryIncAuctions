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

  public static async Task<bool> CreateBoughtBox(BoughtBox box)
  {
    string connectionString = "server=localhost;port=3306;database=mystery_practice;user=root;password=mypassword";
    await using (var connection = new MySqlConnection(connectionString))
    {
      var query = "INSERT INTO BoughtBoxes (Name, Weight, Price, Time, Description, Image, buyer_id, Paid, Delivered) VALUES (@Name, @Weight, @Price, @Time, @Description, @Image, @buyer_id, @Paid, @Delivered);";
      await using (var command = new MySqlCommand(query, connection))
      {
        command.Parameters.AddWithValue("@Name", box.Name);
        command.Parameters.AddWithValue("@Weight", box.Weight);
        command.Parameters.AddWithValue("@Price", box.Price);
        command.Parameters.AddWithValue("@Time", box.Time);
        command.Parameters.AddWithValue("@Description", box.Description);
        command.Parameters.AddWithValue("@Image", box.Image);
        command.Parameters.AddWithValue("@buyer_id", box.BuyerId);
        command.Parameters.AddWithValue("@Paid", box.Paid);
        command.Parameters.AddWithValue("@Delivered", box.Delivered);

        await connection.OpenAsync();
        var result = await command.ExecuteNonQueryAsync();
        return result > 0;
      }
    }
  }

  public static async Task<bool> UpdateBoughtBox(int id, BoughtBox box)
  {
    string connectionString = "server=localhost;port=3306;database=mystery_practice;user=root;password=mypassword";
    await using (var connection = new MySqlConnection(connectionString))
    {
      var query = "UPDATE BoughtBoxes SET Name = @Name, Weight = @Weight, Price = @Price, Time = @Time, Description = @Description, Image = @Image, buyer_id = @buyer_id, Paid = @Paid, Delivered = @Delivered WHERE Id = @Id;";
      await using (var command = new MySqlCommand(query, connection))
      {
        command.Parameters.AddWithValue("@Id", id);
        command.Parameters.AddWithValue("@Name", box.Name);
        command.Parameters.AddWithValue("@Weight", box.Weight);
        command.Parameters.AddWithValue("@Price", box.Price);
        command.Parameters.AddWithValue("@Time", box.Time);
        command.Parameters.AddWithValue("@Description", box.Description);
        command.Parameters.AddWithValue("@Image", box.Image);
        command.Parameters.AddWithValue("@buyer_id", box.BuyerId);
        command.Parameters.AddWithValue("@Paid", box.Paid);
        command.Parameters.AddWithValue("@Delivered", box.Delivered);

        await connection.OpenAsync();
        var result = await command.ExecuteNonQueryAsync();
        return result > 0;
      }
    }
  }
}
