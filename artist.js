
let artists = [
  { name: "artist1", biography: "dkjhfkjshdkfj hsdjfkjsdhf", socialMediaLink: "http://instagram.com" },
  { name: "artist2", biography: "ajaskjdlksjlk", socialMediaLink: "http://instagram.com" }
];

module.exports = function(app) {

  function listArtists(request, response) {
    // 1. no parameters, headers, query string, and/or body out of request
    // 2. no input validation
    // 3. do the thing (i.e. interact with model layer to fulfill request)
    // 4. send a response code and/or body
    response.status(200).send(artists); 
  }

  function addArtist(request, response) {
    // 1. get parameters, headers, query string, and/or body out of request
    let nameInput = request.body.name;
    let biographyInput = request.body.biography;
    let socialMediaLinkInput = request.body.socialMediaLink; 

    // 2. validate inputs
    if (!nameInput || !biographyInput) { // link optional
      response.sendStatus(400);
      return;
    }

    // 3. do the thing (i.e. interact with model layer to fulfill request)
    let newArtist = { name: nameInput, biography: biographyInput, socialMediaLink: socialMediaLinkInput };
    artists.push(newArtist);

    // 4. send a response code and/or body   
    response.sendStatus(200);
  }

  // Update a specific artist's name, biography, and/or social media links
  function updateArtistProperty(request, response) {
    let nameInput = request.body.name;
    let nameToChangeToInput = request.body.nameToChangeTo;
    let biographyInput = request.body.biography;
    let socialMediaLinkInput = request.body.socialMediaLink; 

    // always have to provide name
    const foundArtist = artists.find(artist => {
      return artist.name == nameInput; // if artist with that name exists
    });
    if (!foundArtist) {
      response.sendStatus(400);
      return;
    }

    if (nameToChangeToInput) {
        foundArtist.name = nameToChangeToInput;
    }
    if (biographyInput) {
        foundArtist.biography = biographyInput;
    }
    if (socialMediaLinkInput) {
        foundArtist.socialMediaLink = socialMediaLinkInput;
    }

    response.status(200).send(foundArtist);
  }

  app.get('/artist/list', listArtists);
  app.post('/artist/add', addArtist);
  app.patch('/artist/update', updateArtistProperty);
};