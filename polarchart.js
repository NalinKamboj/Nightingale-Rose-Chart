function createData(){
    let data = [];
    //Creating the data first...
    data.push({ category: "January", value3: 1022.8, value2: 30.7, value1: 120 });
    data.push({ category: "February", value3: 822.8, value2: 16.3, value1: 140.1 });
    data.push({ category: "March", value3: 480.3, value2: 12.8, value1: 68.6 });
    data.push({ category: "April", value3: 177.5, value2: 17.9, value1: 21.2 });
    data.push({ category: "May", value3: 171.8, value2: 16.6, value1: 12.5 });
    data.push({ category: "June", value3: 247.6, value2: 64.5, value1: 9.6 });
    data.push({ category: "July", value3: 107.5, value2: 37.7, value1: 9.3 });
    data.push({ category: "August", value3: 129.9, value2: 44.1, value1: 6.7 });
    data.push({ category: "September", value3: 47.5, value2: 69.4, value1: 5 });
    data.push({ category: "October", value3: 32.8, value2: 13.6, value1: 4.6 });
    data.push({ category: "November", value3: 56.4, value2: 10.5, value1: 10.1 });
    data.push({ category: "December", value3: 25.3, value2: 5, value1: 7.8 });

    console.log("DATA CREATED...");
    console.log(data);

    drawChart(data);
}

function drawChart(data){
    am4core.useTheme(am4themes_dark);
    am4core.useTheme(am4themes_animated);
    var chart = am4core.create("polarchart", am4charts.RadarChart);
    chart.hiddenState.properties.opacity = 0;

    chart.data = data;
    chart.radius = am4core.percent(100);

    console.log("STARTING DRAWING >>>>");
    var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "category";
    categoryAxis.renderer.labels.template.location = 0.5;
    categoryAxis.renderer.tooltipLocation = 0.5;
    categoryAxis.renderer.grid.template.disabled = true;
    categoryAxis.renderer.labels.template.disabled = true;

    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.tooltip.disabled = true;
    valueAxis.renderer.labels.template.horizontalCenter = "left";
    valueAxis.renderer.grid.template.disabled = true;

    var series1 = chart.series.push(new am4charts.RadarColumnSeries());
    series1.name = "Other";
    series1.dataFields.categoryX = "category";
    series1.dataFields.valueY = "value1";
    series1.columns.template.strokeOpacity = 0.2;
    series1.stacked = true;
    series1.sequencedInterpolation = true;
    series1.columns.template.width = am4core.percent(100);
    series1.columns.template.tooltipText = "{valueY}";

    var series2 = chart.series.push(series1.clone());
    series2.name = "Wounds";
    series2.dataFields.valueY = "value2";
    series2.fill = chart.colors.next();
    // series2.stroke = am4core.color("#2196f3");

    var series3 = chart.series.push(series1.clone());
    series3.name = "Disease";
    series3.fill = chart.colors.next();
    series3.dataFields.valueY = "value3";
    // series3.stroke = am4core.color("#88ffff");

    chart.seriesContainer.zIndex = -1;

    chart.scrollbarX = new am4core.Scrollbar();
    chart.scrollbarX.exportable = false;
    chart.scrollbarY = new am4core.Scrollbar();
    chart.scrollbarY.exportable = false;

    chart.cursor = new am4charts.RadarCursor();
    chart.cursor.xAxis = categoryAxis;
    chart.cursor.fullWidthXLine = true;
    chart.cursor.lineX.strokeOpacity = 0;
    chart.cursor.lineX.fillOpacity = 0.1;
    chart.cursor.lineX.fill = am4core.color("#000000");

    //Creating legend..
    chart.legend = new am4charts.Legend();
    chart.legend.position = "right";
    chart.legend.labels.template.text = "[bold]{name}[/]";
}