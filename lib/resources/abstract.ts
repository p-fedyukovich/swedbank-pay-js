import SwedbankPayAPI from '../api'

export abstract class AbstractResource {
  protected readonly _api: SwedbankPayAPI

  constructor(api: SwedbankPayAPI) {
    this._api = api
  }
}
