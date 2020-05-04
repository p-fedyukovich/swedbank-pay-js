import { AxiosInstance } from 'axios'
import { CreditCardType } from '../credit-card'
import { CurrencyEnum } from '../currency'
import { HTTPMethod } from '../HTTPMethod'
import { IntentType, Metadata, PayeeInfo, Price, Urls } from '../interfaces'
import { LanguageEnum } from '../language'

/**
 * Determines the initial operation, that defines the type card payment created.
 */
enum OperationType {
  /**
   * Used to charge a card. It is followed up by a capture or cancel operation.
   */
  Purchase = 'Purchase',
  /**
   * Used to charge a card on a recurring basis. Is followed up by a capture or
   * cancel operation (if not Autocapture is used, that is).
   */
  Recur = 'Recur',
  /**
   * Used to deposit funds directly to credit card. No more requests are necessary from the merchant side.
   */
  Payout = 'Payout',
  /**
   * Used when authorizing a card withouth reserveing any funds.  It is followed up by a verification transaction.
   */
  Verify = 'Verify'
}

interface CreatePaymentRequest<T extends PaymentRequest> {
  payment: T
}

interface PaymentRequest {
  operation: OperationType
}

interface Operation {
  href: string
  rel: string
  method: HTTPMethod
  contentType: string
}

interface CreatePaymentResponse {
  payment: PaymentResponse
  operations: Operation[]
}

interface CreatePurchaseResponse extends CreatePaymentResponse {
  payment: PurchaseResponse
}

interface PaymentResponse {
  id: string
  /**
   * The relative URI and unique identifier of the payment resource
   */
  ref: string
  operation: OperationType
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
  state: PaymentState
  currency: CurrencyEnum
  description: string
  payerReference: string
  initiatingSystemUserAgent: string
  userAgent: string
  language: LanguageEnum
}

export interface PurchaseResponse extends PaymentResponse {
  intent: IntentType
  instrument: CreditCardType
  remainingCaptureAmount: number
  remainingCancellationAmount: number
  remainingReversalAmount: number
}

interface PaymentInput {
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
  language: LanguageEnum
  urls: Urls
  payeeInfo: PayeeInfo
}

export interface PurchaseInput extends PaymentInput {
  intent: IntentType
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
  /**
   * The keys and values that should be associated with the payment.
   * Can be additional identifiers and data you want to associate with the payment.
   */
  metadata?: Metadata
}

export interface VerifyInput extends PaymentInput {
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

export interface RecurInput extends PaymentInput {
  intent: IntentType
  recurrenceToken: string
  /**
   * Amount is entered in the lowest monetary units of the selected currency.
   * E.g. 10000 = 100.00 NOK, 5000 = 50.00 SEK.
   */
  amount: number
  vatAmount: number
}

enum PaymentState {
  READY = 'Ready',
  PENDING = 'Pending',
  FAILED = 'Failed',
  ABORTED = 'Aborted'
}

export class Payment {
  private static readonly RESOURCE = 'creditcard/payments'

  private readonly _client: AxiosInstance

  constructor(client: AxiosInstance) {
    this._client = client
  }

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

  /**
   * A Purchase payment is a straightforward way to charge the card of the payer.
   * It is followed up by posting a capture, cancellation or reversal transaction.
   * @param {PurchaseInput} purchaseInput
   */
  async purchase(purchaseInput: PurchaseInput): Promise<CreatePurchaseResponse> {
    const response = await this.create<PurchaseInput & PaymentRequest, CreatePurchaseResponse>({
      payment: {
        ...purchaseInput,
        operation: OperationType.Purchase,
        currency: this.formatCurrency(purchaseInput.currency)
      }
    })

    const { payment } = response
    const strings = payment.id.split('/')
    const id = strings[strings.length - 1]

    return {
      operations: response.operations,
      payment: {
        ...response.payment,
        id,
        ref: response.payment.id
      }
    }
  }

  /**
   * A Verify payment lets you post verifications to confirm the validity of card information,
   * without reserving or charging any amount. This option is often used to initiate a recurring payment flow
   * where you do not want to charge the consumer right away.
   * @param {VerifyInput} verifyInput
   */
  async verify(verifyInput: VerifyInput): Promise<PaymentResponse> {
    const response = await this.create({
      payment: {
        ...verifyInput,
        operation: OperationType.Verify,
        currency: this.formatCurrency(verifyInput.currency)
      }
    })
    const { payment } = response
    const strings = payment.id.split('/')
    const id = strings[strings.length - 1]
    return {
      ...payment,
      id,
      ref: payment.id
    }
  }

  /**
   * A Recur payment is a payment that references a recurrenceToken created through
   * a previous payment in order to charge the same card.
   * @param {RecurInput} recurInput
   */
  async recur(recurInput: RecurInput): Promise<PurchaseResponse> {
    const response = await this.create({
      payment: {
        ...recurInput,
        operation: OperationType.Recur,
        currency: this.formatCurrency(recurInput.currency)
      }
    })
    return response.payment as PurchaseResponse
  }

  private async create<T extends PaymentRequest, R extends CreatePaymentResponse>(
    createPaymentRequest: CreatePaymentRequest<T>
  ): Promise<R> {
    const response = await this._client.post<R>(Payment.RESOURCE, createPaymentRequest)
    return response.data
  }
}
