const vorpal = require('vorpal')();
const chalk = vorpal.chalk;

class VorpalActor
	{
	initialize(selfActor)
		{
			this.selfActor = selfActor;

			this.selfActor.getLog().info("Actor initialize [" + selfActor + "]");
			return 	this.selfActor;
		}

	setup(data)
		{
			this.selfActor.getLog().info("Actor setup for [" + this.selfActor.name + "] with data: " + data);

			console.log("");
			console.log(chalk.yellow("\tVoral Library is setting up some stuff"));
			console.log("");

			vorpal
			  .command('foo', 'Outputs "bar".')
			  .action(function(args, callback)
						{
			    	this.log("bar");
			    	callback();
			  		});
			vorpal
				.command('clear', 'Clears console window".')
				.action(function(args, callback)
						{
						console.clear();
						callback();
						});


			vorpal
			  .delimiter(chalk.yellow('Enter Command:'))
			  .show();

		}

	displayStartupInfo()
		{
			console.log("");
			console.log(chalk.green("\tReady, try typing help to see what commands are available"));
			console.log("");
		}

	}

module.exports = VorpalActor
