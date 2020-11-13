import RawInstrumentResponse from '../api/response/raw-instrument-response'

export default class Instrument {
  private readonly _raw: RawInstrumentResponse
  private readonly _id: string
  private readonly _displayBrand:
    | 'Visa'
    | 'MasterCard'
    | 'Amex'
    | 'Dankort'
    | 'Diners'
    | 'Finax'
    | 'Jcb'
    | 'IkanoFinansDK'
    | 'Maestro'
  private readonly _maskedPan: string
  private readonly _expiryDate: string
  private readonly _paymentToken: string
  private readonly _payeeId: string
  private readonly _isPayeeToken: boolean
  private readonly _isDeleted: boolean
  private readonly _tokenType: 'RecurrenceToken' | 'PaymentToken'

  private constructor(raw: RawInstrumentResponse) {
    this._raw = raw
    const { instrumentData } = raw
    this._id = instrumentData.id
    this._displayBrand = instrumentData.cardBrand
    this._maskedPan = instrumentData.maskedPan
    this._expiryDate = instrumentData.expiryDate
    this._paymentToken = instrumentData.paymentToken
    this._payeeId = instrumentData.payeeId
    this._isPayeeToken = instrumentData.isPayeeToken
    this._isDeleted = instrumentData.isDeleted
    this._tokenType = instrumentData.tokenType
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

  get displayBrand():
    | 'Visa'
    | 'MasterCard'
    | 'Amex'
    | 'Dankort'
    | 'Diners'
    | 'Finax'
    | 'Jcb'
    | 'IkanoFinansDK'
    | 'Maestro' {
    return this._displayBrand
  }

  get brand():
    | 'visa'
    | 'mastercard'
    | 'amex'
    | 'dankort'
    | 'diners'
    | 'finax'
    | 'jcb'
    | 'ikanofinansdk'
    | 'maestro' {
    switch (this._displayBrand) {
      case 'Visa':
        return 'visa'
      case 'MasterCard':
        return 'mastercard'
      case 'Amex':
        return 'amex'
      case 'Dankort':
        return 'dankort'
      case 'Diners':
        return 'diners'
      case 'Finax':
        return 'finax'
      case 'Jcb':
        return 'jcb'
      case 'IkanoFinansDK':
        return 'ikanofinansdk'
      case 'Maestro':
        return 'maestro'
      default:
        throw new Error(`Card brand is not recognized: ${this._displayBrand}`)
    }
  }

  get maskedPan(): string {
    return this._maskedPan
  }

  get last4(): string {
    return this._maskedPan.slice(this.maskedPan.length - 4)
  }

  get expiryDate(): string {
    return this._expiryDate
  }

  get expMonth(): number {
    return Number(this._expiryDate.split('/')[0])
  }

  get expYear(): number {
    return Number(this._expiryDate.split('/')[1])
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
}
