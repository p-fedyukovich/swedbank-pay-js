interface RawPayexError {
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

export default class PayExError extends Error {
  constructor(raw: RawPayexError) {
    super(raw.title)
    this.raw = raw
    this.message = raw.title
    this.rawType = raw.type
    this.headers = raw.headers
    this.type = this.constructor.name
    this.sessionId = raw.sessionId
    this.statusCode = raw.status
    this.detail = raw.detail

    if (this.type === 'PayexInvalidRequestError') {
      const problem = raw.problems[0]
      this.param = `${problem.name}: ${problem.description}`
    }
  }

  static generate(rawPayexError: RawPayexError): PayExError {
    if (rawPayexError.type && rawPayexError.type.includes('inputerror')) {
      return new PayexInvalidRequestError(rawPayexError)
    }

    return new PayExError(rawPayexError)
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

// class StripeCardError extends StripeError {
//   readonly type: 'StripeCardError';
// }

export class PayexInvalidRequestError extends PayExError {
  readonly type!: 'PayexInvalidRequestError'
}

// class StripeAPIError extends StripeError {
//   readonly type: 'StripeAPIError';
// }
//
// class StripeAuthenticationError extends StripeError {
//   readonly type: 'StripeAuthenticationError';
// }
//
//
// class StripeIdempotencyError extends StripeError {
//   readonly type: 'StripeIdempotencyError';
// }
