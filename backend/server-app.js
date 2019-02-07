
const vorpal = require('vorpal')();
const chalk = vorpal.chalk;


const AppName = "backend-boilerplate";
console.log(chalk.red("Loaded:\t\t " + AppName));
console.log(chalk.red("Loaded:\t\t Volpar Framework"));

// We intend on using Comedy to take advantage of the ActorSystem's so we import it.
// See: https://www.npmjs.com/package/comedy#module-defined-actors for more details
const actors = require('comedy');
console.log(chalk.red("Loaded:\t\t Comedy Framework"));


// lets make our actor system

const actorSystem = actors();
console.log(chalk.red("Loaded:\t\t Actor System"));


// get a referece to actorSystem logs
var logger = actorSystem.getLog();
console.log(logger.levels())
console.log(chalk.red("Loaded:\t\t Actor System Logger"));
logger.setLevel(logger.levels().Debug);
//logger.setLevel(logger.levels().Silent);


// I just use this to name the application. This gets applied to process.title
// see: https://nodejs.org/api/process.html#process_process_title for why I do that


// I just use this because I implemented two methods of 'logging'
// one rolls over the logs, the other, writes directly to a specific log file.
// check SimpleLoggerActor.js for more details
const SimpleLoggerRollingLogs = false

// since we are going to load multiple 'Actors' on startup, I chose to store their
// locations and initial startup values in a 2D array which I intend to load in
// a loop later. This makes it easy to add or remove actors and setups just by
// appending, modifying or deleting the references in this array
var ActorsToLoad = [
                    ["/src/actors/ServerApp", AppName],
                    ["/src/actors/SimpleLoggerActor", SimpleLoggerRollingLogs],
                    ["/src/actors/VorpalActor", ""],
                    ["/src/actors/HTTPServerActor",8080],
                    ["/src/actors/DBActor","./database/db.csv"]
                   ];




console.log(chalk.yellow("Number of Actors that will be loaded: \t\t" + ActorsToLoad.length));

// when I have loaded the actors above, I will place the actor references inside this array
// for convienence;
var loadedActors = []

console.log(chalk.yellow("Number of Currently Actors Loaded:\t\t" + loadedActors.length));




// for each 'Actor' and Data'
ActorsToLoad.forEach(value => {
                                  // load a new actor, we use the value in the 2d array
                                  // from ActorsToLoad to access the 'key' 'value' pair
                                  var anActor = LoadActor(value[0],value[1]);
                                  // then push that actor to the array
                                  loadedActors.push(anActor);
                                })

// here is where we actually load an actor, it is called into by the foreach loop above for each
// of the elements in the first dimension of the 2d array.
function LoadActor(actorToLoad, data)
  {
  return actorSystem // call the actorSystem
    .rootActor() // get a root actor reference
    .then(rootActorPromise => {
                              childActorPromise = rootActorPromise.createChild(actorToLoad)
                              .then(aPromiseToTheActorWeWant =>
                                      {
                                      // when the promise is fullfilled, send a message to the setup function and give it
                                      // the value of 'data'
                                      aPromiseToTheActorWeWant.send("setup",data);
                                      aPromiseToTheActorWeWant.send("displayStartupInfo");
                                      //return aPromiseToTheActorWeWant
                                      })
                              })

  }
  console.log(chalk.yellow("New Number of Actors Loaded:\t\t\t" + loadedActors.length))
