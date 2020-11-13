import RawReversalsResponse from '../api/response/raw-reversals-response'
import { Reversal } from './reversal'

export default class Reversals {
  private readonly _raw: RawReversalsResponse
  private readonly _paymentId: string
  private readonly _id: string
  private readonly _reversalList: Reversal[]

  private constructor(raw: RawReversalsResponse) {
    this._raw = raw
    this._paymentId = raw.payment.id
    this._id = raw.reversals.id
    this._reversalList = raw.reversals.reversalList.map(Reversal.generate)
  }

  get raw(): RawReversalsResponse {
    return this._raw
  }

  get paymentId(): string {
    return this._paymentId
  }

  get id(): string {
    return this._id
  }

  get reversalList(): Reversal[] {
    return this._reversalList
  }

  static generate(raw: RawReversalsResponse): Reversals {
    return new Reversals(raw)
  }
}
