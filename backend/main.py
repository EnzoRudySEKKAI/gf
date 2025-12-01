from __future__ import annotations

from dataclasses import dataclass, asdict
from typing import List, Optional

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

app = FastAPI(title="Tic Tac Toe API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@dataclass
class GameState:
    board: List[Optional[str]]
    next_player: str
    winner: Optional[str]
    is_draw: bool


current_game: Optional[GameState] = None


class MoveRequest(BaseModel):
    player: str = Field(..., pattern="^[XO]$", description="Choose 'X' for cross or 'O' for circle")
    index: int = Field(..., ge=0, le=8)


def create_new_game() -> GameState:
    return GameState(
        board=[None] * 9,
        next_player="X",
        winner=None,
        is_draw=False,
    )


def get_or_create_game() -> GameState:
    global current_game
    if current_game is None:
        current_game = create_new_game()
    return current_game


def check_winner(board: List[Optional[str]]) -> Optional[str]:
    combos = [
        (0, 1, 2),
        (3, 4, 5),
        (6, 7, 8),
        (0, 3, 6),
        (1, 4, 7),
        (2, 5, 8),
        (0, 4, 8),
        (2, 4, 6),
    ]
    for a, b, c in combos:
        if board[a] and board[a] == board[b] == board[c]:
            return board[a]
    return None


def serialize_game(game: GameState) -> Dict:
    return asdict(game)


@app.get("/game")
def get_game():
    game = get_or_create_game()
    return serialize_game(game)


@app.post("/game/reset")
def reset_game():
    global current_game
    current_game = create_new_game()
    return serialize_game(current_game)


@app.post("/game/move")
def make_move(move: MoveRequest):
    game = get_or_create_game()

    if game.winner or game.is_draw:
        raise HTTPException(status_code=400, detail="Game already finished")

    if move.player != game.next_player:
        raise HTTPException(status_code=400, detail=f"It is {game.next_player}'s turn")

    if game.board[move.index] is not None:
        raise HTTPException(status_code=400, detail="Cell already taken")

    game.board[move.index] = move.player

    winner = check_winner(game.board)
    if winner:
        game.winner = winner
    elif all(cell is not None for cell in game.board):
        game.is_draw = True
    else:
        game.next_player = "O" if game.next_player == "X" else "X"

    return serialize_game(game)

