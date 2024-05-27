document.addEventListener('DOMContentLoaded', function() {
    const elems = document.querySelectorAll('.modal');
    M.Modal.init(elems);
});

document.getElementById('admin-login').addEventListener('click', () => {
    const loginModal = M.Modal.getInstance(document.getElementById('login-modal'));
    loginModal.open();
});

document.getElementById('login-button').addEventListener('click', (event) => {
    event.preventDefault();
    const username = document.getElementById('admin-username').value;
    const password = document.getElementById('admin-password').value;
    if (username === 'admin' && password === 'admin') {
        enableEditing();
        const loginModal = M.Modal.getInstance(document.getElementById('login-modal'));
        loginModal.close();
    } else {
        M.toast({html: 'Invalid username or password'});
    }
});

function enableEditing() {
    const editableElements = document.querySelectorAll('.editable');
    editableElements.forEach(el => {
        el.contentEditable = true;
    });
    document.getElementById('admin-panel').style.display = 'block';
}

const teacherForm = document.getElementById('teacher-form');
teacherForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = document.getElementById('teacher-name').value;
    const designation = document.getElementById('teacher-designation').value;
    const subject = document.getElementById('teacher-subject').value;

    const teacher = { name, designation, subject };
    saveTeacher(teacher);
    addTeacherToDropdown(teacher);
    teacherForm.reset();
});

function saveTeacher(teacher) {
    // Here we should save the teacher to a file or database in the repo.
    fetch('/teachers.json')
        .then(response => response.json())
        .then(teachers => {
            teachers.push(teacher);
            return fetch('/teachers.json', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(teachers),
            });
        })
        .then(() => {
            M.toast({html: 'Teacher added successfully'});
        })
        .catch(error => {
            console.error('Error saving teacher:', error);
            M.toast({html: 'Error saving teacher'});
        });
}

function addTeacherToDropdown(teacher) {
    const rows = document.querySelectorAll('#routine-table tbody tr');
    rows.forEach(row => {
        const cell = row.querySelector('.editable:nth-child(3)');
        const option = document.createElement('option');
        option.textContent = teacher.name;
        option.value = JSON.stringify(teacher);
        cell.appendChild(option);
    });
}
