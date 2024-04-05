using System;
using System.Collections.Generic;
using System.Text.Json;

namespace Server
{
  public class PaymentOptions
  {
    public record Cards(string id, string card_number, string expiration_date, string CVC, string type, string cardholder_name, string user_id);

    public static List<Cards> PaymentOpts()
    {
      string paymentJSON = @"
            [
                {
                    ""id"": ""c80f"",
                    ""card_number"": ""1111-2222-3333-4444"",
                    ""expiration_date"": ""01-28"",
                    ""CVC"": ""123"",
                    ""type"": ""Debit card"",
                    ""cardholder_name"": ""John Doe"",
                    ""user_id"": ""0c1f""
                },
                {
                    ""id"": ""7799"",
                    ""card_number"": ""5555-6666-7777-8888"",
                    ""expiration_date"": ""05-23"",
                    ""CVC"": ""456"",
                    ""type"": ""Credit card"",
                    ""cardholder_name"": ""Jane Smith"",
                    ""user_id"": ""1""
                },
                {
                    ""id"": ""73da"",
                    ""card_number"": ""4656-2343-5436-6453"",
                    ""expiration_date"": ""05-23"",
                    ""CVC"": ""456"",
                    ""type"": ""Debit card"",
                    ""cardholder_name"": ""Johnny B. Good"",
                    ""user_id"": ""1""
                },
                {
                    ""id"": ""c03a"",
                    ""card_number"": ""9876-5432-1098-7654"",
                    ""expiration_date"": ""09-25"",
                    ""CVC"": ""789"",
                    ""type"": ""Debit card"",
                    ""cardholder_name"": ""Alex Johnson"",
                    ""user_id"": ""7053""
                },
                {
                    ""id"": ""eb81"",
                    ""card_number"": ""4321-8765-2109-5432"",
                    ""expiration_date"": ""12-30"",
                    ""CVC"": ""321"",
                    ""type"": ""Credit card"",
                    ""cardholder_name"": ""Emily White"",
                    ""user_id"": ""7053""
                },
                {
                    ""id"": ""ef43"",
                    ""user_id"": ""0c1f"",
                    ""type"": ""Credit card"",
                    ""card_number"": ""8345-3249-2345-7654"",
                    ""expiration_date"": ""04-28"",
                    ""CVC"": ""485"",
                    ""cardholder_name"": ""Pelle Jöns""
                }
            ]";

      List<Cards> deserializedCards = JsonSerializer.Deserialize<List<Cards>>(paymentJSON);
      List<Cards> result = new List<Cards>();

      foreach (var card in deserializedCards)
      {
        result.Add(new Cards(
            card.id,
            card.card_number,
            card.expiration_date,
            card.CVC,
            card.type,
            card.cardholder_name,
            card.user_id
        ));
      }

      return result;
    }
  }
}
