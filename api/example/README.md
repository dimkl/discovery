# Example Discovery API

This is an example koa app to demonstrate how the discovery API package can be used in an app.

The most important part in this app is that the easiest way to implement the discovery api is to use a signleton instance of DiscoverAPI and register all routes in it and then expose the all the routes to the app using `expose(router)` method.

The discovery api in this example is located in located in http://localhost:8080/.well-known/api.json after staring the app.

## How to use

Execute `npm start` to initialize the app
