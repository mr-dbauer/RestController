$(document).ready(function () {

    showUserInfo();

    showAdminInfo();

    getAllUsers();

    $('#addButtonInAdminPage').click(function () {
        addNewUser();
    })

    $('#deleteButtonInModalForm').click(function () {
        deleteUserWithModalForm();
    })

    $('#updateButtonInModalForm').click(function () {
        updateUserWithModalForm();
    });


});

function showUserInfo() {
    fetch("rest/userInfo").then(
        function (response) {
            response.json().then(
                function (data) {

                    const tableBody = $('#UserInfoInPage tbody');
                    tableBody.empty();

                    const userEmailAddress = $(`#UserEmailInPage label`);
                    userEmailAddress.empty();

                    const userRoles = $(`#UserRolesInPage span`);
                    userRoles.empty();

                    $(data).each(
                        function () {

                            let stringRoles = "";

                            $(data.roles).each(function (i, role) {
                                stringRoles += role.roleName + " ";
                            });
                            tableBody.append(`
                    <tr>
                    <td class="font-weight-normal">${data.id}</td>
                    <td class="font-weight-normal">${data.firstName}</td>
                    <td class="font-weight-normal">${data.lastName}</td>
                    <td class="font-weight-normal">${data.emailAddress}</td>
                    <td class="font-weight-normal">${data.age}</td>
                    <td class="font-weight-normal">${stringRoles}</td>
                    </tr>`);
                            userEmailAddress.append(`${data.emailAddress}`);
                            userRoles.append(`${stringRoles}`);
                        })
                });
        });
}

function showAdminInfo() {
    fetch('rest/adminInfo').then(
        function (res) {
            res.json().then(
                function (data) {

                    const tableBody = $('#AdminInfoInPage tbody');
                    tableBody.empty();
                    const emailAddressAdmin = $(`#AdminEmailInPage label`);
                    emailAddressAdmin.empty();
                    const adminRoles = $(`#AdminRolesInPage span`);
                    adminRoles.empty();

                    $(data).each(
                        function () {

                            let stringRoles = "";

                            $(data.roles).each(function (i, role) {
                                stringRoles += role.roleName + " ";
                            });
                            tableBody.append(`
                    <tr>
                    <td class="font-weight-normal">${data.id}</td>
                    <td class="font-weight-normal">${data.firstName}</td>
                    <td class="font-weight-normal">${data.lastName}</td>
                    <td class="font-weight-normal">${data.emailAddress}</td>
                    <td class="font-weight-normal">${data.age}</td>
                    <td class="font-weight-normal">${stringRoles}</td>
                    </tr>`);
                            emailAddressAdmin.append(`${data.emailAddress}`);
                            adminRoles.append(`${stringRoles}`);
                        })
                }
            )
        }
    )

}

function getAllUsers() {
    fetch('rest/users').then(
        function (res) {
            res.json().then(
                function (data) {
                    const tableBody = $('#tableAllUsers tbody');
                    tableBody.empty();

                    $(data).each(function (i, user) {
                        let stringRoles = "";
                        $(user.roles).each(function (i, role) {
                            stringRoles += role.roleName + " ";
                        });
                        tableBody.append(`<tr>
                            <td class="font-weight-normal">${user.id}</td> 
                            <td class="font-weight-normal">${user.firstName}</td> 
                            <td class="font-weight-normal">${user.lastName}</td> 
                            <td class="font-weight-normal">${user.emailAddress}</td> 
                            <td class="font-weight-normal">${user.age}</td> 
                            <td class="font-weight-normal">${stringRoles}</td> 
                            <td><button id="updateButtonInAdminPage" class="btn btn-info" role="button" data-toggle="modal" 
                            data-target="#editModal" onclick = 'fillingModalFormEdit(${user.id})'>Edit</button></td> 
                            <td><button id="deleteButtonInAdminPage" class="btn btn-danger" role="button" data-toggle="modal" 
                            data-target="#deleteModal" onclick = 'fillingModalFormDelete(${user.id})'>Delete</button></td> 
                        </tr>`)
                    });
                }
            );
        }
    )
}

function fillingModalFormDelete(id) {
    const url = "/rest/getUserById/" + id;
    fetch(url).then(function (response) {
        response.json().then(function (data) {
            $('#inputModalIDDelete').val(data.id);
            $('#inputModalFirstNameDelete').val(data.firstName);
            $('#inputModalLastNameDelete').val(data.lastName);
            $('#inputModalPasswordDelete').val(data.password);
            $('#inputModalEmailAddressDelete').val(data.emailAddress);
            $('#inputModalAgeDelete').val(data.age);
        });
    });
}

function fillingModalFormEdit(id) {
    const url = "/rest/getUserById/" + id;
    fetch(url).then(function (response) {
        response.json().then(function (data) {
            $('#inputModal')[0].reset();
            $('#inputModalID').val(data.id);
            $('#inputModalFirstName').val(data.firstName);
            $('#inputModalLastName').val(data.lastName);
            $('#inputModalPassword').val(data.password);
            $('#inputModalEmailAddress').val(data.emailAddress);
            $('#inputModalAge').val(data.age);


            for (i in data.roles) {
                $("#inputModalRole [value =" + data.roles[i].roleName + "]").attr("selected","selected");
            }
        });
    });
}

function addNewUser() {
    var selectedRoles = [];
    $("#inputRole :selected").each(function () {
        var currentRoleObject = {'roleName': $(this).val()}
        selectedRoles.push(currentRoleObject); //Заполняем массив объектами выбранных ролей
    });

    const addData = {
        password: $('#inputPassword').val(),
        firstName: $('#inputFirstName').val(),
        lastName: $('#inputLastName').val(),
        emailAddress: $('#inputEmailAddress').val(),
        age: $('#inputAge').val(),
        roles: selectedRoles
    };

    const url = "/rest/addUser/";
    fetch(url, {
        method: 'POST',
        body: JSON.stringify(addData),
        headers: {
            'content-type': 'application/json'
        }
    }).then(function () {
        document.location.reload();
    })
}

function deleteUserWithModalForm() {
    const url = "/rest/deleteUser/" + $('#inputModalIDDelete').val();

    function addData() {
        $('#inputModalIDDelete').val();
    }

    fetch(url, {
        method: 'DELETE',
        body: JSON.stringify(addData),
        headers: {
            'content-type': 'application/json'
        }
    }).then(function () {
        document.location.reload();
    })
}

function updateUserWithModalForm() {
    var selectedRoles = [];
    $("#InputModalRole option").each(
        function () {
            if($(this).prop(selected) === "selected") {
                var curr = {'roleName': $(this).val()}
                $('#inputModal')[0].reset();
                console.log(curr);
                selectedRoles.push(curr);
            }

        }
    )

    const addData = {
        id: $('#inputModalID').val(),
        password: $('#inputModalPassword').val(),
        firstName: $('#inputModalFirstName').val(),
        lastName: $('#inputModalLastName').val(),
        emailAddress: $('#inputModalEmailAddress').val(),
        age: $('#inputModalAge').val(),
        roles: selectedRoles
    }


    const url = "/rest/updateUser/";
    fetch(url, {
        method: 'PUT',
        body: JSON.stringify(addData),
        // success: function () {
        //     $('#InputModal')[0].reset();
        // },
        headers: {
            'content-type': 'application/json'
        }

    }).then(function () {

        document.location.reload();

    })
}
