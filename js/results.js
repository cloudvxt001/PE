function goBack() {
    window.location.href = "../index.html";
  }

  document.addEventListener("DOMContentLoaded", () => {
    let students = JSON.parse(localStorage.getItem("students")) || [];
    const tableBody = document.querySelector("#resultsTable tbody");

    function renderResultsTable() {
      tableBody.innerHTML = students
        .map(
          (student) => `
        <tr>
          <td>${student.id}</td>
          <td>${student.nameKhmer}</td>
          <td>${student.nameEnglish}</td>
          <td>${student.gender}</td>
          <td>${student.dob}</td>
          <td>${student.scores.cac}</td>
          <td>${student.scores.csharp}</td>
          <td>${student.scores.data}</td>
          <td>${student.scores.dsa}</td>
          <td>${student.scores.gd}</td>
          <td>${student.scores.net}</td>
          <td>${student.scores.sp}</td>
          <td>${student.scores.uxui}</td>
          <td>${student.scores.wd}</td>
        </tr>
      `
        )
        .join("");
    }

    renderResultsTable();
  });