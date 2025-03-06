function addRow() {
    let name = document.getElementById("nameInput").value;
    let position = document.getElementById("positionInput").value;
    let office = document.getElementById("officeInput").value;
    let age = document.getElementById("ageInput").value;
    let date = document.getElementById("dobInput").value;
    let errorMsg = document.getElementById("errorMsg");
    
    if (!name || !position || !office || !age) {
        errorMsg.style.display = "block";
        return;
    }
    errorMsg.style.display = "none";
    
    let table = document.getElementById("dataTable").getElementsByTagName('tbody')[0];
    let row = table.insertRow();
    row.innerHTML = `<td>${name}</td><td>${position}</td><td>${office}</td><td>${age}</td><td>${date}</td>`;
    paginateTable();
}
function calculateAge() {
    let dob = document.getElementById("dobInput").value;
    if (!dob) return;
    let birthDate = new Date(dob);
    let diff = Date.now() - birthDate.getTime();
    let age = new Date(diff).getUTCFullYear() - 1970;
    document.getElementById("ageInput").value = age;
}
function sortTable(n) {
    let table = document.getElementById("dataTable");
    let rows = Array.from(table.rows).slice(1);
    let asc = table.dataset.sortOrder === "asc" ? false : true;
    table.dataset.sortOrder = asc ? "asc" : "desc";
    rows.sort((a, b) => {
        let valA = a.cells[n].innerText.toLowerCase();
        let valB = b.cells[n].innerText.toLowerCase();
        return asc ? valA.localeCompare(valB) : valB.localeCompare(valA);
    });
    rows.forEach(row => table.appendChild(row));
}
function paginateTable() {
    let rows = document.querySelectorAll("#dataTable tbody tr");
    let rowsPerPage = 5;
    let totalPages = Math.ceil(rows.length / rowsPerPage);
    let pagination = document.getElementById("pagination");
    pagination.innerHTML = "";
    for (let i = 1; i <= totalPages; i++) {
        let button = document.createElement("button");
        button.innerText = i;
        button.onclick = () => showPage(i, rows, rowsPerPage);
        pagination.appendChild(button);
    }
    showPage(1, rows, rowsPerPage);
}
function showPage(page, rows, rowsPerPage) {
    let start = (page - 1) * rowsPerPage;
    let end = start + rowsPerPage;
    rows.forEach((row, index) => {
        row.style.display = index >= start && index < end ? "table-row" : "none";
    });
}
document.addEventListener("DOMContentLoaded", paginateTable);

// Load data from local storage on page load
document.addEventListener("DOMContentLoaded", () => {
    loadDataFromLocalStorage();
    paginateTable();
});

// Save data to local storage
function saveDataToLocalStorage() {
    let rows = document.querySelectorAll("#dataTable tbody tr");
    let data = [];
    rows.forEach(row => {
        data.push({
            name: row.cells[0].innerText,
            position: row.cells[1].innerText,
            office: row.cells[2].innerText,
            age: row.cells[3].innerText,
            date: row.cells[4].innerText
        });
    });
    localStorage.setItem("tableData", JSON.stringify(data));
}

// Load data from local storage
function loadDataFromLocalStorage() {
    let data = JSON.parse(localStorage.getItem("tableData")) || [];
    let table = document.getElementById("dataTable").getElementsByTagName('tbody')[0];
    data.forEach(item => {
        let row = table.insertRow();
        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.position}</td>
            <td>${item.office}</td>
            <td>${item.age}</td>
            <td>${item.date}</td>
            <td class="action-buttons">
                <button class="edit-btn" onclick="editRow(this)">Edit</button>
                <button class="delete-btn" onclick="deleteRow(this)">Delete</button>
            </td>
        `;
    });
}

// Add row with local storage
function addRow() {
    let name = document.getElementById("nameInput").value;
    let position = document.getElementById("positionInput").value;
    let office = document.getElementById("officeInput").value;
    let age = document.getElementById("ageInput").value;
    let date = document.getElementById("dobInput").value;
    let errorMsg = document.getElementById("errorMsg");

    if (!name || !position || !office || !age) {
        errorMsg.style.display = "block";
        return;
    }
    errorMsg.style.display = "none";

    let table = document.getElementById("dataTable").getElementsByTagName('tbody')[0];
    let row = table.insertRow();
    row.innerHTML = `
        <td>${name}</td>
        <td>${position}</td>
        <td>${office}</td>
        <td>${age}</td>
        <td>${date}</td>
        <td class="action-buttons">
            <button class="edit-btn" onclick="editRow(this)">Edit</button>
            <button class="delete-btn" onclick="deleteRow(this)">Delete</button>
        </td>
    `;

    saveDataToLocalStorage();
    paginateTable();
}

let editingRow = null; // Store reference to the row being edited

function editRow(button) {
    let row = button.closest("tr");
    let cells = row.cells;

    document.getElementById("nameInput").value = cells[0].innerText;
    document.getElementById("positionInput").value = cells[1].innerText;
    document.getElementById("officeInput").value = cells[2].innerText;
    document.getElementById("ageInput").value = cells[3].innerText;
    document.getElementById("dobInput").value = cells[4].innerText;

    document.querySelector("button[onclick='addRow()']").innerText = "Update Data"; // Change button text
    document.querySelector("button[onclick='addRow()']").setAttribute("onclick", "updateRow()");

    editingRow = row; // Store the row being edited
}

function updateRow() {
    if (!editingRow) return;

    let name = document.getElementById("nameInput").value;
    let position = document.getElementById("positionInput").value;
    let office = document.getElementById("officeInput").value;
    let age = document.getElementById("ageInput").value;
    let date = document.getElementById("dobInput").value;

    if (!name || !position || !office || !age) {
        document.getElementById("errorMsg").style.display = "block";
        return;
    }
    document.getElementById("errorMsg").style.display = "none";

    // Update the row
    editingRow.cells[0].innerText = name;
    editingRow.cells[1].innerText = position;
    editingRow.cells[2].innerText = office;
    editingRow.cells[3].innerText = age;
    editingRow.cells[4].innerText = date;

    // Restore button to "Add Data"
    document.querySelector("button[onclick='updateRow()']").innerText = "Add Data";
    document.querySelector("button[onclick='updateRow()']").setAttribute("onclick", "addRow()");

    editingRow = null; // Clear reference
    saveDataToLocalStorage(); // Save updated data
}

// Delete row
function deleteRow(button) {
    let row = button.closest("tr");
    row.remove();
    saveDataToLocalStorage();
    paginateTable();
}

// Search functionality
function searchTable() {
    let input = document.getElementById("searchInput").value.toLowerCase();
    let rows = document.querySelectorAll("#dataTable tbody tr");
    rows.forEach(row => {
        let name = row.cells[0].innerText.toLowerCase();
        let position = row.cells[1].innerText.toLowerCase();
        let office = row.cells[2].innerText.toLowerCase();
        if (name.includes(input) || position.includes(input) || office.includes(input)) {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }
    });
}

// Update sorting icons
function sortTable(n) {
    let table = document.getElementById("dataTable");
    let rows = Array.from(table.rows).slice(1);
    let asc = table.dataset.sortOrder === "asc" ? false : true;
    table.dataset.sortOrder = asc ? "asc" : "desc";
    rows.sort((a, b) => {
        let valA = a.cells[n].innerText.toLowerCase();
        let valB = b.cells[n].innerText.toLowerCase();
        return asc ? valA.localeCompare(valB) : valB.localeCompare(valA);
    });
    rows.forEach(row => table.appendChild(row));
    updateSortIcons(n, asc);
}

// Update sorting icons
function updateSortIcons(columnIndex, asc) {
    let icons = document.querySelectorAll(".sort-icon");
    icons.forEach((icon, index) => {
        if (index === columnIndex) {
            icon.innerText = asc ? "↑" : "↓";
        } else {
            icon.innerText = "↕";
        }
    });
}