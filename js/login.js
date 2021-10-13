$(document).ready(function () {

    if (sessionStorage.getItem("userId") != null || localStorage.getItem("userId")) {
        window.location.href = "index.html"
    }

    $("#loginForm").submit(function (e) {
        e.preventDefault();

        const email = $("#email").val();
        const password = $("#password").val();

        const data = {
            ref: "2490c8c443178a9a4d10b6a2cd541e19",
            userEmail: email,
            userPass: password,
            face: "no"
        }

        const url = "https://www.jsonbulut.com/json/userLogin.php"

        $.ajax({
            type: "get",
            url: url,
            data: data,
            dataType: "json",
            success: function (res) {
                const status = res.user[0].durum;
                const message = res.user[0].mesaj;
                if (status) {
                    const item = res.user[0];

                    // remember me control
                    if ($("#remember").is(':checked')) {
                        item.bilgiler["userPass"] = data.userPass;
                        localStorage.setItem("userId", JSON.stringify(item.bilgiler))
                    }
                    // session
                    item.bilgiler["userPass"] = data.userPass;
                    sessionStorage.setItem("userId", JSON.stringify(item.bilgiler));

                    // redirect
                    alert(message)
                    if (sessionStorage.getItem("status")) {
                        sessionStorage.removeItem("status");
                        localStorage.removeItem("sepetim");
                        window.location.href = "detail.html"
                    }
                    else {
                        localStorage.removeItem("sepetim");
                        window.location.href = "index.html";
                    }

                }
                else {
                    alert(message);
                }
            }
        });

    });

});