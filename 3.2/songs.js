const topRockSongs = [
  { artist: "Fleetwod Mac", title: "Dreams", sales_and_streams: 1882000 },
  { artist: "AJR", title: "Bang!", sales_and_streams: 1627000 },
  { artist: "Imagine Dragons", title: "Believer", sales_and_streams: 1571000 },
  { artist: "Journey", title: "Don't Stop Believin'", sales_and_streams: 1497000 },
  { artist: "Eagles", title: "Hotel California", sales_and_streams: 1393000 }
];

const topRockSongsSection = d3.select("#top-songs");

topRockSongsSection
    .append("h3")
    .text("Top Rock Songs");

const pi = 3.141592654;

const circleChartWidth = 600;        
const circleChartHeight = 160;
const circleValueHeight = 40;
const circleLabelHeight = 40;
const circleMargin = 30;
const maxCircleRadius = (circleChartHeight - circleValueHeight - circleLabelHeight) / 2;

const maxCircleArea = pi * Math.pow(maxCircleRadius, 2);

const circleScale = d3.scaleLinear()
    .domain([0, d3.max(topRockSongs, d => d.sales_and_streams)])
    .range([0, maxCircleArea]);

const circlesChart = topRockSongsSection
    .append("svg")
        .attr("viewbox", [0, 0, circleChartWidth, circleChartHeight])
        .attr("width", circleChartWidth)
        .attr("height", circleChartHeight)
        .attr("style", "background-color:#fafffa; border: 2px solid #eee");

circlesChart        
    .append("line")
        .attr("x1", 0)
        .attr("y1", circleChartHeight / 2)
        .attr("x2", circleChartWidth)
        .attr("y2", circleChartHeight / 2)
        .attr("stroke", "#eee")
        .attr("stroke-width", 2);

const circlesChartGroup = circlesChart        
    .selectAll("g")
        .data(topRockSongs)
        .join("g");

// Add circles
circlesChartGroup
    .append("circle")
        .attr("cx", (d, i) => circleMargin + (circleMargin + maxCircleRadius * 2) * i + circleRadiusFromArea(d))
        .attr("cy", circleChartHeight / 2)
        .attr("r", d => circleRadiusFromArea(d))
        .attr("fill", "#5555ff");

// Add values
circlesChartGroup
    .append("text")
    .attr("class", "label label-value")
    .attr("x", (d, i) => circleMargin + (circleMargin + maxCircleRadius * 2) * i + circleRadiusFromArea(d))
    .attr("y", circleValueHeight / 2)
    .attr("text-anchor", "middle")
    .attr("dominant-baseline", "central")
    .text(d => (d.sales_and_streams / 1000000) + "M");

// Add Title labels
circlesChartGroup.append("text")
    .attr("class", "label label-value")
    .attr("x", (d, i) => circleMargin + (circleMargin + maxCircleRadius * 2) * i + circleRadiusFromArea(d))
    .attr("y", circleValueHeight + (maxCircleRadius * 2) + circleLabelHeight / 2)
    .attr("text-anchor", "middle")
    .attr("dominant-baseline", "central")
    .text(d => d.title);

function circleRadiusFromArea(d) {
  return Math.sqrt((circleScale(d.sales_and_streams) / pi));
}