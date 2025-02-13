# Chat Messaging Service

- Responsibilities:
    - Handles real-time messaging using WebSockets
    - Supports 1-on-1 and group chats
    - Manages message delivery status (Sent, Delivered, Read)
    - Ensures message ordering & retries in case of failure
    - Tech Stack: Node.js, WebSockets (Socket.io), Redis, Kafka