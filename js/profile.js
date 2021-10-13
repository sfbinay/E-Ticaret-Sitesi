$(document).ready(function () {

    if (localStorage.getItem("userId") != null) {
        const user = JSON.parse(localStorage.getItem("userId"))
        sessionStorage.setItem("userId", JSON.stringify(user))
        setProfile(user)
    }
    else {
        const user = JSON.parse(sessionStorage.getItem("userId"))
        setProfile(user)
    }


    function setProfile(user) {
        $(".card-body").empty();
        let html = `<p class="card-text text-start"> <b>Ad:</b> ${user.userName}</p>
                    <p class="card-text text-start"> <b>Soyad:</b> ${user.userSurname}</p>
                    <p class="card-text text-start"> <b>E-Mail:</b> ${user.userEmail}</p>
                    <p class="card-text text-start"> <b>Telefon:</b> ${user.userPhone}</p>`
        $(".card-body").append(html)
    }


    /* - - - B İ L G İ L E R İ   D E Ğ İ Ş T İ R M E - - - */
    $("#changeInfo").click(function (e) {
        $(".card-header").text("Bilgilerimi Değiştir");
        $(".card-footer").remove();
        $(".card-body").empty();

        const user = JSON.parse(sessionStorage.getItem("userId"));

        const form = `<form id="changeInfoForm">
                        <div class="mb-3 d-flex">
                            <label for="name" class="form-label w-50">Ad</label>
                            <input id="name" value="${user.userName}" type="text" class="form-control" required>
                        </div>
                        <div class="mb-3 d-flex">
                            <label for="surname" class="form-label w-50">Soyad</label>
                            <input id="surname" value="${user.userSurname}" type="text" class="form-control" required>
                        </div>
                        <div class="mb-3 d-flex">
                            <label for="phone" class="form-label w-50">Telefon</label>
                            <input id="phone" value="${user.userPhone}" type="text" class="form-control" required>
                        </div>
                        <div class="mb-3 d-flex">
                            <label for="email" class="form-label w-50">E-Mail</label>
                            <input id="email" value="${user.userEmail}" type="text" class="form-control" required>
                        </div>
                        <div>
                        <button type="submit" class="btn btn-success"> Kaydet </button>
                        <a href="profile.html" class="btn btn-primary"> Geri Dön </a>
                        </div>
                     </form>`
        $(".card-body").append(form);

        $("#changeInfoForm").submit(function (e) {
            e.preventDefault()
            const url = "https://www.jsonbulut.com/json/userSettings.php";
            const user = JSON.parse(sessionStorage.getItem("userId"))

            const newName = $("#name").val()
            const newSurame = $("#surname").val()
            const newPhone = $("#phone").val()
            const newEmail = $("#email").val()

            const data = {
                ref: "2490c8c443178a9a4d10b6a2cd541e19",
                userName: newName,
                userSurname: newSurame,
                userMail: newEmail,
                userPhone: newPhone,
                userPass: user.userPass,
                userId: user.userId
            }

            $.ajax({
                type: "get",
                url: url,
                data: data,
                dataType: "json",
                success: function (response) {

                    if (localStorage.getItem("userId") != null) {
                        const user = JSON.parse(localStorage.getItem("userId"));
                        user.userName = data.userName;
                        user.userSurname = data.userSurname;
                        user.userEmail = data.userMail;
                        user.userPhone = data.userPhone;
                        localStorage.setItem("userId", JSON.stringify(user));
                        sessionStorage.setItem("userId", JSON.stringify(user));
                    }
                    else {
                        const user = JSON.parse(sessionStorage.getItem("userId"));
                        user.userName = data.userName;
                        user.userSurname = data.userSurname;
                        user.userEmail = data.userMail;
                        user.userPhone = data.userPhone;
                        sessionStorage.setItem("userId", JSON.stringify(user));
                    }

                    alert("Bilgileriniz değiştirildi!")
                    window.location.href = "profile.html"
                }
            });

        });
    });



    /* - - - Ş İ F R E    D E Ğ İ Ş T İ R M E - - - */
    $("#changePass").click(function (e) {
        $(".card-header").text("Şifre Değiştir");
        $(".card-footer").remove();
        $(".card-body").empty();

        const form = `<form id="changePassForm">
                        <div class="mb-3">
                            <label for="passwordControl" class="form-label">Yeni Şifre</label>
                            <input id="passwordControl" type="password" class="form-control" required>
                        </div>
                        <div class="mb-3">
                            <label for="password" class="form-label">Yeni Şifre Tekrar</label>
                            <input id="password" type="password" class="form-control" required>
                        </div>
                        <div>
                        <button type="submit" class="btn btn-success"> Kaydet </button>
                        <a href="profile.html" class="btn btn-primary"> Geri Dön </a>
                        </div>
                     </form>`
        $(".card-body").append(form);

        $("#changePassForm").submit(function (e) {
            e.preventDefault()
            const password = $("#password").val();
            const passwordControl = $("#passwordControl").val();
            if (password == passwordControl) {
                const url = "https://www.jsonbulut.com/json/userSettings.php";
                const user = JSON.parse(sessionStorage.getItem("userId"))

                const newPassword = $("#password").val();

                const data = {
                    ref: "2490c8c443178a9a4d10b6a2cd541e19",
                    userName: user.userName,
                    userSurname: user.userSurname,
                    userMail: user.userEmail,
                    userPhone: user.userPhone,
                    userPass: newPassword,
                    userId: user.userId
                }

                $.ajax({
                    type: "get",
                    url: url,
                    data: data,
                    dataType: "json",
                    success: function (response) {

                        if (localStorage.getItem("userId") != null) {
                            const user = JSON.parse(localStorage.getItem("userId"));
                            user.userPass = data.userPass;
                            localStorage.setItem("userId", JSON.stringify(user));
                            sessionStorage.setItem("userId", JSON.stringify(user));
                        }
                        else {
                            const user = JSON.parse(sessionStorage.getItem("userId"));
                            user.userPass = data.userPass;
                            sessionStorage.setItem("userId", JSON.stringify(user));
                        }

                        alert("Şifreniz değiştirildi!")
                        window.location.href = "profile.html"
                    }
                });
            }
            else {
                alert("Şifreler eşleşmiyor!")
            }
        });
    });



    /* - - - S İ P A R İ Ş L E R İ M - - - */
    $("#order").click(function (e) {
        $(".card-header").text("Siparişlerim");
        $(".card-footer").remove();
        $(".card-body").empty();

        if (sessionStorage.getItem("userId") == null) {
            const user = localStorage.getItem("userId");
            sessionStorage.setItem("userId", user);
        }

        const user = JSON.parse(sessionStorage.getItem("userId"));
        const userId = user.userId;
        const url = "https://www.jsonbulut.com/json/orderList.php";

        const data = {
            ref: "2490c8c443178a9a4d10b6a2cd541e19",
            musterilerID: userId
        }

        $.ajax({
            type: "get",
            cache:false,
            url: url,
            data: data,
            dataType: "json",
            success: function (response) {
                const orderList = response.orderList[0];
                siparisleriListele(orderList)
            }
        });


        function siparisleriListele(orderList) {
            console.log('orederList :>> ', orderList);
            if (orderList == false) {
                let html = `
                <p class="mt-5"> Mevcut siparşiniz bulunmamaktadır.
                 Sipariş vermek için sepete eklediğiniz ürünü "Sipariş Ver" diyerek onaylamanız gerekiyor.
                 </p>
                 <div class="w-100 mt-5"><a href="profile.html" class="btn btn-primary w-100">Geri Dön</a></div>
                `
                $(".card-body").append(html);
            }
            else {
                let html = ""
                html += `<table class="table table-hover">
                            <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Ürün Foto</th>
                                <th scope="col">Ürün Adı</th>
                                <th scope="col">Sipariş Durumu</th>
                            </tr>
                            </thead>
                            <tbody>`

                for (const index in orderList) {
                    const i = parseInt(index);
                    html += `<tr>
                                <th scope="row">${i+1}</th>
                                <td><img src="${orderList[index].normal}" alt="" srcset="" width="50px"></td>
                                <td>${orderList[index].urun_adi}</td>
                                <td>Hazırlanıyor...</td>
                            </tr>`
                }

                html += `</tbody>
                        </table>
                    <div class="w-100">
                        <a href="profile.html" class="btn btn-primary w-100">Geri Dön</a>
                    </div>`

                $(".card-body").append(html);
            }
        }

    });

});