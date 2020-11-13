import RawCommonPaymentResponse from './raw-common-payment-response'

export default interface RawUrlsResponse extends RawCommonPaymentResponse{
  urls: {
    id: string
    /**
     * The array of URLs valid for embedding of PayEx Hosted Views. If not supplied,
     * view-operation will not be available.
     */
    hostUrls: string[]
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
}
