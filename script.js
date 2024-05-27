document.getElementById('admin-login').addEventListener('click', () => {
    const adminPanel = document.getElementById('admin-panel');
    adminPanel.style.display = adminPanel.style.display === 'none' ? 'block' : 'none';
});

const teacherForm = document.getElementById('teacher-form');
teacherForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = document.getElementById('teacher-name').value;
    const designation = document.getElementById('teacher-designation').value;
    const subject = document.getElementById('teacher-subject').value;

    const teacher = { name, designation, subject };
    addTeacherToDropdown(teacher);
    teacherForm.reset();
});

function addTeacherToDropdown(teacher) {
    const rows = document.querySelectorAll('#routine-table tr:not(:first-child)');
    rows.forEach(row => {
        const cell = row.querySelector('.editable:nth-child(3)');
        const option = document.createElement('option');
        option.textContent = teacher.name;
        option.value = JSON.stringify(teacher);
        cell.appendChild(option);
    });
}
