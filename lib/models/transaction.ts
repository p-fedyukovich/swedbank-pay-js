import { RawTransaction } from '../api/response/raw-transactions-response'

export default class Transaction {
  private readonly _raw: RawTransaction
  private readonly _id: string
  private readonly _created: Date
  private readonly _updated: Date
  private readonly _type: 'Capture' | 'Authorization' | 'Verification' | 'Reversal'
  private readonly _state: 'Completed' | 'Failed'
  private readonly _number: number
  private readonly _amount: number
  private readonly _vatAmount: number
  private readonly _description: string
  private readonly _payeeReference: string
  private readonly _isOperational: boolean
  private readonly _failedReason: string | null = null
  private readonly _failedActivityName: string | null = null
  private readonly _failedErrorCode:
    | 'REJECTED_BY_ACQUIRER_INVALID_AMOUNT'
    | 'REJECTED_BY_ACQUIRER_FORMAT_ERROR'
    | 'REJECTED_BY_ACQUIRER_POSSIBLE_FRAUD'
    | 'REJECTED_BY_ACQUIRER_CARD_STOLEN'
    | 'REJECTED_BY_ACQUIRER_CARD_EXPIRED'
    | 'REJECTED_BY_ACQUIRER_INSUFFICIENT_FUNDS'
    | 'REJECTED_BY_ACQUIRER_CARD_BLACKLISTED'
    | 'REJECTED_BY_ACQUIRER'
    | 'ACQUIRER_HOST_OFFLINE'
    | null = null
  private readonly _failedErrorDescription: string | null = null
  private readonly _problem: any | null = null

  private constructor(raw: RawTransaction) {
    this._raw = raw
    this._id = raw.id
    this._created = new Date(raw.created)
    this._updated = new Date(raw.updated)
    this._type = raw.type
    this._state = raw.state
    this._number = raw.number
    this._amount = raw.amount
    this._vatAmount = raw.vatAmount
    this._description = raw.description
    this._payeeReference = raw.payeeReference
    this._isOperational = raw.isOperational
    if (raw.failedReason) {
      this._failedReason = raw.failedReason
    }
    if (raw.failedActivityName) {
      this._failedActivityName = raw.failedActivityName
    }
    if (raw.failedErrorCode) {
      this._failedErrorCode = raw.failedErrorCode
    }
    if (raw.failedErrorDescription) {
      this._failedErrorDescription = raw.failedErrorDescription
    }
    if (raw.problem) {
      this._problem = raw.problem
    }
  }

  get raw(): RawTransaction {
    return this._raw
  }

  get id(): string {
    return this._id
  }

  get created(): Date {
    return this._created
  }

  get updated(): Date {
    return this._updated
  }

  get type(): 'Capture' | 'Authorization' | 'Verification' | 'Reversal' {
    return this._type
  }

  get state(): 'Completed' | 'Failed' {
    return this._state
  }

  get number(): number {
    return this._number
  }

  get amount(): number {
    return this._amount
  }

  get vatAmount(): number {
    return this._vatAmount
  }

  get description(): string {
    return this._description
  }

  get payeeReference(): string {
    return this._payeeReference
  }

  get isOperational(): boolean {
    return this._isOperational
  }

  get failedReason(): string | null {
    return this._failedReason
  }

  get failedActivityName(): string | null {
    return this._failedActivityName
  }

  get failedErrorCode():
    | 'REJECTED_BY_ACQUIRER_INVALID_AMOUNT'
    | 'REJECTED_BY_ACQUIRER_FORMAT_ERROR'
    | 'REJECTED_BY_ACQUIRER_POSSIBLE_FRAUD'
    | 'REJECTED_BY_ACQUIRER_CARD_STOLEN'
    | 'REJECTED_BY_ACQUIRER_CARD_EXPIRED'
    | 'REJECTED_BY_ACQUIRER_INSUFFICIENT_FUNDS'
    | 'REJECTED_BY_ACQUIRER_CARD_BLACKLISTED'
    | 'REJECTED_BY_ACQUIRER'
    | 'ACQUIRER_HOST_OFFLINE'
    | null {
    return this._failedErrorCode
  }

  get failedErrorDescription(): string | null {
    return this._failedErrorDescription
  }

  get problem(): any {
    return this._problem
  }

  static generate(raw: RawTransaction): Transaction {
    return new Transaction(raw)
  }
}
