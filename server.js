var express = require("express");
var cors = require("cors"); 
var app = express();
var fs = require("fs");

app.use(cors());

// Endpoint to Get a list of jobs
app.get("/getJobs", function (req, res) {
  fs.readFile(__dirname + "/" + "joblist.json", "utf8", function (err, data) {
    if (err) {
      res.status(500).send("Error reading file");
      return;
    }

    const jobs = JSON.parse(data).jobs;

    // Get search query parameters
    const { company, position, location } = req.query;

    let filteredJobs = jobs;

    // Apply filters if query parameters are provided
    if (company) {
      filteredJobs = filteredJobs.filter((job) =>
        job.company.toLowerCase().includes(company.toLowerCase())
      );
    }
    if (position) {
      filteredJobs = filteredJobs.filter((job) =>
        job.position.toLowerCase().includes(position.toLowerCase())
      );
    }
    if (location) {
      filteredJobs = filteredJobs.filter((job) =>
        job.location.toLowerCase().includes(location.toLowerCase())
      );
    }

    res.json({ jobs: filteredJobs });
  });
});

// Create a server to listen at port 8080
var server = app.listen(8080, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log("REST API demo app listening at http://%s:%s", host, port);
});
