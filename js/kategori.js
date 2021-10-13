$(document).ready(function () {
    if (sessionStorage.getItem("catogory") == null) {
        window.location.href = "index.html"
    }

    const catogory = JSON.parse(sessionStorage.getItem("catogory"))
    const url = "https://www.jsonbulut.com/json/product.php"
    const data = {
        ref: "2490c8c443178a9a4d10b6a2cd541e19",
        start: "0",
        count: "0",
        categoryId: catogory.catogoryId,
    }

    $.ajax({
        async: false,
        type: "get",
        url: url,
        data: data,
        dataType: "json",
        success: function (response) {
            const item = JSON.stringify(response.Products[0].bilgiler);
            sessionStorage.setItem("current-items", item)
            const productArr = JSON.parse(item);
            urunleriListele(productArr);
        }
    });

    function urunleriListele(productArr) {
        const catogory = JSON.parse(sessionStorage.getItem("catogory"))
        let html = `<h3 class="text-center" style="padding:5px; background-color: #dfdfdf;"> ${catogory.catogoryName} Kategorosi </h3> <hr/>`
        html += `<div class="items">`

        if (productArr == null) {
            html += "<p>Bu kategoriye ait ürün bulunmamaktadır.</p>"
        }
        else {
            html += ""
            for (const item of productArr) {
                html += ` <div class="item-box">
                        <div class="item-title">
                          <h3 class="text-center">${item.productName}</h3>
                        </div>
                        <div class="item-img"><img width="250px" src="${item.images[0].normal}" alt=""></div>
                        <div class="item-price">${item.price} &#8378;</div>
                        <div class="item-go">Ürüne Git</div>
                      </div>`
            }

            html += `</div> `
        }

        $(".content").append(html);
    }

    $(".item-box").click(function (e) {
        console.log($(this).find("h3").text())
        const itemName = $(this).find("h3").text()
        const items = JSON.parse(sessionStorage.getItem("current-items"));

        for (const item of items) {
            if (item.productName == itemName) {
                sessionStorage.setItem("item", JSON.stringify(item))
                window.location.href = "detail.html"
                break;
            }
        }
    });
});