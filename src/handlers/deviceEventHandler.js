module.exports = async (context, event) => {
	const { locationId, deviceId, value } = event

	const data = {
		locationId,
		type: value.type || 'ALERT',
		messages: [
			value.messages
		],
		deepLink: {
			type: 'device',
			id: event.deviceId
		}
	}

	if (value.replacements) {
		data.replacements = Object.keys(value.replacements).map(key => {
			return {
				key,
				value: value.replacements[key]
			}
		})
	}

	if (value.messages) {
		console.log('Notification request', JSON.stringify(data, null, 2))
		await context.api.notifications.create(data)
	}
}
