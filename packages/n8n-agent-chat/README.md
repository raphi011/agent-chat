# n8n-nodes-agent-chat

This is an n8n community node that enables bidirectional communication between n8n workflows and the Agent Chat mobile application.

## Features

- **Agent Chat Trigger Node**: Receives messages from the Agent Chat mobile app with full conversation context
- **Send to Agent Chat Node**: Sends responses and notifications back to the mobile app
- Built-in authentication and credential management
- Support for threaded conversations
- Message history and delivery tracking
- Rich content support (markdown, images, attachments)

## Installation

### Community Nodes (Not Yet Available)

Once published, install via n8n's Community Nodes interface:
1. Go to Settings > Community Nodes
2. Search for `n8n-nodes-agent-chat`
3. Click Install

### Manual Installation (Development)

1. Navigate to your n8n installation's custom nodes directory
2. Clone or link this package
3. Run `npm install` and `npm run build`
4. Restart n8n

## Usage

### Agent Chat Trigger Node

The trigger node listens for incoming messages from the Agent Chat mobile app:

1. Add the "Agent Chat Trigger" node to your workflow
2. Configure your API credentials
3. The node will output message data including:
   - Message content
   - Thread ID
   - User information
   - Message history (optional)
   - Metadata

### Send to Agent Chat Node

Send responses back to the mobile app:

1. Add the "Send to Agent Chat" node to your workflow
2. Connect it to your Agent Chat Trigger or workflow logic
3. Configure the message content (supports markdown)
4. Optionally add attachments or rich media

## Credentials

You'll need to create an Agent Chat API credential with:
- API Key or Token (generated in the mobile app)
- Optional: Server URL (if self-hosting)

## Development

```bash
# Install dependencies
npm install

# Build the node
npm run build

# Watch mode for development
npm run dev

# Lint and format
npm run lint
npm run format
```

## Compatibility

- n8n version: 1.0.0+
- Node.js: 18+

## License

MIT

## Resources

- [n8n documentation](https://docs.n8n.io/)
- [Agent Chat documentation](../README.md)
