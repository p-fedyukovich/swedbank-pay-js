import RawPaidPaymentResponse from '../api/response/raw-paid-payment-response'

export default class PaidPayment {
  private readonly _raw: RawPaidPaymentResponse
  private readonly _paymentId: string
  private readonly _id: string
  private readonly _number: number
  private readonly _transactionId: string
  private readonly _transactionNumber: number
  private readonly _payeeReference: string
  private readonly _amount: number
  private readonly _orderReference: string | null = null
  private readonly _detail: {
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
  private readonly _tokens: Array<{
    type: 'recurrence' | 'payment'
    token: string
    name: string
    expiryDate: string
  }>

  private constructor(raw: RawPaidPaymentResponse) {
    this._raw = raw
    this._paymentId = raw.payment
    const { paid } = raw

    this._tokens = paid.tokens
    this._detail = paid.detail
    this._id = paid.id
    this._number = paid.number
    this._transactionId = paid.transaction.id
    this._transactionNumber = paid.transaction.number
    this._payeeReference = paid.payeeReference
    this._amount = paid.amount

    if (paid.orderReference) {
      this._orderReference = paid.orderReference
    }
  }

  static generate(raw: RawPaidPaymentResponse): PaidPayment {
    return new PaidPayment(raw)
  }

  get raw(): RawPaidPaymentResponse {
    return this._raw
  }

  get paymentId(): string {
    return this._paymentId
  }

  get id(): string {
    return this._id
  }

  get number(): number {
    return this._number
  }

  get transactionId(): string {
    return this._transactionId
  }

  get transactionNumber(): number {
    return this._transactionNumber
  }

  get payeeReference(): string {
    return this._payeeReference
  }

  get amount(): number {
    return this._amount
  }

  get orderReference(): string | null {
    return this._orderReference
  }

  get detail(): {
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
  } {
    return this._detail
  }

  get tokens(): Array<{
    type: 'recurrence' | 'payment'
    token: string
    name: string
    expiryDate: string
  }> {
    return this._tokens
  }
}
