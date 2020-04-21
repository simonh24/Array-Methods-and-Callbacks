import { fifaData } from './fifa.js';
console.log(fifaData);


// ⚽️ M  V P ⚽️ //

/* Task 1: Investigate the data above. Practice accessing data by console.log-ing the following pieces of data 

(a) Home Team name for 2014 world cup final
(b) Away Team name for 2014 world cup final
(c) Home Team goals for 2014 world cup final
(d) Away Team goals for 2014 world cup final
(e) Winner of 2014 world cup final */

const taskOne = fifaData.filter(item => item.Year === 2014 && item.Stage === "Final");
console.log(taskOne[0]["Home Team Name"]);
console.log(taskOne[0]["Away Team Name"]);
console.log(taskOne[0]["Home Team Goals"]);
console.log(taskOne[0]["Away Team Goals"]);
console.log(taskOne[0]["Win conditions"]);

/* Task 2: Create a function called  getFinals that takes `data` as an argument and returns an array of objects with only finals data */

function getFinals(data) {
    return data.filter(item => item.Stage === "Final");
};

/* Task 3: Impliment a higher-order function called `getYears` that accepts the callback function `getFinals`, and returns an array called `years` containing all of the years in the dataset */

function getYears(data, cb) {
    return cb(data).map(item => item.Year);
};

console.log(getYears(fifaData, getFinals));


/* Task 5: Impliment a higher-order function called `getWinners`, that accepts the callback function `getFinals()` and determine the winner (home or away) of each `finals` game. Return the name of all winning countries in an array called `winners` */ 

function getWinners(data, cb) {

    let winners = [];
    const finals = cb(data);
    finals.forEach(element => {
        if (element["Home Team Goals"] > element["Away Team Goals"]) {
            winners.push(element["Home Team Name"]);
        } else if (element["Away Team Goals"] > element["Home Team Goals"]) {
            winners.push(element["Away Team Name"]);
        } else {
            winners.push(element["Win conditions"].substring(0, element["Win conditions"].indexOf(" ")));
        }
    });
    return winners;
};

console.log(getWinners(fifaData, getFinals));

/* Task 6: Implement a higher-order function called `getWinnersByYear` that accepts the following parameters and returns a set of strings "In {year}, {country} won the world cup!" 

Parameters: 
 * callback function getWinners
 * callback function getYears
 */

function getAllWinners(data, cb, cbTwo) {
    const year = cb(data);
    const country = cbTwo(data, cb);
    // let out = [];
    // for (let i = 0; i < year.length; i++) {
    //     out.push(`In ${year[i].Year}, ${country[i]} won the world cup!`);
    // }
    // return out;
    return year.map((item, i) => (`In ${year[i].Year}, ${country[i]} won the world cup!`));
};

console.log(getAllWinners(fifaData, getFinals, getWinners));

/* Task 7: Create a function called `getCountryWins` that takes the parameters `data` and `team initials` and returns the number of world cup wins that country has had. 

Hint: Investigate your data to find "team initials"!
Hint: use `.reduce` */

function getCountryWins(data, teamInitials) {
    return data.reduce((acc, element) => {
        if (element["Home Team Goals"] > element["Away Team Goals"] && element["Home Team Initials"] === teamInitials) {
            acc += 1;
        } else if (element["Away Team Goals"] > element["Home Team Goals"] && element["Away Team Initials"] === teamInitials) {
            acc += 1;
        }
        return acc;
    }, 0)
};

console.log(getCountryWins(getFinals(fifaData), "ITA"));


/* Task 8: Write a function called getGoals() that accepts a parameter `data` and returns the team with the most goals score per appearance (average goals for) in the World Cup finals */
// getfinals
// home/away teams -> add into a new object.
// [{team name, appearances, goals}, {}]
// loop through getfinals to see team name

function getGoals(data) {
    const counterMap = {};
    data.forEach(game => {
        // logic here to determine mapping from team -> # goals (home vs away)
        const awayTeam = game["Away Team Initials"];
        const homeTeam = game["Home Team Initials"];
        if (counterMap[awayTeam]) {
          counterMap[awayTeam].goals += game["Away Team Goals"];
          counterMap[awayTeam].games += 1
          counterMap[awayTeam].avg = counterMap[awayTeam].goals / counterMap[awayTeam].games;
        } else {
          counterMap[awayTeam] = {
            goals: game["Away Team Goals"],
            games: 1,
            avg: game["Away Team Goals"],
          }
        }
        if (counterMap[homeTeam]) {
            counterMap[homeTeam].goals += game["Home Team Goals"];
            counterMap[homeTeam].games += 1,
            counterMap[homeTeam].avg = counterMap[homeTeam].goals / counterMap[homeTeam].games;
          } else {
            counterMap[homeTeam] = {
              goals: game["Home Team Goals"],
              games: 1,
              avg: game["Home Team Goals"],
            }
          }
      });
    const initials = Object.keys(counterMap);
    let max = counterMap[initials[0]].avg;
    let teamInitials = initials[0];
    initials.forEach(item => {
        if (counterMap[item].avg > max) {
            max = counterMap[item].avg;
            teamInitials = item;
        }
    });
    return teamInitials;
};

console.log(getGoals(getFinals(fifaData)));


/* Task 9: Write a function called badDefense() that accepts a parameter `data` and calculates the team with the most goals scored against them per appearance (average goals against) in the World Cup finals */

function badDefense(data) {
    const counterMap = {};
    data.forEach(game => {
        // logic here to determine mapping from team -> # goals (home vs away)
        const awayTeam = game["Away Team Initials"];
        const homeTeam = game["Home Team Initials"];
        if (counterMap[awayTeam]) {
          counterMap[awayTeam].goals += game["Home Team Goals"];
          counterMap[awayTeam].games += 1
          counterMap[awayTeam].avg = counterMap[awayTeam].goals / counterMap[awayTeam].games;
        } else {
          counterMap[awayTeam] = {
            goals: game["Home Team Goals"],
            games: 1,
            avg: game["Home Team Goals"],
          }
        }
        if (counterMap[homeTeam]) {
            counterMap[homeTeam].goals += game["Away Team Goals"];
            counterMap[homeTeam].games += 1,
            counterMap[homeTeam].avg = counterMap[homeTeam].goals / counterMap[homeTeam].games;
          } else {
            counterMap[homeTeam] = {
              goals: game["Away Team Goals"],
              games: 1,
              avg: game["Away Team Goals"],
            }
          }
      });
    const initials = Object.keys(counterMap);
    let max = counterMap[initials[0]].avg;
    let teamInitials = initials[0];
    initials.forEach(item => {
        if (counterMap[item].avg > max) {
            max = counterMap[item].avg;
            teamInitials = item;
        }
    });
    return teamInitials;
};

console.log(badDefense(getFinals(fifaData)));


/* Task 10: Write a function called `getAverageGoals` that accepts a parameter `data` and returns the the average number of home team goals and away team goals scored per match (Hint: use .reduce and do this in 2 steps) */

function getAverageGoals(data) {
    let homeAverage = data.reduce((acc, item) =>{
        acc += item["Home Team Goals"];
        return acc;
    }, 0);
    homeAverage /= data.length;
    let awayAverage = data.reduce((acc, item) => {
        acc += item["Away Team Goals"];
        return acc;
    }, 0);
    awayAverage /= data.length;
    return `Home Team Goal Average: ${homeAverage} || Away Team Goal Average: ${awayAverage}`;
};

console.log(getAverageGoals(fifaData));


/// STRETCH 🥅 //

/* Use the space below to work on any stretch goals of your chosing as listed in the README file. */

function teamGoals(data, teamInitials) {
    return data.reduce((acc, element) => {
        if (element["Home Team Initials"] === teamInitials) {
            acc += element["Home Team Goals"];
        } else if (element["Away Team Initials"] === teamInitials) {
            acc += element["Away Team Goals"];;
        }
        return acc;
    }, 0)
}

console.log(teamGoals(fifaData, "ITA"));

function teamAppearances(data, teamInitials) {
    return data.reduce((acc, element) => {
        if (element["Home Team Initials"] === teamInitials) {
            acc += 1;
        } else if (element["Away Team Initials"] === teamInitials) {
            acc += 1;
        }
        return acc;
    }, 0)
}

console.log(teamAppearances(fifaData, "ITA"));

function addCountries(data) {    
    const counterMap = {};
    data.forEach(game => {
    // logic here to determine mapping from team -> # goals (home vs away)
    const awayTeam = game["Away Team Name"];
    const homeTeam = game["Home Team Name"];
    if (counterMap[awayTeam]) {
      counterMap[awayTeam].games += 1
    } else {
      counterMap[awayTeam] = {
        games: 1,
      }
    }
    if (counterMap[homeTeam]) {
        counterMap[homeTeam].games += 1
    } else {
        counterMap[homeTeam] = {
          games: 1,
        }
      }
  });
    const names = Object.keys(counterMap);
    names.forEach(element => {
        let tag = document.createElement("h1");
        let text = document.createTextNode(element);
        tag.appendChild(text);
        document.body.appendChild(tag);
    })
}

addCountries(fifaData);