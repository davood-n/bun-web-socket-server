# Web Socket Server
A web socket server written in javascript for the BunJs runtime.

## Installation
```bash
bun install
bun start --port {default 8080} --path {default /}
```

## Usage
```typescript
COMING SOON
```

## API Endpoints
All the API endpoints of this web socket server.

### POST /authorize
This is the endpoint that is used to authorize the third-party server connection to have access to all the other server-side endpoints. It uses JWT authentication to authorize the connection.

#### Request Body
```json
{
    "token": "string"
}
```

# More coming soon