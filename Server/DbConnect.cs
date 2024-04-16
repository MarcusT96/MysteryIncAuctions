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

        public Task<MySqlConnection> GetConnectionAsync()
        {
            return Task.FromResult(new MySqlConnection(_connectionString));
        }
    }
