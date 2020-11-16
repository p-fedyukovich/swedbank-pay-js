import RawCardBrand from '../api/response/raw-card-brand'

type CardBrand =
  | 'visa'
  | 'mastercard'
  | 'amex'
  | 'dankort'
  | 'diners'
  | 'finax'
  | 'jcb'
  | 'ikanofinansdk'
  | 'maestro'

export default class Card {
  private readonly _rawCardBrand: RawCardBrand
  private readonly _maskedPan: string
  private readonly _expiryDate: string

  private constructor(rawCardBrand: RawCardBrand, maskedPan: string, expiryDate: string) {
    this._rawCardBrand = rawCardBrand
    this._maskedPan = maskedPan
    this._expiryDate = expiryDate
  }

  get rawCardBrand(): RawCardBrand {
    return this._rawCardBrand
  }

  get brand(): CardBrand {
    switch (this._rawCardBrand) {
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
        throw new Error(`Card brand is not recognized: ${this._rawCardBrand}`)
    }
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

  get maskedPan(): string {
    return this._maskedPan
  }

  get last4(): string {
    return this._maskedPan.slice(this.maskedPan.length - 4)
  }

  static generate(brand: RawCardBrand, maskedPan: string, expiryDate: string): Card {
    return new Card(brand, maskedPan, expiryDate)
  }
}
