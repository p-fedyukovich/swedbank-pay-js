import { Transaction } from './transactions'
import RawVerificationsResponse, {
  RawVerification
} from '../api/response/raw-verifications-response'

export class Verification {
  private readonly _id: string
  private readonly _direct: boolean
  private readonly _cardBrand: string
  private readonly _cardType: string
  private readonly _issuingBank: string
  private readonly _maskedPan: string
  private readonly _expiryDate: string
  private readonly _panToken: string
  private readonly _panEnrolled: boolean
  private readonly _acquirerTransactionType: string | null = null
  private readonly _recurrenceToken: string | null = null
  private readonly _paymentToken: string | null = null
  private readonly _issuerAuthorizationApprovalCode: string | null = null
  private readonly _acquirerStan: string | null = null
  private readonly _acquirerTerminalId: string | null = null
  private readonly _acquirerTransactionTime: Date | null = null
  private readonly _nonPaymentToken: string | null = null
  private readonly _transactionInitiator: string | null = null
  private readonly _transaction: Transaction

  private constructor(raw: RawVerification) {
    this._id = raw.id
    this._direct = raw.direct
    this._cardBrand = raw.cardBrand
    this._cardType = raw.cardType
    this._issuingBank = raw.issuingBank
    this._maskedPan = raw.maskedPan
    this._expiryDate = raw.expiryDate
    this._panToken = raw.panToken
    this._panEnrolled = raw.panEnrolled
    if (raw.acquirerTransactionType) {
      this._acquirerTransactionType = raw.acquirerTransactionType
    }
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

  get direct(): boolean {
    return this._direct
  }

  get cardBrand(): string {
    return this._cardBrand
  }

  get cardType(): string {
    return this._cardType
  }

  get issuingBank(): string {
    return this._issuingBank
  }

  get maskedPan(): string {
    return this._maskedPan
  }

  get expiryDate(): string {
    return this._expiryDate
  }

  get panToken(): string {
    return this._panToken
  }

  get panEnrolled(): boolean {
    return this._panEnrolled
  }

  get acquirerTransactionType(): string | null {
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

  static generate(raw: RawVerification): Verification {
    return new Verification(raw)
  }
}

export default class Verifications {
  private readonly _raw: RawVerificationsResponse
  private readonly _paymentId: string
  private readonly _id: string
  private readonly _verificationList: Verification[]

  private constructor(raw: RawVerificationsResponse) {
    this._raw = raw
    this._paymentId = raw.payment.id
    this._id = raw.verifications.id
    this._verificationList = raw.verifications.verificationList.map(Verification.generate)
  }

  static generate(raw: RawVerificationsResponse): Verifications {
    return new Verifications(raw)
  }

  get raw(): RawVerificationsResponse {
    return this._raw
  }

  get paymentId(): string {
    return this._paymentId
  }

  get id(): string {
    return this._id
  }

  get verificationList(): Verification[] {
    return this._verificationList
  }
}
