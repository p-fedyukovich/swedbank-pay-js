import RawPayeeInfoResponse from '../api/response/raw-payee-info-response'

export default class PayeeInfo {
  private readonly _raw: RawPayeeInfoResponse
  private readonly _paymentId: string
  private readonly _id: string
  private readonly _payeeId: string
  private readonly _payeeReference: string
  private readonly _payeeName: string | null = null
  private readonly _productCategory: string | null = null
  private readonly _orderReference: string | null = null
  private readonly _subsite: string | null = null

  constructor(raw: RawPayeeInfoResponse) {
    this._raw = raw
    this._paymentId = raw.payment.id
    const { payeeInfo } = raw
    this._id = payeeInfo.id
    this._payeeId = payeeInfo.payeeId
    this._payeeReference = payeeInfo.payeeReference
    if (payeeInfo.payeeName) {
      this._payeeName = payeeInfo.payeeName
    }
    if (payeeInfo.productCategory) {
      this._productCategory = payeeInfo.productCategory
    }
    if (payeeInfo.orderReference) {
      this._orderReference = payeeInfo.orderReference
    }
    if (payeeInfo.subsite) {
      this._subsite = payeeInfo.subsite
    }
  }

  get raw(): RawPayeeInfoResponse {
    return this._raw
  }

  get paymentId(): string {
    return this._paymentId
  }

  get id(): string {
    return this._id
  }

  /**
   * This is the unique id that identifies this payee (like merchant) set by PayEx.
   */
  get payeeId(): string {
    return this._payeeId
  }

  /**
   * A unique reference from the merchant system.
   * It is set per operation to ensure an exactly-once delivery of a transactional operation.
   */
  get payeeReference(): string {
    return this._payeeReference
  }

  /**
   * The payee name (like merchant name) that will be displayed to consumer when redirected to PayEx.
   */
  get payeeName(): string | null {
    return this._payeeName
  }

  /**
   *  A product category or number sent in from the payee/merchant.
   *  This is not validated by PayEx, but will be passed through the payment process and may be used
   *  in the settlement process.
   */
  get productCategory(): string | null {
    return this._productCategory
  }

  /**
   * The order reference should reflect the order reference found in the merchant's systems.
   * Max 50 characters.
   */
  get orderReference(): string | null {
    return this._orderReference
  }

  /**
   * The subsite field can be used to perform split settlement on the payment.
   * The subsites must be resolved with PayEx reconciliation before being used.
   * Max 40 characters.
   */
  get subsite(): string | null {
    return this._subsite
  }

  static generate(raw: RawPayeeInfoResponse): PayeeInfo {
    return new PayeeInfo(raw)
  }
}
