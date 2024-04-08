using System;
using System.Data;
using MySql.Data.MySqlClient;

namespace Server;

public class PaymentOptions
{
  public record Cards(string id, string card_number, string expiration_date, string CVC, string type, string cardholder_name, string user_id);

  public static List<Cards> PaymentOpts()
  {
    List<Cards> result = new List<Cards>();

    using (MySqlConnection conn = new MySqlConnection("server=localhost;port=3306;uid=root;pwd=mypassword;database=mystery_inc"))
    {
      conn.Open();
      MySqlCommand cmd = new MySqlCommand("SELECT * from payment_options", conn);

      using (MySqlDataReader reader = cmd.ExecuteReader())
      {
        while (reader.Read())
        {
          result.Add(new Cards(
            reader.GetString("id"),
            reader.GetString("card_number"),
            reader.GetString("expiration date"),
            reader.GetString("CVC"),
            reader.GetString("type"),
            reader.GetString("cardholder_name"),
            reader.GetString("user_id")
          ));
        }
      }
    }
    return result;
  }


}

