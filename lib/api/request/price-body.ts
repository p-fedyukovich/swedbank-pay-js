export default interface PriceBody {
  /**
   * Use the generic type {@link CreditCard} if you want to enable all card
   * brands supported by merchant contract.
   * Use card brands like {@link Visa} (for card type Visa), {@link MasterCard} (for card type Mastercard)
   * and others if you want to specify different amount for each card brand.
   * If you want to use more than one amount you must have one instance in the prices node for each card brand.
   * You will not be allowed to both specify card brands and CreditCard at the same time in this field.
   */
  type: 'CreditCard' | 'Visa' | 'MasterCard'
  /**
   * Amount is entered in the lowest monetary units of the selected currency.
   * E.g. 10000 = 100.00 NOK, 5000 = 50.00 SEK.
   */
  amount: number
  /**
   * If the amount given includes VAT, this may be displayed for the user in the payment page (redirect only).
   * Set to 0 (zero) if this is not relevant.
   */
  vatAmount: number
}
