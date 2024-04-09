namespace Server;
using MySql.Data.MySqlClient;

public class CategoryOptions
{
  public record Category(int Id, string CategoryName);

  public static List<Category> GetCategories()
  {
    List<Category> result = new List<Category>();
    string connectionString = "server=localhost;port=3306;database=mystery_practice;user=root;password=mypassword";

    using (var connection = new MySqlConnection(connectionString))
    {
      connection.Open();
      var command = new MySqlCommand("SELECT Id, CategoryName FROM Categories;", connection);

      using (var reader = command.ExecuteReader())
      {
        while (reader.Read())
        {
          var category = new Category(reader.GetInt32("Id"), reader.GetString("CategoryName"));
          result.Add(category);
        }
      }
    }
    return result;
  }
  public static async Task<bool> CreateCategory(Category category)
  {
    string connectionString = "server=localhost;port=3306;database=mystery_practice;user=root;password=mypassword";
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

  public static async Task<bool> UpdateCategory(int id, Category category)
  {
    string connectionString = "server=localhost;port=3306;database=mystery_practice;user=root;password=mypassword";
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
