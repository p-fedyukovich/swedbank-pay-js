# Swedbank Pay Node.js Library


The Swedbank Pay Node library provides convenient access to the Swedbank Pay API from
applications written in server-side JavaScript.

Please keep in mind that this package is for use with server-side Node that
uses Payex access token.

## Installation

Install the package with:

```sh
yarn add swedbank-pay-js
```

## Usage

The package needs to be configured with your account's access token which is
available in your [Swedbank Pay Admin portal](https://admin.payex.com/psp/beta/login). Require it with the key's
value:

```js
const SwedbankPay = require('swedbank-pay-js')
const swedbankPay = new SwedbankPay('token')

const payment = await swedbankPay.payment.create({
  amount: 1000,
  currency: 'NOK',
  ...
})
```
