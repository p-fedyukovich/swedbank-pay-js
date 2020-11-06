import RawPricesResponse, { RawPrice } from '../api/response/raw-prices-response'

class Price {
  private readonly _raw: RawPrice
  private readonly _type: 'CreditCard' | 'Visa' | 'MasterCard'
  private readonly _amount: number
  private readonly _vatAmount: number

  private constructor(raw: RawPrice) {
    this._raw = raw
    this._type = raw.type
    this._amount = raw.amount
    this._vatAmount = raw.vatAmount
  }

  get raw(): RawPrice {
    return this._raw
  }

  /**
   * Use the generic type {@link CreditCard} if you want to enable all card
   * brands supported by merchant contract.
   * Use card brands like {@link Visa} (for card type Visa), {@link MasterCard} (for card type Mastercard)
   * and others if you want to specify different amount for each card brand.
   * If you want to use more than one amount you must have one instance in the prices node for each card brand.
   * You will not be allowed to both specify card brands and CreditCard at the same time in this field.
   */
  get type(): 'CreditCard' | 'Visa' | 'MasterCard' {
    return this._type
  }

  /**
   * Amount is entered in the lowest monetary units of the selected currency.
   * E.g. 10000 = 100.00 NOK, 5000 = 50.00 SEK.
   */
  get amount(): number {
    return this._amount
  }

  /**
   * If the amount given includes VAT, this may be displayed for the user in the payment page (redirect only).
   * Set to 0 (zero) if this is not relevant.
   */
  get vatAmount(): number {
    return this._vatAmount
  }

  static generate(raw: RawPrice): Price {
    return new Price(raw)
  }
}

export default class Prices {
  private readonly _raw: RawPricesResponse
  private readonly _id: string
  private readonly _paymentId: string
  private readonly _priceList: Price[]

  private constructor(raw: RawPricesResponse) {
    this._raw = raw
    this._paymentId = raw.payment.id
    this._id = raw.prices.id
    this._priceList = raw.prices.priceList.map(Price.generate)
  }

  get raw(): RawPricesResponse {
    return this._raw
  }

  get paymentId(): string {
    return this._paymentId
  }

  get id(): string {
    return this._id
  }

  get priceList(): Price[] {
    return this._priceList
  }

  static generate(raw: RawPricesResponse): Prices {
    return new Prices(raw)
  }
}
