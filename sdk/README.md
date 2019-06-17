# Discovery SDK

Generate a sdk with validation via consuming a discovery api. This package supports json-schema validation.
This package is meant to be used with `discovery-api` package. The main benefits for using this package:

- Share the api validation in the client side and avoid making a request that is going to fail due to the basic api validation.

- Auto discover endpoints based on api data. With this feature the client does not require a new sdk upon adding a new endpoint in server side because it is autogenerate.

- One SDK that can serve any api if the api data provided is as expected

## How to use

See `example/index.js` for a usage example

## How to install

Execute `npm install discovery-sdk`
