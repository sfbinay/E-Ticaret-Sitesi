$(document).ready(function () {

    if (sessionStorage.getItem("item") == null) {
        window.location.href = "index.html";
    }

    const item = JSON.parse(sessionStorage.getItem("item"));

    let html = `
                <div class="detail-box">
                    <div class="item">
                        <div class="item-img">
                            <img src="${item.images[0].normal}">
                        </div>
                        <div class="item-side-detail">
                            <h2 class="text-center">${item.productName}</h2>
                            <h3 class="mb text-center">${item.brief}</h3>
                            <div class="price mb">${item.price} &#8378;</div>
                            <div class="sepete-ekle"><i class="fas fa-shopping-cart"></i> Sepete Ekle</div>
                        </div>
                    </div>
                    <div class="item-detail">
                        <h3>Ürün Açıklaması</h3>
                        <hr/>
                        <p>${item.description}</p>
                    </div>
                </div>
    `


    $(".content").append(html);

    $(".sepete-ekle").click(function (e) {
        if (localStorage.getItem("userId") == null && sessionStorage.getItem("userId") == null) {
            alert("Sepete ürün ekleyebilmek için giriş yapmanız gerekiyor.")
            sessionStorage.setItem("status", "status");
            window.location.href = "login.html"
        }
        else {
            productId = item.productId;

            if (localStorage.getItem("sepetim") == null) {
                const sepetim = [productId];
                localStorage.setItem("sepetim", JSON.stringify(sepetim));
                if(confirm("Ürün sepetinize eklendi. Sepete gitmek ister misiniz?")){
                    window.location.href = "sepetim.html";
                }
            }
            else {
                const sepetim = JSON.parse(localStorage.getItem("sepetim"));
                sepetim.push( productId );
                localStorage.setItem("sepetim", JSON.stringify(sepetim))
                if(confirm("Ürün sepetinize eklendi. Sepete gitmek ister misiniz?")){
                    window.location.href = "sepetim.html";
                }
                
            }

        }

    });


});