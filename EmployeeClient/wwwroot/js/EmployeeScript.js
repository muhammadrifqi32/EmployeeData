$(document).ready(function () {
    $("#employeeTable").DataTable({
        "paging": true,
        "searching": true,
        "responsive": false,
        "scrollX": true,
        "lengthChange": true,
        "ordering": true,
        "autoWidth": true,
        "info": true,
        "processing": true,
        "buttons": ["copy", "csv", "excel", "pdf", "print", "colvis"],
        "ajax": {
            url: "https://localhost:7146/api/Employees",
            type: "GET",
            dataType: "json",
            dataSrc: "data"
            //success: function(res) {
            //    console.log(res)
            //}
        },
        columnDefs: [{
            "defaultContent": "-",
            "targets": "_all"
        }],
        "columns": [
            {
                render: function (data, type, row, meta) {
                    return meta.row + meta.settings._iDisplayStart + 1;
                }
            },
            { "data": "employeeId" },
            { "data": "firstname" },
            { "data": "lastname" },
            { "data": "email" },
            { "data": "phoneNumber" },
            {
                "data": "gender",
                render: function (data, type, row) {
                    return data == 0 ? "Male" : "Female";
                }
            },
            { "data": "salary" },
            {
                "data": "joinDate",
                render: function (data, type, row) {
                    return moment(data).locale('id').format('Do MMMM YYYY')
                }
            },
            {
                "render": function (data, type, row) {
                    return '<button type="button" class="btn btn-warning" data-toggle="tooltip" data-placement="top" title="Edit Data" onclick="editEmployee(\'' + row.employeeId + '\')"><i class="fas fa-pencil-alt"></i></button>' + ' ' +
                        '<button type="button" class="btn btn-danger" data-toggle="tooltip" data-placement="top" title="Delete Data" onclick="deleteEmployee(\'' + row.employeeId + '\')"><i class="fas fa-trash"></i></button>';
                }
            }
        ]
    }).buttons().container().appendTo('#example1_wrapper .col-md-6:eq(0)');

    //$.validator.setDefaults({
    //    submitHandler: function () {
    //        $('#quickForm').submit(function (e) {
    //            e.preventDefault();
    //        })
    //    }
    //});

    $('#quickForm').validate({
        rules: {
            empId: {
                required: true,
            },
            firstName: {
                required: true,
            },
            lastName: {
                required: true,
            },
            email: {
                required: true,
                email: true,
            },
            phoneNumber: {
                required: true,
            },
            gender: {
                required: true,
            },
            salary: {
                required: true,
            }
        },
        messages: {
            empId: {
                required: "Please enter an Employee ID",
            },
            firstName: {
                required: "Please enter a First Name",
            },
            lastName: {
                required: "Please enter a Last Name",
            },
            email: {
                required: "Please enter a email address",
                email: "Please enter a valid email address"
            },

            phoneNumber: {
                required: "Please enter a Phone Number",
            },
            gender: {
                required: "Please enter a Gender",
            },
            salary: {
                required: "Please enter a salary",
            }
        },
        errorElement: 'span',
        errorPlacement: function (error, element) {
            error.addClass('invalid-feedback');
            element.closest('.form-group').append(error);
        },
        highlight: function (element, errorClass, validClass) {
            $(element).addClass('is-invalid');
        },
        unhighlight: function (element, errorClass, validClass) {
            $(element).removeClass('is-invalid');
        }
    });
});

//$('[data-tooltip="tooltip"]').tooltip();

$(document).ajaxComplete(function () {
    $('[data-toggle="tooltip"]').tooltip({
        trigger: 'hover',
    });
});

function Save() {
    if ($('#quickForm').valid()) {
        var employee = new Object();
        employee.employeeId = $('#inputId').val();
        employee.firstname = $('#inputFirstName').val();
        employee.lastname = $('#inputLastName').val();
        employee.email = $('#inputEmail').val();
        employee.phoneNumber = $('#inputPhoneNumber').val();
        employee.gender = parseInt($('#inputGender').val());
        employee.salary = $('#inputSalary').val();
        $.ajax({
            type: 'POST',
            url: "https://localhost:7146/api/Employees",
            data: JSON.stringify(employee),
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                $("#modal-default").modal('hide');
                Swal.fire({
                    title: "Succesfull",
                    text: result.message,
                    icon: "success"
                });
                $("#employeeTable").DataTable().ajax.reload();
            }
        })
    }
}

function clearScreen() {
    $('#quickForm').find('.is-invalid').removeClass('is-invalid');
    $('#inputId').val('');
    $('#inputFirstName').val('');
    $('#inputLastName').val('');
    $('#inputEmail').val('');
    $('#inputPhoneNumber').val('');
    $('#inputGender').val('');
    $('#inputSalary').val('');
    $('#Save').show();
    $('#Edit').hide();
}

//function Save() {
//    var employee = new Object();
//    employee.employeeId = $('#inputId').val();
//    employee.firstname = $('#inputFirstName').val();
//    employee.lastname = $('#inputLastName').val();
//    employee.email = $('#inputEmail').val();
//    employee.phoneNumber = $('#inputPhoneNumber').val();
//    employee.gender = parseInt($('#inputGender').val());
//    employee.salary = $('#inputSalary').val();
//    $.ajax({
//        type: 'POST',
//        url: "https://localhost:7146/api/Employees",
//        data: JSON.stringify(employee),
//        contentType: "application/json; charset=utf-8",
//        success: function (result) {
//            $("#employeeTable").DataTable().ajax.reload();
//            $("#modal-default").modal('hide');
//            Swal.fire({
//                title: "Succesfull",
//                text: result.message,
//                icon: "success"
//            });
//        }
//    })
//}

function editEmployee(empId) {
    //debugger;
    $.ajax({
        type: 'GET',
        url: "https://localhost:7146/api/Employees/" + empId,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            //console.log(result);
            var obj = result.data;

            $('#quickForm').find('.is-invalid').removeClass('is-invalid');

            $('#inputId').val(obj.employeeId).prop('disabled', true);
            $('#inputFirstName').val(obj.firstname);
            $('#inputLastName').val(obj.lastname);
            $('#inputEmail').val(obj.email);
            $('#inputPhoneNumber').val(obj.phoneNumber);
            $('#inputGender').val(obj.gender);
            $('#inputSalary').val(obj.salary);
            $("#modal-default").modal('show');
            $('#Edit').show();
            $('#Save').hide();
        }
    })
}

function Edit() {
    if ($('#quickForm').valid()) {
        var employee = new Object();
        employee.employeeId = $('#inputId').val();
        employee.firstname = $('#inputFirstName').val();
        employee.lastname = $('#inputLastName').val();
        employee.email = $('#inputEmail').val();
        employee.phoneNumber = $('#inputPhoneNumber').val();
        employee.gender = parseInt($('#inputGender').val());
        employee.salary = $('#inputSalary').val();
        $.ajax({
            type: 'PATCH',
            url: "https://localhost:7146/api/Employees",
            data: JSON.stringify(employee),
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                $("#modal-default").modal('hide');
                Swal.fire({
                    title: "Succesfull",
                    text: result.message,
                    icon: "success"
                });
                $("#employeeTable").DataTable().ajax.reload();
            }
        })
    }
}

function deleteEmployee(empId) {
    if (confirm("Are you sure want to delete the data?")) {
        $.ajax({
            type: 'PATCH',
            url: "https://localhost:7146/api/Employees/" + empId,
            dataType: "json",
            success: function (result) {
                debugger;
                alert(result.message);
                $("#employeeTable").DataTable().ajax.reload();
            }
        });
    }
}