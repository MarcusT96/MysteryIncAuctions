namespace Server;

public class CategoryOptions
{
  public record Category(int Id, string CategoryName);

  public static List<Category> GetCategories()
  {
    List<Category> result = new()
    {
        new(1, "Äventyr"),
        new(2, "Detektiv"),
        new(3, "Champion"),
        new(4, "Pokémon"),
        new(5, "Mode"),
        new(6, "Mysterium"),
        new(7, "Toppval"),
        new(8, "Teknik")
    };

    return result;
  }
}
