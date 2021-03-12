fetch("https://www.alphavantage.co/query?function=OVERVIEW&symbol=IBM&apikey=QBSQ77JR2A4TL11S")
.then((resp) => resp.json())
.then(function(data) {
  console.log(data)
  if(typeof data.Description !== "undefined") {
    document.getElementById("company-description").innerHTML = data.Description
    document.getElementById("employee-count").innerHTML = data.FullTimeEmployees
    document.getElementById("year-end-date").innerHTML = data.FiscalYearEnd
    document.getElementById("gross-profit").innerHTML = "$" + data.GrossProfitTTM
    document.getElementById("eps").innerHTML = data.EPS
  } else {
    document.getElementById("company-description").innerHTML = "This looks really great."
  }
})


fetch("https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=IBM&apikey=QBSQ77JR2A4TL11S")
.then((resp) => resp.json())
.then(function(data) {
  console.table(data["Time Series (Daily)"])
  
  let date = []
  let open = []
  let close = []
  
  for(var item in data["Time Series (Daily)"]) {
    date.push(item)
    open.push(data["Time Series (Daily)"][item]["1. open"])
    close.push(data["Time Series (Daily)"][item]["4. close"])
  }
  
  console.log(date)
  console.log(open)
  console.log(close)
  var ctx = document.getElementById('stock-tracker');
  var data = {
    labels: date,
    datasets: [{
        label: "Opening Price",
        fill: false,
        lineTension: 0.1,
        borderColor: "#42DE5C", // The main line color
        borderCapStyle: 'square',
        borderDash: [], // try [5, 15] for instance
        borderDashOffset: 0.0,
        borderWidth: 1,
        borderJoinStyle: 'miter',
        pointBorderColor: "#202020",
        pointBackgroundColor: "white",
        pointBorderWidth: 1,
        pointHoverRadius: 8,
        pointHoverBackgroundColor: "#42DE5C",
        pointHoverBorderWidth: 2,
        pointRadius: 4,
        pointHitRadius: 10,
        data: open,
        spanGaps: true,
      }, {
        label: "Closing Price",
        fill: false,
        lineTension: 0.3,
        borderColor: "#B11226", // The main line color
        borderCapStyle: 'square',
        borderDash: [], // try [5, 15] for instance
        borderDashOffset: 0.0,
        borderWidth: 1,
        borderJoinStyle: 'miter',
        pointBorderColor: "#161616",
        pointBackgroundColor: "white",
        pointBorderWidth: 1,
        pointHoverRadius: 8,
        pointHoverBackgroundColor: "#B11226",
        pointHoverBorderWidth: 2,
        pointRadius: 4,
        pointHitRadius: 10,
        data: close,
        spanGaps: true,
      }

    ]
  };
      
  var myChart = new Chart(ctx, {
      type: 'line',
      data: data,
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
})