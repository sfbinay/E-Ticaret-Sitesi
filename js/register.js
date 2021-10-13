$(document).ready(function () {

    if(sessionStorage.getItem("userId") !=null || localStorage.getItem("userId")){
        window.location.href = "index.html"
    }

    $("#registerForm").submit(function (e) { 
        e.preventDefault();

        if($("#password").val() == $("#passwordControl").val()){
            
            const name = $("#name").val();
            const surname = $("#surname").val();
            const phone = $("#phone").val();
            const email = $("#email").val();
            const password = $("#password").val();
    
            const data = {
                ref:"2490c8c443178a9a4d10b6a2cd541e19",
                userName:name,
                userSurname:surname,
                userPhone:phone,
                userMail:email,
                userPass:password
            }
    
            const url ="https://www.jsonbulut.com/json/userRegister.php"
    
            $.ajax({
                type: "get",
                url: url,
                data: data,
                dataType: "json",
                success: function (res) {
                    const status = res.user[0].durum;
                    const message = res.user[0].mesaj;
                    if(status ==true){
                        // redirect
                        alert("Kayıt Başarılı!")
                        window.location.href = "login.html";
                    }
                    else{
                        alert(message);
                    }
                }
            });
        }
        else{
            alert("Şifreler eşleşmiyor!")
        }
    });
});