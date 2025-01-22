
// /albums/tracks/
// a route from album? 
let albums = [
  { name: "a1", yearReleased: 1970, genre: 'pop' }, // , tracks = []
  { name: "a2", yearReleased: 1960, genre: 'rock'}
];

module.exports = function(app) {

  function listAlbums(request, response) {
    // 1. no parameters, headers, query string, and/or body in request
    // 2. no input validation
    // 3. do the thing (i.e. interact with model layer to fulfill request)
    // 4. send code
    response.status(200).send(albums); // 200 necessary?
  }

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
    let nameInput = request.query.name;

    // 2. validate inputs
    if (!nameInput) {
      response.sendStatus(400);
      return;
    }

    // 3. do the thing (i.e. interact with model layer to fulfill request)
    const foundAlbum = albums.find(album => {
      return album.name == nameInput;
    });
    if (!foundAlbum) {
      response.sendStatus(400);
      return;
    }

    // 4. send a response code and/or body    
    response.status(200).send(foundAlbum);
  }

  app.get('/album/list', listAlbums);
  app.post('/album/add', addAlbum);
  app.get('/album/get', getAlbumDetails);
  
};