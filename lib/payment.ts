import { RestClient } from 'typed-rest-client/RestClient'

/**
 * Determines the initial operation, that defines the type card payment created.
 */
enum OperationType {
    /**
     * Used to charge a card. It is followed up by a capture or cancel operation.
     */
    Purchase,
    /**
     * Used to charge a card on a recurring basis. Is followed up by a capture or
     * cancel operation (if not Autocapture is used, that is).
     */
    Recur,
    /**
     * Used to deposit funds directly to credit card. No more requests are necessary from the merchant side.
     */
    Payout,
    /**
     * Used when authorizing a card withouth reserveing any funds.  It is followed up by a verification transaction.
     */
    Verify
}

/**
 * The intent of the payment identifies how and when the charge will be effectuated.
 * This determine the type transactions used during the payment process.
 */
enum IntentType {
    /**
     * Holds the funds for a certain time in contrast to reserving the amount.
     * A preauthoriations is always followed by the finalize operation
     */
    PreAuthorization,

    /**
     * Reserves the amount, and is followed by a cancellation or capture of funds.
     */
    Authorization,

    /**
     * A one phase option that enable capture of funds automatically after authorization.
     */
    AutoCapture
}

interface CreatePaymentRequest {
    payment: PaymentRequest
}

interface PaymentRequest {
    operation: OperationType
    intent: IntentType
}

interface CreatePaymentResponse {
    payment: PaymentResponse
}

interface PaymentResponse {
    operation: OperationType
    intent: IntentType
}

enum PaymentState {
    Ready
}

interface PurchaseResponse extends PaymentResponse {
    id: string
    number: number
    instrument: CreditCardType,
    created: string
    updated: string
    state: PaymentState
    currency: CurrencyEnum
    amount: number
    remainingCaptureAmount: number
    remainingCancellationAmount: number
    remainingReversalAmount: number
    description: string
    payerReference: string
    initiatingSystemUserAgent: string
    userAgent: string
    language: LanguageEnum
}

enum CurrencyEnum {
    /**
     * Norwegian krone
     */
    NOK,
    /**
     * Swedish krona
     */
    SEK,
    /**
     * Danish krone
     */
    DKK,
    /**
     * United States dollar
     */
    USD,
    /**
     * Euro
     */
    EUR
}

enum CreditCardType {
    CreditCard,
    Visa,
    MasterCard
}

interface Price {
    /**
     * Use the generic type {@link CreditCard} if you want to enable all card
     * brands supported by merchant contract.
     * Use card brands like {@link Visa} (for card type Visa), {@link MasterCard} (for card type Mastercard)
     * and others if you want to specify different amount for each card brand.
     * If you want to use more than one amount you must have one instance in the prices node for each card brand.
     * You will not be allowed to both specify card brands and CreditCard at the same time in this field.
     */
    type: CreditCardType
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

enum LanguageEnum {
    nb='nb-NO',
    sv='sv-SE',
    en='en-US'
}

interface Urls {
    /**
     * The array of URLs valid for embedding of PayEx Hosted Views. If not supplied,
     * view-operation will not be available.
     */
    hostUrl?: string[]
    /**
     * The URL that PayEx will redirect back to when the payment page is completed.
     */
    completeUrl: string
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

interface PayeeInfo {
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
    subsite: string
}

interface Metadata {
    [name: string]: string | number | boolean
}

interface PurchaseInput {
    intent: IntentType
    /**
     * If you put in a paymentToken here, the payment page will preload the stored payment data
     * related to the paymentToken and let the consumer make a purchase without having to enter all card data.
     * This is called a "One Click" purchase.
     */
    paymentToken?: string
    currency: CurrencyEnum
    prices: Price
    /**
     * A textual description max 40 characters of the purchase.
     */
    description: string
    /**
     * The reference to the payer (consumer/end user) from the merchant system. E.g mobile number, customer number etc.
     */
    payerReference?: string
    /**
     * Set this to true if you want to create a paymentToken for future use as One Click.
     */
    generatePaymentToken?: boolean
    /**
     * Set this to true if you want to create a recurrenceToken for future
     * use Recurring purchases (subscription payments).
     */
    generateRecurrenceToken?: boolean
    /**
     * The user agent reference of the consumer's browser
     */
    userAgent: string
    language: LanguageEnum
    urls: Urls

    payeeInfo: PayeeInfo
    /**
     * The keys and values that should be associated with the payment.
     * Can be additional identifiers and data you want to associate with the payment.
     */
    metadata: Metadata
}

export class Payment {
    private static readonly RESOURCE = 'payment/credit-card'

    private readonly _client: RestClient

    constructor(client: RestClient) {
        this._client = client
    }

    /**
     * A Purchase payment is a straightforward way to charge the card of the payer.
     * It is followed up by posting a capture, cancellation or reversal transaction.
     * @param {PurchaseInput} purchaseInput
     */
    public async purchase(purchaseInput: PurchaseInput): Promise<PurchaseResponse | null> {
        const response = await this.create({
            payment: {
                operation: OperationType.Purchase,
                ...purchaseInput
            }
        })
        if (response) {
          return response.payment as PurchaseResponse
        }
        return null
    }

    private async create(createPaymentRequest: CreatePaymentRequest): Promise<CreatePaymentResponse | null> {
        const response = await this._client.create<CreatePaymentResponse>(Payment.RESOURCE, createPaymentRequest)
        return response.result
    }
}
