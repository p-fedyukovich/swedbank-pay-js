import Prices from './prices'
import PayExAPI from '../api'
import Urls from './urls'
import RawPaymentResponse from '../api/response/raw-payment-response'
import PayeeInfo from './payee-info'
import Metadata from './metadata'
import Transactions from './transactions'
import Authorizations from './authorizations'
import Captures from './captures'
import Reversals from './reversals'
import Verifications from './verifications'
import { Reversal } from './reversal'
import PaidPayment from './paid-payment'

export default class Payment {
  private api: PayExAPI
  private raw: RawPaymentResponse

  /**
   * The relative URN and unique identifier of the payment resource
   */
  private id: string

  private operation: 'Purchase' | 'Recur' | 'Payout' | 'Verify'
  /**
   * The payment number , useful when there’s need to reference the payment in human communication.
   * Not usable for programmatic identification of the payment, for that id should be used instead.
   */
  private number: number
  /**
   * The amount (including VAT, if any) to charge the payer, entered in the lowest monetary unit of the selected currency.
   */
  private amount: number
  private created: Date
  private updated: Date
  /**
   * Indicates the state of the payment, not the state of any transactions performed on the payment.
   */
  private state: 'Ready' | 'Pending' | 'Failed' | 'Aborted'
  private currency: string
  private description: string
  private initiatingSystemUserAgent: string
  private userAgent: string
  private language:
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
  private intent: 'PreAuthorization' | 'Authorization' | 'AutoCapture'
  private instrument: 'CreditCard' | 'Visa' | 'MasterCard'
  private remainingCaptureAmount: number | null = null
  private remainingCancellationAmount: number | null = null
  private remainingReversalAmount: number | null = null

  private readonly pricesURN: string | null = null
  private readonly urlsURN: string | null = null
  private readonly payeeInfoURN: string | null = null
  private readonly metadataURN: string | null = null
  private readonly transactionsURN: string | null = null
  private readonly authorizationsURN: string | null = null
  private readonly capturesURN: string | null = null
  private readonly reversalsURN: string | null = null
  private readonly verificationsURN: string | null = null

  constructor(api: PayExAPI, raw: RawPaymentResponse) {
    this.api = api
    this.raw = raw
    const { payment } = raw
    this.id = payment.id
    this.operation = payment.operation
    this.number = payment.number
    this.amount = payment.amount
    this.created = new Date(payment.created)
    this.updated = new Date(payment.updated)
    this.state = payment.state
    this.currency = payment.currency
    this.description = payment.description
    this.initiatingSystemUserAgent = payment.initiatingSystemUserAgent
    this.userAgent = payment.userAgent
    this.language = payment.language
    this.intent = payment.intent
    this.instrument = payment.instrument
    if (payment.remainingCaptureAmount) {
      this.remainingCaptureAmount = payment.remainingCaptureAmount
    }
    if (payment.remainingCancellationAmount) {
      this.remainingCancellationAmount = payment.remainingCancellationAmount
    }
    if (payment.remainingReversalAmount) {
      this.remainingReversalAmount = payment.remainingReversalAmount
    }
    if (payment.prices) {
      this.pricesURN = payment.prices.id
    }
    if (payment.urls) {
      this.urlsURN = payment.urls.id
    }
    if (payment.payeeInfo) {
      this.payeeInfoURN = payment.payeeInfo.id
    }
    if (payment.metadata) {
      this.metadataURN = payment.metadata.id
    }
    if (payment.transactions) {
      this.transactionsURN = payment.transactions.id
    }
    if (payment.authorizations) {
      this.authorizationsURN = payment.authorizations.id
    }
    if (payment.captures) {
      this.capturesURN = payment.captures.id
    }
    if (payment.reversals) {
      this.reversalsURN = payment.reversals.id
    }
    if (payment.verifications) {
      this.verificationsURN = payment.verifications.id
    }
  }

  async getPrices(): Promise<Prices | null> {
    if (!this.pricesURN) {
      return null
    }
    const rawPrices = await this.api.getRawPrices(this.pricesURN)
    return Prices.generate(rawPrices)
  }

  async getUrls(): Promise<Urls | null> {
    if (!this.urlsURN) {
      return null
    }
    const rawUrls = await this.api.getRawUrls(this.urlsURN)
    return Urls.generate(rawUrls)
  }

  async getPayeeInfo(): Promise<PayeeInfo | null> {
    if (!this.payeeInfoURN) {
      return null
    }
    const rawPayeeInfo = await this.api.getRawPayeeInfo(this.payeeInfoURN)
    return PayeeInfo.generate(rawPayeeInfo)
  }

  async getMetadata(): Promise<Metadata | null> {
    if (!this.metadataURN) {
      return null
    }
    const rawMetadata = await this.api.getMetadata(this.metadataURN)
    return Metadata.generate(rawMetadata)
  }

  async getTransactions(): Promise<Transactions | null> {
    if (!this.transactionsURN) {
      return null
    }

    const rawTransactions = await this.api.getTransactions(this.transactionsURN)
    return Transactions.generate(rawTransactions)
  }

  async getAuthorizations(): Promise<Authorizations | null> {
    if (!this.authorizationsURN) {
      return null
    }

    const rawAuthorizations = await this.api.getAuthorizations(this.authorizationsURN)
    return Authorizations.generate(rawAuthorizations)
  }

  async getCaptures(): Promise<Captures | null> {
    if (!this.capturesURN) {
      return null
    }

    const rawCaptures = await this.api.getCaptures(this.capturesURN)
    return Captures.generate(rawCaptures)
  }

  async getReversals(): Promise<Reversals | null> {
    if (!this.reversalsURN) {
      return null
    }

    const rawReversals = await this.api.getReversals(this.reversalsURN)
    return Reversals.generate(rawReversals)
  }

  async getVerifications(): Promise<Verifications | null> {
    if (!this.verificationsURN) {
      return null
    }

    const rawVerifications = await this.api.getVerifications(this.verificationsURN)
    return Verifications.generate(rawVerifications)
  }

  async createReversal(
    amount: number,
    vatAmount: number,
    description: string,
    payeeReference: string
  ): Promise<Reversal | null> {
    const operation = this.raw.operations.find(op => op.rel === 'create-reversal')
    if (!operation) {
      return null
    }

    const rawReversalResponse = await this.api.createReversal(operation.href, operation.method, {
      transaction: {
        amount,
        vatAmount,
        description,
        payeeReference
      }
    })

    return Reversal.generate(rawReversalResponse.reversal)
  }

  async getPaid(): Promise<PaidPayment | null> {
    const operation = this.raw.operations.find(op => op.rel === 'paid-payment')
    if (!operation) {
      return null
    }

    const rawPaidPaymentResponse = await this.api.getPaidPayment(operation.href, operation.method)

    return PaidPayment.generate(rawPaidPaymentResponse)
  }

  static generate(api: PayExAPI, raw: RawPaymentResponse): Payment {
    return new Payment(api, raw)
  }
}
