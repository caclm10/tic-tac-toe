type Status = "win" | "draw" | "playing";

export function TicTacToe() {
    let board = new Array(9).fill("");

    let currentPlayer = "X";
    let isActive = true;

    const cells = document.querySelectorAll(`[data-cell-index]`);
    const statusDisplay = document.querySelector(`#status`)!;
    const restartButton = document.querySelector(`#restartButton`)!;

    // Initialize event linsteners
    cells.forEach((cell, index) => {
        cell.addEventListener("click", () => {
            handleClickCell(index);
        });
    });
    restartButton.addEventListener("click", () => {
        board = new Array(9).fill("");
        isActive = true;
        currentPlayer = "X";
        statusDisplay.textContent = `Currently playing: ${currentPlayer}`;

        cells.forEach((cell) => {
            cell.children[0].textContent = "";
            cell.removeAttribute("data-player");
        });
    });

    function hasWinner() {
        const conditions = [
            // Horizontal (Rows)
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],

            // Vertical (Columns)
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],

            // Diagonal
            [0, 4, 8],
            [2, 4, 6],
        ];

        return conditions.some((condition) => {
            const [a, b, c] = condition;

            return board[a] && board[a] === board[b] && board[a] === board[c];
        });
    }

    function isDraw() {
        return board.every((cell) => cell !== "");
    }

    function updateCell(index: number) {
        const cell = cells[index];
        cell.children[0].textContent = currentPlayer;
        cell.setAttribute("data-player", currentPlayer);
    }

    function switchPlayer() {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        statusDisplay.textContent = `Currently playing: ${currentPlayer}`;
    }

    function getStatus(): Status {
        if (hasWinner()) return "win";
        else if (isDraw()) return "draw";

        return "playing";
    }

    function handleAfterClick() {
        const status = getStatus();

        if (status !== "playing") {
            isActive = false;
        }

        switch (status) {
            case "win":
                statusDisplay.textContent = `Winner: ${currentPlayer}`;
                break;
            case "draw":
                statusDisplay.textContent = "Draw";
                break;
            default:
                statusDisplay.textContent = `Currently playing: ${currentPlayer}`;
                switchPlayer();
                break;
        }
    }

    function handleClickCell(index: number) {
        if (!isActive || board[index] !== "") return;

        board[index] = currentPlayer;
        updateCell(index);
        handleAfterClick();
    }
}
