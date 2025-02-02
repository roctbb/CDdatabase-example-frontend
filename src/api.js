let host = "http://localhost:3000/api"

async function getArtists() {
    let artists = await fetch(`${host}/artists`)
    return await artists.json()
}

async function addArtist(artist) {
    artist = await fetch(`${host}/artists`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(artist)
    })
    return await artist.json()
}

async function updateArtist(artist) {
    artist = await fetch(`${host}/artists/${artist.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(artist)
    });

    return await artist.json()
}

export {getArtists, addArtist, updateArtist}