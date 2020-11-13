import RawMetadataResponse from '../api/response/raw-metadata-response'

export default class Metadata {
  private readonly _raw: RawMetadataResponse
  private readonly _id: string
  private readonly _paymentId: string
  private readonly _data: Record<string, string | boolean | number>

  constructor(raw: RawMetadataResponse) {
    this._raw = raw
    this._paymentId = raw.payment.id
    this._id = raw.metadata.id

    const metadata = {
      ...raw.metadata
    }
    delete metadata.id
    this._data = metadata
  }

  get raw(): RawMetadataResponse {
    return this._raw
  }

  get id(): string {
    return this._id
  }

  get paymentId(): string {
    return this._paymentId
  }

  get data(): Record<string, string | boolean | number> {
    return this._data
  }

  getDataValue(name: string): null | boolean | string | number {
    return this.data[name]
  }

  static generate(raw: RawMetadataResponse): Metadata {
    return new Metadata(raw)
  }
}
