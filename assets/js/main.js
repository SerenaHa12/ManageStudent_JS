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
    if (_.isEmpty(fullname)) {
        document.getElementById("fullname-error").innerHTML = "* Vui lòng nhập họ tên";
    } else if (fullname.trim().length <= 2) {
        document.getElementById('fullname-error').innerHTML = '* Vui lòng nhập hơn 2 ký tự';
    } else if (fullname.trim().length > 50) {
        document.getElementById('fullname-error').innerHTML = '* Vui lòng nhập ít hơn 50 ký tự';
    } else {
        document.getElementById('fullname-error').innerHTML = '';
    }

    // Kiểm tra hợp lệ cho email
    if (_.isEmpty(email)) {
        document.getElementById("email-error").innerHTML = "* Vui lòng nhập email";
    } else if (!emailIsValid(email)) {
        document.getElementById('email-error').innerHTML = "* Vui lòng sử dụng đúng định dạng email";
    } else {
        document.getElementById('email-error').innerHTML = '';
    }

    // Kiểm tra hợp lệ cho số điện thoại
    if (_.isEmpty(phoneNumber)) {
        document.getElementById("number-error").innerHTML = "* Vui lòng nhập số điện thoại";
    } else if (phoneNumber.trim().length > 10) {
        document.getElementById('number-error').innerHTML = '* Vui lòng nhập ít hơn 10 chữ số';
    } else {
        document.getElementById('number-error').innerHTML = '';
    }

    // Kiểm tra hợp lệ cho địa chỉ
    if (_.isEmpty(address)) {
        document.getElementById("address-error").innerHTML = "* Vui lòng nhập địa chỉ";
    } else {
        document.getElementById('address-error').innerHTML = '';
    }

    // Kiểm tra hợp lệ cho giới tính
    if (_.isEmpty(gender)) {
        document.getElementById('gender-error').innerHTML = '* Vui lòng chọn giới tính';
    } else {
        document.getElementById('gender-error').innerHTML = '';
    }

    if (fullname !== '' && email !== '' && phoneNumber !== '' && address !== '' && gender !== '') {
        let students = [];
        students.push({
            fullname: fullname,
            email: email,
            phoneNumber: phoneNumber,
            address: address,
            gender: gender
        });

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
            let genderLabel = student.gender === 1 ? 'Male':'Female';
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
}
