import RawCommonPaymentResponse from './raw-common-payment-response'

export default interface RawPaymentResponse extends RawCommonPaymentResponse {
  payment: {
    /**
     * The relative URN and unique identifier of the payment resource
     */
    id: string

    operation: 'Purchase' | 'Recur' | 'Payout' | 'Verify'
    /**
     * The payment number , useful when there’s need to reference the payment in human communication.
     * Not usable for programmatic identification of the payment, for that id should be used instead.
     */
    number: number
    /**
     * The amount (including VAT, if any) to charge the payer, entered in the lowest monetary unit of the selected currency.
     */
    amount: number
    created: string
    updated: string
    /**
     * Indicates the state of the payment, not the state of any transactions performed on the payment.
     */
    state: 'Ready' | 'Pending' | 'Failed' | 'Aborted'
    currency: string
    description: string
    initiatingSystemUserAgent: string
    userAgent: string
    language:
      | 'en-US'
      | 'sv-SE'
      | 'nb-NO'
      | 'de-DE'
      | 'ee-EE'
      | 'es-ES'
      | 'fr-FR'
      | 'lv-LV'
      | 'lt-LT'
      | 'ru-RU'
      | 'fi-FI'
      | 'da-DK'
    /**
     * The intent of the payment identifies how and when the charge will be effectuated.
     * This determine the type transactions used during the payment process.
     *
     *
     * PreAuthorization        Holds the funds for a certain time in contrast to reserving the amount.
     *                         A preauthoriations is always followed by the finalize operation
     *
     * Authorization           Reserves the amount, and is followed by a cancellation or capture of funds.
     *
     * AutoCapture             A one phase option that enable capture of funds automatically after authorization.
     */
    intent: 'PreAuthorization' | 'Authorization' | 'AutoCapture'
    instrument: 'CreditCard' | 'Visa' | 'MasterCard'
    remainingCaptureAmount?: number
    remainingCancellationAmount?: number
    remainingReversalAmount?: number
    prices?: {
      id: string
    }
    urls?: {
      id: string
    }
    payeeInfo?: {
      id: string
    }
    metadata?: {
      id: string
    }
    transactions?: {
      id: string
    }
    authorizations?: {
      id: string
    }
    captures?: {
      id: string
    }
    reversals?: {
      id: string
    }
    verifications?: {
      id: string
    }
  }
  operations: Array<{
    href: string
    rel: string
    method: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE'
    contentType: string
  }>
}
