using System.Data;
using System.Text.Json;
using MySql.Data.MySqlClient;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using System.IO;

namespace Server
{
    public class Boxes
    {
        public static async Task<List<AuctionList>> All(string connectionString)
        {
            var boxes = new List<AuctionList>();
            await using (MySqlConnection conn = new MySqlConnection(connectionString))
            {
                await conn.OpenAsync();
                var query = "SELECT id, name, image, category, price, weight, time, description FROM mystery_boxes";
                await using var cmd = new MySqlCommand(query, conn);
                await using var reader = await cmd.ExecuteReaderAsync();
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
                        reader.GetString("description")));
                }
            }
            return boxes;
        }

        public static async Task<AuctionList?> GetById(int id, string connectionString)
        {
            using (MySqlConnection conn = new MySqlConnection(connectionString))
            {
                await conn.OpenAsync();
                var query = "SELECT id, name, image, category, price, weight, time, description FROM mystery_boxes WHERE id = @id";
                await using var cmd = new MySqlCommand(query, conn);
                cmd.Parameters.AddWithValue("@id", id);
                await using var reader = await cmd.ExecuteReaderAsync();
                if (await reader.ReadAsync())
                {
                    return new AuctionList(
                        reader.GetInt32("id"),
                        reader.GetString("name"),
                        reader.GetString("image"),
                        reader.GetInt32("category"),
                        reader.GetInt32("price"),
                        reader.GetDecimal("weight"),
                        reader.GetDateTime("time"),
                        reader.GetString("description"));
                }
                return null;
            }
        }

        public static async Task<IResult> DeleteBox(int id, string connectionString)
        {
            try
            {
                using (MySqlConnection conn = new MySqlConnection(connectionString))
                {
                    await conn.OpenAsync();
                    var query = "DELETE FROM mystery_boxes WHERE id = @id";
                    await using var cmd = new MySqlCommand(query, conn);
                    cmd.Parameters.AddWithValue("@id", id);
                    var result = await cmd.ExecuteNonQueryAsync();
                    if (result > 0)
                    {
                        return Results.Ok($"Box with ID {id} has been successfully deleted.");
                    }
                    return Results.NotFound($"No box found with ID {id}.");
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"An error occurred while deleting the box: {ex.Message}");
                return Results.Problem($"An internal server error occurred: {ex.Message}");
            }
        }

        public static async Task<IResult> UpdateBoxes(int id, HttpContext context, string connectionString)
        {
            try
            {
                using (var reader = new StreamReader(context.Request.Body))
                {
                    var body = await reader.ReadToEndAsync();
                    var updatedBox = JsonConvert.DeserializeObject<AuctionList>(body);

                    using (MySqlConnection conn = new MySqlConnection(connectionString))
                    {
                        await conn.OpenAsync();
                        var query = "UPDATE mystery_boxes SET name = @name, price = @price, category = @category, time = @time, description = @description, image = @image, weight = @weight WHERE id = @id";
                        await using var cmd = new MySqlCommand(query, conn);
                        cmd.Parameters.AddWithValue("@id", id);
                        cmd.Parameters.AddWithValue("@name", updatedBox.Name);
                        cmd.Parameters.AddWithValue("@image", updatedBox.Image);
                        cmd.Parameters.AddWithValue("@category", updatedBox.Category);
                        cmd.Parameters.AddWithValue("@price", updatedBox.Price);
                        cmd.Parameters.AddWithValue("@weight", updatedBox.Weight);
                        cmd.Parameters.AddWithValue("@time", updatedBox.Time);
                        cmd.Parameters.AddWithValue("@description", updatedBox.Description);
                        var result = await cmd.ExecuteNonQueryAsync();
                        if (result > 0)
                        {
                            return Results.Ok($"Box with ID {id} has been successfully updated.");
                        }
                        return Results.NotFound($"No box found with ID {id}.");
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"An error occurred while updating the box: {ex.Message}");
                return Results.Problem($"An internal server error occurred: {ex.Message}");
            }
        }
    }

    public record AuctionList(int ID, string Name, string Image, int Category, int Price, Decimal Weight, DateTime Time, string Description);
}
