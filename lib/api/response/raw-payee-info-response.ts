import RawCommonPaymentResponse from './raw-common-payment-response'

export default interface RawPayeeInfoResponse extends RawCommonPaymentResponse{
  payeeInfo: {
    id: string
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
     *  A product category or number sent in from the payee/merchant.
     *  This is not validated by PayEx, but will be passed through the payment process and may be used
     *  in the settlement process.
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
}
