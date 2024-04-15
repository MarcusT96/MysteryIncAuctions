using MySql.Data.MySqlClient;
namespace Server
{
    public class OperationResult
    {
        public bool Success { get; set; }
        public string? ErrorMessage { get; set; }
    }

    public static class Addbox
    {
        public static async Task<OperationResult> Add(Postbox postbox)
        {
            var connectionString = "server=localhost;port=3306;uid=root;pwd=mypassword;database=Auctionboxes";
            try
            {
                await using (var conn = new MySqlConnection(connectionString))
                {
                    await conn.OpenAsync();
                    var query = "INSERT INTO mystery_boxes (name, image, category, price, weight, time, description) VALUES (@name, @image, @category, @price, @weight, @time, @description)";

                    await using (var cmd = new MySqlCommand(query, conn))
                    {
                        cmd.Parameters.AddWithValue("@name", postbox.Name);
                        cmd.Parameters.AddWithValue("@image", postbox.Image);
                        cmd.Parameters.AddWithValue("@category", postbox.Category);
                        cmd.Parameters.AddWithValue("@price", postbox.Price);
                        cmd.Parameters.AddWithValue("@weight", postbox.Weight);
                        cmd.Parameters.AddWithValue("@time", postbox.Time);
                        cmd.Parameters.AddWithValue("@description", postbox.Description);

                        var result = await cmd.ExecuteNonQueryAsync();
                        return new OperationResult
                        {
                            Success = result > 0,
                            ErrorMessage = result > 0 ? null : "No rows were affected."
                        };
                    }
                }
            }
            catch (Exception ex)
            {
                // Catchar errors
                return new OperationResult
                {
                    Success = false,
                    ErrorMessage = $"An error occurred: {ex.Message}"
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
