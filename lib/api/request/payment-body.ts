import UrlsBody from './urls-body'
import PayeeInfoBody from './payee-info-body'
import MetadataBody from './metadata-body'

export default interface PaymentBody {
  /**
   * Determines the initial operation, that defines the type card payment created.
   *
   *
   * Purchase           Used to charge a card. It is followed up by a capture or cancel operation.
   *                    A Purchase payment is a straightforward way to charge the card of the payer.
   *                    It is followed up by posting a capture, cancellation or reversal transaction.
   *
   * Recur              Used to charge a card on a recurring basis. Is followed up by a capture or
   *                    cancel operation (if not Autocapture is used, that is).
   *                    A Recur payment is a payment that references a recurrenceToken created through
   *                    a previous payment in order to charge the same card.
   *
   * Payout             Used to deposit funds directly to credit card. No more requests are
   *                    necessary from the merchant side.
   *
   * Verify             Used when authorizing a card without reserving any funds.
   *                    It is followed up by a verification transaction.
   *                    A Verify payment lets you post verifications to confirm the
   *                    validity of card information, without reserving or charging any amount.
   *                    This option is often used to initiate a recurring payment flow
   *                    where you do not want to charge the consumer right away.
   */
  operation: 'Purchase' | 'Recur' | 'Payout' | 'Verify'

  currency: string
  /**
   * A textual description max 40 characters of the purchase.
   */
  description: string
  /**
   * The reference to the payer (consumer/end user) from the merchant system. E.g mobile number, customer number etc.
   */
  payerReference?: string
  /**
   * The user agent reference of the consumer's browser
   */
  userAgent: string
  language:
    | 'en-US'
    | 'sv-SE'
    | 'nb-NO'
    | 'de-DE'
    | 'ee-EE'
    | 'es-ES'
    | 'fr-FR'
    | 'lv-LV'
    | 'lt-LT'
    | 'ru-RU'
    | 'fi-FI'
    | 'da-DK'
  urls: UrlsBody
  payeeInfo: PayeeInfoBody
  /**
   * The keys and values that should be associated with the payment.
   * Can be additional identifiers and data you want to associate with the payment.
   */
  metadata?: MetadataBody
}
