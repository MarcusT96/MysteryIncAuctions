using MySql.Data.MySqlClient;
using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace Server
{
    public class PostboxService
    {
        public static async Task<IResult> Add(Postbox postbox, string connectionString)
        {
            const string query = "INSERT INTO mystery_boxes (name, image, category, price, weight, time, description) " +
                                 "VALUES (@name, @image, @category, @price, @weight, @time, @description)";

            try
            {
                await using (MySqlConnection conn = new MySqlConnection(connectionString))
                {
                    // Kontrollera att anslutningen inte redan är öppen
                    if (conn.State != System.Data.ConnectionState.Open)
                    {
                        await conn.OpenAsync();
                    }

                    await using var cmd = new MySqlCommand(query, conn);
                    cmd.Parameters.AddWithValue("@name", postbox.Name);
                    cmd.Parameters.AddWithValue("@image", postbox.Image);
                    cmd.Parameters.AddWithValue("@category", postbox.Category);
                    cmd.Parameters.AddWithValue("@price", postbox.Price);
                    cmd.Parameters.AddWithValue("@weight", postbox.Weight);
                    cmd.Parameters.AddWithValue("@time", postbox.Time);
                    cmd.Parameters.AddWithValue("@description", postbox.Description);

                    int result = await cmd.ExecuteNonQueryAsync();
                    if (result > 0)
                    {
                        Console.WriteLine("Insert successful.");
                        return Results.Ok(new { Message = "Mystery box added successfully." });
                    }
                    else
                    {
                        Console.WriteLine("Insert failed. No rows affected.");
                        return Results.Problem("No rows were affected.");
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
                return Results.Problem($"A database error occurred: {ex.Message}");
            }
        }
    }

    public class Postbox
    {
        public string? Name { get; set; }
        public double Weight { get; set; }
        public double Price { get; set; }
        public DateTime Time { get; set; }
        public string? Description { get; set; }
        public int Category { get; set; }
        public string? Image { get; set; }
    }
}
