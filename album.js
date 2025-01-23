
// /albums/tracks/
// a route from album? 

// or create actual objects? 
// function Track(number, title, duration, primaryArtist) {
//   this.number = number;
//   this.title = title; 
//   this.duration = duration;
//   this.primaryArtist = primaryArtist;
// }

let albums = [
  { id: 1, name: "a1", yearReleased: 1970, genre: 'pop', tracks: [ { number: 1, title: "track1",  duration: 120, primaryArtist: "a1"}, 
  { number: 2, title: "track2",  duration: 100, primaryArtist: "a2"} ] }, 

  { id: 2, name: "a2", yearReleased: 1960, genre: 'rock', tracks: [ { number: 3, title: "track3",  duration: 90, primaryArtist: "a3"}, 
  { number: 4, title: "track4",  duration: 120, primaryArtist: "a4"}, 
  { number: 5, title: "track5",  duration: 100, primaryArtist: "a5"} ] }
];

module.exports = function(app) {

  function listAlbums(request, response) {
    // 1. no parameters, headers, query string, and/or body in request
    // 2. no input validation
    // 3. do the thing (i.e. interact with model layer to fulfill request)
    // 4. send code
    response.status(200).send(albums); // 200 necessary?
  }

  // change to check for id??
  function addAlbum(request, response) {
    // 1. get parameters, headers, query string, and/or body out of request
    let nameInput = request.body.name;
    let yearReleasedInput = request.body.yearReleased;
    let genreInput = request.body.genre;

    // 2. validate inputs
    if (!nameInput || !yearReleasedInput || !genreInput) {
      response.sendStatus(400);
      return;
    }

    // 3. do the thing (i.e. interact with model layer to fulfill request)
    let newAlbum = {name: nameInput, yearReleased: yearReleasedInput, genre: genreInput};
    albums.push(newAlbum);

    // 4. send a response code and/or body    
    response.sendStatus(200);
  }

  function getAlbumDetails(request, response) {
    // 1. get parameters, headers, query string, and/or body out of request
    let idInput = request.query.id;

    // 2. validate inputs
    if (!idInput) {
      response.sendStatus(400);
      return;
    }

    // 3. do the thing (i.e. interact with model layer to fulfill request)
    const foundAlbum = albums.find(album => {
      return album.id == idInput;
    });
    if (!foundAlbum) {
      response.sendStatus(400);
      return;
    }

    // 4. send a response code and/or body    
    response.status(200).send(foundAlbum);
  }

  function deleteAlbum(request, response) {
    let idInput = request.query.id;

    if (!idInput) {
      response.sendStatus(400);
      return;
    }

    const foundAlbum = albums.find(album => {
      return album.id == idInput;
    });
    if (!foundAlbum) {
      response.sendStatus(400);
      return;
    }

    albums = albums.filter(album => {
      return album.id != idInput;
    });
    albumTracks = albumTracks.filter(album => {
      return album.id != idInput;
    });

    response.status(200).send(foundAlbum);
  }

  function listAlbumTracks(request, response) {
    let idInput = request.query.id;

    if (!idInput) {
      response.sendStatus(400);
      return;
    }

    const foundAlbumTracks = albumTracks.find(album => {
      return album.id == idInput;
    });
    if (!foundAlbumTracks) {
      response.sendStatus(400);
      return;
    }

    response.status(200).send(foundAlbumTracks.tracks);
  }

  function addAlbumTrack(request, response) {
    let albumIdInput = request.body.albumId;

    let numberInput = request.body.number;
    let titleInput = request.body.title;
    let durationInput = request.body.duration;
    let primaryArtistInput = request.body.primaryArtist;

    if (!numberInput || !titleInput || !durationInput || !primaryArtistInput) {
      response.sendStatus(400);
      return;
    }

    const foundAlbumTracks = albumTracks.find(album => {
      return album.id == albumIdInput;
    });
    if (!foundAlbumTracks) {
      response.sendStatus(400);
      return;
    }

    const newTrack = { number: numberInput, title: titleInput, duration: durationInput, primaryArtist: primaryArtistInput };
    foundAlbum.tracks.push(newTrack);

    response.status(200).send(foundAlbum);
  }

  function deleteTrack(request, response) {
    const albumIdInput = request.body.albumId;
    const trackNumberInput = request.body.trackNumber;

    const foundAlbum = albums.find(album => {
      return album.id == albumIdInput;
    });
    if (!foundAlbum) {
      response.sendStatus(400);
      return;
    }

    for (let i = 0; i < foundAlbum.tracks.length; i++) { //tbd find where i didnt do ===
      if (foundAlbum.tracks[i] === trackNumberInput) {
        albums.tracks.splice(i, 1);
        break;
      }
    }

    response.status(200).send(foundAlbum); // jhgjhgjh
  }

  app.get('/album/list', listAlbums); 
  app.post('/album/add', addAlbum);
  app.get('/album/get', getAlbumDetails);
  app.delete('/album/delete', deleteAlbum);

  app.post('/album/track/add', addAlbumTrack);
  app.get('/album/track/list', listAlbumTracks);
  app.delete('/album/track/delete', deleteTrack);
};