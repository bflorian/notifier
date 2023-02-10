
module.exports = async (context, updateData) => {
	// Delete any existing subscriptions
	await context.api.subscriptions.delete()

	// Subscribe to notification capability events
	const data = await context.api.subscriptions.subscribeToCapability(
		'stsolutions.pushNotification',
		'message',
		'deviceEventHandler')
	//console.log('Subscription created', JSON.stringify(data))
}
