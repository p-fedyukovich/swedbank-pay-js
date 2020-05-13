export interface Price {
  /**
   * Use the generic type {@link CreditCard} if you want to enable all card
   * brands supported by merchant contract.
   * Use card brands like {@link Visa} (for card type Visa), {@link MasterCard} (for card type Mastercard)
   * and others if you want to specify different amount for each card brand.
   * If you want to use more than one amount you must have one instance in the prices node for each card brand.
   * You will not be allowed to both specify card brands and CreditCard at the same time in this field.
   */
  type: 'CreditCard' | 'Visa' | 'MasterCard'
  /**
   * Amount is entered in the lowest monetary units of the selected currency.
   * E.g. 10000 = 100.00 NOK, 5000 = 50.00 SEK.
   */
  amount: number
  /**
   * If the amount given includes VAT, this may be displayed for the user in the payment page (redirect only).
   * Set to 0 (zero) if this is not relevant.
   */
  vatAmount: number
}

export interface Urls {
  /**
   * The array of URLs valid for embedding of PayEx Hosted Views. If not supplied,
   * view-operation will not be available.
   */
  hostUrls?: string[]
  /**
   * The URL that PayEx will redirect back to when the payment page is completed.
   */
  completeUrl?: string
  /**
   * The URI to redirect the payer to if the payment is canceled. Only used in redirect scenarios.
   * Can not be used simultaneously with paymentUrl; only cancelUrl or paymentUrl can be used, not both.
   */
  cancelUrl?: string
  /**
   * The URI that PayEx will redirect back to when the view-operation needs to be loaded,
   * to inspect and act on the current status of the payment.
   * Only used in hosted views. If both cancelUrl and paymentUrl is sent, the paymentUrl will used.
   */
  paymentUrl?: string
  /**
   * The URL that PayEx will perform an HTTP POST against every time a transaction is created on the payment.
   */
  callbackUrl?: string
  /**
   * The URL that will be used for showing the customer logo.
   * Must be a picture with maximum 50px height and 400px width. Require https.
   */
  logoUrl?: string
  /**
   * A URL that contains your terms and conditions for the payment, to be linked on the payment page. Require https.
   */
  termsOfServiceUrl?: string
}

export interface PayeeInfo {
  /**
   * This is the unique id that identifies this payee (like merchant) set by PayEx.
   */
  payeeId: string
  /**
   * A unique reference from the merchant system.
   * It is set per operation to ensure an exactly-once delivery of a transactional operation.
   */
  payeeReference: string
  /**
   * The payee name (like merchant name) that will be displayed to consumer when redirected to PayEx.
   */
  payeeName?: string
  /**
   * 	A product category or number sent in from the payee/merchant.
   * 	This is not validated by PayEx, but will be passed through the payment process and may be used
   * 	in the settlement process.
   */
  productCategory?: string
  /**
   * The order reference should reflect the order reference found in the merchant's systems.
   * Max 50 characters.
   */
  orderReference?: string
  /**
   * The subsite field can be used to perform split settlement on the payment.
   * The subsites must be resolved with PayEx reconciliation before being used.
   * Max 40 characters.
   */
  subsite?: string
}

export interface Metadata {
  [name: string]: string | number | boolean
}
