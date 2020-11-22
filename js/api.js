const base_url = "https://api.football-data.org/v2/";
const key = "6ad8cb19279541f6ac5fd6450e0e30da";
const idLeague = "2021";

const standings_url = `${base_url}competitions/${idLeague}/standings?standingType=TOTAL`;
const matches_url = `${base_url}competitions/${idLeague}/matches?status=SCHEDULED`;
const club_url = `${base_url}teams/`;

const storeNameClub = "favorite_club";
const storeNameMatch = "match_club";

let fetchApi = url => {
    return fetch(url, {
      method: "GET",
      headers: {
        'X-Auth-Token': key
      }
    });
}

function status(response) {
    if (response.status !== 200) {
        console.log("Error : " + error.arguments);
        return Promise.reject(new Error(response.statusText));
    } else {
        return Promise.resolve(response);
    }
}

function json(response) {
    return response.json();
}

function error(error) {
    console.log("Error : " + error);
}

function getStandings() {
    if ("caches" in window) {
      caches.match(standings_url).then(function (response) {
        if (response) {
          response.json().then(data => {
            standings_component(data)
          })
        }
      }).catch(error)
    }
  
    fetchApi(standings_url)
      .then(status)
      .then(json)
      .then(data => {
        standings_component(data)
      })
      .catch(error)
}

function getMatches() {
    if ("caches" in window) {
      caches.match(matches_url).then(response => {
        if (response) {
          response.json().then(data => {
            matches_component(data)
          })
        }
      })
    }
  
    fetchApi(matches_url)
      .then(status)
      .then(json)
      .then(data => {
        matches_component(data)
      })
      .catch(error);
}
  
function getClubDetail(clubId) {
  
  fetch('../../pages/detail-club.html')
  .then(response => {
      return response.text();
  })
  .then(res => {
    document.querySelector('body').innerHTML = res
    return new Promise((resolve, reject) => {
      if ("caches" in window) {
        caches.match(club_url + clubId).then(response => {
          if (response) {
            response.json().then(data => {
              detail_club_component(data);
              resolve(data)
            })
          }
        })
      }
      fetchApi(club_url + clubId)
        .then(status)
        .then(json)
        .then(data => {
          detail_club_component(data);
          resolve(data)
        })
    })
  })
}

function getFavoriteClub() {
      getAllFavorites(storeNameClub).then(function(data) {
          getClubFavorites(data);
      });
}