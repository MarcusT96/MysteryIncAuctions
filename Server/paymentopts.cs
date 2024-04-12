using System;
using System.Data;
using System.Runtime.InteropServices;
using MySql.Data.MySqlClient;
using System.Text.Json;
using MySqlX.XDevAPI.Common;

namespace Server;

public class PaymentOptions
{
  public record Cards(int? Id, string CardNumber, string ExpirationDate, string CVC, string Type, string CardholderName, int UserId);

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
            reader.GetInt32("id"),
            reader.GetString("card_number"),
            reader.GetString("expiration_date"),
            reader.GetString("CVC"),
            reader.GetString("type"),
            reader.GetString("cardholder_name"),
            reader.GetInt32("user_id")
          ));
        }
      }
    }
    return result;
  }

  public static List<Cards> GetPaymentOptsByUserId(int UserId)
  {
    List<Cards> result = new List<Cards>();

    using (MySqlConnection conn = new MySqlConnection("server=localhost;port=3306;uid=root;pwd=mypassword;database=mystery_inc"))
    {
      conn.Open();
      MySqlCommand cmd = new MySqlCommand("SELECT * from payment_options WHERE user_id = @user_id", conn);
      cmd.Parameters.AddWithValue("@user_id", UserId);

      using (MySqlDataReader reader = cmd.ExecuteReader())
      {
        while (reader.Read())
        {
          result.Add(new Cards(
            reader.GetInt32("id"),
            reader.GetString("card_number"),
            reader.GetString("expiration_date"),
            reader.GetString("CVC"),
            reader.GetString("type"),
            reader.GetString("cardholder_name"),
            reader.GetInt32("user_id")
          ));
        }
      }
    }
    return result;
  }

  public static async Task<IResult> AddPaymentOpt(HttpContext context)
  {

    var requestBody = await new StreamReader(context.Request.Body).ReadToEndAsync();
    var paymentData = JsonSerializer.Deserialize<Cards>(requestBody);

    if (paymentData == null)
    {
      return Results.BadRequest("Invalid payment data");
    }

    using (MySqlConnection conn = new MySqlConnection("server=localhost;port=3306;uid=root;pwd=mypassword;database=mystery_inc"))
    {
      await conn.OpenAsync();

      string query = "INSERT INTO payment_options (card_number, expiration_date, CVC, type, cardholder_name, user_id)" +
      "VALUES (@cardNumber, @expirationDate, @cvc, @type, @cardholderName, @userId)";

      MySqlCommand cmd = new MySqlCommand(query, conn);

      cmd.Parameters.AddWithValue("@cardNumber", paymentData.CardNumber);
      cmd.Parameters.AddWithValue("@expirationDate", paymentData.ExpirationDate);
      cmd.Parameters.AddWithValue("@cvc", paymentData.CVC);
      cmd.Parameters.AddWithValue("@type", paymentData.Type);
      cmd.Parameters.AddWithValue("@cardholderName", paymentData.CardholderName);
      cmd.Parameters.AddWithValue("@userId", paymentData.UserId);

      var result = cmd.ExecuteNonQuery();
      return result > 0 ? Results.Ok(new { Message = "Added new payment method" }) : Results.Problem("Couldn't add new payment method");
    }
  }


}

