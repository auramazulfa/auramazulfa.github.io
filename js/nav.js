document.addEventListener("DOMContentLoaded", function() {
    const elems = document.querySelectorAll(".sidenav");
    M.Sidenav.init(elems);
    loadNav();
   
    function loadNav() {
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState === 4) {
            if (this.status !== 200) return;
    
            document.querySelectorAll(".topnav, .sidenav").forEach(function(elm) {
                elm.innerHTML = xhttp.responseText;
            });

            document.querySelectorAll(".sidenav a, .topnav a").forEach(function(elm) {
                elm.addEventListener("click", function(event) {
                    var sidenav = document.querySelector(".sidenav");
                    M.Sidenav.getInstance(sidenav).close();
            
                    page = event.target.getAttribute("href").substr(1);
                    loadPage(page);
                });
            });
        }
      };
      xhttp.open("GET", "nav.html", true);
      xhttp.send();
    }

    var page = window.location.hash.substr(1);
    if (page === "") page = "standings";
    loadPage(page);
    
    function loadPage(page) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState === 4) {
                var content = document.querySelector("#body-content");
                
                if (page === "standings") {
                    getStandings();
                }else if (page === "match") {
                    getMatches();
                }else if (page === "favorite") {
                    getFavoriteClub();
                }
                
                if (this.status === 200) {
                    content.innerHTML = xhttp.responseText;
                } else if (this.status === 404) {
                    content.innerHTML = "<p>Halaman tidak ditemukan.</p>";
                } else {
                    content.innerHTML = "<p>Ups.. halaman tidak dapat diakses.</p>";
                }
            }
        };
        xhttp.open("GET", `pages/${page}.html`, true);
        xhttp.send();
    }
});