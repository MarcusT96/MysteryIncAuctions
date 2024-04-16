﻿using MySql.Data.MySqlClient;

namespace Server
{

    public class PostboxService
    {
        private readonly DbConnect _dbConnect;

        public PostboxService(DbConnect dbConnect)
        {
            _dbConnect = dbConnect;
        }

        public async Task<OperationResult> Add(Postbox postbox)
        {
            const string query = "INSERT INTO mystery_boxes (name, image, category, price, weight, time, description) " +
                                 "VALUES (@name, @image, @category, @price, @weight, @time, @description)";

            try
            {
                await using var conn = await _dbConnect.GetConnectionAsync();
                await conn.OpenAsync();

                await using var cmd = new MySqlCommand(query, conn);
                cmd.Parameters.AddWithValue("@name", postbox.Name);
                cmd.Parameters.AddWithValue("@image", postbox.Image);
                cmd.Parameters.AddWithValue("@category", postbox.Category);
                cmd.Parameters.AddWithValue("@price", postbox.Price);
                cmd.Parameters.AddWithValue("@weight", postbox.Weight);
                cmd.Parameters.AddWithValue("@time", postbox.Time);
                cmd.Parameters.AddWithValue("@description", postbox.Description);

                int result = await cmd.ExecuteNonQueryAsync();
                return new OperationResult
                {
                    Success = result > 0,
                    ErrorMessage = result > 0 ? null : "No rows were affected."
                };
            }
            catch (Exception ex)
            {
                return new OperationResult
                {
                    Success = false,
                    ErrorMessage = $"A database error occurred: {ex.Message}"
                };
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
