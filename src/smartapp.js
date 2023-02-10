const SmartApp = require('@smartthings/smartapp')
const FileContextStore = require('@smartthings/file-context-store')
const mainPageHandler = require('./handlers/mainPageHandler')
const updatedHandler = require('./handlers/updatedHandler')
const deviceEventHandler = require('./handlers/deviceEventHandler')

const appId = process.env.APP_ID
const clientId = process.env.CLIENT_ID
const clientSecret = process.env.CLIENT_SECRET

/**
 * Stores access tokens and other properties for calling the SmartThings API. This implementation is a simple flat file
 * store that is for demo purposes not appropriate for production systems. Other context stores exist, including
 * DynamoDB and Firebase.
 */
const contextStore = new FileContextStore('data')

/*
 * Thew SmartApp. Provides an API for making REST calls to the SmartThings platform and
 * handles calls from the platform for lifecycle events.
 */
const smartApp = new SmartApp()
	.appId(appId)
	.clientId(clientId)
	.clientSecret(clientSecret)
	.permissions(['r:locations:*', 'r:devices:*', 'x:notifications:*'])
	.contextStore(contextStore)
	.enableEventLogging(2)
	.page('mainPage', mainPageHandler)
	.updated(updatedHandler)
	.subscribedEventHandler('deviceEventHandler', deviceEventHandler)

module.exports = smartApp
