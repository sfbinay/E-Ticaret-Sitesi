if (localStorage.getItem("userId") == null && sessionStorage.getItem("userId") == null) {
    window.location.href = "index.html";
}