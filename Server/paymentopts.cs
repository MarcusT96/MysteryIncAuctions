using System;
using System.Data;
using System.Runtime.InteropServices;
using MySql.Data.MySqlClient;
using MySqlX.XDevAPI.Common;

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
            reader.GetString("expiration_date"),
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

  public static async Task<IResult> AddPaymentOpt(Cards paymentData)
  {
    using (MySqlConnection conn = new MySqlConnection("server=localhost;port=3306;uid=root;pwd=mypassword;database=mystery_inc"))
    {
      await conn.OpenAsync();

      string query = "INSERT INTO payment_options (card_number, expiration_date, CVC, type, cardholder_name, user_id)" +
      "VALUES (@cardNumber, @expirationDate, @cvc, @type, @cardholderName, @userId)";

      MySqlCommand cmd = new MySqlCommand(query, conn);

      cmd.Parameters.AddWithValue("@cardNumber", paymentData.card_number);
      cmd.Parameters.AddWithValue("@expirationDate", paymentData.expiration_date);
      cmd.Parameters.AddWithValue("@cvc", paymentData.CVC);
      cmd.Parameters.AddWithValue("@type", paymentData.type);
      cmd.Parameters.AddWithValue("@cardholderName", paymentData.cardholder_name);
      cmd.Parameters.AddWithValue("@userId", paymentData.user_id);

      var result = cmd.ExecuteNonQuery();
      return result > 0 ? Results.Ok(new { Message = "Added new payment method" }) : Results.Problem("Couldn't add new payment method");
    }
  }


}

