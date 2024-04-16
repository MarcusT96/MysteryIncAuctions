namespace Server;


    using MySql.Data.MySqlClient;
    using System.Threading.Tasks;

    public class DbConnect
    {
        private readonly string? _connectionString;

        public DbConnect(string? connectionString)
        {
            _connectionString = connectionString;
        }

        public async Task<MySqlConnection> GetConnectionAsync()
        {
            var connection = new MySqlConnection(_connectionString);
            await connection.OpenAsync();  // Open the connection before returning it
            return connection;
        }
    }
