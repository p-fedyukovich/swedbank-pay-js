import { AxiosInstance } from 'axios'

export abstract class AbstractResource {
  protected readonly _client: AxiosInstance

  protected constructor(client: AxiosInstance) {
    this._client = client
  }
}
