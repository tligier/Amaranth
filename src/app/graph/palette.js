/* jshint esversion:6 */
palette = {
	"ice1": ["#D8DBE2", "#A9BCD0", "#58A4B0", "#373F51", "#1B1B1E"],
	"ice2": ["#E8F1F2", "#1B98E0", "#247BA0", "#006494", "#13293D"],
	"salmon1": ["#E09F7D", "#EF5D60", "#EC4067", "#A01A7D", "#311847"],
	"water": ["#6FFFE9", "#5BC0BE", "#3A506B", "#1C2541", "#0B132B"],
	"purple": ["#9E0031", "#8E0045", "#770058", "#600047", "#44001A"],
	"green1": ["#50FFB1", "#4FB286", "#3C896D", "#546D64", "#4D685A"],
	"green2": ["#2BC016", "#26A96C", "#32936F", "#387D7A", "#395E66"],
	"green3": ["#F0F3BD", "#02C39A", "#00A896", "#028090", "#05668D"],
	"redbluepastels": ["#4281A4", "#9CAFB7", "#EAD2AC", "#E6B89C", "#FE938C"],
	"blue9": ["rgb(247,251,255)","rgb(222,235,247)","rgb(198,219,239)","rgb(158,202,225)","rgb(107,174,214)","rgb(66,146,198)","rgb(33,113,181)","rgb(8,81,156)","rgb(8,48,107)"],
	"red9": ["#FCF0EF", "#EDC7C7", "#EDA6A6", "#EA8C8C", "#DD5D5D", "#CE4646", "#C62D2D", "#AF2121", "#8C1919"],
	"yellow9": ["#F9F0D3", "#EAD5B4", "#EDCC9C", "#EDC180", "#EDB765", "#EDAA47", "#F2A22B", "#E88F0B", "#C67700"],
	"green9": ["#E8F8DF", "#BFF2C2", "#A5EFAA", "#83EF8B", "#67EF70", "#4BED56", "rgb(47,240,58)", "#20C92B", "#1CAF26"],
	"legendary5": ["#5bc0eb", "#fde74c", "#9bc53d", "#e55934", "#fa7921"],
	"marleke": ["#1be7ff", "#6eeb83", "#e4ff1a", "#e8aa14", "#ff5714"],
	"crunchy": ["#f6511d", "#ffb400", "#00a6ed", "#7fb800", "#0d2c54"],
	"pastels8": ["#727272", "#F1595F", "#79C36A", "#599AD3", "#F9A65A", "#9E66AB", "#CD7058", "#D77FB3"],
	"green4": ["#A1DD73", "#37A144", "#199057", "#006F56", "#0C605A"],
	"a0": ["#23d998", "#4159ab", "#ff1493"],
	bright10: ["#ffb400", "#f6511d", "#ff1493", "#9E66AB", "#9E0031", "#0d2c54", "#006F56", "#7fb800", "#23d998", "#00a6ed"],
	colorsPriorite: ['#FE938C', '#EAD2AC', '#4281A4'],
	d3category20bs: '393b795254a36b6ecf9c9ede6379398ca252b5cf6bcedb9c8c6d31bd9e39e7ba52e7cb94843c39ad494ad6616be7969c7b4173a55194ce6dbdde9ed6'.match(/.{6}/g).map((d,i,a) => '#' + a[(i%5+1)*4-1-Math.floor(i/5)]),
	d3category20b: '393b795254a36b6ecf9c9ede6379398ca252b5cf6bcedb9c8c6d31bd9e39e7ba52e7cb94843c39ad494ad6616be7969c7b4173a55194ce6dbdde9ed6'.match(/.{6}/g).map(d => '#' + d),
	d3category20: '1f77b4aec7e8ff7f0effbb782ca02c98df8ad62728ff98969467bdc5b0d58c564bc49c94e377c2f7b6d27f7f7fc7c7c7bcbd22dbdb8d17becf9edae5'.match(/.{6}/g).map(d => '#' + d)
};
//{name: "purple", values: ["9E0031", "8E0045", "770058", "600047", "44001A"]},

function showPalette(id) {
	let w = 80, h = 80, p = 0.9, offsetx = 100, maxw = d3.max(Object.keys(palette).map(function(d) { return palette[d].length; }));
	var svg = d3.select(id).append("svg")
		.attr("height", function(d) { return Object.keys(palette).length*h; })
		.attr("width", function(d) { return offsetx + maxw*w; });
	var g = svg.selectAll(".g").data(Object.keys(palette)).enter().append("g")
		.attr("transform", function(d,i) { return "translate(0," + i*h + ")"; });
	g.append("text")
		.text(function(d) { return d; })
		.attr("y", 30);
	var rect = g.selectAll(".rect").data(function(d) { return palette[d]; }).enter().append("rect")
		.attr("width", w)
		.attr("height", h*p)
		.attr("x", function(d,i) { return i*w+offsetx; })
		.attr("style", function(d) { return "fill:" + d; });
	
}

window.onload = function () {
	var url = window.location.href.split('/');
	if(url[url.length-1] === "palette.html") {
		showPalette('#chart');
	}
};
