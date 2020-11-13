import PaymentBody from './payment-body'

export default interface VerificationBody extends PaymentBody {
  operation: 'Verify'
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
