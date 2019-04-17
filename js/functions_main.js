function toggler(divId) {
    $("#" + divId).toggle();
}

function validateEmail(email) {
    var pattern  = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return pattern .test(email);
}

function dateIsValid( userValue )
{
    var regexp = /^\d{1,2}\.\d{1,2}\.\d{1,4}$/;
    if ( regexp.test( userValue ) )
    {
        var values = userValue.split( '.' );
        var d = values[0]-0;
        var m = values[1]-0;
        var y = values[2]-0;
        var daysInMonth = 0;

        if ( m < 1 || m > 12 || y < 1 || y > 9999 ) return false;
        else
        {
            if ( m == 2 )
            {
                daysInMonth = ( ( y % 4 ) == 0 ) ? 29 : 28;
            }
            else if ( m == 4 || m == 6 || m == 9 || m == 11 )
            {
                daysInMonth = 30;
            }
            else daysInMonth = 31;
            return ( d <= daysInMonth );
        }
    }
    else return false;
}

$(document).ready(function () {
    $("#done").click(function () {
        $('#messageShow').hide ();
        var username = $("#username").val();
        var name = $("#name").val();
        var email = $("#e-mail").val();
        var dataBirth = $("#data-birth").val();
        var password = $("#password").val();
        var fail = "";
        if (username.length < 9) fail = "Логін має мати не менше 9 символів.";
        else if (name < 1) fail = "Поле ім'я не заповнено.";
        else if (!validateEmail(email)) {
            fail = "e-mail " + email + " не підтверджений.";
        }
        else if (!dateIsValid(dataBirth)) {
            fail ="Дата народження вказана не правильно.";
        }
        else if (fail != "") {
            $('#messageShow').html (fail + "<div class='dws-input'><br></div>");
            $('#messageShow').show ();
            return false;
        }

        $.ajax({
            url: 'ajax/feedback.php',
            type: 'POST',
            cache: false,
            data: { 'username':username, 'name':name, 'email':email,'password':password},
            dataType: 'html',
            success: function (data) {
                if(data)  {
                    $('#messageShow').html (data + "<div class='dws-input'><br></div>");
                    $('#messageShow').show ();
                }
            }

        });

    });
});

