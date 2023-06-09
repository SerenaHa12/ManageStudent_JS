function emailIsValid(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function save() {
    let fullname = document.getElementById('fullname').value;
    let email = document.getElementById('email').value;
    let phoneNumber = document.getElementById('phone-number').value;
    let address = document.getElementById('address').value;
    let gender = '';
    let student = {
        fullname: fullname,
        email: email,
        phoneNumber: phoneNumber,
        address: address,
        gender: gender
    };

    if (document.getElementById('male').checked) {
        gender = document.getElementById('male').value;
    } else if (document.getElementById('female').checked) {
        gender = document.getElementById('female').value;
    }

    // Kiểm tra hợp lệ cho tên
    if (fullname.trim().length === 0) {
        document.getElementById("fullname-error").innerHTML = "* Please enter a full name";
    } else if (fullname.trim().length <= 2) {
        document.getElementById('fullname-error').innerHTML = '* Please enter more than 2 characters';
    } else if (fullname.trim().length > 50) {
        document.getElementById('fullname-error').innerHTML = '* Please enter less than 50 characters';
    } else {
        document.getElementById('fullname-error').innerHTML = '';
    }

    // Kiểm tra hợp lệ cho email
    if (email.trim().length === 0) {
        document.getElementById("email-error").innerHTML = "* Please enter your email address";
    } else if (!emailIsValid(email)) {
        document.getElementById('email-error').innerHTML = "* Please enter right email form";
    } else {
        document.getElementById('email-error').innerHTML = '';
    }

    // Kiểm tra hợp lệ cho số điện thoại
    if (phoneNumber.trim().length === 0) {
        document.getElementById("number-error").innerHTML = "* Please enter your phone number";
    } else if (phoneNumber.trim().length > 10) {
        document.getElementById('number-error').innerHTML = '* Please enter less then 10 numbers';
    } else {
        document.getElementById('number-error').innerHTML = '';
    }

    // Kiểm tra hợp lệ cho địa chỉ
    if (address.trim().length === 0) {
        document.getElementById("address-error").innerHTML = "* Please enter your address";
    } else {
        document.getElementById('address-error').innerHTML = '';
    }

    // Kiểm tra hợp lệ cho giới tính
    if (gender.trim().length === 0) {
        document.getElementById('gender-error').innerHTML = '* Please select your gender';
    } else {
        document.getElementById('gender-error').innerHTML = '';
    }

    if (fullname.trim().length > 0 && email.trim().length > 0 && phoneNumber.trim().length > 0 && address.trim().length > 0 && gender.trim().length > 0) {
        let students = localStorage.getItem('students') ? JSON.parse(localStorage.getItem('students')) : [];

        students.push({
            fullname: fullname,
            email: email,
            phoneNumber: phoneNumber,
            address: address,
            gender: gender
        });

        localStorage.setItem('students', JSON.stringify(students));

        renderListStudent();

        let tableContent = `
            <tr>
                <td>#</td>
                <td>Name</td>
                <td>Email</td>
                <td>Phone Number</td>
                <td>Address</td>
                <td>Action</td>
            </tr>
        `;

        students.forEach((student, index) => {
            index++;
            tableContent += `
                <tr>
                    <td>${index}</td>
                    <td>${student.fullname}</td>
                    <td>${student.email}</td>
                    <td>${student.phoneNumber}</td>
                    <td>${student.address}</td>
                    <td>
                        <a href="#">Edit</a> | <a href="#">Delete</a>
                    </td>
                </tr>`;
        });

        document.getElementById('grid-students').innerHTML = tableContent;
    }
}

function renderListStudent() {
    let students = localStorage.getItem('students') ? JSON.parse(localStorage.getItem('students')) : [];
    if (students.length === 0) {
        document.getElementById('list-student').style.display = 'none';
        return false;
    }
    document.getElementById('list-student').style.display = 'block';
    let tableContent = `
        <tr>
            <td>#</td>
            <td>Name</td>
            <td>Email</td>
            <td>Phone Number</td>
            <td>Address</td>
            <td>Gender</td>
            <td>Action</td>
        </tr>
    `;
    students.forEach((student, index) => {
        index++;
        let genderLabel = student.gender === 'male' ? 'Male' : 'Female';
        tableContent += `
            <tr>
                <td>${index}</td>
                <td>${student.fullname}</td>
                <td>${student.email}</td>
                <td>${student.phoneNumber}</td>
                <td>${student.address}</td>
                <td>${genderLabel}</td>
                <td>
                    <a href="#">Edit</a> | <a href="#">Delete</a>
                </td>
            </tr>`;
    });

    document.getElementById('grid-students').innerHTML = tableContent;
}
