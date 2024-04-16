using System.Data;
using MySql.Data.MySqlClient;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Server
{
    public class Boxes
    {
        public static async Task<List<AuctionList>> All()
        {
            var connectionString = "server=localhost;port=3306;uid=root;pwd=mypassword;database=mystery_inc";
            List<AuctionList> boxes = new List<AuctionList>();
            await using (var conn = new MySqlConnection(connectionString))
            {
                await conn.OpenAsync();
                var query = "SELECT id, name, image, category, price, weight, time, description FROM mystery_boxes";
                await using (var cmd = new MySqlCommand(query, conn))
                await using (var reader = await cmd.ExecuteReaderAsync())
                {
                    while (await reader.ReadAsync())
                    {
                        boxes.Add(new AuctionList(
                            reader.GetInt32("id"),
                            reader.GetString("name"),
                            reader.GetString("image"),
                            reader.GetInt32("category"),
                            reader.GetInt32("price"),
                            reader.GetDecimal("weight"),
                            reader.GetDateTime("time"),
                            reader.GetString("description")
                        ));
                    }
                }
            }
            return boxes;
        }

        public static async Task<AuctionList?> GetById(int id)
        {
            var connectionString = "server=localhost;port=3306;uid=root;pwd=mypassword;database=mystery_inc";
            AuctionList? box = null;
            await using (var conn = new MySqlConnection(connectionString))
            {
                await conn.OpenAsync();
                var query = "SELECT id, name, image, category, price, weight, time, description FROM mystery_boxes WHERE id = @id";

                await using (var cmd = new MySqlCommand(query, conn))
                {
                    cmd.Parameters.AddWithValue("@id", id);
                    await using (var reader = await cmd.ExecuteReaderAsync())
                    {
                        if (await reader.ReadAsync())
                        {
                            box = new AuctionList(
                                reader.GetInt32("id"),
                                reader.GetString("name"),
                                reader.GetString("image"),
                                reader.GetInt32("category"),
                                reader.GetInt32("price"),
                                reader.GetDecimal("weight"),
                                reader.GetDateTime("time"),
                                reader.GetString("description")
                            );
                        }
                    }
                }
            }
            return box;
        }

        public static async Task<IResult> DeleteBox(int id)
        {
            var connectionString = "server=localhost;port=3306;uid=root;pwd=mypassword;database=mystery_inc";
            try
            {
                await using (var conn = new MySqlConnection(connectionString))
                {
                    await conn.OpenAsync();
                    var query = "DELETE FROM mystery_boxes WHERE id = @id";

                    await using (var cmd = new MySqlCommand(query, conn))
                    {
                        cmd.Parameters.AddWithValue("@id", id);
                        var result = await cmd.ExecuteNonQueryAsync();
                        if (result > 0)
                        {
                            return Results.Ok($"Box with ID {id} has been successfully deleted.");
                        }
                        else
                        {
                            return Results.NotFound($"No box found with ID {id}.");
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error deleting box: {ex.Message}");
                return Results.Problem("Error occurred while trying to delete the box.");
            }
        }
    }

    public record AuctionList(int ID, string Name, string Image, int Category, int Price, Decimal Weight, DateTime Time, string Description);
}
