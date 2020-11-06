import PaymentBody from './payment-body'
import PriceBody from './price-body'

export default interface PurchaseBody extends PaymentBody {
  operation: 'Purchase'
  /**
   * The intent of the payment identifies how and when the charge will be effectuated.
   * This determine the type transactions used during the payment process.
   *
   *
   * PreAuthorization        Holds the funds for a certain time in contrast to reserving the amount.
   *                         A preauthoriations is always followed by the finalize operation
   *
   * Authorization           Reserves the amount, and is followed by a cancellation or capture of funds.
   *
   * AutoCapture             A one phase option that enable capture of funds automatically after authorization.
   */
  intent: 'PreAuthorization' | 'Authorization' | 'AutoCapture'
  /**
   * If you put in a paymentToken here, the payment page will preload the stored payment data
   * related to the paymentToken and let the consumer make a purchase without having to enter all card data.
   * This is called a "One Click" purchase.
   */
  paymentToken?: string
  prices: PriceBody[]
  /**
   * Set this to true if you want to create a paymentToken for future use as One Click.
   */
  generatePaymentToken?: boolean
  /**
   * Set this to true if you want to create a recurrenceToken for future
   * use Recurring purchases (subscription payments).
   */
  generateRecurrenceToken?: boolean
}
