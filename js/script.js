let students = JSON.parse(localStorage.getItem('students')) || [];
let editIndex = null;

const form = document.getElementById('studentForm');
const tableBody = document.querySelector('#studentTable tbody');
const searchInput = document.getElementById('searchInput');
const sortIdAsc = document.getElementById('sortIdAsc');
const sortIdDesc = document.getElementById('sortIdDesc');
const sortNameAsc = document.getElementById('sortNameAsc');
const sortNameDesc = document.getElementById('sortNameDesc');
const sortNameKhmerAsc = document.getElementById('sortNameKhmerAsc');
const sortNameKhmerDesc = document.getElementById('sortNameKhmerDesc');
const exportExcel = document.getElementById('exportExcel');

// Save or Update Student
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const student = {
    id: document.getElementById('id').value,
    nameKhmer: document.getElementById('nameKhmer').value,
    nameEnglish: document.getElementById('nameEnglish').value,
    gender: document.getElementById('gender').value,
    dob: document.getElementById('dob').value,
    scores: {
      cac: document.getElementById('cac').value,
      csharp: document.getElementById('csharp').value,
      data: document.getElementById('data').value,
      dsa: document.getElementById('dsa').value,
      gd: document.getElementById('gd').value,
      net: document.getElementById('net').value,
      sp: document.getElementById('sp').value,
      uxui: document.getElementById('uxui').value,
      wd: document.getElementById('wd').value,
    },
  };

  if (editIndex === null) {
    students.push(student);
  } else {
    students[editIndex] = student;
    editIndex = null;
  }

  localStorage.setItem('students', JSON.stringify(students));
  form.reset();
  renderTable();
});

// Render Table
function renderTable(data = students) {
  tableBody.innerHTML = data
    .map(
      (student, index) => `
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
        <td>
          <span onclick="editStudent(${index})">
            <lord-icon
              src="https://cdn.lordicon.com/tobsqthh.json"
              trigger="hover"
              style="width:25px;height:25px">
            </lord-icon>
          </span>
          
          <span onclick="deleteStudent(${index})">
            <lord-icon
              src="https://cdn.lordicon.com/qnhhgmwn.json"
              trigger="morph"
              state="morph-trash-out"
              colors="primary:#646e78,secondary:#c71f16,tertiary:#ebe6ef,quaternary:#3a3347"
              style="width:25px;height:25px">
            </lord-icon>
          </span>
        </td>
      </tr>
    `
    )
    .join('');
}

// Edit Student
function editStudent(index) {
  const student = students[index];
  document.getElementById('id').value = student.id;
  document.getElementById('nameKhmer').value = student.nameKhmer;
  document.getElementById('nameEnglish').value = student.nameEnglish;
  document.getElementById('gender').value = student.gender;
  document.getElementById('dob').value = student.dob;
  document.getElementById('cac').value = student.scores.cac;
  document.getElementById('csharp').value = student.scores.csharp;
  document.getElementById('data').value = student.scores.data;
  document.getElementById('dsa').value = student.scores.dsa;
  document.getElementById('gd').value = student.scores.gd;
  document.getElementById('net').value = student.scores.net;
  document.getElementById('sp').value = student.scores.sp;
  document.getElementById('uxui').value = student.scores.uxui;
  document.getElementById('wd').value = student.scores.wd;
  editIndex = index;
}

// Delete Student
function deleteStudent(index) {
  students.splice(index, 1);
  localStorage.setItem('students', JSON.stringify(students));
  renderTable();
}

// Search Student
searchInput.addEventListener('input', () => {
  const query = searchInput.value.toLowerCase();
  const filtered = students.filter(
    (student) =>
      student.id.toLowerCase().includes(query) ||
      student.nameEnglish.toLowerCase().includes(query) ||
      student.nameKhmer.toLowerCase().includes(query)
  );
  renderTable(filtered);
});

// Sort Students
sortIdAsc.addEventListener('click', () => {
  students.sort((a, b) => a.id - b.id);
  renderTable();
});

sortIdDesc.addEventListener('click', () => {
  students.sort((a, b) => b.id - a.id);
  renderTable();
});

sortNameAsc.addEventListener('click', () => {
  students.sort((a, b) => a.nameEnglish.localeCompare(b.nameEnglish));
  renderTable();
});

sortNameDesc.addEventListener('click', () => {
  students.sort((a, b) => b.nameEnglish.localeCompare(a.nameEnglish));
  renderTable();
});

sortNameKhmerAsc.addEventListener('click', () => {
  students.sort((a, b) => a.nameKhmer.localeCompare(b.nameKhmer, 'km'));
  renderTable();
});

sortNameKhmerDesc.addEventListener('click', () => {
  students.sort((a, b) => b.nameKhmer.localeCompare(a.nameKhmer, 'km'));
  renderTable();
});

// Export to Excel
exportExcel.addEventListener('click', () => {
  const wsData = students.map((student) => [
    student.id,
    student.nameKhmer,
    student.nameEnglish,
    student.gender,
    student.dob,
    ...Object.values(student.scores),
  ]);
  const ws = XLSX.utils.aoa_to_sheet([
    [
      'ID',
      'Name (Khmer)',
      'Name (English)',
      'Gender',
      'Date of Birth',
      'C A/C',
      'C#',
      'DATA',
      'DSA I',
      'GD III',
      'NET I',
      'SP I',
      'UX/UI',
      'WD II',
    ],
    ...wsData,
  ]);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Students');
  XLSX.writeFile(wb, 'students.xlsx');
});

// Initial Render
renderTable();
document.getElementById("showResults").addEventListener("click", () => {
  window.location.href = "../page/result.html";
});
