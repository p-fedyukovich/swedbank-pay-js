import RawCapturesResponse, { RawCapture } from '../api/response/raw-captures-response'
import { Transaction } from './transactions'

export class Capture {
  private readonly _id: string
  private readonly _transaction: Transaction

  private constructor(raw: RawCapture) {
    this._id = raw.id
    this._transaction = Transaction.generate(raw.transaction)
  }

  get id(): string {
    return this._id
  }

  get transaction(): Transaction {
    return this._transaction
  }

  static generate(raw: RawCapture): Capture {
    return new Capture(raw)
  }
}

export default class Captures {
  private readonly _raw: RawCapturesResponse
  private readonly _paymentId: string
  private readonly _id: string
  private readonly _captureList: Capture[]

  private constructor(raw: RawCapturesResponse) {
    this._raw = raw
    this._paymentId = raw.payment.id
    this._id = raw.captures.id
    this._captureList = raw.captures.captureList.map(Capture.generate)
  }

  get raw(): RawCapturesResponse {
    return this._raw
  }

  get paymentId(): string {
    return this._paymentId
  }

  get id(): string {
    return this._id
  }

  get captureList(): Capture[] {
    return this._captureList
  }

  static generate(raw: RawCapturesResponse): Captures {
    return new Captures(raw)
  }
}
