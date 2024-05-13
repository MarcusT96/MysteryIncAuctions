namespace Server;
using MySql.Data.MySqlClient;
using System.Text.Json;

public class CategoryOptions
{
  public record Category(int Id, string CategoryName);

  public static List<Category> GetCategories(string connectionString)
  {

    List<Category> result = new();

    using (var connection = new MySqlConnection(connectionString))
    {
      connection.Open();
      var command = new MySqlCommand("SELECT id, category_name FROM categories;", connection);

      using (var reader = command.ExecuteReader())
      {
        while (reader.Read())
        {
          var category = new Category(reader.GetInt32("id"), reader.GetString("category_name"));
          result.Add(category);
        }
      }
    }
    return result;
  }
  public static async Task<bool> CreateCategory(HttpContext context, string connectionString)
  {
    var requestBody = await new StreamReader(context.Request.Body).ReadToEndAsync();
    var category = JsonSerializer.Deserialize<Category>(requestBody);

    await using (var connection = new MySqlConnection(connectionString))
    {
      var query = "INSERT INTO Categories (CategoryName) VALUES (@CategoryName);";
      await using (var command = new MySqlCommand(query, connection))
      {
        command.Parameters.AddWithValue("@CategoryName", category.CategoryName);
        await connection.OpenAsync();
        var result = await command.ExecuteNonQueryAsync();
        return result > 0;
      }
    }
  }

  public static async Task<bool> UpdateCategory(int id, HttpContext context, string connectionString)
  {
    var requestBody = await new StreamReader(context.Request.Body).ReadToEndAsync();
    var category = JsonSerializer.Deserialize<Category>(requestBody);

    await using (var connection = new MySqlConnection(connectionString))
    {
      var query = "UPDATE Categories SET CategoryName = @CategoryName WHERE Id = @Id;";
      await using (var command = new MySqlCommand(query, connection))
      {
        command.Parameters.AddWithValue("@Id", id);
        command.Parameters.AddWithValue("@CategoryName", category.CategoryName);
        await connection.OpenAsync();
        var result = await command.ExecuteNonQueryAsync();
        return result > 0;
      }
    }
  }
}
