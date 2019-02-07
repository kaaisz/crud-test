






// This class represents the root of our application, it will co-ordinate all the steps necessary to start
// our application
class ServerApp
	{
	// our constuctor is called each time a new instance of our class is created
	  initialize(selfActor)
			{
			this.selfActor = selfActor;

			this.selfActor.getLog().info("Actor initialize [" + selfActor + "]");
			return 	this.selfActor;
			}



  	setup(applicationTitle)
			{
				this.selfActor.getLog().info("Actor setup for [" + this.selfActor.name + "] with title " + applicationTitle);


				// lets change the application's title, so it is reflected in terminal
				process.title = applicationTitle;

  		}

    // not really useful for anything, I just added to show off process.argv and output some
		// debug information, such as the node path, platform etc.
	displayStartupInfo()
		{
		// here we will use 'process' to retrieve some useful information about our environment
		// See https://nodejs.org/api/process.html - to see what else you can do with nodejs's 'process'

		// this indicates which 'nodejs' installation is running our application
		this.selfActor.getLog().info("Node Path: " + process.argv[0]);
		// the current working folder, where our application is running from
		this.selfActor.getLog().info("Current Working Folder: " + process.cwd());
		// the current working 'script' that is currently active
		this.selfActor.getLog().info("Active Script: " + process.argv[1]);

		// Display the current platform
		this.selfActor.getLog().info("Platform: " + process.platform);
		}


	}

// exports = Cat; // It will not work with `new Cat();`
// exports.Cat = Cat; // It will require `new Cat.Cat();` to work (yuck!)
module.exports = ServerApp
