import RawInstrumentResponse from '../api/response/raw-instrument-response'
import Card from './card'

export default class Instrument {
  private readonly _raw: RawInstrumentResponse
  private readonly _id: string
  private readonly _paymentToken: string
  private readonly _payeeId: string
  private readonly _isPayeeToken: boolean
  private readonly _isDeleted: boolean
  private readonly _tokenType: 'RecurrenceToken' | 'PaymentToken'
  private readonly _card: Card

  private constructor(raw: RawInstrumentResponse) {
    this._raw = raw
    const { instrumentData } = raw
    this._id = instrumentData.id
    this._paymentToken = instrumentData.paymentToken
    this._payeeId = instrumentData.payeeId
    this._isPayeeToken = instrumentData.isPayeeToken
    this._isDeleted = instrumentData.isDeleted
    this._tokenType = instrumentData.tokenType
    this._card = Card.generate(
      instrumentData.cardBrand,
      instrumentData.maskedPan,
      instrumentData.expiryDate
    )
  }

  static generate(raw: RawInstrumentResponse): Instrument {
    return new Instrument(raw)
  }

  get raw(): RawInstrumentResponse {
    return this._raw
  }

  get id(): string {
    return this._id
  }

  get paymentToken(): string {
    return this._paymentToken
  }

  get payeeId(): string {
    return this._payeeId
  }

  get isPayeeToken(): boolean {
    return this._isPayeeToken
  }

  get isDeleted(): boolean {
    return this._isDeleted
  }

  get tokenType(): 'RecurrenceToken' | 'PaymentToken' {
    return this._tokenType
  }

  get card(): Card {
    return this._card
  }
}
