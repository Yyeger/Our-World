//<![CDATA[
Chart.defaults.global = {
  animation: true,
  animationSteps: 60,
  animationEasing: "easeOutQuart",
  showScale: true,
  scaleOverride: false,
  scaleSteps: null,
  scaleStepWidth: null,
  scaleStartValue: null,
  scaleLineColor: "rgba(0,0,0,.1)",
  scaleLineWidth: 1,
  scaleShowLabels: true,
  scaleLabel: "<%=value%>",
  scaleIntegersOnly: true,
  scaleBeginAtZero: false,
  scaleFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
  scaleFontSize: 12,
  scaleFontStyle: "normal",
  scaleFontColor: "#666",
  responsive: false,
  maintainAspectRatio: true,
  showTooltips: true,
  customTooltips: false,
  tooltipEvents: ["mousemove", "touchstart", "touchmove"],
  tooltipFillColor: "rgba(0,0,0,0.8)",
  tooltipFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
  tooltipFontSize: 14,
  tooltipFontStyle: "normal",
  tooltipFontColor: "#fff",
  tooltipTitleFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
  tooltipTitleFontSize: 14,
  tooltipTitleFontStyle: "bold",
  tooltipTitleFontColor: "#fff",
  tooltipYPadding: 6,
  tooltipXPadding: 6,
  tooltipCaretSize: 8,
  tooltipCornerRadius: 6,
  tooltipXOffset: 10,
  tooltipTemplate: "<%if (label){%><%=label%>: <%}%><%= value %> Tonnellate di CO2.",
  multiTooltipTemplate: "<%= value %>",
  onAnimationProgress: function() {},
  onAnimationComplete: function() {}
}

Chart.defaults.global.responsive = false;

Chart.types.Doughnut.extend({
  name: "DoughnutTextInside",
  showTooltip: function() {
    this.chart.ctx.save();
    Chart.types.Doughnut.prototype.showTooltip.apply(this, arguments);
    this.chart.ctx.restore();
  },
  draw: function() {
    Chart.types.Doughnut.prototype.draw.apply(this, arguments);

    var width = this.chart.width,
      height = this.chart.height;

    var fontSize = (height / 140).toFixed(2);
    this.chart.ctx.font = fontSize + "em Verdana";
    this.chart.ctx.textBaseline = "middle";

    var red = $("#red").slider("value"),
      green = $("#green").slider("value"),
      blue = $("#blue").slider("value"),
      yellow = $("#yellow").slider("value"),
    sienna = $("#sienna").slider("value"),
      gold = $("#gold").slider("value"),
      violet = $("#violet").slider("value");
    var text = (red + green + blue + yellow + sienna + gold + violet) + " Miliardi";
    var textX = Math.round((width - this.chart.ctx.measureText(text).width) / 2);
    var textY = height / 2;
    if (localStorage.getItem('mode') == null)  {
        this.chart.ctx.fillStyle = '#000000';
    } else {
        this.chart.ctx.fillStyle = '#ffffff';

    }
    this.chart.ctx.fillText(text, textX, textY);
  }
});

var data = [{
  value: 5,
  color: "#7f2a22",
  highlight: "#7f2a22",
  label: "Trasporti"
}, {
  value: 5,
  color: "#f9040d",
  highlight: "#f9040d",
  label: "Industrie"
}, {
  value: 5,
  color: "#c15557",
  highlight: "#c15557",
  label: "Edifici"
}, {
  value: 5,
  color: "#8ee835",
  highlight: "#8ee835",
  label: "Agricoltura"
}, {
  value: 5,
  color: "#357fe8",
  highlight: "#357fe8",
  label: "Spreco"
}, {
  value: 5,
  color: "#ffe866",
  highlight: "#ffe866",
  label: "Dispersa"
}, {
  value: 5,
  color: "#3f4754",
  highlight: "#3f4754",
  label: "Sconosciuta"
}]



function hexFromRGB(r, g, b) {
  var hex = [
    r.toString(16),
    g.toString(16),
    b.toString(16)
  ];
  $.each(hex, function(nr, val) {
    if (val.length === 1) {
      hex[nr] = "0" + val;
    }
  });
  return hex.join("").toUpperCase();
}

function refreshSwatch() {
  var red = $("#red").slider("value"),
    green = $("#green").slider("value"),
    blue = $("#blue").slider("value"),
    yellow = $("#yellow").slider("value"),
    sienna = $("#sienna").slider("value"),
    gold = $("#gold").slider("value"),
    violet = $("#violet").slider("value");
  /*if (red < 2) {
    $("#red").slider("option", "value", 2);
    return false;
  }
  if (green < 2) {
    $("#green").slider("option", "value", 2);
    return false;
  }
  if (blue < 2) {
    $("#blue").slider("option", "value", 2);
    return false;
  }
  if (yellow < 2) {
    $("#yellow").slider("option", "value", 2);
    return false;
  }
  if (sienna < 2) {
    $("#sienna").slider("option", "value", 2);
    return false;
  }
  if (gold < 2) {
    $("#gold").slider("option", "value", 2);
    return false;
  }
  if (violet < 2) {
    $("#violet").slider("option", "value", 2);
    return false;
  }*/
  var hex = hexFromRGB(red, green, blue);
  $("#swatch").css("background-color", "#" + hex);
  myDoughnutChart.segments[0].value = blue;
  myDoughnutChart.segments[1].value = red;
  myDoughnutChart.segments[2].value = green;
  myDoughnutChart.segments[3].value = yellow;
  myDoughnutChart.segments[4].value = sienna;
  myDoughnutChart.segments[5].value = gold;
  myDoughnutChart.segments[6].value = violet;
  myDoughnutChart.update();
}
$(function() {
  $("#red, #green, #blue, #yellow, #sienna, #gold, #violet").slider({
    orientation: "horizontal",
    range: "min",
    min: 0,
    max: 12,
    value: 10,
    slide: refreshSwatch,
    change: refreshSwatch
  });
  $("#red").slider("value", 1);
  $("#green").slider("value", 1);
  $("#blue").slider("value", 1);
  $("#yellow").slider("value", 1);
  $("#sienna").slider("value", 1);
  $("#gold").slider("value", 1);
  $("#violet").slider("value", 1);

});

function valoriveri() {
    $("#red").slider("value", 12);
    $("#green").slider("value", 9);
    $("#blue").slider("value", 8);
    $("#yellow").slider("value", 10);
    $("#sienna").slider("value", 1);
    $("#gold").slider("value", 4);
    $("#violet").slider("value", 5);
}

function daltoniccolours() {
    if (data[0].color != "#b2182b") {

        data[0].color = "#b2182b";
        data[0].highlight = "#b2182b";
        document.querySelector("#red .ui-slider-range").style.background = "#b2182b";
        document.querySelector("#red .ui-slider-range-min").style.background = "#b2182b";

        data[1].color = "#ef8a62";
        data[1].highlight = "#ef8a62";
        document.querySelector("#green .ui-slider-range").style.background = "#ef8a62";

        data[2].color = "#fddbc7";
        data[2].highlight = "#fddbc7";
        document.querySelector("#blue .ui-slider-range").style.background = "#fddbc7";

        data[3].color = "#f7f7f7";
        data[3].highlight = "#f7f7f7";
        document.querySelector("#yellow .ui-slider-range").style.background = "#f7f7f7";

        data[4].color = "#d1e5f0";
        data[4].highlight = "#d1e5f0";
        document.querySelector("#sienna .ui-slider-range").style.background = "#d1e5f0";

        data[5].color = "#67a9cf";    
        data[5].highlight = "#67a9cf";
        document.querySelector("#gold .ui-slider-range").style.background = "#67a9cf";

        data[6].color = "#2166ac";    
        data[6].highlight = "#2166ac";
        document.querySelector("#violet .ui-slider-range").style.background = "#2166ac";

    } else {

        data[0].color = "#7f2a22";
        data[0].highlight = "#7f2a22";
        document.querySelector("#red .ui-slider-range").style.background = "#7f2a22";

        data[1].color = "#f9040d";
        data[1].highlight = "#f9040d";
        document.querySelector("#green .ui-slider-range").style.background = "#f9040d";

        data[2].color = "#c15557";
        data[2].highlight = "#c15557";
        document.querySelector("#blue .ui-slider-range").style.background = "#c15557";

        data[3].color = "#8ee835";
        data[3].highlight = "#8ee835";
        document.querySelector("#yellow .ui-slider-range").style.background = "#8ee835";

        data[4].color = "#357fe8";
        data[4].highlight = "#357fe8";
        document.querySelector("#sienna .ui-slider-range").style.background = "#357fe8";

        data[5].color = "#ffe866";    
        data[5].highlight = "#ffe866";
        document.querySelector("#gold .ui-slider-range").style.background = "#ffe866";

        data[6].color = "#3f4754";    
        data[6].highlight = "#3f4754";
        document.querySelector("#violet .ui-slider-range").style.background = "#3f4754";
    }

    myDoughnutChart.destroy();
    myDoughnutChart = new Chart(ctx).DoughnutTextInside(data, {
        responsive: false
      });
    myDoughnutChart.update();
   
}


var ctx = $("#myChart").get(0).getContext("2d");
var myDoughnutChart = new Chart(ctx).DoughnutTextInside(data, {
  responsive: false
});

//]]>

if (window.parent && window.parent.parent){
    window.parent.parent.postMessage(["resultsFrame", {
      height: document.body.getBoundingClientRect().height,
      slug: "9wp4f693"
    }], "*")
  }

  // always overwrite window.name, in case users try to set it manually
  window.name = "result"


