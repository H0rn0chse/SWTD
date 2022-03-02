import { getMonsterDetails } from "./monsters.js";
import { replaceSvgWithIcon } from "./utils.js";

export class RowRenderer {
    constructor (id, root, addCellHandler, addContentHandler) {
        this.id = id;
        this.rows = [];
        this.root = root;
        this.addCellHandler = addCellHandler;
        this.addContentHandler = addContentHandler;
    }

    setRows (rows) {
        this.rows = rows;
        this.render();
    }

    render () {
        this.root.innerHTML = "";

        this.rows.forEach((row, rowIndex) => {
            const rowElem = document.createElement("div");
            rowElem.classList.add("row");

            row.cells.forEach((cell, cellIndex) => {
                const cellElem = document.createElement("div");
                cellElem.classList.add("cell");

                cell.content.forEach((content) => {
                    const { type, value } = content;
                    let elem;

                    switch (type) {
                        case "monster":
                            elem = document.createElement("img");
                            elem.classList.add("monster");
                            getMonsterDetails(value)
                                .then((details) => {
                                    elem.src = details.img;
                                });
                            cellElem.appendChild(elem);
                            break;
                        //text
                        default:
                            elem = document.createElement("input");
                            elem.setAttribute("type", "text");
                            elem.value = value;
                            cellElem.appendChild(elem);
                    }
                });

                const addContentButton = document.createElement("div");
                addContentButton.classList.add("iconButton");
                addContentButton.setAttribute("title", "Add Content");
                addContentButton.innerHTML = "<svg></svg>";
                replaceSvgWithIcon(addContentButton.children[0], "plus-circle");
                addContentButton.addEventListener("click", this.addContentHandler.bind(null, this.id, rowIndex, cellIndex));
                cellElem.appendChild(addContentButton);

                rowElem.appendChild(cellElem);
            });

            const addCellButton = document.createElement("div");
            addCellButton.classList.add("iconButton");
            addCellButton.setAttribute("title", "Add Cell");
            addCellButton.innerHTML = "<svg></svg>";
            replaceSvgWithIcon(addCellButton.children[0], "plus-circle");
            addCellButton.addEventListener("click", this.addCellHandler.bind(null, this.id, rowIndex));
            rowElem.appendChild(addCellButton);

            this.root.appendChild(rowElem);
        });
    }

    renderTable () {
        this.root.innerHTML = "";

        const table = document.createElement("table");

        this.rows.forEach((row) => {
            const rowElem = document.createElement("tr");

            row.cells.forEach((cell) => {
                const cellElem = document.createElement("td");

                cell.content.forEach((content) => {
                    const { type, value } = content;
                    let elem;

                    switch (type) {
                        case "monster":
                            elem = document.createElement("img");
                            elem.classList.add("monster");
                            getMonsterDetails(value)
                                .then((details) => {
                                    elem.src = details.img;
                                });
                            cellElem.appendChild(elem);
                            break;
                        //text
                        default:
                            elem = document.createElement("span");
                            elem.innerText = value;
                            cellElem.appendChild(elem);
                    }
                });
                rowElem.appendChild(cellElem);
            });
            table.appendChild(rowElem);
        });
        this.root.appendChild(table);
    }
}
