# Payex REST Node.js Library


The Payex REST Node library provides convenient access to the Payex API from
applications written in server-side JavaScript.

Please keep in mind that this package is for use with server-side Node that
uses Payex access token.

## Installation

Install the package with:

```sh
yarn add @urbaninfrastructure/payex-rest
```

## Usage

The package needs to be configured with your account's access token which is
available in your [Payex Admin portal](https://admin.payex.com/psp/login). Require it with the key's
value:

```js
const Payex = require('payex-rest')
const payex = new Payex('token')

const purchaseResponse = await payex.payment.purchase({
  amount: 1000,
  currency: 'NOK',
  ...
})
```
