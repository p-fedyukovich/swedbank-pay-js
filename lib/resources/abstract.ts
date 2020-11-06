import PayExAPI from '../api'

export abstract class AbstractResource {
  protected readonly _api: PayExAPI

  constructor(api: PayExAPI) {
    this._api = api
  }
}
