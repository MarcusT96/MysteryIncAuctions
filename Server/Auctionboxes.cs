using System.Data;

namespace Server;
using MySql.Data.MySqlClient;

public class Boxes
{
    public static async Task<List<AuctionList>> All()
    {
        var connectionString = "server=localhost;port=3306;uid=root;pwd=mypassword;database=Auctionboxes";
        List<AuctionList> boxes = new List<AuctionList>();
        await using (var conn = new MySqlConnection(connectionString))
        {
            await conn.OpenAsync();
            var query = "SELECT id, name, image, category, price FROM auction_boxes";
            await using (var cmd = new MySqlCommand(query, conn))
            await using (var reader = await cmd.ExecuteReaderAsync())
            {
                while (await reader.ReadAsync())
                {
                    boxes.Add(new AuctionList(
                        reader.GetInt32("id"),
                        reader.GetString("name"),
                        reader.GetString("image"),
                        reader.GetString("category"),
                        reader.GetDouble("price")
                    ));
                }
            }
        }
        return boxes;
    }
}
public record AuctionList(int ID, string Name, string Image, string Category, double Price);



