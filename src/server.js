import { Client } from "colyseus.js";
import { config } from "./config";
import { GAME_TYPES } from "./constants/constants";

class Server {
    client;
    currentRoom;

    constructor() {
        this.client = new Client("ws://localhost:2567");
        console.log(this.client);
    }

    async joinRoom(roomID, data) {
        this.currentRoom = await this.client.joinById(roomID, {
            token: data.token,
            type: data.type,
            tierId: data.selectedTire,
            betId: data.betId,
            teamId: data?.teamId || null,
            invitedFromId: data?.invitedFromId || null
        });

        return this.currentRoom;
    };

    async joinOrCreate(roomName, data) {
        this.currentRoom = await this.client.joinOrCreate(roomName || GAME_TYPES.GAME_21, {
            token: data.token,
            type: data.type,
            tierId: data.selectedTire,
            betId: data.betId,
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
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new Server();


