import RawCommonPaymentResponse from './raw-common-payment-response'

export interface RawPrice {
  type: 'CreditCard' | 'Visa' | 'MasterCard'
  amount: number
  vatAmount: number
}

export default interface RawPricesResponse extends RawCommonPaymentResponse {
  prices: {
    id: string
    priceList: RawPrice[]
  }
}
