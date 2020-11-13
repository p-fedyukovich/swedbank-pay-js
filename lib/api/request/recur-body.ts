import PaymentBody from './payment-body'

export default interface RecurBody extends PaymentBody {
  operation: 'Recur'
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
  recurrenceToken: string
  /**
   * Amount is entered in the lowest monetary units of the selected currency.
   * E.g. 10000 = 100.00 NOK, 5000 = 50.00 SEK.
   */
  amount: number
  vatAmount: number
}
