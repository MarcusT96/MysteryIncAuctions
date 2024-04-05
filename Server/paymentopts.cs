namespace Server;

public class PaymentOptions
{
  public record Cards(int ID, string CardNumber, string ExpDate, string CVC, string Type, string HolderName, string UserID);

  public static List<Cards> PaymentOpts()
  {
    List<Cards> result = new()
    {
      new(1, "1111-2222-3333-4444", "12-26", "343", "Credit card", "Åke Jimmiesson", "1")
    };


    return result;
  }
}