export const initialData = {
    boards: [{
        id: "board-1",
        columnOrder: ["column-2", "column-1", "column-3"],
        columns: [{
                id: "column-1",
                boardId: "board-1",
                title: "Column title 1",
                cardOrder: [
                    "card-6",
                    "card-2",
                    "card-3",
                    "card-4",
                    "card-5",
                    "card-1",
                ],
                cards: [{
                        id: "card-1",
                        boardId: "board-1",
                        columnId: "column-1",
                        title: "Title card 1",
                        cover: "https://picsum.photos/200/300",
                    },
                    {
                        id: "card-2",
                        boardId: "board-1",
                        columnId: "column-1",
                        title: "Title card 2",
                        cover: null,
                    },
                    {
                        id: "card-3",
                        boardId: "board-1",
                        columnId: "column-1",
                        title: "Title card 3",
                        cover: null,
                    },
                    {
                        id: "card-4",
                        boardId: "board-1",
                        columnId: "column-1",
                        title: "Title card 4",
                        cover: null,
                    },
                    {
                        id: "card-5",
                        boardId: "board-1",
                        columnId: "column-1",
                        title: "Title card 5",
                        cover: null,
                    },
                    {
                        id: "card-6",
                        boardId: "board-1",
                        columnId: "column-1",
                        title: "Title card 6",
                        cover: null,
                    },
                ],
            },
            {
                id: "column-2",
                boardId: "board-1",
                title: "Column title 2",
                cardOrder: ["card-1", "card-2", "card-3", "card-4"],
                cards: [{
                        id: "card-1",
                        boardId: "board-1",
                        columnId: "column-2",
                        title: "Title card 1",
                        cover: null,
                    },
                    {
                        id: "card-2",
                        boardId: "board-1",
                        columnId: "column-2",
                        title: "Title card 2",
                        cover: "https://picsum.photos/200/300",
                    },
                    {
                        id: "card-3",
                        boardId: "board-1",
                        columnId: "column-2",
                        title: "Title card 3",
                        cover: null,
                    },
                    {
                        id: "card-4",
                        boardId: "board-1",
                        columnId: "column-2",
                        title: "Title card 4",
                        cover: null,
                    },
                ],
            },
            {
                id: "column-3",
                boardId: "board-1",
                title: "Column title 3",
                cardOrder: ["card-1", "card-2", "card-3"],
                cards: [{
                        id: "card-1",
                        boardId: "board-1",
                        columnId: "column-3",
                        title: "Title card 1",
                        cover: null,
                    },
                    {
                        id: "card-2",
                        boardId: "board-1",
                        columnId: "column-3",
                        title: "Title card 2",
                        cover: null,
                    },
                    {
                        id: "card-3",
                        boardId: "board-1",
                        columnId: "column-3",
                        title: "Title card 3",
                        cover: "https://picsum.photos/200/300",
                    },
                ],
            },
        ],
    }, ],
};