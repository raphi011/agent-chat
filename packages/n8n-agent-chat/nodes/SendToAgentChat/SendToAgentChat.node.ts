import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';

export class SendToAgentChat implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Send to Agent Chat',
		name: 'sendToAgentChat',
		icon: 'file:agentchat.svg',
		group: ['output'],
		version: 1,
		subtitle: '={{$parameter["operation"]}}',
		description: 'Sends messages and notifications to the Agent Chat mobile app',
		defaults: {
			name: 'Send to Agent Chat',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'agentChatApi',
				required: true,
			},
		],
		properties: [
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Send Message',
						value: 'sendMessage',
						description: 'Send a message to a conversation thread',
						action: 'Send a message',
					},
					{
						name: 'Send Notification',
						value: 'sendNotification',
						description: 'Send a push notification',
						action: 'Send a notification',
					},
				],
				default: 'sendMessage',
			},
			{
				displayName: 'Thread ID',
				name: 'threadId',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						operation: ['sendMessage'],
					},
				},
				description: 'The conversation thread ID to send the message to',
			},
			{
				displayName: 'Message',
				name: 'message',
				type: 'string',
				typeOptions: {
					rows: 4,
				},
				default: '',
				required: true,
				description: 'The message content (supports markdown)',
			},
			{
				displayName: 'Additional Fields',
				name: 'additionalFields',
				type: 'collection',
				placeholder: 'Add Field',
				default: {},
				options: [
					{
						displayName: 'Attachments',
						name: 'attachments',
						type: 'string',
						default: '',
						description: 'Comma-separated URLs of attachments to include',
					},
					{
						displayName: 'Priority',
						name: 'priority',
						type: 'options',
						options: [
							{
								name: 'Low',
								value: 'low',
							},
							{
								name: 'Normal',
								value: 'normal',
							},
							{
								name: 'High',
								value: 'high',
							},
						],
						default: 'normal',
						description: 'Message priority level',
					},
					{
						displayName: 'Silent',
						name: 'silent',
						type: 'boolean',
						default: false,
						description: 'Whether to send without triggering a notification',
					},
				],
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		for (let i = 0; i < items.length; i++) {
			try {
				const operation = this.getNodeParameter('operation', i) as string;
				const message = this.getNodeParameter('message', i) as string;

				// TODO: Implement actual API calls to Agent Chat backend
				// This is a placeholder structure showing the intended interface

				if (operation === 'sendMessage') {
					const threadId = this.getNodeParameter('threadId', i) as string;
					const additionalFields = this.getNodeParameter('additionalFields', i, {}) as {
						attachments?: string;
						priority?: string;
						silent?: boolean;
					};

					// Placeholder response
					returnData.push({
						json: {
							success: true,
							operation,
							threadId,
							message,
							...additionalFields,
							timestamp: new Date().toISOString(),
						},
						pairedItem: { item: i },
					});
				} else if (operation === 'sendNotification') {
					// Placeholder response
					returnData.push({
						json: {
							success: true,
							operation,
							message,
							timestamp: new Date().toISOString(),
						},
						pairedItem: { item: i },
					});
				}
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({
						json: {
							error: error.message,
						},
						pairedItem: { item: i },
					});
					continue;
				}
				throw error;
			}
		}

		return [returnData];
	}
}
