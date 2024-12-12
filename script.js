// boardSquare = [name,price,rent,owner,currentPlayer];
// currentPlayer = [position,cash,properties owned];

let square1 = ["WE THE PEOPLE", "Bonus:200", 10, null, null];
let square2 = ["Rights & Reforms Rally", 160, 2, null, null];
let square3 = ["Constitutional Carousel", 160, 4, null, null];
let square4 = ["Liberty & Law complication", 100, 6, null, null];
let square5 = ["Fundamental Freedom Frenzy", 100, 6, null, null];
let square6 = ["Democracy Dash", 120, 8, null, null];
let square7 = ["Impeachment & Equality Express", 0, 0, null, null];
let square8 = ["Judiciary Journey", 140, 10, null, null];
let square9 = ["Election Commission", 160, 12, null, null];
let square10 = ["Amendment Alley", 180, 14, null, null];
let square11 = ["Parliament Pathways", 180, 14, null, null];
let square12 = ["Supreme Strides", 200, 16, null, null];

// player info
let property1 = [];
let property2 = [];
// player[i] = [name, starting cash, property owned, index, starting position]
let player1 = ["player1", 1500, property1, 0, 1];
let player2 = ["player2", 1500, property2, 1, 1];
let players = [player1, player2];
// current player turn f =0 (player1)
let i = 0;
// global variables
let move = 0;
let currentSquare = 0;
let newSquare = 0;
let p1 = players[0][0];
let p2 = players[1][0];
let k = [p1, p2];
let currentOccupants = ["", ""];
let displayOccupants = currentOccupants.join;
let squareAll = [
  square1,
  square2,
  square3,
  square4,
  square5,
  square6,
  square7,
  square8,
  square9,
  square10,
  square11,
  square12,
];

// function to fill the board with all the rent, tile names etc
var fillBoard = function () {
  for (let g = 0; g < 12; g++) {
    var a = g + 1;
    document.getElementById("square" + a + "_name").innerHTML = squareAll[g][0];
    document.getElementById("square" + a + "_value").innerHTML =
      squareAll[g][1] + "FP";
    document.getElementById("p1").innerHTML = "Player 1 " + player1[1] + "FP";
    document.getElementById("p2").innerHTML = "Player 2: " + player2[1] + "FP";
  }
};

fillBoard();

// function to start the game putting players 1 and 2 in the start tile
var start = function () {
  document.getElementById("square1_residents").innerHTML =
    '<img src="images/student1.jpg" width="30px" height="30px"><img src="images/student2.png" width="30px" height="30px">';
  document.getElementById("currentPlayer").innerHTML =
    "Player 1:" + '<img src="images/student1.jpg" width="30px" height="30px">';
};

var d = document.getElementById("start");
d.addEventListener("click", start, { once: true });

// Maps location to new Tile and removes from old tile
var movePlayerTile = function () {
  switch (i) {
    case 0:
      document.getElementById("currentPlayer").innerHTML =
        "Player 2:" +
        '<img src="images/student2.png" width="30px" height="30px">';
      p = k;
      k[i] = "";
      var immediateSquare = document.getElementById(
        "square" + players[i][4] + "_residents"
      );

      // removes the current player from the current square he's on
      if (
        immediateSquare.innerHTML ==
          '<img src="images/student1.jpg" width="30px" height="30px"><img src="images/student2.png" width="30px" height="30px">' ||
        immediateSquare.innerHTML ==
          '<img src="images/student2.png" width="30px" height="30px"><img src="images/student1.jpg" width="30px" height="30px">'
      ) {
        immediateSquare.innerHTML =
          '<img src="images/student2.png" width="30px" height="30px">';
      } else if (
        immediateSquare.innerHTML ==
        '<img src="images/student1.jpg" width="30px" height="30px">'
      ) {
        immediateSquare.innerHTML = null;
      }

      roll();
      document.getElementById("lastturnmsg").textContent =
        "Dice Rolled " + move;

      // Reset previous player positions
      for (g = 0; g < p.length; g++) {
        p[g] = "";
      }

      p[i] = "player" + [i + 1];
      nextSquare = document.getElementById(
        "square" + players[i][4] + "_residents"
      );

      // Place player on the new square
      if (nextSquare.innerHTML !== "") {
        nextSquare.innerHTML +=
          '<img src="images/student1.jpg" width="30px" height="30px">';
      } else {
        nextSquare.innerHTML =
          '<img src="images/student1.jpg" width="30px" height="30px">';
      }

      combine = "square" + players[i][4];
      cellcolor = "cell" + players[i][4] + "color";
      nextSquareProperty = eval(combine);
      nextCellColor = eval(cellcolor);

      // Check if the player landed on Rights & Reforms Rally (square 2)
      if (players[i][4] === 2) {
        if (
          confirm(
            "You landed on 'Rights & Reforms Rally'. Do you support constitutional reform? You can either receive 50FP or pay 50FP depending on your decision."
          )
        ) {
          players[i][1] += 50;
          alert("You supported the reform and received 50FP.");
        } else {
          players[i][1] -= 50;
          alert("You did not support the reform and paid a 50FP penalty.");
        }
      }

      // Check if the player landed on Impeachment & Equality Express (square 7)
      if (players[i][4] === 7) {
        players[i][1] -= 200;
        alert(
          "You landed on 'Impeachment & Equality Express' and paid a fine of 200FP."
        );
      }

      // Property purchase logic (skip for square 7)
      if (
        players[i][4] !== 7 &&
        players[i][4] !== 1 &&
        nextSquareProperty[3] === null
      ) {
        handleSquareRules(players[i][4], players[i]);
        if (
          confirm(
            "You rolled " +
              move +
              " and landed on " +
              nextSquareProperty[0] +
              ". It is for sale @ " +
              nextSquareProperty[1] +
              "FP. Do you want to purchase it?"
          )
        ) {
          players[i][1] -= nextSquareProperty[1];
          nextCellColor.innerHTML =
            '<img src="images/student1.jpg" width="30px" height="30px">';
          nextSquareProperty[3] = i;
        }
      }

      if (nextSquareProperty[3] === i + 1) {
        // Check if it's the Election Commission square
        if (players[i][4] === 9) {
          rent = nextSquareProperty[1] * 2; // Double rent for Election Commission
        } else {
          rent = nextSquareProperty[1]; // Normal rent for other squares
        }
        players[i][1] -= rent;
        players[i + 1][1] += rent;
        alert(
          "You rolled " +
            move +
            " and landed on " +
            nextSquareProperty[0] +
            (players[i][4] === 9
              ? ". This is the Election Commission! Double rent of "
              : ". It is owned by Player 2 and you paid ") +
            rent +
            "FP in rent."
        );
      }

      if (players[i][1] < 0) {
        n.removeEventListener("click", movePlayerTile);
        d.removeEventListener("click", start, { once: true });
        alert("Sorry " + "player" + (i + 1) + ", you lose!");
      }
      i++;
      document.getElementById("p1").innerHTML = "Player 1 " + player1[1] + "FP";
      document.getElementById("p2").innerHTML =
        "Player 2: " + player2[1] + "FP";
      break;

    case 1:
      document.getElementById("currentPlayer").innerHTML =
        "Player 1:" +
        '<img src="images/student1.jpg" width="30px" height="30px">';
      p = k;
      k[i - 1] = "";
      var immediateSquare = document.getElementById(
        "square" + players[i][4] + "_residents"
      );
      if (
        immediateSquare.innerHTML ==
          '<img src="images/student1.jpg" width="30px" height="30px"><img src="images/student2.png" width="30px" height="30px">' ||
        immediateSquare.innerHTML ==
          '<img src="images/student2.png" width="30px" height="30px"><img src="images/student1.jpg" width="30px" height="30px">'
      ) {
        immediateSquare.innerHTML =
          '<img src="images/student1.jpg" width="30px" height="30px">';
      } else if (
        immediateSquare.innerHTML ==
        '<img src="images/student2.png" width="30px" height="30px">'
      ) {
        immediateSquare.innerHTML = "";
      }
      roll();
      document.getElementById("lastturnmsg").innerHTML = "Dice Rolled " + move;
      for (g = 0; g < p.length; g++) {
        p[g] = "";
      }
      p[i] = "player" + [i + 1];
      nextSquare = document.getElementById(
        "square" + players[i][4] + "_residents"
      );
      if (nextSquare.innerHTML !== "") {
        nextSquare.innerHTML +=
          '<img src="images/student2.png" width="30px" height="30px">';
      } else {
        nextSquare.innerHTML =
          '<img src="images/student2.png" width="30px" height="30px">';
      }

      combine = "square" + players[i][4];
      cellcolor = "cell" + players[i][4] + "color";
      nextSquareProperty = eval(combine);
      nextCellColor = eval(cellcolor);

      // Check if the player landed on Impeachment & Equality Express (square 7)
      if (players[i][4] === 7) {
        players[i][1] -= 200;
        alert(
          "You landed on 'Impeachment & Equality Express' and paid a fine of 200FP."
        );
      }

      // Property purchase logic (skip for square 7)
      if (
        players[i][4] !== 7 &&
        players[i][4] !== 1 &&
        nextSquareProperty[3] === null
      ) {
        handleSquareRules(players[i][4], players[i]);
        if (
          confirm(
            "You rolled " +
              move +
              " and landed on " +
              nextSquareProperty[0] +
              ". It is for sale @ " +
              nextSquareProperty[1] +
              "FP Do you want to purchase it?"
          )
        ) {
          players[i][1] -= nextSquareProperty[1];
          nextCellColor.innerHTML =
            '<img src="images/student2.png" width="30px" height="30px">';
          nextSquareProperty[3] = i;
        }
      }

      if (nextSquareProperty[3] === i - 1) {
        // Check if it's the Election Commission square
        if (players[i][4] === 9) {
          rent = nextSquareProperty[1] * 2; // Double rent for Election Commission
        } else {
          rent = nextSquareProperty[1]; // Normal rent for other squares
        }
        players[i][1] -= rent;
        players[i - 1][1] += rent;
        alert(
          "You rolled " +
            move +
            " and landed on " +
            nextSquareProperty[0] +
            (players[i][4] === 9
              ? ". This is the Election Commission! Double rent of "
              : ". It is owned by Player 1 and you paid ") +
            rent +
            "FP in rent."
        );
      }

      if (players[i][1] < 0) {
        n.removeEventListener("click", movePlayerTile);
        d.removeEventListener("click", start, { once: true });
        alert("Sorry " + "player" + (i + 1) + ", you lose!");
      }
      i--;
      document.getElementById("p1").innerHTML =
        "Player 1: " + player1[1] + "FP";
      document.getElementById("p2").innerHTML =
        "Player 2: " + player2[1] + "FP";
      break;
  }
};

// roll function that calculates the dice roll and adds it to the players stored position
var roll = function () {
  move = Math.ceil(Math.random() * 6);
  console.log(move + " move");

  if (players[i][4] + move <= 12) {
    players[i][4] += move;
  } else {
    players[i][4] += move - 12;
  }
};

var n = document.getElementById("roll");
document.getElementById("roll").addEventListener("click", movePlayerTile);

// Add this function to handle square-specific rules
const handleSquareRules = function (squareNumber, player) {
  switch (squareNumber) {
    case 1: // WE THE PEOPLE
      player[1] += 200;
      alert(
        "Welcome to 'WE THE PEOPLE'! You receive 200FP for upholding democratic values!"
      );
      break;

    case 2: // Rights & Reforms Rally
      if (
        confirm(
          "You landed on 'Rights & Reforms Rally'. Support constitutional reform? (Yes: +50FP, No: -50FP)"
        )
      ) {
        player[1] += 50;
        alert("You supported the reform and received 50FP.");
      } else {
        player[1] -= 50;
        alert("You opposed the reform and paid 50FP.");
      }
      break;

    case 3: // Constitutional Carousel
      const constitutionalChoice = confirm(
        "Welcome to Constitutional Carousel! You can either:\n" +
          "OK: Draft a new constitutional amendment (+100FP if successful, -50FP if fails)\n" +
          "Cancel: Play it safe and study existing amendments (+30FP guaranteed)"
      );

      if (constitutionalChoice) {
        // Player chose to draft amendment
        const success = Math.random() > 0.6; // 40% chance of success
        if (success) {
          alert(
            "Your proposed amendment was well-received! Gain 100FP for contributing to constitutional development!"
          );
          player[1] += 100;
        } else {
          alert(
            "Your amendment proposal needs more work. Lose 50FP, but keep trying!"
          );
          player[1] -= 50;
        }
      } else {
        // Player chose to study
        alert(
          "You spent time studying the constitutional amendments. Knowledge is power! Gain 30FP."
        );
        player[1] += 30;
      }
      break;

    case 4: // Liberty & Law Labyrinth
      if (
        confirm(
          "Test your knowledge: Is Right to Education a Fundamental Right? (Yes/No)"
        )
      ) {
        player[1] += 100;
        alert(
          "Correct! Right to Education (Article 21A) is a Fundamental Right. Gain 100FP!"
        );
      } else {
        player[1] -= 50;
        alert("Incorrect! Study the Fundamental Rights. Lose 50FP.");
      }
      break;

    case 5: // Fundamental Freedom Frenzy
      const freedoms = Math.ceil(Math.random() * 50);
      alert(`Exercise your fundamental freedoms! Collect ${freedoms}FP!`);
      player[1] += freedoms;
      break;

    case 6: // Democracy Dash
      if (Math.random() > 0.5) {
        alert("Your democratic initiative succeeded! Gain 100FP!");
        player[1] += 100;
      } else {
        alert("Your bill didn't pass. Try again next time! Lose 50FP.");
        player[1] -= 50;
      }
      break;

    case 7: // Impeachment & Equality Express
      player[1] -= 200;
      alert("Impeachment proceedings cost 200FP!");
      break;

    case 8: // Judiciary Journey
      if (
        confirm(
          "Will you uphold justice? Take on a Public Interest Litigation?"
        )
      ) {
        player[1] += 150;
        alert("Justice served! Receive 150FP for your service!");
      }
      break;

    case 9: // Directive Principles Drive
      alert("Implement a welfare scheme! State policy grants you 75FP!");
      player[1] += 75;
      break;

    case 10: // Amendment Alley
      if (Math.random() > 0.7) {
        alert("Your amendment proposal passed! Gain 200FP!");
        player[1] += 200;
      } else {
        alert("Amendment failed to get majority. Lose 100FP.");
        player[1] -= 100;
      }
      break;

    case 11: // Parliament Pathways
      const vote = Math.random() > 0.5;
      alert(
        vote
          ? "Your bill passed! Gain 150FP!"
          : "Bill defeated in parliament. Lose 75FP."
      );
      player[1] += vote ? 150 : -75;
      break;

    case 12: // Supreme Strides
      alert(
        "Reached the Supreme Court! Review a constitutional matter for 100FP!"
      );
      player[1] += 100;
      break;
  }
};
