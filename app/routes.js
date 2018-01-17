  // grab the  models we just created
  var Event = require('./models/sampleEvents');
  var Event1 = require('./models/readingFiles');
  var Event2 = require('./models/readingFilesAsOne');
  var filesReadUploads = require('./models/readUploadFile');
  var filesReadUploadsNews = require('./models/readUploadFileNew');
  var wordsRead = require('./models/allWordsOfLogFile');

      module.exports = function(app) {

          app.get('/api/events', function(req, res) {

              Event.find(function(err, events) {


                  if (err)
                      res.send(err);

                  res.json(events);
              });
          });

          app.get('/api/eventRead', function(req, res) {

              Event1.find(function(err, events) {


                  if (err)
                      res.send(err);

                  res.json(events);
              });
          });
//////////////////////getting uploaded events - New//////////////////////////
  app.get('/api/eventUploadReadNew', function(req, res) {

                filesReadUploadsNews.find(function(err, events) {

                      if (err)
                            res.send(err);
                        res.json(events);
                        });
                    });

//////////////////////getting uploaded events//////////////////////////
          app.get('/api/eventUploadRead', function(req, res) {

              filesReadUploads.find(function(err, events) {

                  if (err)
                      res.send(err);
                  res.json(events);
              });
          });

////////////////////////get selected events from database///////////////
          app.get('*', function(req, res) {
           res.sendfile('./public/views/index.html');
          });

          //post api
          app.post('/api/events', function(req, res) {
              var event=new Event({
              name:req.body.name

              });
              event.save(function(err) {
              if (err)
                  res.send(err);

              res.json({ message: 'event created!' });
          });

          });
//////////////////////////////////////////////////////////////////////
          //upload
          app.post('/api/sendDataToCepFs', function(req, res) {

            var fs = require("fs");
            var path = "D:\\Bsc.IT(Hons)\\Final Year Project\\Testing Projects\\Anushaka\\jersey-service\\src\\main\\resources\\MyInputFile.csv";

            var data=req.body.dat;
              fs.writeFile(path, data, function(error) {
                   if (error) {
                     console.error("write error:  " + error.message);
                   } else {
                     console.log("Successful sent to CEP");
                   }
              });

          });
////////////////////////////////////////////////////////////
          /** API path that will upload the files */
        //  app.post('/api/upload', function(req, res) {
        //    upload(req,res,function(err){
        //        if(err){
        //             res.json({error_code:1,err_desc:err});
        //             return;
        //              }
        //             res.json({error_code:0,err_desc:null});
          //        });
        //    });
//////////////////////////////////////////////////////////////
        app.post('/api/readFilesAsOne', function(req, res) {

      var eventReadAsOne=new Event2({
        //id:req.body.id,
        details:req.body.details

      });

      eventReadAsOne.save(function(err) {
      if (err)
          res.send(err);

      res.json({ message: 'Read file!' });
  });
          });
  ///////////////////////////////////////////////////////////
  app.post('/api/wordsRead', function(req, res) {

  var words=new wordsRead({
    //id:req.body.id,
      word:req.body.word,

  });

  words.save(function(err) {
      if (err)
      return res.send(err);

      res.json({    message: 'saved word!'  });
            });
      });

  //////////////////////////////////////////////////////////////
  ///////////posting Log data to the Database as a batch
        app.post('/api/filesReadUploads', function(req, res) {
        var events=new filesReadUploads({
          //id:req.body.id,
            dat:req.body.dat,
            tim:req.body.tim,
            details:req.body.details,

          //  space:req.body.space
        });

        events.save(function(err) {
            if (err)
            return res.send(err);
        res.json({    message: 'Saved file!'  });
                  });
            });
/////////////////////////////////////////////////////////////////////////////////
/////posting Log data to the Database as a batch with new details/////////////////
        app.post('/api/filesReadUploadsNews', function(req, res) {
          var events1=new filesReadUploadsNews({
            //id:req.body.id,
              dat:req.body.dat,
              tim:req.body.tim,
              details:req.body.details,
              product:req.body.product,
              price:req.body.price,
            //  space:req.body.space
          });

          events1.save(function(err) {
              if (err)
              return res.send(err);
          res.json({    message: 'Saved file!'  });
                    });
              });
///////////////////////////////////////////////////////////////////
          app.get('/api/getEventsOnDate', function(req, res) {

              Event.find(function(err, events) {


                  if (err)
                      res.send(err);

                  res.json(events);
              });
          });
////////////////////////////////////////////////////////////
////////delete All documents/////////////////////////////
app.delete('/api/deleteAll', function(req, res) {

  filesReadUploads.remove({},function(err) {
            if (err) {
                console.log(err)
            } else {
                res.end('success');
            }
        });
});
//////////////////////////delete All documents-new Format//////////////
app.delete('/api/deleteAllNew', function(req, res) {

  filesReadUploadsNews.remove({},function(err) {
            if (err) {
                console.log(err)
            } else {
                res.end('success');
            }
        });
});


      };
