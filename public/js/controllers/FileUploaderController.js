angular.module('FileUploaderController', []).controller('FileUploaderController',function($scope, Upload,Event) {

$scope.lines;
$scope.asd;
$scope.dataFromJWS;
//var c=10;
//var d=50;
//$scope.a;
//$scope.b;
////////////////get the unique products//////////////////////
$scope.getUniqueProducts = function()
{
  var ar=$scope.events;
    var newarr=[];
  for(var i=0;i< ar.length-1;i++)
  {
    newarr[i]=ar[i].product;
  }

  var destArray = _.uniq(newarr, function(x){
      return x;

  });
  $scope.countsOfProduct=[];
  var countList=[];
  for(var j=0;j<destArray.length;j++)
    {
      var ab=0;
      for(var i=0;i<ar.length;i++)
        {
            //var ab=0;
            if(ar[i].product===destArray[j])
                {
                    ab+=1;
                }
        }
        countList[j]=ab;
    }
    for(var i=0;i<8;i++)
    {
      $scope.countsOfProduct.push({
      product: destArray[i],
      count: countList[i]
    })
  }
  $scope.generateBarChart();

};

////////////////Get the prduct of maximun Price value////////////
$scope.getCountFromProductJWS = function()
{
  Event.getCountFromProductJWS($scope.ProductOfMax)
  .success(function(data){

    var stringCountProduc=JSON.stringify(data);
    var countProductExtracted = /\d+/;

  $scope.countFromMaxProduct = stringCountProduc.match(countProductExtracted);
  })
      .error(function (error) {
        //  $scope.status = 'Unable to load event data: ';
  });
}

////////////////Get the prduct of maximun Price value////////////
$scope.getCountFromMaxProductJWS = function()
{
  Event.getCountFromProductJWS($scope.ProductOfMax)
  .success(function(data){

    var stringCountProduc=JSON.stringify(data);
    var countProductExtracted = /\d+/;

  $scope.countFromMaxProduct = stringCountProduc.match(countProductExtracted);
  })
      .error(function (error) {
        //  $scope.status = 'Unable to load event data: ';
  });
}

////////////////Get the prduct of minimum Price value////////////
$scope.getCountFromMinProductJWS = function()
{
  Event.getCountFromProductJWS($scope.ProductOfMin)
  .success(function(data){

    var stringCountProduc=JSON.stringify(data);
    var countProductExtracted = /\d+/;

  $scope.countFromMinProduct = stringCountProduc.match(countProductExtracted);
  })
      .error(function (error) {
        //  $scope.status = 'Unable to load event data: ';
  });
}


////////////////Get the prduct of maximum Price value////////////
$scope.getProductOfMaxValue = function()
{
  if($scope.numFromMax[0]!==null)
  {
  Event.getProductFromMinJWS($scope.numFromMax[0])
  .success(function(data){

  $scope.ProductOfMax = data.product;

  })
      .error(function (error) {
        //  $scope.status = 'Unable to load event data: ';
  })}
}
////////////////Get the prduct of minimum Price value////////////
$scope.getProductOfMinValue = function()
{
  Event.getProductFromMinJWS($scope.numFromMin[0])
  .success(function(data){

  $scope.ProductOfMin = data.product;

  })
      .error(function (error) {
        //  $scope.status = 'Unable to load event data: ';
  });
}
////////////////////////////////////////////////////////////////

//getMinFromService();
$scope.getMinFromService = function()
{
  Event.getFromMinJWS()
  .success(function(data1){
    var stringData=JSON.stringify(data1);
    var numExtracted = /\d+/;
    $scope.numFromMin = stringData.match(numExtracted);
                          })
  .error(function (error) {

                        });
};

///////////////////////////////////////////////////////////
//getMaxFromService();
$scope.getMaxFromService = function()

{
  Event.getFromMaxJWS()
  .success(function(data){
    var stringDataMax=JSON.stringify(data);
    var numExtractedMax = /\d+/;

  $scope.numFromMax = stringDataMax.match(numExtractedMax);
  })
      .error(function (error) {

  });
};

///////////////////////////////////////////////////////////
//getCountFromService();

$scope.getCountFromService = function()

{
  Event.getFromCountJWS()
  .success(function(data){
    var stringDataCount=JSON.stringify(data);
    var numExtractedCount = /\d+/;

  $scope.numFromCount = stringDataCount.match(numExtractedCount);
  })
      .error(function (error) {

  });
};

///////////////////////////////////////////////////////////
/*$scope.getAvgFromService = function()
{
  Event.getFromAvgJWS()
  .success(function(data){
    //$scope.avgFromJWS=data;
    var stringDataAvg=JSON.stringify(data);
    var numExtractedAvg = /\d+(\.\d{1,2})?/;
  //var s = "you can enter maximum 500 choices";
  $scope.numFromAvg = stringDataAvg.match(numExtractedAvg);
  })
      .error(function (error) {
        //  $scope.status = 'Unable to load event data: ';
  });
}*/
//////////////////////bar char script////////////////////
$scope.generateBarChart=function(){
var data =[
{"product":1,"frequency":$scope.countsOfProduct[0].count},
{"product":2,"frequency":$scope.countsOfProduct[1].count},
{"product":3,"frequency":$scope.countsOfProduct[2].count},
{"product":4,"frequency":$scope.countsOfProduct[3].count},
{"product":5,"frequency":$scope.countsOfProduct[4].count},
{"product":6,"frequency":$scope.countsOfProduct[5].count},
{"product":7,"frequency":$scope.countsOfProduct[6].count},
{"product":8,"frequency":$scope.countsOfProduct[7].count}
]

d3.select("#chartID").selectAll("svg").remove();

		var margin = {top:10, right:10, bottom:20, left:30};
		var width = 380 - margin.left - margin.right;
		var height = 250 - margin.top - margin.bottom;
		var xScale = d3.scale.ordinal().rangeRoundBands([0, width], .5)
		var yScale = d3.scale.linear()
			  .range([height, 0]);

		var xAxis = d3.svg.axis()
			  .scale(xScale)
			  .orient("bottom");

		var yAxis = d3.svg.axis()
			  .scale(yScale)
			  .orient("left");

		var svgContainer = d3.select("#chartID").append("svg")
				.attr("width", width+margin.left + margin.right)
				.attr("height",height+margin.top + margin.bottom)
				.append("g")
				.attr("transform", "translate("+ margin.left +","+ margin.top +")");

		xScale.domain(data.map(function(d) { return d.product; }));
		yScale.domain([0, d3.max(data, function(d) { return d.frequency; })]);

		var xAxis_g = svgContainer.append("g")
					.attr("class", "x axis")
					.attr("transform", "translate(0," + (height) + ")")
          .call(xAxis);;


		var yAxis_g = svgContainer.append("g")
					.attr("class", "y axis")
          .call(yAxis)
				.append("text")
					.attr("transform", "rotate(-90)")
					.attr("y", 6).attr("dy", ".71em")
					.style("text-anchor", "end").text("Frequency");

		svgContainer.selectAll(".bar")
      		.data(data)
			.enter().append("rect")
      		.attr("class", "bar")
      		.attr("x", function(d) { return xScale(d.product); })
      		.attr("width", xScale.rangeBand())
      		.attr("y", function(d) { return yScale(d.frequency); })
      		.attr("height", function(d) { return height - yScale(d.frequency); });

		d3.select(window).on('resize', resize);

		function resize() {
			console.log('----resize function----');
		  // update width
		  width = parseInt(d3.select('#chartID').style('width'), 10);
		  width = width - margin.left - margin.right;

		  height = parseInt(d3.select("#chartID").style("height"));
		  height = height - margin.top - margin.bottom;
			console.log('----resiz width----'+width);
			console.log('----resiz height----'+height);
			// resize the chart
			if(width<870){
				//xScale.range([0, width]);
				xScale.rangeRoundBands([0, width], .1);
				yScale.range([height, 0]);

				yAxis.ticks(Math.max(height/50, 2));
				xAxis.ticks(Math.max(width/50, 2));

				d3.select(svgContainer.node().parentNode)
					.style('width', (width + margin.left + margin.right) + 'px');

				svgContainer.selectAll('.bar')
					.attr("x", function(d) { return xScale(d.product); })
				  .attr("width", xScale.rangeBand());

				svgContainer.select('.x.axis').call(xAxis.orient('bottom'));
			}
		}
}
////////////////////////////////////////////////////////
$scope.generatePieChart = function()
{

  data = [{"label":"Below", "value":$scope.b},
  {"label":"Above", "value":$scope.a}];

var w = 300,h = 300,r = 100,
color = d3.scale.category20c();

var $container = $('#ssss'),
  t = 2 * Math.PI,
  width = $container.width(),
  height = $container.height(),
  outerRadius = Math.min(width,height)/2,
  //innerRadius = (outerRadius/5)*3,
  fontSize = (Math.min(width,height)/4);

  d3.select("#ssss").selectAll("svg").remove();

var canvas = d3.select("#ssss").append("svg:svg").data([data])
.attr("width", w)
.attr("height", h)
.append("svg:g")
.attr("transform", "translate(" + r + "," + r + ")")

var arc = d3.svg.arc()
.outerRadius(r);

var pie = d3.layout.pie()
.value(function(d) { return d.value; });

var arcs = canvas.selectAll("g.slice")
.data(pie)
.enter()
.append("svg:g")
      .attr("class", "slice");

arcs.append("svg:path")
      .attr("fill", function(d, i) { return color(i); } )
      .attr("d", arc)
      .append("svg:title")
      .text(function(d) { return d.value;});

arcs.append("svg:text")
      .attr("transform", function(d) {
      d.innerRadius = 0;
      d.outerRadius = r;
      return "translate(" + arc.centroid(d) + ")";
  })
  .attr("text-anchor", "middle")
  .text(function(d, i) { return data[i].label; });
  };


//////////////////////testing java API/////////////
getDataFromJWS();
  //$scope.events;
        function getDataFromJWS()
        {
            Event.getfromJavaAPI()
            .success(function(data){
              $scope.dataFromJWS=data;

            })
                .error(function (error) {
                  //  $scope.status = 'Unable to load event data: ';
            });

        }
/////////////////////sending data to CEP///////////////////
$scope.sendQueryToCep = function(queryString){
  $scope.query=queryString;
   console.log($scope.query);
  var s=$scope.ConvertToCSV($scope.events);

}

/////////////////////graph////////////////////////////
$scope.checkForPriceLevel = function (priceLevel)
{
  var al=$scope.events;
    $scope.b=al.length;
    var abc = 0;
    var givenPrice=parseInt(priceLevel);
  for(var i=0;i< al.length-1;i++)
  {
    var storedPrice=parseInt(al[i].price);
   if(storedPrice >= givenPrice ){
    abc += 1;
   }
  }
  $scope.a=abc;
  $scope.b=$scope.b-$scope.a;
   //window.location.reload();
$scope.generatePieChart();

};

///////////////////////Convert to CSV ///////////////////////
$scope.ConvertToCSV = function (events)
{
        var objArray=JSON.stringify(events);
           var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
           var str = 'date,time,information,product,price\n';

           for (var i = 0; i < array.length; i++) {
               var line = '';
                   /*line += array[i].dat;
                   line += ',';
                   line += array[i].tim;
                   line += ',';
                   line += array[i].details;*/
                   for (var index in array[i]) {

                    if (line != '') line += ','
                    if(!(index === '$$hashKey' || index === '_id')){

                    line += array[i][index];
                  }
                }

               str += line + '\n';
           }
            $scope.asd=str;

            var csvData = {
              dat: str
            };

           Event.postDataToCepFs(csvData)
               .success(function () {
                   $scope.status = 'Reading the selected file';
                  })
               .error(function (error) {
                 //  $scope.status = 'Unable to insert data: ' ;
               });

        return str;
       };

////////////////Delete the available data/////////////////////////////////
$scope.deleteAllData = function () {
  var result = confirm("Want to delete?");
if (result) {
    Event.deleteAllDataNew()
    .success(function(){
      console.log("All Deleted");
       window.location.reload();
    })
    .error(function (error) {
          //  $scope.status = 'Unable to delete event data: ';
    });
}
};
/////////////////testing-selecting row data/////////////////////////////////////////
  $scope.getSelected = function () {
    var ar = $scope.events.filter(
      function (value) {
        if (value.checked == 1) {
          return true;
        } else {
          return false;
        }
      }
      );
    //console.log(ar[0].dat);
    var totalLength=$scope.events.length;
    var selected =ar.length;
    alert(selected+' available out of '+totalLength);

    return ar;
  };

/////////////////////getting uploaded log file events////////////////////

getEventsOfUploadedFile();
  $scope.events;
        function getEventsOfUploadedFile()
        { console.time('getUploadRead');
            Event.getUploadReadNew()
            .success(function(event){
            $scope.events=event;
              end = new Date().getTime();
            })
                .error(function (error) {
                  //  $scope.status = 'Unable to load event data: ';
            })
            .finally(function() {
              console.timeEnd('getUploadRead');
    });
        }

  ///////////////////////////////////////////////////
  $scope.fileDetails;

  function getEvents()
  {
      Event.getRead()
      .success(function(details){
      $scope.fileDetails=details;
      })
          .error(function (error) {
            //  $scope.status = 'Unable to load event data: ';
      });
  }
////////////Reading selected file/////////////////////////////
  $scope.fileChanged = function() {
  var logFile;
  var words;
      // define reader
      var reader = new FileReader();

      // A handler for the load event (just defining it, not executing it right now)
      reader.onload = function(e) {
          $scope.$apply(function() {
              $scope.txtFile = reader.result;
               logFile = e.target.result;
               $scope.addFileContents(logFile);
                //window.location.reload();
          });
           window.location.href = "/EventWindow";
      };

      // get <input> element and the selected file
      var txtFileInput = document.getElementById('fileInput');
      var txtFile = txtFileInput.files[0];

      // use reader to read the selected file
      // when read operation is successfully finished the load event is triggered
      // and handled by our reader.onload function
      var st= reader.readAsText(txtFile);
      };
  ///////////////////////////////////////////////////
  $scope.addFileContents= function(readDetails)
  {
  //read line by line
  lines = readDetails.split('\n');

   for(var line = 0; line < lines.length; line++){
     var logFileContent = "";
    //console.log(lines[line]);
     var linesSpace = lines[line].split(' ');

     for(var y=2;y <= linesSpace.length-3;y++){
      logFileContent +=linesSpace[y];
     logFileContent += " ";
        }
        var event = {
      dat: linesSpace[0],
      tim: linesSpace[1],
      details: logFileContent,
      product:linesSpace[linesSpace.length-2],
      price:linesSpace[linesSpace.length-1]
    //  space:linesSpace[3]
    };

    Event.ReadUploadFileNew(event)
        .success(function () {
            $scope.status = 'Read the selected file';
            //$scope.fileDetails.push(event);
        })
        .error(function (error) {
          //  $scope.status = 'Unable to insert data: ' ;
        });

      }
  }


  ///////////////////////////////////////////////////
  $('.table').on('clicked.rs.row', function (evt){
    // Now it's safe to check what was selected
    var rows = $(this).selectedrows();
    console.log(rows);
  });

////////////////////////////////////////////////////////
      $scope.uploadFile = function () {

        $scope.fileSelected = function($file) {
          console.log($file);
          Event.sendFile($file)
          .success(function () {
              $scope.status = 'Inserted event! Refreshing event list.';
              $scope.names.push(event);
          }).
          error(function (error) {
              //$scope.status = 'Unable to insert Event: ' + error.message;
          });
       window.location.reload();

      };
      };
  //////////////////////////////////////////////////////////
   });
