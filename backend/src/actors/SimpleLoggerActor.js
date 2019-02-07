


// Import the simple-node-logger so we can configure our 'logger'
const SimpleLogger = require('simple-node-logger');
// Configure the fileformat we want to use for the logger
const LOG_TIMEFORMAT = 'YYYY-MM-DD HH:mm:ss.SSS'
// Where logs should be saved to disk
const LOG_DIR = './logs/'
// If using single log file mode, the specific file we will use to save logs to
const LOG_FILE = LOG_DIR + 'server-app.log';
// If using rolling log file mode, the fileNAmePattern we should use
const LOG_FILE_PATTERN='server-app-<DATE>.log'
// what date format should we use for rolling logs
const LOG_ROLLING_DATE_FORMAT='YYYY.MM.DD';

/*
Here we have two options for loggerOptionsRolling

 		The first sets up a rolling log (meaning log filenames change depending on date)
		The second, uses a specific filename to write logs to

 Which one you implement is up to you, or check out
 		https://www.npmjs.com/package/simple-node-logger -- for more info
*/

const loggerOptionsRolling =
			{
        logDirectory:LOG_DIR, // NOTE: folder must exist and be writable...
        fileNamePattern:LOG_FILE_PATTERN,
        dateFormat:LOG_ROLLING_DATE_FORMAT
			};

const loggerOptions =
			{
        logFilePath:LOG_FILE,
        timestampFormat:LOG_TIMEFORMAT
    	};


class SimpleLoggerActor
	{
    initialize(selfActor)
			{
      this.selfActor = selfActor;
			this.selfActor.getLog().info("Actor initialize [" + selfActor + "]");
      return 	this.selfActor;
			}

    setup(useRolling)
  		{
      this.useRolling = useRolling;
      this.selfActor.getLog().info("Actor setup for [" + this.selfActor.name  + "] with value useRolling: " + this.useRolling );

      this.log = {}

  		if (useRolling===true)
  			{
  			this.log = SimpleLogger.createRollingFileLogger(loggerOptionsRolling);
        this.log.info("SimpleLoggerActor: " + loggerOptionsRolling)
  			}
  		else
  			{
  			this.log = SimpleLogger.createSimpleLogger(loggerOptions);
  			}


  		//this.log.info("Simple-Node-Logger is active");
  		return this.log;
  		}

    displayStartupInfo()
      {
      this.log.info("Simple Node Logger is active - useRolling: " + this.useRolling);
      }
  }

  module.exports = SimpleLoggerActor
