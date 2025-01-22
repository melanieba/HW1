
// duration is in minutes
// tbd: is id okay for identifying which concert start time i wanna change
// tbd: change typo on txt file
let concerts = [
  { id: 1, startDate: new Date('2025-05-14'), duration: 120, primaryArtist: "artist4", otherArtists: ["a", "b", "c"] }, 
  { id: 2, startDate: new Date('2025-01-20'), duration: 180, primaryArtist: "artist5", otherArtists: ["d", "e"] }, 
  { id: 3, startDate: new Date('2025-04-21'), duration: 90, primaryArtist: "artist2", otherArtists: ["f"] }
];

module.exports = function(app) {

  // List all concerts within a time range (minimum and maximum start time/date)
  function listConcerts(request, response) {
    const minStartDateInput = request.query.minDateTime;
    const maxStartDateInput = request.query.maxDateTime;

    console.log("check")

    // add functionality for if only min is given or only max is given? 
    if (!minStartDateInput || !maxStartDateInput) {
      response.sendStatus(400);
      return;
    }

    const minDateToCheck = new Date(minStartDateInput);
    const maxDateToCheck = new Date(maxStartDateInput);

    console.log(minDateToCheck);
    console.log(maxDateToCheck);

    let validConcerts = [];

    for (let i = 0; i < concerts.length; i++) {
        if (concerts[i].startDate >= minDateToCheck && concerts[i].startDate <= maxDateToCheck) {
          validConcerts.push(concerts[i]);
        }
    }

    response.status(200).send(validConcerts);
  }

  // Change the start date/time of a specific concert
  function changeConcertStartDate(request, response) {
    let idInput = request.body.id;
    
    let foundConcert = concerts.find(concert => {
      return concert.id = idInput;
    });
    if (!foundConcert) {
      response.sendStatus(400);
      return;
    }

    let startDateInput = request.body.startDate;
    foundConcert.startDate = startDateInput;

    response.status(200).send(foundConcert);
  }

  function listAllConcerts(request, response) {
    response.status(200).send(concerts); 
  }

  app.get('/concert/list', listConcerts);
  app.patch('/concert/update', changeConcertStartDate);
  app.get('/concert/listAll', listAllConcerts);
};