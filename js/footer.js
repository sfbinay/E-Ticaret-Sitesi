$(document).ready(function () {
    const footer = `<div class="my-footer">

    <div class="back-to-top">
        <span>Başa Dön</span>
    </div>
    
    <div class="footer-content">
        <div class="footer-logo"><img width="150px" src="img/white_logo.svg" alt="myshop" /></div>

        <div class="footer-menu">
            <a href="index.html">Anasayfa</a>
            <a href="haberler.html">Haberler</a>
            <a href="iletisim.html">İletişim</a>
        </div>

        <div class="footer-user">
            <a href="login.html">Giriş Yap</a>
            <a href="register.html">Kayıt Ol</a>
            <a href="sepetim.html">Sepete Git</a>
        </div>

        <div class="footer-social-media">
            <a href="http://www.facebook.com" target="_blank"><i class="fab fa-facebook"></i></a>
            <a href="http://www.instagram.com" target="_blank"><i class="fab fa-instagram"></i></a>
            <a href="http://www.twitter.com" target="_blank"><i class="fab fa-twitter"></i></a>
            <a href="http://www.pinterest.com" target="_blank"><i class="fab fa-pinterest"></i></a>

        </div>
    </div>

    <div class="footer-copyright">
        <span>&copy; Copyright 2021 - Tüm hakları saklıdır.</span>
    </div>
</div>`

    $("footer").append(footer);

    $(".back-to-top").click(function (e) {
        $("html,body").animate({ scrollTop: 0 }, 1000);

    });

    if (sessionStorage.getItem("userId") != null || localStorage.getItem("userId")) {


        const footerMenu = `
            <a href="profile.html">Profilim</a>
            <a id="logout-footer" href="#">Çıkış Yap</a>
            <a href="sepetim.html">Sepete Git</a>
        `

        $(".footer-user").html(footerMenu)
    }


    $("#logout-footer").click(function (e) {
        e.preventDefault();
        if (confirm("Çıkış yapmak istediğinizden emin misiniz?")) {
            localStorage.clear();
            sessionStorage.removeItem("userId");
            window.location.href = "index.html";
        }
    });


});