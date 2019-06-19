$(document).ready(function () {

  var yourMatchingNumber = 0;
  var randomNum = randomNumGen();


  var wins = 0;
  var losses = 0;
  var crystals;

  // Function that generates random values for our crystals and returns our crystals object.
  function randomNumCrystals() {
    return {
      red: {
        points: Math.floor(Math.random() * 12) + 1,
        imageUrl: "images/red.png"
      },
      blue: {
        points: Math.floor(Math.random() * 12) + 1,
        imageUrl: "images/blue.png"
      },
      yellow: {
        points: Math.floor(Math.random() * 12) + 1,
        imageUrl: "images/yellow.png"
      },
      green: {
        points: Math.floor(Math.random() * 12) + 1,
        imageUrl: "images/green.png"
      }
    };
  }

  // Function to create a random number between 19 and 120.
  function randomNumGen() {
    return Math.floor(Math.random() * 102) + 19;
  }

  // Function that resets the game.
  function setGame() {
    yourMatchingNumber = 0;
    crystals = randomNumCrystals();
    randomNum = randomNumGen();
    $("#random-area").text(randomNum);
  }

  // Function that handles updating the page.
  function updateDom(didUserWin) {
    $("#win-area").empty();


    if (didUserWin === true) {
      $("#win-area").append($("<p>").text("You won!!"));
      setGame();
      renderMatchingNumber();
    }
    else if (didUserWin === false) {
      $("#win-area").append($("<p>").text("You lost!!"));
      setGame();
      renderMatchingNumber();
    }


    var wSpan = $("<span>").text(wins);
    var lSpan = $("<span>").text(losses);

    var pWins = $("<p>").text("Wins: ");
    var pLosses = $("<p>").text("Losses: ");

    pWins.append(wSpan);
    pLosses.append(lSpan);

    $("#win-area").append(pWins);
    $("#win-area").append(pLosses);
  }

  // Function to render crystals to the page.
  function renderCrystals() {
    for (var key in crystals) {
      var crystalDiv = $("<div class='crystals-button' data-name='" + key + "'>");
      var crystalImg = $("<img alt='image' class='crystal-img'>").attr("src", crystals[key].imageUrl);
      crystalDiv.append(crystalImg);
      $("#crystal-area").append(crystalDiv);
    }
  }

  // Function to update our "current guess" number. We are passing in the crystal that was clicked as an argument.
  function updateMatchingNumber(crystal) {
    // Update our "current guess" number based on which crystal was clicked.
    yourMatchingNumber += crystals[crystal.attr("data-name")].points;
  }

  // Function that will render your "current guess" number to the page.
  function renderMatchingNumber() {
    var scoreNumDiv = $("<div id='score-number'>").text(yourMatchingNumber);
    $("#score-area").html();
    $("#score-area").html(scoreNumDiv);
  }

  // Call our functions to start the game!
  setGame();
  updateDom();
  renderCrystals();
  renderMatchingNumber();

  // Here we create an on.click event for the crystals.
  $(".crystals-button").on("click", function (event) {
    // Update our "current guess" number and re-render it.
    updateMatchingNumber($(this));
    renderMatchingNumber();

    // Check to see if we have won or lost.

    if (yourMatchingNumber === randomNum) {
      wins++;
      setGame();
      updateDom(true);
    }
    // If our guess number exceeded our target number...
    else if (yourMatchingNumber > randomNum) {
      losses++;
      setGame();
      updateDom(false);
    }
  });

});
