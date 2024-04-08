namespace Server;
using MySql.Data.MySqlClient;

public class CategoryOptions
{
  public record Category(
    int Id,
    string CategoryName);

  public static List<Category> GetCategories()
  {
    List<Category> result = new();

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
}
