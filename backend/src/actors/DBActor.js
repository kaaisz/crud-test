const CsvDb = require('csv-db');

class DBActor
  {
    initialize(selfActor)
    {
      this.selfActor = selfActor;

      this.selfActor.getLog().info("Actor initialize [" + selfActor + "]");
      this.csvDb = new CsvDb('./database/db.csv', ['id', 'username', 'password']);

      return this.selfActor;
    }


    test()
    {
      // call getrecord, insertRecord etc from here, this function will be
      // called when the actor starts up correctly
    var aRecord = this.getRecord(1);
    console.log("I GOT RECORD 1 " + aRecord);

    }

    getRecord(id)
    {

    }

    insertRecord(newData)
    {

    }

    updateRecord(data, id)
    {}

    deleteRecord(id)
    {}

    setup(csvFile)
      {
        this.selfActor.getLog().info(this.selfActor + " - Setting up Database");


        this.csvDb.get().then((data) =>
          {
          var aLine = "";
          this.selfActor.getLog().warn("SENSITIVE DATA");
          for (var i = 1; i < data.length-1; i++)
            {
              aLine = "";
              for(var key in data[0])
                  {
                  var value = data[i][key];
                  aLine = aLine + " - " + value;
                  }
            this.selfActor.getLog().info(aLine);
            }
          })
      }

   displayStartupInfo()
    {
      this.selfActor.getLog().info(this.selfActor + " - Connection should be established");
      this.test();
    }
  }


  module.exports = DBActor
