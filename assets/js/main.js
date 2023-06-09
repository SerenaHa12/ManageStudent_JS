function emailIsValid(email){
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
function save(){
    let fullname = document.getElementById('fullname').value;
    let email = document.getElementById('email').value;
    let phoneNumber = document.getElementById('phone-number').value;
    let address = document.getElementById('address').value;
    let gender = '';
    if (document.getElementById('male').checked) {
        gender = document.getElementById('male').value;
    } else if(document.getElementById('female').checked) {
        gender = document.getElementById('female').value;
    }

    // console.log(fullname, email, phoneNumber, address, gender);
    // name validated
    if (_.isEmpty(fullname)){
        fullname = '';
        document.getElementById("fullname-error").innerHTML = "* Please enter a fullname";
    } else if(fullname.trim().length <= 2) {
        fullname = '';
        document.getElementById('fullname-error').innerHTML = '* Please enter more than 2 characters';
    } else if(fullname.trim().length > 50) {
        fullname = '';
        document.getElementById('fullname-error').innerHTML = '* Please enter less than 50 characters';
    }
    else{
        fullname = '';
        document.getElementById('fullname-error').innerHTML ='';
    } 

    // email validated
    if (_.isEmpty(email)){
        email = '';
        document.getElementById("email-error").innerHTML = "* Please enter a email";
    } else if(!emailIsValid(email)){
        email = '';
        document.getElementById('email-error').innerHTML = "* Please using right valid email form";
    } else{
        email = '';
        document.getElementById('email-error').innerHTML ='';
    }

    // phone validated
    if (_.isEmpty(phoneNumber)){
        phoneNumber = '';
        document.getElementById("number-error").innerHTML = "* Please enter a phone number";
    } else if(fullname.trim().length > 10) {
        phoneNumber = '';
        document.getElementById('number-error').innerHTML = '* Please enter less than 10 numbers';
    } else{
        phoneNumber = '';
        document.getElementById('number-error').innerHTML ='';
    }

    // address validated
    if (_.isEmpty(address)){
        address = '';
        document.getElementById("address-error").innerHTML = "* Please enter a address";
    } else{
        address = '';
        document.getElementById('address-error').innerHTML ='';
    }

    // gender validated
    if (_.isEmpty(gender)){
        gender = '';
        document.getElementById('gender-error').innerHTML = '* Please select your gender';
    } else{
        gender = '';
        document.getElementById('gender-error').innerHTML ='';
    }

    if (fullname && email && phoneNumber && address && gender) {
        // console.log(fullname, email, phoneNumber, address, gender);
        console.log(fullname, email, phoneNumber, address, gender);
        // let student = {
        //     fullname: fullname,
        //     email: email,
        //     phoneNumber: phoneNumber,
        //     address: address,
        //     gender: gender
        // };
        // console.log(student);
    }
}