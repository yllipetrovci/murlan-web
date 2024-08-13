import { Client } from "colyseus.js";
import { config } from "./config";

class Server {
    client;
    currentRoom;

    constructor() {
        this.client = new Client("ws://localhost:2567");
        console.log(this.client);
    }

    async join(username) {
        this.currentRoom = await this.client.joinOrCreate(config.ROOM_NAME, {
            username: username
        });

        return this.currentRoom;
    }

    async leave() {
        console.log("LEAVE");
        return await this.currentRoom.leave();
    }

    async reconnect(cachedReconnectionToken) {
        try {
            this.currentRoom = await this.client.reconnect(cachedReconnectionToken);
            console.log("joined successfully", this.currentRoom);

            return this.currentRoom;
        } catch (e) {
            console.error("join error", e);
        }
    }

    async getAvailableRooms() {
        try {
            this.client.getAvailableRooms(config.ROOM_NAME).then(rooms => {
                rooms.forEach((room) => {
                    console.log(room.roomId);
                    console.log(room.clients);
                    console.log(room.maxClients);
                    console.log(room.metadata);
                });
            }).catch(e => {
                console.error(e);
            });
        } catch (e) {
            console.error("join error", e);
        }
    }

   /*  async joinByConsumeSeatReservation() {
        try {
            this.currentRoom = await this.client.consumeSeatReservation();
            console.log("joined successfully", this.room);

        } catch (e) {
            console.error("join error", e);
        }
    } */

}

// eslint-disable-next-line import/no-anonymous-default-export
export default new Server();


