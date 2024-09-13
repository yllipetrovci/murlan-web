// PlayerStateEnum.ts
export const PlayerStateEnum = {
    CONNECTED: "connected",
    DISCONNECTED: "disconnected",
    RECONNECTING: 'reconnecting',
    LOST: "lost",
    WON: "won",
}

export const GAME_ACTIONS = {
    PASS: 'PASS',
    PLAY: "PLAY",
    WIN: "WIN",
    SWAPPED: "SWAPPED",
    INVALID_ACTION: 'INVALID_ACTION',
    INFO: "INFO",
    EMOJI: 'EMOJI'
}

export const GAME_STATUS = {
    WAITING: "WAITING",
    STARTING: "STARTING",
    PLAYING: "PLAYING",
    SWAPPING: "SWAPPING",
    ROUND_END: "ROUND_END",
    GAME_END: "GAME_END"
};

export const GAME_TYPES = {
    GAME_21: "game_21",
    SINGLE_GAME: "single_game",
    GAME_21_2V2: "game_21_2v2",
    SINGLE_GAME_2V2: "single_game_2v2"
}

export const TIERS = [
    {
        "id": 1,
        "stake": 1,
        "slug": "tier-1"
    },
    {
        "id": 2,
        "stake": 5,
        "slug": "tier-1"
    },
    {
        "id": 3,
        "stake": 10,
        "slug": "tier-1"
    },
    {
        "id": 4,
        "stake": 20,
        "slug": "tier-1"
    },
    {
        "id": 5,
        "stake": 50,
        "slug": "tier-2"
    },
    {
        "id": 6,
        "stake": 100,
        "slug": "tier-2"
    },
    {
        "id": 7,
        "stake": 200,
        "slug": "tier-2"
    },
    {
        "id": 8,
        "stake": 500,
        "slug": "tier-2"
    },
    {
        "id": 9,
        "stake": 1000,
        "slug": "tier-3"
    },
    {
        "id": 10,
        "stake": 2000,
        "slug": "tier-3"
    },
    {
        "id": 11,
        "stake": 5000,
        "slug": "tier-3"
    },
    {
        "id": 12,
        "stake": 10000,
        "slug": "tier-3"
    },
    {
        "id": 13,
        "stake": 20000,
        "slug": "premium-leagues"
    },
    {
        "id": 14,
        "stake": 50000,
        "slug": "premium-leagues"
    },
    {
        "id": 15,
        "stake": 100000,
        "slug": "premium-leagues"
    },
    {
        "id": 16,
        "stake": 1000000,
        "slug": "premium-leagues"
    }
]

