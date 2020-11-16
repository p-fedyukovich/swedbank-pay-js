import { RawAuthorization } from '../api/response/raw-authorizations-response'
import Transaction from './transaction'
import Card from './card'

export default class Authorization {
  private readonly _id: string
  private readonly _cardType: string
  private readonly _panToken: string
  private readonly _panEnrolled: boolean
  private readonly _card: Card
  private readonly _acquirerTransactionType: string
  private readonly _recurrenceToken: string | null = null
  private readonly _paymentToken: string | null = null
  private readonly _issuerAuthorizationApprovalCode: string | null = null
  private readonly _acquirerStan: string | null = null
  private readonly _acquirerTerminalId: string | null = null
  private readonly _acquirerTransactionTime: Date | null = null
  private readonly _nonPaymentToken: string | null = null
  private readonly _transactionInitiator: string | null = null
  private readonly _transaction: Transaction

  private constructor(raw: RawAuthorization) {
    this._id = raw.id
    this._cardType = raw.cardType
    this._panToken = raw.panToken
    this._panEnrolled = raw.panEnrolled
    this._acquirerTransactionType = raw.acquirerTransactionType
    this._card = Card.generate(raw.cardBrand, raw.maskedPan, raw.expiryDate)

    if (raw.recurrenceToken) {
      this._recurrenceToken = raw.recurrenceToken
    }
    if (raw.paymentToken) {
      this._paymentToken = raw.paymentToken
    }
    if (raw.issuerAuthorizationApprovalCode) {
      this._issuerAuthorizationApprovalCode = raw.issuerAuthorizationApprovalCode
    }
    if (raw.acquirerStan) {
      this._acquirerStan = raw.acquirerStan
    }
    if (raw.acquirerTerminalId) {
      this._acquirerTerminalId = raw.acquirerTerminalId
    }
    if (raw.acquirerTransactionTime) {
      this._acquirerTransactionTime = new Date(raw.acquirerTransactionTime)
    }
    if (raw.nonPaymentToken) {
      this._nonPaymentToken = raw.nonPaymentToken
    }
    if (raw.transactionInitiator) {
      this._transactionInitiator = raw.transactionInitiator
    }
    this._transaction = Transaction.generate(raw.transaction)
  }

  get id(): string {
    return this._id
  }

  get cardType(): string {
    return this._cardType
  }

  get panToken(): string {
    return this._panToken
  }

  get panEnrolled(): boolean {
    return this._panEnrolled
  }

  get card(): Card {
    return this._card
  }

  get acquirerTransactionType(): string {
    return this._acquirerTransactionType
  }

  get recurrenceToken(): string | null {
    return this._recurrenceToken
  }

  get paymentToken(): string | null {
    return this._paymentToken
  }

  get issuerAuthorizationApprovalCode(): string | null {
    return this._issuerAuthorizationApprovalCode
  }

  get acquirerStan(): string | null {
    return this._acquirerStan
  }

  get acquirerTerminalId(): string | null {
    return this._acquirerTerminalId
  }

  get acquirerTransactionTime(): Date | null {
    return this._acquirerTransactionTime
  }

  get nonPaymentToken(): string | null {
    return this._nonPaymentToken
  }

  get transactionInitiator(): string | null {
    return this._transactionInitiator
  }

  get transaction(): Transaction {
    return this._transaction
  }

  static generate(raw: RawAuthorization): Authorization {
    return new Authorization(raw)
  }
}
