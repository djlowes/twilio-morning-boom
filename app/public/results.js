$(document).ready(function() {
  // Push into individual question arrays in preparation for slice & dice
  var qTwo = [];
  var qThree = [];
  var qFour = [];
  var object = {}

  // Call API
  var xhr = new XMLHttpRequest();
  var url = 'https://api.surveymonkey.com/v3/surveys/130879901/rollups';
  xhr.open('GET', url);
  xhr.setRequestHeader('Authorization', 'bearer skOm0AUVeqEG.cbTveAdLBZJctQ6LRTVDmr9DN84t5LJ38LaDJyqWY2mkr4T8gWSX.FMLEyDvfLRXO50Dx4Ec7pnFAS1erpDuC7fLw9XYj0bcOXekUt4hPkc.6hebnKJ');
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onload = function() {
      if (xhr.status === 200) {
          console.log("Great success");
      }
      else {
          console.log('Request failed.  Returned status of ' + xhr.status);
      }
      object = JSON.parse(xhr.response);
      qTwo.push(object.data[1].summary[0].choices);
      qThree.push(object.data[2].summary[0].choices);
      qFour.push(object.data[3].summary[0].choices);

      for (let j = 0; j < qTwo.length; j++) {
            for (let k = 0; k < qTwo[j].length; k++) {
              }
              var bOne = qTwo[j][0].count;
              var sOne = qTwo[j][1].count;
              var cOne = qTwo[j][2].count;
              var hOne = qTwo[j][3].count;
            }

      for (let j = 0; j < qThree.length; j++) {
            for (let k = 0; k < qThree[j].length; k++) {
              }
              var bTwo = qThree[j][0].count;
              var sTwo = qThree[j][1].count;
              var cTwo = qThree[j][2].count;
              var hTwo = qThree[j][3].count;
            }

      for (let j = 0; j < qFour.length; j++) {
            for (let k = 0; k < qFour[j].length; k++) {
              }
              var bThree = qFour[j][0].count;
              var sThree = qFour[j][1].count;
              var cThree = qFour[j][2].count;
              var hThree = qFour[j][3].count;
            }

      var bFour = bOne + bTwo + bThree;
      var sFour = sOne + sTwo + sThree;
      var cFour = cOne + cTwo + cThree;
      var hFour = hOne + hTwo + hThree;

      var ctxOne = document.getElementById("one").getContext('2d');
        var chartOne = new Chart(ctxOne, {
          type: 'bar',
          data: {
            labels: ["Barry's Bootcamp", "Soul Cycle", "Basecamp Fitness", "HitFitSF"],
            datasets: [{
              label: 'Click to see more data',
              backgroundColor: 'rgba(255,223,230,1)',
              borderColor: 'rgba(255,99,132,1)',
              borderWidth: 1,
              data: [bOne, sOne, cOne, hOne],
            }]
          },
          options: {
            scales: {
              yAxes: [{
                ticks: {
                  beginAtZero: true
                }
              }]
            }
          }
        });

      var ctxThree = document.getElementById("two").getContext('2d');
        var myChartThree = new Chart(ctxThree, {
          type: 'doughnut',
          data: {
            labels: ["Barry's Bootcamp", "Soul Cycle", "Basecamp Fitness", "HitFitSF"],
            datasets: [{
              backgroundColor: [
                "#2ecc71",
                "#f1c40f",
                "#95a5a6",
                "#9b59b6"
              ],
              data: [bTwo, sTwo, cTwo, hTwo]
            }]
          }
        });

        var ctxTwo = document.getElementById("three").getContext('2d');
          var chartTwo = new Chart(ctxTwo, {
            type: 'horizontalBar',
            data: {
              labels: ["Barry's Bootcamp", "Soul Cycle", "Basecamp Fitness", "HitFitSF"],
              datasets: [{
                label: 'Click to see more data',
                backgroundColor: 'rgba(179, 220, 247, 1)',
                borderColor: 'rgba(54, 160, 235, 1)',
                borderWidth: 1,
                data: [bThree, sThree, cThree, hThree],
              }]
            },
            options: {
              scales: {
                xAxes: [{
                  ticks: {
                    beginAtZero: true
                  }
                }]
              }
            }
          });

        var ctxFour = document.getElementById("four").getContext("2d");
          var data = {
            labels: ["Barry's Bootcamp", "Soul Cycle", "Basecamp Fitness", "HitFitSF"],
            datasets: [{
              label: "Best Atmosphere",
              borderColor: "rgba(1, 175, 178, 1)",
              backgroundColor: 'rgba(93, 193, 178, 1)',
              data: [bOne, sOne, cOne, hOne]
            }, {
              label: "Best Instructors",
              borderColor: "rgba(230, 230, 0, 1)",
              backgroundColor: 'rgba(255, 255, 153, 1)',
              data: [bTwo, sTwo, cTwo, hTwo]
            }, {
              label: "Hardest Workout",
              borderColor: "rgba(141, 134, 124, 1)",
              backgroundColor: 'rgba(141, 134, 146, 1)',
              data: [bThree, sThree, cThree, hThree]
            },{
              label: "Best Overall",
              borderColor: "rgba(241, 170, 34, 1)",
              backgroundColor: 'rgba(241, 170, 115, 1)',
              data: [bFour, sFour, cFour, hFour]
            }]
          };
          var myChartFour = new Chart(ctxFour, {
            type: 'bar',
            data: data,
            options: {
              barValueSpacing: 20,
              scales: {
                yAxes: [{
                  ticks: {
                    beginAtZero: true,
                  }
                }]
              }
            }
          });

  };
  xhr.send();

});
