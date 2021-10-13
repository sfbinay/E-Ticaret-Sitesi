$(document).ready(function () {

  //Slider
  var slideIndex = 0;
  showSlides();
  function showSlides() {
    var i;
    var slides = $(".mySlides");
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) { slideIndex = 1 }
    slides[slideIndex - 1].style.display = "block";

    setTimeout(showSlides, 5000);
  }

  // Son Eklenen Ürünler
  const url = "https://www.jsonbulut.com/json/product.php"
  const data = {
    ref: "2490c8c443178a9a4d10b6a2cd541e19",
    start: "0",
    count: "6",
    order:"desc"
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
    let html = ""

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


    $(".items").append(html);
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



/* REKLAM  */
$(document).ready(function () {
  const url = "https://www.jsonbulut.com/json/advertisement.php"
  const data = {
    ref: "2490c8c443178a9a4d10b6a2cd541e19",
    advertisementId: "50"
  }

  $.ajax({
    async:false,
    type: "get",
    url: url,
    data: data,
    dataType: "json",
    success: function (response) {
      const item = JSON.stringify(response.reklam[0].reklam);
      showAd(JSON.parse(item))
    }
  });

  function showAd(ad) {
    let html = `<a href="${ad.href}" target="_blank"><img src="${ad.dosya}" width="100%"></a>`
    $(".ad-container").append(html);
  }
});