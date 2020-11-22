function standings_component(data) {
    let standingsHTML = ""
    data.standings[0].table.forEach(team => {
        team = JSON.parse(JSON.stringify(team).replace(/http:/g, 'https:'));
        standingsHTML += `
            <tr onclick=getClubDetail(${team.team.id}) style="cursor: pointer;">    
              <td class="center-align">${team.position}</td>
              <td  style="width: 100%; word-wrap: break-word">  
                <div style="display:flex; align-items:center"> 
                  <img src=${team.team.crestUrl} alt="logo-club" style="float:left;width:40px;height:40px;margin-right:10px"> 
                  <p>${team.team.name}</p>
                </div>
              </td>
              <td class="center-align">${team.playedGames}</td>
              <td class="center-align">${team.won}</td>
              <td class="center-align">${team.draw}</td>
              <td class="center-align">${team.lost}</td>       
              <td class="center-align">${team.goalsFor}</td>
              <td class="center-align">${team.goalsAgainst}</td>
              <td class="center-align">${team.goalDifference}</td>
              <td class="center-align">${team.points}</td>
            </tr>`
    })
    document.getElementById("standings-data").innerHTML = standingsHTML
}


function detail_club_component(data) {
  data = JSON.parse(JSON.stringify(data).replace(/^http:\/\//i, 'https://'));
  console.log(data);

  var detailClub = "";

  detailClub += `
      <tr style="font-family: serif">
          <td style="font-weight: bold;">Name</td>
          <td>${data.name}</td>
      </tr>
      <tr style="font-family: serif">
          <td style="font-weight: bold;">Short Name</td>
          <td>${data.shortName}</td>
      </tr>
      <tr style="font-family: serif">
          <td style="font-weight: bold;">Founded</td>
          <td>${data.founded}</td>
      </tr>
      <tr style="font-family: serif">
          <td style="font-weight: bold;">Three Letter Abbreviation</td>
          <td>${data.tla}</td>
      </tr>
      <tr style="font-family: serif">
          <td style="font-weight: bold;">Address</td>
          <td>${data.address}</td>
      </tr>
      <tr style="font-family: serif">
          <td style="font-weight: bold;">Phone</td>
          <td>${data.phone}</td>
      </tr>
      <tr style="font-family: serif">
          <td style="font-weight: bold;">Website</td>
          <td><a href="${data.website}" target="_blank">${data.website}</a></td>
      </tr>
      <tr style="font-family: serif">
          <td style="font-weight: bold;">Email</td>
          <td><a href="mailto:${data.email}">${data.email}</a></td>
      </tr>
      <tr style="font-family: serif">
          <td style="font-weight: bold;">Club Colors</td>
          <td>${data.clubColors}</td>
      </tr>
      <tr style="font-family: serif">
          <td style="font-weight: bold;">Venue</td>
          <td>${data.venue}</td>
      </tr>
  `;

  document.getElementById("logoClub").src = data.crestUrl;
  document.getElementById("namaClub").innerHTML = data.name;
  document.getElementById("preloader").innerHTML = "";
  document.getElementById("detail-club-data").innerHTML = detailClub;
  document.getElementById("btn-save").onclick = function() {
    addToFavorite(data, "favorite_club");
  };
}

function getClubFavorites(data) {
    data = JSON.parse(JSON.stringify(data).replace(/^http:\/\//i, 'https://'));

    var ClubFavoriteHtml = "";
    let number = 1;

    if(data.length === 0) {
        ClubFavoriteHtml += `
        <div style="font-size:25px; margin-top:5px; text-align:center; font-family: serif"> Data Masih Kosong </div>
        `     
    }
    else {
        ClubFavoriteHtml += `
        <table class="striped centered">
            <thead>
                <tr style="font-family: serif">
                    <th>Num</th>
                    <th>Team Name</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
    `;

    data.forEach(function(team) {
        ClubFavoriteHtml += `
            <tr style="font-family: serif">
                <td>${number}</td>
                <td>${team.name}</td>
                <td>
                    <a class="waves-effect waves-light btn-small red" onclick="removeFromFavorites(${team.id}, 'favorite_club')">
                        <i class="large material-icons">delete</i>
                    </a>
                </td>
            </tr>
        `;

        number++;
    });

    ClubFavoriteHtml += `
            </tbody>
        </table>
    `;
    }
    document.getElementById("club_fav").innerHTML = ClubFavoriteHtml;
}

function convertDate(dateString) {
    var date = new Date(dateString);

    const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni",
        "Juli", "Agustus", "September", "Oktober", "November", "December"];

    let day = String(date.getDate()).padStart(2, '0');
    let month = monthNames[date.getMonth()];
    let year = date.getFullYear();

    let result = day + " " + month + " " + year;

    return result
}

function matches_component(data) {
    var DataMatches = "";
    var MatchesHtml = "";

    var dataMatch = data.matches;
    var matchDays = [];
    const unique = (value, index, self) => {
        return self.indexOf(value) === index;
    };

    for(let i = 0; i < dataMatch.length; i++) {
        matchDays.push(dataMatch[i].matchday);
    }

    let idx = 0;
    for(let i = 0; i < dataMatch.length; i++) {
        if (dataMatch[i].matchday === matchDays.filter(unique)[idx]) {
            DataMatches += `
                <tr>
                    <td> ${dataMatch[i].homeTeam.name} </td>
                    <td> (${new Date(dataMatch[i].utcDate).toLocaleTimeString()}) </td>
                    <td> ${dataMatch[i].awayTeam.name} </td>
                </tr>
            `;
        } else {
            MatchesHtml += `
                <div class="card">
                    <div class="card-content">
                        <span class="card-title">${convertDate(new Date(dataMatch[i-1].utcDate).toLocaleDateString())}</span>
                        <table class="responsive-table striped centered">
                            <thead>
                                <tr>
                                    <th>Home</th>
                                    <th>Kick Off</th>
                                    <th>Away</th>
                                </tr>
                            </thead>
                            <tbody>
                                ` + DataMatches + `
                            </tbody>
                        </table>
                    </div>
                </div>
            `;

            DataMatches = "";
            
            DataMatches += `
                <tr>
                    <td> ${dataMatch[i].homeTeam.name} </td>
                    <td> (${new Date(dataMatch[i].utcDate).toLocaleTimeString()}) </td>
                    <td> ${dataMatch[i].awayTeam.name} </td>
                </tr>
            `;

            idx++;
        }
    }

    document.getElementById("matches").innerHTML = MatchesHtml;
}