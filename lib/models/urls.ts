import RawUrlsResponse from '../api/response/raw-urls-response'

export default class Urls {
  private readonly _raw: RawUrlsResponse
  private readonly _id: string
  private readonly _paymentId: string
  private readonly _hostUrls: string[] = []
  private readonly _completeUrl: string | null = null
  private readonly _cancelUrl: string | null = null
  private readonly _paymentUrl: string | null = null
  private readonly _callbackUrl: string | null = null
  private readonly _logoUrl: string | null = null
  private readonly _termsOfServiceUrl: string | null = null

  private constructor(raw: RawUrlsResponse) {
    this._raw = raw
    this._paymentId = raw.payment.id
    const { urls } = raw
    this._id = urls.id
    this._hostUrls = urls.hostUrls
    if (urls.completeUrl) {
      this._completeUrl = urls.completeUrl
    }
    if (urls.cancelUrl) {
      this._cancelUrl = urls.cancelUrl
    }
    if (urls.paymentUrl) {
      this._paymentUrl = urls.paymentUrl
    }
    if (urls.callbackUrl) {
      this._callbackUrl = urls.callbackUrl
    }
    if (urls.logoUrl) {
      this._logoUrl = urls.logoUrl
    }
    if (urls.termsOfServiceUrl) {
      this._termsOfServiceUrl = urls.termsOfServiceUrl
    }
  }

  get raw(): RawUrlsResponse {
    return this._raw
  }

  get id(): string {
    return this._id
  }

  get paymentId(): string {
    return this._paymentId
  }

  /**
   * The array of URLs valid for embedding of PayEx Hosted Views. If not supplied,
   * view-operation will not be available.
   */
  get hostUrls(): string[] {
    return this._hostUrls
  }

  /**
   * The URL that PayEx will redirect back to when the payment page is completed.
   */
  get completeUrl(): string | null {
    return this._completeUrl
  }

  /**
   * The URI to redirect the payer to if the payment is canceled. Only used in redirect scenarios.
   * Can not be used simultaneously with paymentUrl; only cancelUrl or paymentUrl can be used, not both.
   */
  get cancelUrl(): string | null {
    return this._cancelUrl
  }

  /**
   * The URI that PayEx will redirect back to when the view-operation needs to be loaded,
   * to inspect and act on the current status of the payment.
   * Only used in hosted views. If both cancelUrl and paymentUrl is sent, the paymentUrl will used.
   */
  get paymentUrl(): string | null {
    return this._paymentUrl
  }

  /**
   * The URL that PayEx will perform an HTTP POST against every time a transaction is created on the payment.
   */
  get callbackUrl(): string | null {
    return this._callbackUrl
  }

  /**
   * The URL that will be used for showing the customer logo.
   * Must be a picture with maximum 50px height and 400px width. Require https.
   */
  get logoUrl(): string | null {
    return this._logoUrl
  }

  /**
   * A URL that contains your terms and conditions for the payment, to be linked on the payment page. Require https.
   */
  get termsOfServiceUrl(): string | null {
    return this._termsOfServiceUrl
  }

  static generate(raw: RawUrlsResponse): Urls {
    return new Urls(raw)
  }
}
