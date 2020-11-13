import RawAuthorizationsResponse from '../api/response/raw-authorizations-response'
import Authorization from './authorization'

export default class Authorizations {
  private readonly _raw: RawAuthorizationsResponse
  private readonly _paymentId: string
  private readonly _id: string
  private readonly _authorizationList: Authorization[]

  private constructor(raw: RawAuthorizationsResponse) {
    this._raw = raw
    this._paymentId = raw.payment.id
    this._id = raw.authorizations.id
    this._authorizationList = raw.authorizations.authorizationList.map(Authorization.generate)
  }

  static generate(raw: RawAuthorizationsResponse): Authorizations {
    return new Authorizations(raw)
  }

  get raw(): RawAuthorizationsResponse {
    return this._raw
  }

  get paymentId(): string {
    return this._paymentId
  }

  get id(): string {
    return this._id
  }

  get authorizationList(): Authorization[] {
    return this._authorizationList
  }
}
