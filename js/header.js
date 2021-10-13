$(document).ready(function () {

    const header = `<div class="my-header">
    <div class="header-logo">
        <img src="img/logo.svg" width="150px" alt="myshop-logo" />
    </div>
    <div class="header-menu">
        <a href="index.html">Anasayfa</a>
        <a href="haberler.html">Haberler</a>
        <a href="iletisim.html">İletişim</a>
    </div>
    <div class="header-user">
        <div class="header-hesabim">
            <i class="fas fa-sign-in-alt"></i><div>Hesabım <span><a href="login.html">Giriş Yap</a>/<a href="register.html">Kayıt Ol</a></span></div>
        </div>
        <div class="header-sepetim">
            <span><i class="fas fa-shopping-cart"></i><a href="sepetim.html">Sepetim</a></span>
        </div>
    </div>
</div>`;



    $("header").append(header);

    if (sessionStorage.getItem("userId") != null || localStorage.getItem("userId") != null) {
        if (sessionStorage.getItem("userId") != null) {
            var userItem = JSON.parse(sessionStorage.getItem("userId"))
        }
        else {
            var userItem = JSON.parse(localStorage.getItem("userId"))
        }

        const headerUser = `<i class="fas fa-user"></i><div>${userItem.userName.slice(0, 10)} <span><a href="profile.html">Profilim</a>/<a id="logout" href="index.html">Çıkış Yap</a></span></div>`;

        $(".header-hesabim").html(headerUser)
    }


    $("#logout").click(function (e) {
        e.preventDefault();
        if (confirm("Çıkış yapmak istediğinizden emin misiniz?")) {
            localStorage.clear();
            sessionStorage.clear("userId");
            window.location.href = "index.html";
        }
    });
    
});