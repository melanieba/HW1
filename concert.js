
// duration is in minutes
let concerts = [
  { id: 1, startDate: new Date('2025-05-14'), duration: 120, primaryArtist: "artist4", otherArtists: ["a", "b", "c"] }, 
  { id: 2, startDate: new Date('2025-01-20'), duration: 180, primaryArtist: "artist5", otherArtists: ["d", "e"] }, 
  { id: 3, startDate: new Date('2025-04-21'), duration: 90, primaryArtist: "artist2", otherArtists: ["f"] }
];

module.exports = function(app) {

  function listConcerts(request, response) {
    const minStartDateInput = request.query.minStartDate;
    const maxStartDateInput = request.query.maxStartDate;

    const minDateToCheck = new Date(minStartDateInput);
    const maxDateToCheck = new Date(maxStartDateInput);

    // checks if the date passed was in the correct format
    // combines checks for if both exist
    if (isNaN(minDateToCheck) || isNaN(maxDateToCheck)) {
      response.sendStatus(400);
      return;
    }

    let validConcerts = [];

    for (let i = 0; i < concerts.length; i++) {
        if (concerts[i].startDate >= minDateToCheck && concerts[i].startDate <= maxDateToCheck) {
          validConcerts.push(concerts[i]);
        }
    }

    response.status(200).send(validConcerts);
  }

  function changeConcertStartDate(request, response) {
    let idInput = request.body.id;

    const idToCheck = new Number(idInput);

    if (isNaN(idToCheck)) {
      response.sendStatus(400);
      return;
    }
    
    let foundConcert = concerts.find(concert => {
      return concert.id == idToCheck;
    });
    if (!foundConcert) {
      response.sendStatus(400); 
      return;
    }

    let startDateInput = request.body.startDate;
    foundConcert.startDate = startDateInput;

    response.status(200).send(foundConcert);
  }

  app.get('/concert/list', listConcerts);
  app.patch('/concert/update', changeConcertStartDate);
};