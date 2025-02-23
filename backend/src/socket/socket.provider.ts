import {
    WebSocketGateway,
    WebSocketServer,
    OnGatewayConnection,
    OnGatewayDisconnect,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";


// GLO

@WebSocketGateway()
export class WebSocketsGateway implements OnGatewayConnection, OnGatewayDisconnect {


    // Where i can tell the online user and the coresponding socket io
    private onlineUsers = new Map<string, string>();



    @WebSocketServer() server: Server;
    handleConnection(client: Socket) {

        console.log(`new User connected `, client.id);
        client.emit("connection_success", { message: "Connected successfully" });

    }

    handleDisconnect(client: Socket) {
        console.log(`User disconnected: ${client.id}`);
    }

    // @UseGuards(JwtAuthGuard) // Ensure only authenticated users can send messages
    // @SubscribeMessage("chat_message")
    // handleMessage(client: Socket, @MessageBody() message: { text: string }) {
    //     this.server.emit("chat_message", { user: user.username, text: message.text });
    // }
}
