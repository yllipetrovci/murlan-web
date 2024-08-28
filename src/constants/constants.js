// PlayerStateEnum.ts
export const PlayerStateEnum = {
    CONNECTED: "connected",
    DISCONNECTED: "disconnected",
    RECONNECTING: 'reconnecting',
    LOST: "lost",
    WON: "won",
}

export const GAME_ACTIONS = {
    PASS:'PASS',
    PLAY:"PLAY",
    WIN:"WIN",
    SWAPPED:"SWAPPED"
};

export const GAME_STATUS = {
    WAITING: "WAITING",
    STARTING: "STARTING",
    PLAYING: "PLAYING",
    SWAPPING: "SWAPPING",
    ROUND_END: "ROUND_END",
    GAME_END: "GAME_END"
};
