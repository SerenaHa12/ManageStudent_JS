function emailIsValid(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
  
  let editMode = false;
  let editIndex = -1;
  
  function save() {
    let fullname = document.getElementById('fullname').value;
    let email = document.getElementById('email').value;
    let phoneNumber = document.getElementById('phone-number').value;
    let address = document.getElementById('address').value;
    let gender = '';
  
    if (document.getElementById('male').checked) {
      gender = document.getElementById('male').value;
    } else if (document.getElementById('female').checked) {
      gender = document.getElementById('female').value;
    }
  
    // Check valid fullname
    if (fullname.trim().length === 0) {
      document.getElementById('fullname-error').innerHTML = '* Please enter a full name';
      return;
    } else if (fullname.trim().length <= 2) {
      document.getElementById('fullname-error').innerHTML = '* Please enter more than 2 characters';
      return;
    } else if (fullname.trim().length > 50) {
      document.getElementById('fullname-error').innerHTML = '* Please enter less than 50 characters';
      return;
    } else {
      document.getElementById('fullname-error').innerHTML = '';
    }
  
    // Check valid email
    if (email.trim().length === 0) {
      document.getElementById('email-error').innerHTML = '* Please enter your email address';
      return;
    } else if (!emailIsValid(email)) {
      document.getElementById('email-error').innerHTML = '* Please enter a valid email address';
      return;
    } else {
      document.getElementById('email-error').innerHTML = '';
    }
  
    // Check valid phone number
    if (phoneNumber.trim().length === 0) {
      document.getElementById('number-error').innerHTML = '* Please enter your phone number';
      return;
    } else if (phoneNumber.trim().length > 10) {
      document.getElementById('number-error').innerHTML = '* Please enter less than 10 digits';
      return;
    } else {
      document.getElementById('number-error').innerHTML = '';
    }
  
    // Check valid address
    if (address.trim().length === 0) {
      document.getElementById('address-error').innerHTML = '* Please enter your address';
      return;
    } else {
      document.getElementById('address-error').innerHTML = '';
    }
  
    // Check valid gender
    if (gender.trim().length === 0) {
      document.getElementById('gender-error').innerHTML = '* Please select your gender';
      return;
    } else {
      document.getElementById('gender-error').innerHTML = '';
    }
  
    let students = localStorage.getItem('students') ? JSON.parse(localStorage.getItem('students')) : [];
  
    if (editMode) {
      students[editIndex] = {
        fullname: fullname,
        email: email,
        phoneNumber: phoneNumber,
        address: address,
        gender: gender
      };
  
      editMode = false;
      editIndex = -1;
      document.getElementById('save-btn').textContent = 'Save';
    } else {
      students.push({
        fullname: fullname,
        email: email,
        phoneNumber: phoneNumber,
        address: address,
        gender: gender
      });
    }
  
    localStorage.setItem('students', JSON.stringify(students));
    renderListStudent();
    resetForm();
  }
  
  function renderListStudent() {
    let students = localStorage.getItem('students') ? JSON.parse(localStorage.getItem('students')) : [];
  
    if (students.length === 0) {
      document.getElementById('grid-students').innerHTML = '';
      return;
    }
  
    let tableContent = `
      <tr>
        <td>#</td>
        <td>Name</td>
        <td>Email</td>
        <td>Phone Number</td>
        <td>Address</td>
        <td>Gender</td>
        <td>Action</td>
      </tr>`;
  
    students.forEach((student, index) => {
      const studentId = index + 1;
      const genderLabel = student.gender === '1' ? 'Male' : 'Female';
  
      tableContent += `
        <tr>
            <td>${studentId}</td>
            <td>${student.fullname}</td>
            <td>${student.email}</td>
            <td>${student.phoneNumber}</td>
            <td>${student.address}</td>
            <td>${genderLabel}</td>
            <td>
                <a href="#" onclick="editStudent(${studentId})">Edit</a> |
                <a href="#" onclick="deleteStudent(${studentId})">Delete</a>
            </td>
        </tr>`;
    });
  
    document.getElementById('grid-students').innerHTML = tableContent;
  }
  
  function editStudent(id) {
    let students = localStorage.getItem('students') ? JSON.parse(localStorage.getItem('students')) : [];
  
    if (id <= 0 || id > students.length) {
      return;
    }
  
    let student = students[id - 1];
    document.getElementById('fullname').value = student.fullname;
    document.getElementById('email').value = student.email;
    document.getElementById('phone-number').value = student.phoneNumber;
    document.getElementById('address').value = student.address;
    document.getElementById(student.gender).checked = true;
  
    editMode = true;
    editIndex = id - 1;
    document.getElementById('save-btn').textContent = 'Save Edit';
  }
  
  function deleteStudent(id) {
    let students = localStorage.getItem('students') ? JSON.parse(localStorage.getItem('students')) : [];
  
    if (id <= 0 || id > students.length) {
      return;
    }
  
    students.splice(id - 1, 1);
    localStorage.setItem('students', JSON.stringify(students));
    renderListStudent();
  }
  
  function resetForm() {
    document.getElementById('fullname').value = '';
    document.getElementById('email').value = '';
    document.getElementById('phone-number').value = '';
    document.getElementById('address').value = '';
    document.getElementById('male').checked = false;
    document.getElementById('female').checked = false;
    document.getElementById('fullname-error').innerHTML = '';
    document.getElementById('email-error').innerHTML = '';
    document.getElementById('number-error').innerHTML = '';
    document.getElementById('address-error').innerHTML = '';
    document.getElementById('gender-error').innerHTML = '';
  
    editMode = false;
    editIndex = -1;
    document.getElementById('save-btn').textContent = 'Save';
  }
  