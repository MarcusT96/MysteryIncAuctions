namespace Server;

public class PaymentOptions
{
  public record Cards(int ID, string CardNumber, string ExpDate, string CVC, string Type, string HolderName, string UserID);

  public static List<Cards> PaymentOpts()
  {
    List<Cards> result = new();
    
  }
}