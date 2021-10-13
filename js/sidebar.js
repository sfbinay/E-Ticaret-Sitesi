$(document).ready(function () {

    if (sessionStorage.getItem("categories")) {
        const categories = JSON.parse(sessionStorage.getItem("categories"));
        setSideBar(categories);
    }
    else {
        const url = "https://www.jsonbulut.com/json/companyCategory.php";
        const data = {
            ref: "2490c8c443178a9a4d10b6a2cd541e19",
        }
        $.ajax({
            async: false,
            type: "get",
            url: url,
            data: data,
            dataType: "json",
            success: function (response) {
                const categories = response.Kategoriler[0].Categories;
                console.log('categories :>> ', categories);
                sessionStorage.setItem("categories", JSON.stringify(categories));
                setSideBar(categories);
            }
        });
    }

    function setSideBar(categories) {
        let sidebar = ``;
        sidebar += `<h3 id="kategoriler"><i class="fas fa-bars"></i>Kategoriler</h3>
                    <ul class="main-ul">`

        for (const topCatog of categories) {
            if (topCatog.TopCatogryId == 0) {
                sidebar += `
                 <li class="top-category">
                 <span><span>${topCatog.CatogryName}</span> <i class="fas fa-angle-down"></i></span>
                 <ul class="sub-category">
                 `
                for (const subCatog of categories) {

                    if (subCatog.TopCatogryId == topCatog.CatogryId) {
                        sidebar += ` <li>${subCatog.CatogryName}</li>`
                    }
                }
                sidebar += `</ul> </li>`
            }
        }
        sidebar += `</ul>`;
        $(".sidebar").append(sidebar);
    }


    $(".sub-category").hide();
    $(".top-category").click(function (e) {

        if (!$(e.target).closest("ul").is(".sub-category")) {
            $(".sub-category", this).toggle("slow");
        }
    });

    $(window).resize(function () {
        var width = $(window).width();
        if (width < 768) {
            $(".main-ul").hide();
        }
        else {
            $(".main-ul").show();
        }
    });

    $("#kategoriler").click(function (e) {
        console.log('ok');
        $(".main-ul").toggle("slow");
    });

    
    $(".sub-category > li").click(function (e) {
        e.preventDefault();

        const categories = JSON.parse(sessionStorage.getItem("categories"));

        const subCatogory = $(this).text();

        for (const item of categories) {
            if (item.CatogryName == subCatogory) {
                const catogory = {
                    catogoryId: item.CatogryId,
                    catogoryName: subCatogory
                }
                sessionStorage.setItem("catogory", JSON.stringify(catogory));
                window.location.href = "kategori.html";
                break;
            }
        }

    });

    if (sessionStorage.getItem("status")) {
        sessionStorage.removeItem("status");
    }
});