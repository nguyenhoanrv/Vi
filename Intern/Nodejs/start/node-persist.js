var storage = require('node-persist');
storage.initSync({
    dir: "students"
});

function getAllStudents() {
    var students = storage.getItemSync('students');
    if (typeof students === "undefined")
        return [];
    else
        return students;
}

function getStudents(studentId) {
    var students = getAllStudents();
    var matchedStudent = null;
    for (var i = 0; i < students.length; i++) {
        if (students[i].id === studentId) {
            matchedStudent = students[i];
            break;
        }
    }
    return matchedStudent;
}

function addNewStudent(studentId, fullName) {
    var students = getAllStudents();
    students.push({
        id: studentId,
        name: fullName
    })
    storage.setItemSync('students', students);
}

function removeStudent(studentId) {
    var students = getAllStudents();
    for (var i = 0; i < students.length; i++) {
        if (students[i].id === studentId) {
            students.splice(i, 1);
        }
    }
    storage.setItemSync('students', students);
}

function updateStudent(studentId, fullName) {
    var students = getAllStudents();
    for (var i = 0; i < students.length; i++) {
        if (students[i].id === studentId) {
            students[i].name = fullName;
        }
    }
    storage.setItemSync('students', students);
}

function showStudents() {
    var students = getAllStudents();
    for (var i = 0; i < students.length; i++) {
        console.log("Student :" + students[i].name + "(" + students[i].id + ")");
    }
}

addNewStudent(1, 'Cuong');
addNewStudent(2, 'Kinh');
addNewStudent(3, 'Chinh');
addNewStudent(4, 'Quyen');
showStudents();

console.log('Delete');

removeStudent(1);
removeStudent(5);
showStudents();

console.log('Update');

updateStudent(2, 'Kien');
showStudents();

storage.clearSync();