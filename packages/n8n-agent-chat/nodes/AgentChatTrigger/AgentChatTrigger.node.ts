import {
	INodeType,
	INodeTypeDescription,
	ITriggerFunctions,
	ITriggerResponse,
	IDataObject,
} from 'n8n-workflow';

export class AgentChatTrigger implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Agent Chat Trigger',
		name: 'agentChatTrigger',
		icon: 'file:agentchat.svg',
		group: ['trigger'],
		version: 1,
		subtitle: '={{$parameter["event"]}}',
		description: 'Receives messages from the Agent Chat mobile app',
		defaults: {
			name: 'Agent Chat Trigger',
		},
		inputs: [],
		outputs: ['main'],
		credentials: [
			{
				name: 'agentChatApi',
				required: true,
			},
		],
		webhooks: [
			{
				name: 'default',
				httpMethod: 'POST',
				responseMode: 'onReceived',
				path: 'webhook',
			},
		],
		properties: [
			{
				displayName: 'Event',
				name: 'event',
				type: 'options',
				options: [
					{
						name: 'Message Received',
						value: 'message',
						description: 'Trigger when a new message is received',
					},
					{
						name: 'Thread Created',
						value: 'thread',
						description: 'Trigger when a new conversation thread is created',
					},
				],
				default: 'message',
				description: 'The event that should trigger the workflow',
			},
			{
				displayName: 'Include Message History',
				name: 'includeHistory',
				type: 'boolean',
				default: false,
				description: 'Whether to include previous messages from the thread',
			},
			{
				displayName: 'History Limit',
				name: 'historyLimit',
				type: 'number',
				default: 10,
				displayOptions: {
					show: {
						includeHistory: [true],
					},
				},
				description: 'Maximum number of previous messages to include',
			},
		],
	};

	async trigger(this: ITriggerFunctions): Promise<ITriggerResponse> {
		const webhookUrl = this.getNodeWebhookUrl('default');
		const event = this.getNodeParameter('event') as string;
		const includeHistory = this.getNodeParameter('includeHistory') as boolean;

		// TODO: Implement SSE connection or webhook listener
		// This is a placeholder structure showing the intended interface

		const manualTriggerFunction = async () => {
			// Manual trigger for testing
			this.emit([
				this.helpers.returnJsonArray([
					{
						event,
						webhookUrl,
						message: 'Manual trigger - replace with actual SSE/webhook implementation',
					},
				]),
			]);
		};

		// In production, this would establish an SSE connection or webhook listener
		// and emit events when messages are received from the mobile app

		return {
			closeFunction: async () => {
				// Cleanup: close SSE connection or webhook listener
			},
			manualTriggerFunction,
		};
	}
}
