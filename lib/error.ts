interface RawSwedbankPayError {
  sessionId: string
  type: string
  title: string
  status: number
  instance: string
  detail: string
  problems: Array<{
    name: string
    description: string
  }>
  headers: {
    [key: string]: string
  }
}

export default class SwedbankPayError extends Error {
  constructor(raw: RawSwedbankPayError) {
    super(raw.title)
    this.raw = raw
    this.message = raw.title
    this.rawType = raw.type
    this.headers = raw.headers
    this.type = this.constructor.name
    this.sessionId = raw.sessionId
    this.statusCode = raw.status
    this.detail = raw.detail

    if (this.type === 'SwedbankPayInvalidRequestError') {
      const problem = raw.problems[0]
      this.param = `${problem.name}: ${problem.description}`
    }
  }

  static generate(rawError: RawSwedbankPayError): SwedbankPayError {
    if (rawError.type && rawError.type.includes('inputerror')) {
      return new SwedbankPayInvalidRequestError(rawError)
    }

    return new SwedbankPayError(rawError)
  }

  readonly message: string
  readonly rawType: string
  readonly raw: any
  readonly headers: {
    [key: string]: string
  }
  readonly sessionId: string
  readonly detail?: any
  readonly param?: string
  readonly type: string
  readonly statusCode?: number
}

export class SwedbankPayInvalidRequestError extends SwedbankPayError {
  readonly type!: 'SwedbankPayInvalidRequestError'
}
