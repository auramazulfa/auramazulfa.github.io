function createDatabase(idb) {
    var dbPromised = idb.open("premier-league", 1, function(upgradeDb) {    
        if (!upgradeDb.objectStoreNames.contains(storeNameClub)) {
            var teamsObjectStore = upgradeDb.createObjectStore(storeNameClub, {
                keypath: "id"
            });
            
            teamsObjectStore.createIndex("team_name", "name", {
                unique: false
            });
        }

        else if (!upgradeDb.objectStoreNames.contains(storeNameMatch)) {
            var matchObjectStore = upgradeDb.createObjectStore(storeNameMatch, {
                keypath: "id"
            });

            matchObjectStore.createIndex("home_team", "match.homeTeam.name", {
                unique: false
            });

            matchObjectStore.createIndex("away_team", "match.awayTeam.name", {
                unique: false
            });
        }
    });
    return dbPromised;
}

function addToFavorite(data, storeName) {
    var dataPrimaryKey;
    if (storeName == storeNameClub) {
        dataPrimaryKey = data.id;        
    }
    createDatabase(idb)
        .then(function(db) {
            var tx = db.transaction(storeName, "readwrite");
            var store = tx.objectStore(storeName);
            
            store.put(data, dataPrimaryKey);

            return tx.complete;
        })
        .then(function() {
            M.toast({
                html: "Berhasil ditambahkan ke favorite",
            });
        });
}

function getAllFavorites(storeName) {
    return new Promise(function(resolve, reject) {
        createDatabase(idb)
            .then(function(db) {
                var tx = db.transaction(storeName, "readonly");
                var store = tx.objectStore(storeName);
                
                return store.getAll();
            })
            .then(function(data) {
                resolve(data);
            });
    });
}

function removeFromFavorites(ID, storeName) {
    console.log(ID + " " + storeName);
    createDatabase(idb)
        .then(function(db) {
            var tx = db.transaction(storeName, "readwrite");
            var store = tx.objectStore(storeName);

            store.delete(ID);

            return tx.complete;
        })
        .then(function() {
            M.toast({
                html: "Berhasil dihapus dari favorite",
            });
        });
    location.reload();
}
