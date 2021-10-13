$(document).ready(function () {

    if (!sessionStorage.getItem("haberler")) {
        const url = "https://www.jsonbulut.com/json/news.php"
        const data = {
            ref: "2490c8c443178a9a4d10b6a2cd541e19",
            start: "0",
            count: "20",
        }

        $.ajax({
            async: false,
            type: "get",
            url: url,
            data: data,
            dataType: "json",
            success: function (response) {
                console.log('response :>> ', response.News[0].Haber_Bilgileri);
                const items = JSON.stringify(response.News[0].Haber_Bilgileri);
                sessionStorage.setItem("haberler", items)
                haberleriListele(0);
            }
        });
    }
    else {
        haberleriListele(0);
    }


    function haberleriListele(catog) {
        const haberler = JSON.parse(sessionStorage.getItem("haberler"));
        $(".haberler").empty();
        let html = ""
        if (catog == 0) {
            for (const haber of haberler) {
                html += `
                    <div class="haber">
                        <img src="${haber.picture}" alt="">
                        <div class="haber-content">
                            <h3>${haber.title}</h3>
                        <p>${haber.s_description}</p>
                        </div>        
                    </div>
                `
            }
        }
        else {
            for (const haber of haberler) {
                if (catog == haber.category_id) {
                    html += `
                    <div class="haber">
                        <img src="${haber.picture}" alt="">
                        <div class="haber-content">
                            <h3>${haber.title}</h3>
                        <p>${haber.s_description}</p>
                        </div>        
                    </div>
                `
                }
            }
        }

        $(".haberler").append(html);
    }

    $(".haberler-menu > span").click(function (e) {
        e.preventDefault();
        $("#0").attr('class', '');
        $("#65").attr('class', '');
        $("#64").attr('class', '');
        $("#63").attr('class', '');

        $(this).attr('class','haber-active')

        haberleriListele($(this).attr('id'));

    });


});
