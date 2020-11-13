export default interface CreateReversalRequest {
  transaction: {
    amount: number
    vatAmount: number
    description: string
    payeeReference: string
  }
}
