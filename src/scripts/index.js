import { getAllMonsterIds } from "./monsters.js";
import { RowRenderer } from "./RowRenderer.js";

const { feather } = globalThis;

feather.replace();
document.addEventListener("keydown", (evt) => {
    if (evt.key === "Escape") {
        var mods = document.querySelectorAll(".modal > [type=checkbox]");
        [].forEach.call(mods, (mod) => { mod.checked = false; });
    }
});

const fourStarRowRoot = document.querySelector("#fourstar .rows");
const fiveStarRowRoot = document.querySelector("#fivestar .rows");
const addContentModal = document.querySelector("#addContent_modal");
const addContentContent = document.querySelector("#addContent_content");
const addContentBtn = document.querySelector("#addContent_add");

const data = {
    fourStar: {
        manager: new RowRenderer("fourStar", fourStarRowRoot, addCell, addContentModalHandler),
        rows: []
    },
    fiveStar: {
        manager: new RowRenderer("fiveStar", fiveStarRowRoot, addCell, addContentModalHandler),
        rows: []
    }
};

const dataPromise = fetch("scripts/mockData.json")
    .then(response => response.json())
    .then((mockData) => {
        Object.keys(data).forEach((id) => {
            data[id].rows = mockData[id].rows;

            if (document.querySelector("#editMode").checked) {
                data[id].manager.render();
            } else {
                data[id].manager.renderTable();
            }
        });
    });

data.fourStar.manager.setData(data.fourStar);
data.fiveStar.manager.setData(data.fiveStar);


function addRow (id) {
    data[id].rows.push({
        cells: []
    });
    data[id].manager.render();
}

function addCell (id, row) {
    data[id].rows[row].cells.push({ content: [] });
    data[id].manager.render();
}

function addContent (id, row, cell, type, value) {
    data[id].rows[row].cells[cell].content.push({
        type,
        value
    });
    data[id].manager.render();
}

let addContent_data = {};
function addContentModalHandler (id, row, cell) {
    addContent_data = {
        id,
        row,
        cell
    };
    addContentModal.checked = true;
}

var btnRowFourStar = document.querySelector("#btnRowFourStar");
btnRowFourStar.addEventListener("click", addRow.bind(null, "fourStar"));
var btnRowFiveStar = document.querySelector("#btnRowFiveStar");
btnRowFiveStar.addEventListener("click", addRow.bind(null, "fiveStar"));


// =================== edit mode ====================

const editModeCbx = document.querySelector("#editMode");
editModeCbx.addEventListener("change", (evt) => {
    const editModeActive = editModeCbx.checked;
    Object.keys(data).forEach((id) => {
        if (editModeActive) {
            data[id].manager.render();
        } else {
            data[id].manager.renderTable();
        }
    });
    document.querySelector("#app").classList.toggle("editMode");
});

// =================== modal ====================

getAllMonsterIds().then((names) => {
    const select = addContentContent.querySelector(".content.monster .input");
    names.forEach((name) => {
        const option = document.createElement("option");
        option.text = name;
        option.value = name;
        select.appendChild(option);
    });
});

addContentBtn.addEventListener("click", (evt) => {
    const {id, row, cell} = addContent_data;
    const type = addContentContent.querySelector("#contentSelect").value;
    const value = addContentContent.querySelector(`.content.${type} .input`).value;

    addContent(id, row, cell, type, value);
    addContentModal.checked = false;
});

const contentSelect = document.querySelector("#contentSelect");
contentSelect.addEventListener("change", (evt) => {
    const type = contentSelect.value;
    Array.from(addContentContent.querySelectorAll(".content")).forEach((node) => {
        node.classList.add("hidden");
    });

    addContentContent.querySelector(`.content.${type}`).classList.remove("hidden");
});

