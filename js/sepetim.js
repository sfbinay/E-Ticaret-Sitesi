$(document).ready(function () {


    if (localStorage.getItem("userId") == null && sessionStorage.getItem("userId") == null) {
        const html = `
        <div class="sepet-bos">
        <i class="fas fa-exclamation-triangle"></i>
        <p> Sepete  ürün ekleyebilmek için giriş yapmanız gerekmektedir.</p>
        <a href="login.html">Giriş Yap</a>
        </div>`

        $(".content").append(html)
    }
    else if (localStorage.getItem("sepetim") == null) {
        const html = `
        <div class="sepet-bos">
        <i class="far fa-times-circle"></i>
        <p> SEPETİNİZ BOŞ </p>
        </div>`

        $(".content").append(html)
    }
    else {

        url = "https://www.jsonbulut.com/json/product.php"
        const data = {
            ref: "2490c8c443178a9a4d10b6a2cd541e19",
            start: "0"
        }

        $.ajax({
            async: false,
            type: "get",
            url: url,
            data: data,
            dataType: "json",
            success: function (response) {
                const items = response.Products[0].bilgiler;
                sepetListele(items)
            }
        });

    }

    function sepetListele(items) {
        let html = ""
        const sepetim = JSON.parse(localStorage.getItem("sepetim"));

        for (let i = 0; i < sepetim.length; i++) {
            for (const item of items) {
                if (sepetim[i] == item.productId) {

                    html += `
                        <tr>
                            <td>${i + 1}</td>
                            <td><img src="${item.images[0].normal}" alt="" srcset="" width="50px"></td>
                            <td>${item.productName}</td>
                            <td><span id="${item.productId}" class="btn siparis">Sipariş Ver</span></td>
                            <td><span class="btn iptal">Çıkar</span></td>
                        </tr>
                    `
                }
            }
        }
        $("tbody").append(html);

        let btnOnay = `<div class="onay text-center"> Tüm Sepeti Onayla </div>`
        $(".content").append(btnOnay);
    }




    $(".iptal").click(function (e) {
        e.preventDefault();
        const index = parseInt($(this).parent().prev().prev().prev().prev().text());
        const itemName = $(this).parent().prev().prev().text();

        if (confirm(`"${itemName}" adlı ürünü sepetten çıkarmak istediğinize emin misiniz?`)) {
            const sepetim = JSON.parse(localStorage.getItem("sepetim"));
            sepetim.splice(index - 1, 1);
            if (sepetim.length == 0) {
                localStorage.removeItem("sepetim")
            }
            else {
                localStorage.setItem("sepetim", JSON.stringify(sepetim));
            }
            window.location.href = "sepetim.html";
        }
    });


    $(".siparis").click(function (e) {
        e.preventDefault();
        const index = parseInt($(this).parent().prev().prev().prev().text());
        const sepetim = JSON.parse(localStorage.getItem("sepetim"));
        sepetim.splice(index - 1, 1);
        if (sepetim.length == 0) {
            localStorage.removeItem("sepetim")
        }
        else {
            localStorage.setItem("sepetim", JSON.stringify(sepetim));
        }

        if (sessionStorage.getItem("userId") == null) {
            const user = localStorage.getItem("userId");
            sessionStorage.setItem("userId", user);
        }

        const user = JSON.parse(sessionStorage.getItem("userId"));
        const productId = $(this).attr("id");
        const url = "https://www.jsonbulut.com/json/orderForm.php"

        const data = {
            ref: "2490c8c443178a9a4d10b6a2cd541e19",
            customerId: user.userId,
            productId: productId,
            html: "-"
        }

        $.ajax({
            type: "get",
            url: url,
            data: data,
            dataType: "json",
            success: function (response) {
                alert(response.order[0].mesaj)
                console.log('response :>> ', response);
                window.location.href = "sepetim.html";
            }
        });
    });


    $(".onay").click(function (e) {



        if (sessionStorage.getItem("userId") == null) {
            const user = localStorage.getItem("userId");
            sessionStorage.setItem("userId", user);
        }

        const user = JSON.parse(sessionStorage.getItem("userId"));
        const sepetim = JSON.parse(localStorage.getItem("sepetim"));
        const url = "https://www.jsonbulut.com/json/orderForm.php"

        for (let i = 0; i < sepetim.length; i++) {
            let productId = sepetim[i];

            const data = {
                ref: "2490c8c443178a9a4d10b6a2cd541e19",
                customerId: user.userId,
                productId: productId,
                html: "-"
            }

            $.ajax({
                type: "get",
                url: url,
                data: data,
                dataType: "json",
                success: function (response) {

                }
            });
        }

        alert("Tüm siparişleriniz onaylandı!");
        localStorage.removeItem("sepetim");
        window.location.href = "sepetim.html";

    });


});