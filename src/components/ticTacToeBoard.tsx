"use client"
import { useEffect, useState, useTransition } from "react"
import InGameModal from "./InGameModal"
import { useRouter } from "next/navigation"
import { handleUpdateScore } from "@/app/game/action/actions"

type Props = {
  userId: string
  currentHighestWinSteak: number
  currentWinSteak: number
  currentScore: number
}

export default function TicTacToeBoard( { userId, currentWinSteak = 0, currentScore = 0, currentHighestWinSteak = 0 }: Props) {
  const [board, setBoard] = useState<(null | "X" | "O")[][]>(
    createEmptyBoard(3)
  )
  const [turn, setTurn] = useState<"PLAYER" | "BOT" | null>(null)
  const [winner, setWinner] = useState<null | "X" | "O" | "DRAW">(null)
  const [openRestartDialog, setOpenRestartDialog] = useState(false)
  const [openBackToMain, setOpenBackToMain] = useState(false)
  const [winSteak, setWinSteak] = useState(currentWinSteak)
  const [highestWinSteak, setHighestWinSteak] = useState(currentHighestWinSteak)
  const [score, setScore] = useState(currentScore)
  const router = useRouter()
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const first = Math.random() < 0.5 ? "PLAYER" : "BOT"
    setTurn(first)

    if (first === "BOT") {
      setTimeout(() => botMove(board), 300)
    }
  }, [])

  console.log(winSteak%3)

  function handleClick(row: number, col: number) {
    if (winner) return
    if (turn !== "PLAYER") return
    if (board[row][col] !== null) return

    const newBoard = board.map(r => [...r])
    newBoard[row][col] = "X"

    const win = checkWinner(newBoard)

    setBoard(newBoard)

    if (win) {
      declearWinner(win)      
      return
    }

    setTurn("BOT")
    setTimeout(() => botMove(newBoard), 300)
  }

  function createEmptyBoard(size: number) {
    return Array.from({ length: size }, () =>
      Array(size).fill(null)
    )
  }

  function botMove(b: (null | "X" | "O")[][]) {
    const size = b.length; // N
    const board = b.map(row => [...row]);

    const emptyCells: { r: number; c: number }[] = [];
    board.forEach((row, r) =>
      row.forEach((cell, c) => {
        if (cell === null) emptyCells.push({ r, c })
      })
    );

    if (emptyCells.length === 0) return;

    function simulate(r: number, c: number, mark: "X" | "O") {
      const copy = board.map(row => [...row]);
      copy[r][c] = mark;
      return copy;
    }

    for (const { r, c } of emptyCells) {
      if (checkWinner(simulate(r, c, "O"))) {
        return commitMove(r, c);
      }
    }

    for (const { r, c } of emptyCells) {
      if (checkWinner(simulate(r, c, "X"))) {
        return commitMove(r, c);
      }
    }

    const corners = [
      { r: 0, c: 0 },
      { r: 0, c: size - 1 },
      { r: size - 1, c: 0 },
      { r: size - 1, c: size - 1 }
    ].filter(cell => board[cell.r][cell.c] === null);

    if (corners.length > 0) {
      const pick = corners[Math.floor(Math.random() * corners.length)];
      return commitMove(pick.r, pick.c);
    }

    const center = Math.floor(size / 2);
    if (board[center][center] === null) {
      return commitMove(center, center);
    }

    const rand = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    return commitMove(rand.r, rand.c);

    function commitMove(r: number, c: number) {
      const newBoard = board.map(row => [...row]);
      newBoard[r][c] = "O";

      const win = checkWinner(newBoard);

      setBoard(newBoard);
      if (win) {
        declearWinner(win)
        return;
      }
      setTurn("PLAYER");
    }
  }

  function onRestartInGameClick() {
    if(!winner) {
      setOpenRestartDialog(true)
      return
    }
    restart()
  }

  function onBackInGameClick() {
    if(!winner) {
      setOpenBackToMain(true)
      return
    }
    backToMain()
  }

  function restart() {
    if(!winner) {
      // declear draw and send result to Prisma
      declearWinner("DRAW")
    }
    const newBoard = createEmptyBoard(3)
    setBoard(createEmptyBoard(3))
    setWinner(null)
    const first = Math.random() < 0.5 ? "PLAYER" : "BOT"
    setTurn(first)

    if (first === "BOT") {
      setTimeout(() => botMove(newBoard), 300)
    }
  }

  function checkWinner(b: (null | "X" | "O")[][]) {
    const size = b.length

    for (let r = 0; r < size; r++) {
      const first = b[r][0]
      if (first && b[r].every(cell => cell === first)) return first
    }

    for (let c = 0; c < size; c++) {
      const first = b[0][c]
      if (first && b.every(row => row[c] === first)) return first
    }

    const firstDiag = b[0][0]
    if (firstDiag && b.every((row, i) => row[i] === firstDiag))
      return firstDiag

    const firstAnti = b[0][size - 1]
    if (firstAnti && b.every((row, i) => row[size - 1 - i] === firstAnti))
      return firstAnti

    const allFilled = b.flat().every(cell => cell !== null)
    if (allFilled) return "DRAW"

    return null
  }

  function backToMain() {
    if(!winner) {
      // declear draw and send result to Prisma
      declearWinner("DRAW")
    }

    router.push("/")
  }

  function declearWinner(win: "X" | "O" | "DRAW") {
    setWinner(win);
    let newWinSteak = winSteak
    let newScore = score
    let newHighestWinSteak = highestWinSteak
    if(win == "X") {
      newWinSteak += 1
      if(newWinSteak%3 == 0) {
        newScore += 1
      }
      newScore += 1
      if (newWinSteak > newHighestWinSteak) {
        newHighestWinSteak = newWinSteak
      }
    } else {
      newWinSteak = 0
      if(newScore > 0 && win == "O"){
        newScore -= 1
      }
    }
    setWinSteak(newWinSteak)
    setScore(newScore)
    setHighestWinSteak(newHighestWinSteak)
    onGameEnd(win, newWinSteak, newScore, newHighestWinSteak)
  }

  function onGameEnd(winner: "X" | "O" | "DRAW", newWinSteak: number, newScore: number, newHighestWinSteak: number) {
    startTransition(() => {
      handleUpdateScore(userId, winner, newWinSteak, newScore, newHighestWinSteak)
    });
  }

  return (
    <div className="flex flex-col items-center space-y-6">

      {openBackToMain && (
        < InGameModal
        modalHeader="Are you sure you want to close?"
        modalDetail="if your close while game not over you wil declear as draw and lose your win steak."
          callBackFunction={() => {
            setOpenBackToMain(false)
            backToMain()
          } }
          onCloseCallback={() => setOpenBackToMain(false)}
          />
      )}
      {openRestartDialog && (
        < InGameModal
        modalHeader="Are you sure you want to restart?"
        modalDetail="if your restart while game not over you wil declear as draw and lose your win steak."
          callBackFunction={() => {
            setOpenRestartDialog(false)
            restart()
          } }
          onCloseCallback={() => setOpenRestartDialog(false)}
          />
      )}
      {winner ? (
        <>
          <div className="text-3xl font-bold">
            {winner === "DRAW"
              ? "Draw! 🤝"
              : winner === "X"
              ? "You Win! 🎉"
              : "Bot Wins! 🤖"}
          </div>
          {(winSteak > 0 && winSteak%3 == 0) && (
            <div className="text-3xl font-bold">
              3 Win Steaks you in row get additional point
            </div>
          )}
        </>
      ) : (
        <div className="text-xl font-bold">
          Turn: {turn === "PLAYER" ? "Player (X)" : "Bot (O)"}
        </div>
      )}

      <div className="grid grid-cols-3 gap-3">
          {board.map((row, r) =>
            row.map((cell, c) => (
              <button
                key={c}
                onClick={() => handleClick(r, c)}
                className="
                  h-20 w-20 rounded-xl 
                  bg-board border border-gray-300 shadow 
                  flex items-center justify-center
                  text-4xl font-bold
                  transition-all duration-150
                  hover:scale-105 hover:bg-hover-cell
                "
              >
                <span
                  className={`
                    ${cell === "X" ? "text-x" : "text-o"}
                  `}
                >
                  {cell}
                </span>
              </button>
            ))
          )}
      </div>

    <div className="flex justify-between gap-5">
    <button
      onClick={onBackInGameClick}
      // className="mt-4 bg-black text-white px-6 py-2 rounded hover:bg-red-700"
      className="block 
        border border-[#ff00e6] 
        px-6 py-3 
        rounded-xl 
        text-center 
        bg-[#ff00e6] text-black shadow-[0_0_10px_#ff00e6]
        hover:shadow-[0_0_20px_#ff00e6] hover:bg-[#ff54ff]
        font-semibold 
        hover:text-white
        transition-all duration-300"
    >
      Back to Main Menu
    </button>
      <button
        onClick={onRestartInGameClick}
        className="block 
        border border-[#ff00e6] 
        px-6 py-3 
        rounded-xl 
        text-center 
        text-[#00eaff]
        font-semibold 
        shadow-[0_0_10px_#ff00e6,0_0_20px_#ff00e6]
        hover:shadow-[0_0_20px_#ff00e6,0_0_40px_#ff00e6]
        hover:text-white
        transition-all duration-300"
      >
        Restart
      </button>
    </div>
    </div>
  )
}