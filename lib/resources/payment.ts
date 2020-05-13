import { CurrencyEnum } from '../currency'
import { Metadata, PayeeInfo, Price, Urls } from '../interfaces'
import { PayexError } from '../error'
import { AbstractResource } from './abstract'
import { AxiosInstance } from 'axios'

interface Operation {
  href: string
  rel: string
  method: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE'
  contentType: string
}

export interface Payment {
  /**
   * The relative URI and unique identifier of the payment resource
   */
  id: string

  operation: 'Purchase' | 'Recur' | 'Payout' | 'Verify'
  /**
   * The payment number , useful when there’s need to reference the payment in human communication.
   * Not usable for programmatic identification of the payment, for that id should be used instead.
   */
  number: number
  /**
   * The amount (including VAT, if any) to charge the payer, entered in the lowest monetary unit of the selected currency.
   */
  amount: number
  created: string
  updated: string
  /**
   * Indicates the state of the payment, not the state of any transactions performed on the payment.
   */
  state: 'Ready' | 'Pending' | 'Failed' | 'Aborted'
  currency: string
  description: string
  payerReference: string
  initiatingSystemUserAgent: string
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
  instrument: 'CreditCard' | 'Visa' | 'MasterCard'
  remainingCaptureAmount: number
  remainingCancellationAmount: number
  remainingReversalAmount: number
}

export interface PaymentResponse {
  payment: Payment
  operations: Operation[]
}

export interface PaidPaymentResponse {
  payment: string
  paid?: {
    tokens: Array<{
      type: 'recurrence' | 'payment'
      token: string
      name: string
      expiryDate: string
    }>
    detail: {
      cardBrand:
        | 'Visa'
        | 'MasterCard'
        | 'Amex'
        | 'Dankort'
        | 'Diners'
        | 'Finax'
        | 'Jcb'
        | 'IkanoFinansDK'
        | 'Maestro'
      maskedPan: string
      cardType: string
      issuingBank: string
      countryCode: string
      issuerAuthorizationApprovalCode: string
      acquirerTransactionType: string
      acquirerStan: string
      acquirerTerminalId: string
      acquirerTransactionTime: string
      nonPaymentToken: string
      transactionInitiator: string
    }
    id: string
    number: number
    transaction: {
      id: string
      number: number
    }
    payeeReference: string
    amount: number
  }
}

interface IPaymentCreationOptions {
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
  urls: Urls
  payeeInfo: PayeeInfo
  /**
   * The keys and values that should be associated with the payment.
   * Can be additional identifiers and data you want to associate with the payment.
   */
  metadata?: Metadata
}

export interface IPurchaseCreationOptions extends IPaymentCreationOptions {
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
  prices: Price[]
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

export interface IVerificationCreationOptions extends IPaymentCreationOptions {
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

export interface IRecurCreationOptions extends IPaymentCreationOptions {
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

export class PaymentResource extends AbstractResource {
  constructor(client: AxiosInstance) {
    super(client)
  }

  private static readonly RESOURCE = '/psp/creditcard/payments'

  private formatCurrency(currency: string): CurrencyEnum {
    switch (currency.toUpperCase()) {
      case 'NOK':
        return CurrencyEnum.NOK
      case 'SEK':
        return CurrencyEnum.SEK
      case 'DKK':
        return CurrencyEnum.DKK
      case 'USD':
        return CurrencyEnum.USD
      case 'EUR':
        return CurrencyEnum.EUR
      default:
        throw new Error(`Currency ${currency} is not supported`)
    }
  }

  async retrieve(paymentId: string): Promise<PaymentResponse> {
    const response = await this._client.get<PaymentResponse>(paymentId)
    return response.data
  }

  async retrievePaid(paymentId: string): Promise<PaidPaymentResponse> {
    const response = await this._client.get<PaidPaymentResponse>(`${paymentId}/paid`)
    return response.data
  }

  async retrieveFailed(paymentId: string): Promise<PaidPaymentResponse> {
    const response = await this._client.get<PaidPaymentResponse>(`${paymentId}/paid`)
    return response.data
  }

  async create(
    data: IPurchaseCreationOptions | IRecurCreationOptions | IVerificationCreationOptions
  ): Promise<PaymentResponse> {
    try {
      if (data.currency) {
        data.currency = this.formatCurrency(data.currency)
      }
      const response = await this._client.post<PaymentResponse>(PaymentResource.RESOURCE, {
        payment: data
      })
      return response.data
    } catch (error) {
      if (error.response) {
        const { headers, data } = error.response

        throw PayexError.generate({
          ...data,
          headers
        })
      } else {
        throw PayexError.generate(error)
      }
    }
  }
}
