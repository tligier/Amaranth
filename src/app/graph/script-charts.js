/*jshint esversion: 6 */
/* globals d3, dictToModify */
var mois = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
var data1 = [{mois:'Janvier', serie1:2, serie2:5}, {mois:'Février', serie1:9, serie2:3}, {mois:'Mars', serie1:15, serie2:6}, {mois:'Avril', serie1:12, serie2:4},
			{mois:'Mai', serie1:2, serie2:5}, {mois:'Juin', serie1:9, serie2:3}, {mois:'Juillet', serie1:15, serie2:6}, {mois:'Août', serie1:12, serie2:4},
			{mois:'Septembre', serie1:2, serie2:5}, {mois:'Octobre', serie1:9, serie2:3}, {mois:'Novembre', serie1:15, serie2:6}, {mois:'Décembre', serie1:12, serie2:4}];
//multilinechart
var data2 = [{name: 'serie1', values: [{name:'Janvier', value:2}, {name:'Février', value:9}, {name:'Mars', value:15}, {name:'Avril', value:12},{name:'Mai', value:2}, {name:'Juin', value:9},
			{name:'Juillet', value:15}, {name:'Août', value:12},{name:'Septembre', value:2}, {name:'Octobre', value:9}, {name:'Novembre', value:15}, {name:'Décembre', value:12}]},
			{name: 'serie2', values: [{name:'Janvier', value:13}, {name:'Février', value:25}, {name:'Mars', value:13}, {name:'Avril', value:24},{name:'Mai', value:31}, {name:'Juin', value:28},
			{name:'Juillet', value:8}, {name:'Août', value:19},{name:'Septembre', value:9}, {name:'Octobre', value:26}, {name:'Novembre', value:22}, {name:'Décembre', value:13}]}];
//multibarchart
var data3 = [{name:'Janvier', values:[{name:'ouverts', value:2}, {name:'fermes', value:9}]}, {name:'Février', values:[{name:'ouverts', value:2}, {name:'fermes', value:9}]},
			{name:'Mars', values:[{name:'ouverts', value:2}, {name:'fermes', value:9}]}, {name:'Avril', values:[{name:'ouverts', value:2}, {name:'fermes', value:9}]},
			{name:'Mai', values:[{name:'ouverts', value:2}, {name:'fermes', value:9}]}, {name:'Juin', values:[{name:'ouverts', value:2}, {name:'fermes', value:9}]},
			{name:'Juillet', values:[{name:'ouverts', value:2}, {name:'fermes', value:9}]}, {name:'Août', values:[{name:'ouverts', value:2}, {name:'fermes', value:9}]},
			{name:'Septembre', values:[{name:'ouverts', value:2}, {name:'fermes', value:9}]}, {name:'Octobre', values:[{name:'ouverts', value:2}, {name:'fermes', value:9}]},
			{name:'Novembre', values:[{name:'ouverts', value:2}, {name:'fermes', value:9}]}, {name:'Décembre', values:[{name:'ouverts', value:2}, {name:'fermes', value:9}]}];
//barchart, linechart, areachart, piechart, legend
var data4 = [{name:'Janvier', value:2}, {name:'Février', value:9}, {name:'Mars', value:15}, {name:'Avril', value:12},{name:'Mai', value:2}, {name:'Juin', value:9},
			{name:'Juillet', value:15}, {name:'Août', value:12},{name:'Septembre', value:2}, {name:'Octobre', value:9}, {name:'Novembre', value:15}, {name:'Décembre', value:12}];
//partitionpichart
var data5 = {name: 'root', children: [{name: '1', children: [{name: 'a', value: 30}, {name: 'n', value: 70}, {name: '2', value: 30}, {name: '3', value: 70}, {name: '4', value: 30},
			{name: '5', value: 70}, {name: '6', value: 30}, {name: '7', value: 70}, {name: '8', value: 30}, {name: '9', value: 70}]}, {name: '2', children: [{name: 'a', value: 30},
			{name: 'n', value: 70}]}, {name: '3', children: [{name: 'a', value: 30}, {name: '10', value: 70}]}, {name: '4', children: [{name: 'n', value: 30}]}]};
var color = ['#23d998', '#4159ab', '#ff1493'];
 // window.onload = function() {
	/*var mbc = drawMultiBarChart('#barchart', data3);
	var bc = drawBarChart('#barchart', data4);
	var mlc = drawMultiLineChart('#barchart', data2);
	var lc = drawLineChart('#barchart', data4);
	var ac = drawAreaChart('#barchart', data4);
	var ppc = drawPartitionPieChart('#barchart', data5);
	var pc = drawPieChart('#barchart', data4);
	var lc = drawLegend('#barchart', data4);
	drawMiniPieChart('#barchart', [25,68], {type:'arc'});
	drawMiniPieChart('#barchart', [25,68,12], {type:'pie'});*/
	//setInterval(function() { lc.update(data4.map(d => {name:d.name, value:Math.round(d.value*Math.random()*10)}), 2000) },3000);
	//setInterval(function() { mlc.update(data2.map(function(c) {name:c.name, values:c.values.map(d => { return {name:d.name, value:d.value*Math.random()*1000}; })}), 2000) },3000);
	//setInterval(function() { mbc.update(data3.map(function(c) {name:c.name, values:c.values.map(d => { return {name:d.name, value:Math.round(d.value*Math.random()*10)}; })}),2000) },3000);
// }





			/////////////////////
			// Chart functions //
			/////////////////////

// $(temp0).parents('svg').find('circle[cx="18"]').filter('[cy!="0"]');


function drawAreaChart(id, data, options) {
	var margin = {top: 60, right: 50, bottom: 120, left: 50},
		wm = 700, width = wm - margin.left - margin.right, 
		hm = 400, height = hm - margin.top - margin.bottom;
	var delay = 0,
		mouseover = function () {},
		chart = {};
	
	initVariables();
	
	function initVariables() {
		if (typeof options === 'object') {
			if (options.color !== undefined && typeof options.color === 'object') { color = options.color; }
			if (options.delay !== undefined && typeof options.delay === 'number') { delay = options.delay; }
			if (options.mouseover !== undefined && typeof options.mouseover === 'function') { mouseover = options.mouseover; }
		}
	}
	
	var x = d3.scalePoint()
		.domain(data.map(d => d.name))
		.rangeRound([0, width]);
	var step = x.range()[1] - x.range()[0];
	
	var y = d3.scaleLinear()
		.domain([0, d3.max(data.map(d => d.value))])
		.rangeRound([height, 0]);
	
	var area = d3.area()
		// .interpolate(interpolateArea)
		.x(d => x(d.name))
		.y0(height)
		.y1(d => y(d.value));

	var svg = d3.select(id).append('svg')
		.attr('width', wm)
		.attr('height', hm)
	  .append('g')
		.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
	
	var g = svg.append('path')
		.datum(data)
		.attr('class', 'area')
		.attr('d', area);
	
	svg.append('g').selectAll('.dot').data(data).enter().append('circle')
		.attr('class', 'dot')
		.attr('cx', area.x())
		.attr('cy', area.y1())
		.attr('r', 3.5);
	
	function interpolateArea(points) {
		var result = '',
			offset = Math.round(step * 0.64),
			extent = d3.extent(points.map(d => d[1]));
		if (extent[0] == extent[1]) {
			result += points[0] + 'H' + points[points.length-1][0];
		} else {
			result += points[0];
			for (var i = 1; i<points.length; i++) {
				result += 'C' + (points[i-1][0]+offset) + ' ' + points[i-1][1] + ' ' + (points[i][0]-offset) + ' ' + points[i][1] + ' ' + points[i][0] + ' ' + points[i][1];
			}
		}
		return result;
	}
	
	function initWithTransition(duration) {
		var y0 = d3.scaleLinear()
			.domain([0, d3.max(data.map(d => d.value))])
			.range([height, 0]);
		var area0 = d3.area()
			// .interpolate(interpolateArea)
			.x(d => x(d.name))
			.y0(height)
			.y1(d => y0(d.value));
		svg.select('path').datum(data.map(d => ({name:d.name, value:d.value / 1000})))
			.attr('d', area0);
		
		svg.select('path').datum(data).transition().duration(duration)
			.attr('d', area);
		
		svg.selectAll('.dot').data(data)
			.attr('cy', height)
		  .transition().duration(duration)
			.attr('cy', area.y1());
	}
	
	chart.update = (data, duration) => {
		y.domain([0, d3.max(data.map(d => d.value))]);
		
		svg.select('path').datum(data).transition().duration(duration)
			.attr('d', area);
		
		svg.selectAll('.dot').data(data).transition().duration(duration)
			.attr('cy', area.y1());
	};
	
	initWithTransition(2000);
	
	return chart;
}

// unused, uncommented, use drawMultiLineChart instead
function drawLineChart(id, data, options) {
	var margin = {top: 60, right: 50, bottom: 120, left: 50},
		wm = 700, width = wm - margin.left - margin.right, 
		hm = 400, height = hm - margin.top - margin.bottom;
	
	var delay = 0,
		mouseover = function () {},
		chart = {};
	
	initVariables();
	
	function initVariables() {
		if (typeof options === 'object') {
			if (options.color !== undefined && typeof options.color === 'object') { color = options.color; }
			if (options.delay !== undefined && typeof options.delay === 'number') { delay = options.delay; }
			if (options.mouseover !== undefined && typeof options.mouseover === 'function') { mouseover = options.mouseover; }
		}
	}
	
	var x = d3.scalePoint()
		.domain(data.map(d => d.name))
		.rangeRound([0, width]);
	var step = x.range()[1] - x.range()[0];
	
	var y = d3.scaleLinear()
		.domain([0, d3.max(data.map(d => d.value))])
		.rangeRound([height, 0]);
	
	var line = d3.line()
		// .interpolate(interpolateLine)
		.x(d => x(d.name))
		.y(d => y(d.value));
	
	var svg = d3.select(id).append('svg')
		.attr('width', wm)
		.attr('height', hm)
	  .append('g')
		.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
	
	var g = svg.append('path')
		.datum(data)
		.attr('class', 'line')
		.attr('d', line);
	
	svg.append('g').selectAll('.dot').data(data).enter().append('circle')
		.attr('class', 'dot')
		.attr('cx', line.x())
		.attr('cy', line.y())
		.attr('r', 3.5);
	
	function interpolateLine(points) {
		var result = '', offset = Math.round(step * 0.64);
		result += points[0];
		for (var i = 1; i<points.length; i++) {
			result += 'C' + (points[i-1][0]+offset) + ' ' + points[i-1][1] + ' ' + (points[i][0]-offset) + ' ' + points[i][1] + ' ' + points[i][0] + ' ' + points[i][1];
		}
		return result;
	}
	
	function initWithTransition(duration) {
		var y0 = d3.scaleLinear()
			.domain([0, d3.max(data.map(d => d.value))])
			.range([height, 0]);
		var line0 = d3.line()
			// .interpolate(interpolateLine)
			.x(d => x(d.name))
			.y(d => y0(d.value));
		svg.select('path').datum(data.map(d => ({name:d.name, value:d.value / 1000})))
			.attr('d', line0);
		
		svg.select('path').datum(data).transition().duration(duration)
			.attr('d', line);
		
		svg.selectAll('.dot').data(data)
			.attr('cy', height)
		  .transition().duration(duration)
			.attr('cy', line.y());
	}
	
	chart.update = (data, duration) => {
		y.domain([0, d3.max(data.map(d => d.value))]);
		
		svg.select('path').datum(data).transition().duration(duration)
			.attr('d', line);
		
		svg.selectAll('.dot').data(data).transition().duration(duration)
			.attr('cy', line.y());
	};
	
	initWithTransition(2000);
	
	return chart;
}

function drawEvolution(id, data, size) {
	let width = size!==undefined?size[0] || 100:100;
	let height = size!==undefined?size[1] || 30:30;
	let r = width<=100?3:5;

	let x = d3.scalePoint()
		.domain([0,1,2,3,4])
		.rangeRound([width*0.1,width*0.9]);

	let step = x.step();

	let y = d3.scaleLinear()
		.domain([-1,1])
		.rangeRound([height-r, r]);

	function CustomFlatBezierCurve (context) {
		this._context = context;
	}

	CustomFlatBezierCurve.prototype = {
		areaStart: function () {
			this._line = 0;
		},
		areaEnd: function () {
			this._line = NaN;
		},
		lineStart: function () {
			this._x = [];
			this._y = [];
		},
		lineEnd: function () {
			let x = this._x;
			let y = this._y;
			let n = x.length;
			let offset = Math.round(step * 0.64);

			this._context.moveTo(x[0], y[0]);
			for (let i = 1; i < n; i++) {
				this._context.bezierCurveTo(x[i-1]+offset, y[i-1], x[i]-offset, y[i], x[i], y[i]);
			}
			this._x = this._y = null;
		},
		point: function (x,y) {
			this._x.push(+x);
			this._y.push(+y);
		}
	};

	function customFlatBezierCurve (context) {
		return new CustomFlatBezierCurve(context);
	}


	let line = d3.line()
		.curve(customFlatBezierCurve)
		.x((d,i) => x(i))
		.y(d => y(d))
		.defined(d => !isNaN(d) && d !== null);

	let svg = d3.select(id).append('svg')
		.attr('width', width)
		.attr('height', height);
	let gradient = svg.append('defs').append('linearGradient')
			.attr('id', `gradient${id.split(' ')[0]}`)
		.selectAll('stop').data(gradientGenerator(data)).enter().append('stop')
			.attr('offset', d => d.offset)
			.attr('class', d => d.class);

	let path = svg.append('path')
		.attr('class', 'line')
		.attr('d', () => line(data))
		.style('stroke', () => {
			if (uniq(data).length === 1) {
				if (uniq(data)[0] === -1) { return 'firebrick'; }
				else if (uniq(data)[0] === 0) { return 'orange'; }
				else if (uniq(data)[0] === 1) { return 'lime'; }
				else { return 'grey'; }
			}
			return `url(#gradient${id.split(' ')[0]})`;
		});
	
	// draw dots
	let circles = svg.append('g');
	circles.selectAll('.dot').data(data).enter().append('circle')
		.attr('class', d => `dot stop${d + 2}`)
		.attr('cx', line.x())
		.attr('cy', line.y())
		.attr('r', r)
		.style('visibility', d => !isNaN(d) && d !== null?'visible':'hidden');

	function gradientGenerator (data) {
		let t = [];
		for (let item of data) {
			if (isNaN(item)) {
				if (t.length >= Math.round(data.length)) {
					break;
				}
			} else {
				t.push(item);
			}
		}

		let x = 100 / (t.length - 1);

		let result = [{class: `stop${t[0] + 2}`, offset: '0%'}];
		for (let i = 1; i < t.length; i++) {
			result.push({class: `stop${t[i-1] + 2}`, offset: `${(i - 1) * x + x/4}%`});
			if (Math.abs(t[i] - t[i-1]) === 2) {
				result.push({class: 'stop2', offset: `${i * x - x/2}%`});
			}
			result.push({class: `stop${t[i] + 2}`, offset: `${i * x - x/4}%`});
			result.push({class: `stop${t[i] + 2}`, offset: `${i * x}%`});
		}
		return result;

		// let result = [{class: `stop${data[0] + 2}`, offset: '0%'}];
		// for (let i = 1; i < data.length; i++) {
		// 	result.push({class: `stop${data[i-1] + 2}`, offset: `${(i - 1) * 25 + 6}%`});
		// 	if (Math.abs(data[i] - data[i-1]) === 2) {
		// 		result.push({class: 'stop2', offset: `${i * 25 - 12.5}%`});
		// 	}
		// 	result.push({class: `stop${data[i] + 2}`, offset: `${i * 25 - 6}%`});
		// 	result.push({class: `stop${data[i] + 2}`, offset: `${i * 25}%`});
		// }
		// return result;
	}
}

/**
 * dessine un line chart avec plusieurs séries en y
 * @param  {String} id       sélecteur CSS
 * @param  {Array}  data     tableau d'objets
 * @param  {Object} options  options de configuration (voir setSettings())
 * @return {Object} chart    retourn l'objet chart
 */
function drawMultiLineChart(id, data, options) {
	var chart = { type: 'multiLineChart'}, // chart variable will be returned
		settings = setSettings(options);
	
	// title div tag
	if (settings.title !== '') {
		d3.select(id)
			.style('width', settings.width + 'px')
		  .append('div')
			.attr('class', 'chart-title')
			.text(settings.title);
	}

	// filter data if scaleX is defined by the user
	let filteredData = data;
	if (settings.scaleX.domain) {
		filteredData = data.map(d => ({name: d.name, values: d.values.filter(c => settings.scaleX.domain.includes(c.name))}));
	}
	
	// scale for x values
	let domainX = settings.scaleX.domain?settings.scaleX.domain:filteredData[0].values.map(d => d.name);
	var x = d3.scalePoint()
		.domain(domainX)
		.rangeRound([settings.wm/50, settings.wm*0.99]);
	var step = x.step();

	function CustomFlatBezierCurve (context) {
		this._context = context;
	}

	CustomFlatBezierCurve.prototype = {
		areaStart: function () {
			this._line = 0;
		},
		areaEnd: function () {
			this._line = NaN;
		},
		lineStart: function () {
			this._x = [];
			this._y = [];
		},
		lineEnd: function () {
			let x = this._x;
			let y = this._y;
			let n = x.length;
			let offset = Math.round(step * 0.64);

			this._context.moveTo(x[0], y[0]);
			for (let i = 1; i < n; i++) {
				this._context.bezierCurveTo(x[i-1]+offset, y[i-1], x[i]-offset, y[i], x[i], y[i]);
			}
			this._x = this._y = null;
		},
		point: function (x,y) {
			this._x.push(+x);
			this._y.push(+y);
		}
	};

	function customFlatBezierCurve (context) {
		return new CustomFlatBezierCurve(context);
	}
	
	// scale for y values
	var y = d3.scaleLinear()
		.domain([0, maxVal(filteredData)])
		.rangeRound([settings.hm, 0]);

	// x axis generator
	var xAxis = d3.axisTop(x);

	// y axis generator
	var yAxis = d3.axisRight(y)
		.ticks(5)
		.tickSize(settings.wm)
		.tickFormat(d3.format('d'));
	
	// line generator
	var line = d3.line()
		.curve(customFlatBezierCurve)
		.x(d => x(d.name))
		.y(d => y(d.value));
	
	// svg element creation and setting point of origin with margin offset
	var svg = d3.select(id).append('svg')
		.attr('width', settings.width)
		.attr('height', settings.height);



	svg = svg.append('g')
		.attr('transform', 'translate(' + settings.margin.left + ',' + settings.margin.top + ')');

	// draw series legend above chart
	if (settings.series_title) {
		var glegend = d3.select(id + ' svg').append('g')
			.attr('class', 'legend')
		  .selectAll('g').data(filteredData).enter().append('g');
		glegend.append('rect')
			.attr('width', 16)
			.attr('height', 16)
			.attr('rx', 5)
			.attr('ry', 5)
			.style('fill', (d,i) => settings.colors[i]);
		glegend.append('text')
			.text(d => settings.series_name[d.name])
			.attr('x', 20)
			.attr('y', 13)
			.classed('series-name');
		// center labels
		var glegendwidths = glegend.nodes().map(d => d.getBoundingClientRect().width);
		glegend.attr('transform', (d,i) => 'translate(' + (settings.margin.left + (settings.wm - d3.sum(glegendwidths) + (glegendwidths.length - 1) * 10) / 2 + d3.sum(glegendwidths.slice(0, i)) + i * 10) + ',0)');
	}

	

	// layers creation for axes and chart
	var gAxes = svg.append('g').attr('class', 'g-axes');
	var gChart = svg.append('g').attr('class', 'g-chart');

	// x axis drawing
	var gxAxis = gAxes.append('g')
		.attr('class', 'x axis')
		.attr('transform', 'translate(0,' + settings.hm + ')')
		.call(xAxis);

	// x axis text drawing
	gxAxis.selectAll('text')
		.attr('x', -10)
		.attr('y', 0);

	// y axis drawing
	var gyAxis = gAxes.append('g')
		.style('opacity', 0.5)
		.attr('class', 'y axis')
		.call(yAxis)
		.call(customAxis);
	
	// draw paths
	var path = gChart.selectAll('d3nilselector').data(filteredData).enter().append('path')
		.attr('class', 'line')
		.attr('d', d => line(d.values))
		.attr('style', (d,i) => 'stroke:' + settings.colors[i]);
	
	// draw dots
	filteredData.forEach((d,i) => {d.values.forEach(c => {c.color = settings.colors[i];});});
	var circles = gChart.selectAll('d3nilselector').data(filteredData).enter().append('g');
	circles.selectAll('.dot').data(d => d.values).enter().append('circle')
		.attr('class', 'dot')
		.attr('cx', line.x())
		.attr('cy', line.y())
		.attr('r', 8)
		.style('fill', d => d.color)
		.style('stroke', '');

	chart.mouseoverItems = d3.selectAll('.dot');
	

	chart.update = (data, duration) => {
		// y scale modification
		y.domain([0, maxVal(data)]);
		
		// update lines
		gChart.selectAll('path.line').data(data).transition().duration(duration)
			.attr('d', d => line(d.values));
		
		// update circles 
		gChart.selectAll('g').data(data)
			.selectAll('.dot').data(d => d.values)
		  .transition().duration(duration)
			.attr('cy', line.y());

		// y axis transition
		gyAxis.transition().duration(duration)
			.call(yAxis)
			.selectAll('text')
			.tween('attr.x', null)
			.tween('attr.dy', null);
		gyAxis.call(customAxis);
	};
	
	initWithTransition(2000);


	
	return chart;



			///////////////
			// functions //
			///////////////

	function maxVal(data) {
		return d3.max(data.map(d => d3.max(d.values.map(c => c.value))));
	}

	function interpolateLine(points) {
		var result = '', offset = Math.round(step * 0.64);
		result += points[0];
		for (var i = 1; i<points.length; i++) {
			result += 'C' + (points[i-1][0]+offset) + ' ' + points[i-1][1] + ' ' + (points[i][0]-offset) + ' ' + points[i][1] + ' ' + points[i][0] + ' ' + points[i][1];
		}
		return result;
	}

	

	

	
	
	function initWithTransition(duration) {
		var y0 = d3.scaleLinear()
			.domain([0, d3.max(filteredData.map(d => d.value))])
			.range([settings.height, 0]);
		var line0 = d3.line()
			// .interpolate(interpolateLine)
			.x(d => x(d.name))
			.y(d => y0(d.value));
		var ndata = filteredData.map(c => ({name:c.name, values:c.values.map(d => ({name:d.name, value:d.value / 1000}))}));
		gChart.selectAll('path.line').data(ndata)
			.attr('d', d => line(d.values));
		
		gChart.selectAll('path.line').data(filteredData).transition().duration(duration)
			.attr('d', d => line(d.values));
		
		circles.selectAll('.dot').data(d => d.values)
			.attr('cy', settings.hm)
		  .transition().duration(duration)
			.attr('cy', line.y());
	}

	// helper function that adds text offset
	function customAxis(g) {
		g.selectAll('text')
			.attr('x', 8)
			.attr('dy', -4)
			.style('text-anchor', 'end');
	}
}

/**
 * dessine un bar chart
 * @param  {String} id      sélécteur CSS
 * @param  {Object} data    données à afficher
 * @param  {Object} options options de configuration (voir setSettings())
 * @return {Object} chart   retourne l'objet chart avec une fonction d'update
 */
function drawBarChart(id, data, options) {
	let chart = {type: 'barChart'}, // chart variable will be returned
		settings = setSettings(options);

	// set class
	d3.select(id)
		.attr('class', 'chart multiBarChart');
	
	// title div tag
	if (settings.title !== '') {
		let div = d3.select(id)
			.style('width', settings.width + 'px')
		  .append('div')
			.attr('class', 'chart-title')
			.text(settings.title);
	}

	// textColor in and out of rects
	let textColor = ['white', 'dimgrey'];

	// svg element creation and setting point of origin with margin offset
	let svg = d3.select(id).append('svg')
		.attr('width', settings.width)
		.attr('height', settings.height)
	  .append('g')
		.attr('transform', 'translate(' + settings.margin.left + ',' + settings.margin.top + ')');

	// create function for x-axis mapping.
	let x = d3.scaleBand()
		.domain(data.map(d => d.name))
		.rangeRound([20, settings.wm])
		.padding(0.4);
	
	// x-axis generator
	let xAxis = d3.axisBottom(x);

	// Add x-axis to the histogram svg.
	let gxAxis = svg.append('g')
		.attr('class', 'x axis')
		.attr('transform', 'translate(0,' + settings.hm + ')')
		.call(xAxis);
	
	// moving x labels
	gxAxis.selectAll('text')
		.attr('x', -10)
		.attr('y', 0);

	// Create function for y-axis map.
	let y = d3.scaleLinear()
		.domain([0, d3.max(data, d => d.value)])
		.rangeRound([settings.hm, 0]);
	
	// y-axis generator
	let yAxis = d3.axisRight(y)
		.ticks(6)
		.tickSize(settings.wm)
		.tickFormat(d3.format('d'));
	
	// Add y-axis to the histogram svg.
	let gyAxis = svg.append('g').attr('class', 'y axis')
		.call(yAxis)
		.call(customAxis);

	// Create bars for histogram to contain rectangles and labels.
	let bars = svg.selectAll('.bar').data(data).enter().append('g')
		.attr('class', 'bar')
		.attr('transform', 'translate(0,0)');
	
	//create the rectangles.
	bars.append('rect')
		.attr('width', x.bandwidth())
		.attr('height', d => settings.hm - y(d.value))
		.attr('x', d => x(d.name))
		.attr('y', d => y(d.value))
		.attr('rx', 8)
		.attr('ry', 8)
		.attr('fill', settings.colors[0]);

	// defining mouseoverItems
	chart.mouseoverItems = bars;
		
	//Create the value labels above the rectangles.
	//bars.append('text').text(d =>{ return d3.format(',')(d[1])})
	bars.append('text').text(d => d.value)
		.attr('style', 'font-size:8pt;font-family:sans-serif;')
		.attr('x', d => x(d.name)+x.bandwidth()/2)
		.attr('y', d => y(d.value)<=settings.hm-18?y(d.value)+15:y(d.value)-5)
		.style('fill', d => y(d.value)<=settings.hm-18?textColor[0]:textColor[1])
		.attr('text-anchor', 'middle')
		.each(d => { this._current = d.value; });
	
	//Init data with transition
	function initWithTransition(duration, delay = 0) {
		// rects transition from 0 to data
		bars.select('rect')
			.attr('y', settings.hm)
			.attr('height', 0)
		  .transition().duration(duration)
			.attr('y', d => y(d.value))
			.attr('height', d => settings.hm - y(d.value));
		
		// text transition from transparent to data
		bars.select('text')
			.attr('y', settings.hm+15)
			.style('opacity',0)
			.text(0)
		  .transition().duration(duration).delay(delay)
			.attr('y', d => y(d.value)<=settings.hm-18?y(d.value)+15:y(d.value)-5)
			.style('fill', d => y(d.value)<=settings.hm-18?textColor[0]:textColor[1])
			.style('opacity',1)
			.tween('text', textTween);
	}
	
	// function to call to move y-axis labels
	function customAxis(g) {
		g.selectAll('text')
			.attr('x', 4)
			.attr('dy', -4);
	}
	
	// tween function to interpolate numbers in strings
	function textTween(a) {
		let _this = this;
		let i = d3.interpolateRound(parseInt(this.textContent), a.value);
		return t => { d3.select(_this).text(i(t)); };
	}
	
	chart.update = (data, duration) => {
		// redefine domain in y-axis
		y.domain([0, d3.max(data, d => d.value)]);
		
		bars = svg.selectAll('.bar').data(data);

		// transition rects to data
		bars.select('rect').transition().duration(duration)
			.attr('y', d => y(d.value))
			.attr('height', d => settings.hm - y(d.value));
		
		// transition texts to data with y position in or out depending on rect height
		bars.select('text').transition().duration(duration)
			.attr('y', d => y(d.value)<=settings.hm-18?y(d.value)+15:y(d.value)-5)
			.style('fill', d => y(d.value)<=settings.hm-18?textColor[0]:textColor[1])
			.tween('text', textTween);
		
		// y-axis transition
		gyAxis.transition().duration(duration)
			.call(yAxis)
			.selectAll('text')
			.tween('attr.x', null)
			.tween('attr.dy', null);
		gyAxis.call(customAxis);
	};
	
	initWithTransition(2000, 500);
	
	return chart;
}

/**
 * dessine un bar chart avec une série ou plus par valeur de x
 * @param  {String} id      sélecteur CSS
 * @param  {Array}  data    tableau d'objets avec pour chaque objet le nom de la valeur en x et un objet avec les valeurs des séries
 * @param  {Object} options options de configuration (voir setSettings())
 * @return {Object} chart 	retourne l'objet chart avec une fonction d'update, un tableau de données pour une légende et un tableau d'objets sur lesquels lier des événements
 */
function drawMultiBarChart(id, data, options) {
	var chart = { type: 'multiBarChart'}, // chart variable will be returned
		settings = setSettings(options);

	d3.select(id)
		.attr('class', 'chart multiBarChart');
	
	// title div tag
	if (settings.title !== '') {
		d3.select(id)
			.style('width', settings.width + 'px')
		  .append('div')
			.attr('class', 'chart-title')
			.text(settings.title);
	}
	
	// scale for x values
	var x0 = d3.scaleBand()
		.domain(data.map(d => d.name))
		.rangeRound([0, settings.wm])
		.padding(0.1);
	// scale for each x value (series)
	var x1 = d3.scaleBand()
		.domain(data[0].values.map(d => d.name))
		.rangeRound([0, x0.bandwidth()])
		.padding(0.2);
	// scale for y values
	var y = d3.scaleLinear()
		.domain([0, maxVal(data)])
		.rangeRound([settings.hm, 0]);
	
	// x axis
	var xAxis = d3.axisBottom(x0);
	// y axis
	var yAxis = d3.axisRight(y)
		.ticks(6)
		.tickSize(settings.wm)
		.tickFormat(d3.format('d'));
	
	// svg element creation
	var svg = d3.select(id).append('svg')
		.attr('width', settings.width)
		.attr('height', settings.height);

	// draw series legend above chart
	if (settings.series_title) {
		var glegend = svg.append('g')
				.attr('class', 'series-title')
			.selectAll('g').data(x1.domain()).enter().append('g');
		glegend.append('rect')
			.attr('width', 16)
			.attr('height', 16)
			.attr('rx', 5)
			.attr('ry', 5)
			.style('fill', (d,i) => settings.colors[i]);
		glegend.append('text')
			.text(d => { 
				if (d === 'ouverture') { return 'ouverts'; }
				else if (d === 'fermeture') { return 'fermés'; }
				return d;
			})
			.attr('x', 20)
			.attr('y', 13)
			.classed('series-name');
		var glegendwidths = glegend.nodes().map(d => d.getBoundingClientRect().width);
		glegend.attr('transform', (d,i) => 'translate(' + (settings.margin.left + (settings.wm - d3.sum(glegendwidths) + (glegendwidths.length - 1) * 10) / 2 + d3.sum(glegendwidths.slice(0, i)) + i * 10) + ',0)');
	}

	svg = svg.append('g')
		.attr('transform', 'translate(' + settings.margin.left + ',' + settings.margin.top + ')');

	// define gradients for series rects
	var defs = svg.append('defs').selectAll('linearGradient').data(settings.colors.map(d => ({color: d}))).enter().append('linearGradient')
	.attr('x1', '0%')
	.attr('x2', '0%')
	.attr('y1', '0%')
	.attr('y2', '100%')
	.attr('id', (d,i) => { d.rgb = hexToRgb(d.color); return 'grad' + i; });
	defs.append('stop')
		.attr('offset', '0%')
		.attr('style', d => `stop-color: rgb(${d.rgb.r},${d.rgb.g},${d.rgb.b});stop-opacity: 1;`);
	defs.append('stop')
		.attr('offset', '80%')
		.attr('style', d => `stop-color: rgb(${d.rgb.r},${d.rgb.g},${d.rgb.b});stop-opacity: 0.7;`);
	defs.append('stop')
		.attr('offset', '100%')
		.attr('style', d => `stop-color: rgb(${d.rgb.r},${d.rgb.g},${d.rgb.b});stop-opacity: 0;`);
	
	// y axis drawing
	var gyAxis = svg.append('g')
		.style('opacity', 0.5)
		.attr('class', 'y axis')
		.call(yAxis)
		.call(customAxis);
	
	// layers creation for x rects
	var month = svg.selectAll('.month').data(data).enter().append('g')
		.attr('class', 'month')
		.attr('transform', d => 'translate(' + x0(d.name) + ',0)');

	// rects drawing
	var g = month.selectAll('rect').data(d => d.values).enter().append('rect')
		.attr('class', d => d.name)
		.attr('x', d => x1(d.name)) // series
		.attr('y', d => settings.dataTo0?settings.hm:y(d.value))
		.attr('rx', 4)
		.attr('ry', 4)
		.attr('height', d => settings.dataTo0?-12:settings.hm - y(d.value))
		.attr('width', x1.bandwidth())
		.attr('fill', (d,i) => 'url(#grad' + i + ')');

	var monthText = month.selectAll('text').data(d => d.values).enter().append('text')
		.attr('x', d => x1(d.name) + x1.bandwidth() / 2)
		.attr('y', d => settings.dataTo0?settings.hm:textPosition(d))
		.style('text-anchor', 'middle')
		.style('opacity', () => settings.dataTo0?0:0.6)
		.text(d => d.value);

	// set mouseoverItems to access rects outside the function and bind them with mouse events
	chart.mouseoverItems = month.selectAll('rect, text');
	
	// x axis drawing
	var gxAxis = svg.append('g')
		.attr('class', 'x axis')
		.attr('transform', 'translate(0,' + settings.hm + ')')
		.call(xAxis);
	
	// x axis text drawing
	gxAxis.selectAll('text')
		.attr('x', -10)
		.attr('y', 0);
	
	if (settings.init && settings.transition) {
		initWithTransition(settings.duration, settings.delay);
	}

	/**
	 * update rects tags with new data
	 * @param  {Array}  data     same format as data2 from parent function
	 * @param  {Number} duration in ms
	 */
	chart.update = (data, duration=0) => {
		// y scale modification
		y.domain([0, maxVal(data)]);
		
		// if less series transition to nothing
		svg.selectAll('.month').data(data)
				.selectAll('rect').data(d => d.values)
			.exit()
			.transition().duration(duration)
				.attr('x', d => x1(d.name) + x1.bandwidth())
				.attr('y', () => settings.hm)
				.attr('height', () => 0)
				.attr('width', 0)
			.transition()
				.remove();
		
		// x scale for each x value modification
		x1.domain(data[0].values.map(d => d.name));
		
		// transition to new data
		svg.selectAll('.month').data(data)
				.selectAll('rect').data(d => d.values)
			.transition().duration(duration)
				.attr('x', d => x1(d.name))
				.attr('y', d => y(d.value))
				.attr('height', d => settings.hm - y(d.value))
				.attr('width', x1.bandwidth());

		svg.selectAll('.month').data(data)
				.selectAll('text').data(d => d.values)
			.transition().duration(duration)
				.attr('x', d => x1(d.name) + x1.bandwidth() / 2)
				.attr('y', d => textPosition(d))
				.tween('text', textTween);
		
		// if more series, rects tags creation and transition to new data
		// svg.selectAll('.month').data(data)
		// 		.selectAll('rect').data(d => d.values)
		// 	.enter().append('rect')
		// 		.attr('x', d => x1(d.name) + x1.bandwidth())
		// 		.attr('y', function() { return settings.hm; })
		// 		.attr('rx', 4)
		// 		.attr('ry', 4)
		// 		.attr('height', function() { return 0; })
		// 		.attr('width', '0px')
		// 		.attr('fill', (d,i) => 'url(#grad' + i + ')')
		// 	.transition().duration(duration)
		// 		.attr('x', d => x1(d.name))
		// 		.attr('y', d => y(d.value))
		// 		.attr('height', d => settings.hm - y(d.value))
		// 		.attr('width', x1.bandwidth());
		
		// y axis transition
		gyAxis.transition().duration(duration)
			.call(yAxis)
			.selectAll('text')
			.tween('attr.x', null)
			.tween('attr.dy', null);
		gyAxis.call(customAxis);
	};

	// transition rects height from 0 to data
	function initWithTransition (duration, delay) {
		setTimeout(function() {
			g.transition().duration(duration).delay(delay)
				.attr('y', d => y(d.value))
				.attr('height', d => settings.hm - y(d.value));
			monthText.transition().duration(duration).delay(delay)
				.attr('y', d => textPosition(d))
				.style('opacity', 0.6);
		}, delay);
	}
	
	return chart;

	///////////////
	// functions //
	///////////////

	// returns maximum value from data
	function maxVal(data) {
		return d3.max(data.map(c => d3.max(c.values.map(d => d.value))));
	}

	// tween function not used here
	function textTween(a) {
		let that = d3.select(this);
		var i = d3.interpolateRound(parseInt(this.textContent), a.value);
		return t => that.text(i(t));
	}

	// helper function to calculate value's text position
	function textPosition (d) {
		if (y(d.value) + 16 > settings.hm) {
			return y(d.value) - 2;
		}
		return y(d.value) + 12;
	}
	
	// helper function that adds text offset
	function customAxis(g) {
		g.selectAll('text')
			.attr('x', 8)
			.attr('dy', -4)
			.style('text-anchor', 'end');
	}
}

/**
 * dessine un pie chart
 * @param  {String} id      sélecteur CSS
 * @param  {Array}  data    tableau d'objets
 * @param  {Object} options options de configuration (voir setSettings())
 * @return {Object} chart   retourne l'objet chart
 */
function drawPieChart(id, data, options) {
	let chart = { type: 'pieChart' }, // chart variable will be returned
		settings = setSettings(options);
	
	d3.select(id)
		.attr('class', 'chart pieChart');

	// title div tag
	let div = d3.select(id).append('div')
		.attr('class', 'chart-title')
		.html(settings.title);
	
	// svg element creation and setting point of origin at center
	let svg = d3.select(id).append('svg')
		.attr('width', settings.width)
		.attr('height', settings.height)
	  .append('g')
		.attr('transform', `translate(${(settings.width + settings.margin.left - settings.margin.right) / 2},${(settings.height  + settings.margin.top - settings.margin.bottom) / 2})`);
	
	// arc generator
	let arc = d3.arc()
		.outerRadius(settings.radius - 10)
		.innerRadius(0);

	// create a function to compute the pie slice angles.
	let pie = d3.pie()
		.sort(null)
		.value(d => d.value);

	let current = d3.local();

	// Draw the pie slices.
	let paths = svg.selectAll('path').data(pie(data)).enter().append('path')
		.attr('d', arc)
		.each(function (d) { current.set(this, d); })
		.style('fill', (d,i) => settings.colors[i])
		.style('stroke', '#fff');
	// set mouseoverItems to access rects outside the function and bind them with mouse events
	chart.mouseoverItems = paths;

	/**
	 * update chart with new data
	 * @param  {Array} data     same format as data from parent function
	 * @param  {Number} duration in ms
	 */
	chart.update = function(data, duration)  {
		svg.selectAll('path').data(pie(data))
			.transition().duration(duration)
			.attrTween('d', function (d) { return arcTween.call(this, d); });
		
	};
	
	// transition from 0 to data
	if (settings.transition) {
		svg.selectAll('path')
			.data(pie.padAngle(2 * Math.PI)(data))
			.attr('d', arc);
		initWithTransition(settings.duration);
	}
	
	return chart;
	
 ////////////////////////	functions	////////////////////////
	
	// tween function to recalculate arc
	function arcTween(a) {
		let i = d3.interpolateObject(current.get(this), a);
		current.set(this, i(0));
		return t => arc(i(t));
	}
	
	// transition from 0 to data
	function initWithTransition(duration) {
		let ease = d3.easeCubicInOut; // ease 
		
		setTimeout(function () {
			let timer = d3.timer(function(elapsed){
				let t = ease((duration - elapsed)/duration); // ease t from 1 to 0
				
				if (elapsed > duration) { // set final value and stop timer
					svg.selectAll('path')
						.data(pie.padAngle(0)(data))
						.attr('d', arc);
					timer.stop();
				} else {
					svg.selectAll('path')
						.data(pie.padAngle(t * 2 * Math.PI / data.length)(data)) // pad angle transition to 0
						.attr('d', arc);
				}
			});
		}, settings.delay);
		
	}
}

/**
 * dessine un mini pie ou arc chart
 * @param  {String} id      sélecteur CSS
 * @param  {Array}  data    tableau d'objets
 * @param  {Object} options options de configurations (voir setSettings())
 * @return {Object} chart   retourne l'objet chart
 */
function drawMiniPieChart(id, data, options) {
	var chart = {},
		settings = setSettings(options);

	// little trick because for data [1,1] the animation lags // d3 v4 seems to resolve this bug
	// data[1] += 0.00001;
	
	// arc generator
	var arc = d3.arc()
		.innerRadius(settings.innerRadius)
		.outerRadius(settings.radius)
		.cornerRadius(10);
	
	// pie generator
	var pie = d3.pie()
		.padAngle(2*Math.PI/100)
		.sort(null);
	
	if (settings.type === 'arc') {
		// return data big enough to show if it is too small
		pie.value((d,i) => i === 0 && d/data[1] < 1/50 && d !== 0?data[1]/50:d);
	}
	
	// pie svg initialization
	var svg = d3.select(id).append('svg')
		.attr('width', settings.width)
		.attr('height', settings.height);

	var g1 = svg.append('g')
		.attr('transform', `translate(${(settings.width + settings.margin.left - settings.margin.right) / 2}, ${(settings.height  + settings.margin.top - settings.margin.bottom) / 2})`);
	
	// draw paths
	g1.selectAll('path').data(pie(data)).enter().append('path')
		.attr('d', arc)
		.each(d => { this._current = d; }) // storing d value for transition's interpolation
		.attr('fill', (d,i) => settings.colors[i]);
	
	// tween function for interpolation of numbers in svg text elements
	function textTween(a) {
		let _this = this;
		var i = d3.interpolateRound(this.textContent, a);
		return t => d3.select(_this).text(i(t));
	}
	
	// tween function to interpolate between arcs' data
	function arcTween(a) {
		var i = d3.interpolate(this._current, a);
		this._current = i(0);
		return t => arc(i(t));
	}
	
	// tween function to calculate arcs' rotation
	function rotateTween(d) {
		d.startAngle += 2 * Math.PI;
		d.endAngle += 2 * Math.PI;
		var i = d3.interpolate(this._current, d);
		return t => arc(i(t));
	}
	
	// function to rotate arcs
	chart.rotate = duration => {
		g1.selectAll('path').data(pie(data)).transition().duration(duration)//.ease('linear')
			.attrTween('d', rotateTween);
	};

	// drawing text values inside of arcs
	let g2, g2val; // defining outside if because needed for init functions
	if (settings.type === 'arc') {
		// moving point of origin to draw text values
		g2 = svg.append('g')
			.attr('transform', `translate(${(settings.width + settings.margin.left - settings.margin.right) / 2}, ${(settings.height  + settings.margin.top - settings.margin.bottom) / 2})`);
		// drawing value
		g2val = g2.append('text')
			.attr('class', 'miniarc-main-data')
			// .text(data[0])
			.text('2')
			.attr('x', -15)
			.attr('y', -5)
			.attr('text-anchor', 'middle')
			.attr('style', 'font-size:3em;font-family:quicksandlight;fill:lightgrey');
		// drawing sum
		var g2sum = g2.append('text')
			.text(d3.sum(data))
			.attr('text-anchor', 'start')
			.attr('x', 0)
			.attr('y', 40)
			.attr('style', 'fill:lightslategrey;font-size:1.8em;font-family:quicksandlight');
		// drawing separating line between value and sum
		g2.append('line')
			.attr('transform', 'translate(5,10)')
			.attr('x1', '-25')
			.attr('y1', '10')
			.attr('x2', '25')
			.attr('y2', '-10')
			.attr('style', 'stroke:lightslategrey;stroke-width:1.5');
		initArc(2000);
	} else {
		// moving points of origin for each text value
		g2 = svg.selectAll('.d3noselect').data(data).enter().append('g')
			.attr('transform', (d,i) => { var offset = 30, dx = 78; return 'translate(' + dx + ', ' + (55 + offset * i ) + ')'; });
		// drawing circles
		g2.append('circle')
			.attr('r', '9')
			.attr('style', (d,i) => 'fill:' + settings.colors[i]);
		// drawing text values
		g2val = g2.append('text')
			.attr('x', 25)
			.attr('dy', '12')
			.attr('style', 'font-size:2em;fill:lightslategrey;font-family:quicksandlight')
			.text(d => d);
		initPie(2000);
	}

	return chart;

	///////////////
	// Functions //
	///////////////
	
	// transition arcs and text from 0 to data
	function initArc(duration) {
		g1.selectAll('path').data(pie([0,d3.sum(data)]))
			.attr('d', arc)
			.each(d => { this._current = d; });
		g1.selectAll('path').data(pie(data)).transition().duration(duration).delay(settings.delay)
			.attrTween('d', arcTween);
		g2val.text(0).datum(data[0]).transition().duration(duration).delay(settings.delay)
			.tween('text', textTween);
		g2sum.text(0).datum(d3.sum(data)).transition().duration(duration).delay(settings.delay)
			.tween('text', textTween);
	}
	
	// transition pie and text from 0 to data
	function initPie(duration) {
		g1.selectAll('path').data(pie(data.map(() => 0)))
			.attr('d', arc)
			.each(d => { this._current = d; });
		g1.selectAll('path').data(pie(data)).transition().duration(duration).delay(settings.delay)
			.attrTween('d', arcTween);
		g2.selectAll('text').text(0).transition().duration(duration).delay(settings.delay)
			.tween('text', textTween);
	}
}

/**
 * dessine un pie chart 2 niveaux
 * @param  {String} id      sélecteur CSS
 * @param  {Object} data2   dictionnaire de données à utiliser avec d3.layout.partition()
 * @param  {Object} options options de configuration (voir setSettings())
 * @return {Object} chart   retourne l'objet chart avec une fonction d'update et un tableau de données pour une légende
 */
// TODO : wrong colors on change on partitionpiechart's legend

function drawPartitionPieChart(id, data2, options) {
	// var data = $.extend(true, {}, data2); // shallow copy not to modify data2 hereinafter (side effect when truncating data not to show too small values)
	let data = {name: 'root', values: data2};

	let chart = {legendData: [], type: 'partitionPieChart'}, // chart variable will be returned
		settings = setSettings(options);

	d3.select(id)
		.attr('class', 'chart partitionPieChart');
	
	// title div tag
	d3.select(id).append('div')
		.attr('class', 'chart-title')
		.text(settings.title);
	
	// layout with alphabetical order sorting
	let partition = d3.partition()
		.size([2 * Math.PI, settings.radius * settings.radius]);
		
	
	// layout using previous layout result to remove too small values (use of dx attribute)
	// let newHierarchy = d3.hierarchy()
	// 	.sort(null)
	// 	.children(d => d.values);
	// var newPartition = d3.layout.partition()
	// 	.sort(null)
	// 	.size([2 * Math.PI, settings.radius * settings.radius])
	// 	.value(d => d.dx > 0.02 ? d.value : 0);
	
	// arc generator 
	let arc = d3.arc()
		.innerRadius(d => Math.sqrt(d.y0))
		.outerRadius(d => Math.sqrt(d.y0 + d.y1))
		.startAngle(d => d.x0)
		.endAngle(d => d.x1);
	
	// svg element craetion and setting point of origin at center
	let svg = d3.select(id).append('svg')
		.attr('width', settings.width)
		.attr('height', settings.height)
	  .append('g')
		.attr('transform', `translate(${(settings.width + settings.margin.left - settings.margin.right) / 2},${(settings.height  + settings.margin.top - settings.margin.bottom) / 2})`);
	
	// variables initialization and loop over depth 1 elements to set colors and legend data
	let i = 0;
	chart.colorData = {};
	// first partition
	let hierarchy = d3.hierarchy(data, d => d.values)
		.sort((a, b) => d3.ascending(a.name, b.name))
		.sum(d => d.value)
		.each(node => { if (node.depth === 1) { node.color = settings.colors[i]; i++; chart.colorData[node.name] = node.color; chart.legendData.push({name: node.data.name, color: node.color, value: node.value}); } });
	let nodes = partition(hierarchy);
		
	// nodes2[0].values.forEach(d => { d.color = settings.colors[i]; chart.colorData[d.name] = d.color; i++; chart.legendData.push({name: d.name, color: d.color, value: d.value}); });
	// final partition
	// var nodes = newPartition(nodes2[0]);
	let current = d3.local();
	// nodes.children.forEach(function (d) { current.set(this, {x0: d.x0, x1: d.x1}); });
	chart.nodes = nodes.children;
	// chart.nodes = nodes.slice();
	
	// path tags creation and association of data to DOM
	var g = svg.selectAll('path').data(nodes.children).enter().append('path')
		.attr('display', d => d.depth ? null : 'none') // hide root element
		.attr('d', arc)
		.each(function (d) { current.set(this, {x0: d.x0, x1: d.x1}); }) // associating d object to DOM element
		// .each(function (d) { current.set(this, d);console.log('d', d) }) 
		.style('stroke', '#fff') // border white
		.style('fill', d => { // set color
			if (d.depth === 1) {
				return d.color;
			} else if (d.depth === 2) {
				return d.parent.color;
			}
		})
		.attr('alt', d => d.value); // set path's alt attribute
	chart.mouseoverItems = g;
	
	// function to transition from 0 to data
	function initWithTransition(duration) {
		let ease = d3.easeCubicInOut; // set ease
		
		// trigger function after delay
		d3.timeout(() => {
			let timer = d3.timer(elapsed => {
				// set final value and stop timer
				if (elapsed > duration) {
					svg.selectAll('path')
						.data(partition.size([2 * Math.PI, settings.radius * settings.radius])(hierarchy).children)
						.attr('d', arc);
					timer.stop();
				}
				// calculate and set intermediate data
				let t = ease(elapsed / duration); // ease t from 0 to 1 over duration time
				svg.selectAll('path')
					.data(partition.size([t * 2 * Math.PI, settings.radius * settings.radius])(hierarchy).children) // show data from 0 to t*2*PI radians
					.attr('d', arc); // calculate arcs
			});
		}, settings.delay);
	}
	
	/**
	 * update path's tags with new data,
	 * @param  {Object} data     same format as data2 from parent function
	 * @param  {Number} duration in ms
	 */
	chart.update = (data2, duration) => {
		// var data = $.extend(true, {}, data2);
		let data = {name: 'root', values: data2};
		
		// variable initialization and setting legend data
		// chart.legendData = [];
		var oldNodes = chart.nodes; // data before update
		let hierarchy = d3.hierarchy(data, d => d.values)
			.sort((a, b) => d3.ascending(a.name, b.name))
			.sum(d => d.value)
			.each(node => { if (node.depth === 1) { node.color = settings.colors[i]; i++; chart.colorData[node.name] = node.color; chart.legendData.push({name: node.data.name, color: node.color, value: node.value}); } });
		let nodes = partition(hierarchy);

		// set legendData with null values for non existing nodes in new data
		if (oldNodes.length > nodes.children.length) {
			oldNodes.forEach(d => { 
				var node = nodes.children.find(c => c.name === d.name);
				if (node === undefined) {
					chart.legendData.push({name: d.data.name, color: d.color, value: 0});
				} else {
					chart.legendData.push({name: d.data.name, color: d.color, value: node.value});
				}
			});
		} else {
			nodes.children.forEach(d => { chart.legendData.push({name: d.data.name, color: d.color, value: d.value}); });
		}
		nodes.children.forEach((d, i) => d.color = settings.colors[i]);
		// looping over previous data to find the nodes that don't appear in new data
		for (let key in oldNodes) {
			let obj = oldNodes[key];
			let node = nodes.children.findIndex(findIndexTest, obj); // returns node or -1

			// if node not found add old node with null value to new data
			if (node === -1) {
				key !== '0'?obj.x0 = nodes.children[key - 1].x1:obj.x0 = 0; // get end of last arc
				obj.value = 0;
				obj.x1 = obj.x0;
				nodes.children.splice(key, 0, obj);
			}
		}
		// path tags transition from old data to new data
		svg.selectAll('path').data(nodes.children)
		  .transition().duration(duration)
			.attrTween('d', function (d) { return arcTween.call(this, d); }); // call arcTween with result of updateArc as argument


		///////////////
		// functions //
		///////////////
		
		// helper function returns true if objects match (name and parent's name if any)
		function findIndexTest(d) {
			return d.parent.data.name === this.parent.data.name && d.data.name === this.data.name;
		}

		// helper function
		function updateArc(d) {
			return {x0: d.x0, x1: d.x1};
		}

		// tween function to recalculate arcs
		function arcTween(a) {
			let i = d3.interpolate(current.get(this), a);
			current.set(this, updateArc(i(0)));
			return t => arc(i(t));
		}

	};
	
	
	// if settings is true set partition.size and launch initWithTransition
	if (settings.transition) {
		svg.selectAll('path')
			.data(partition.size([0, settings.radius * settings.radius])(hierarchy).children)
			.attr('d', arc);
		initWithTransition(settings.duration);
	}
	
	return chart;
}

/**
 * dessine une légende pour un chart
 * @param  {String} id      sélecteur CSS
 * @param  {Object} data    dictionnaire de données
 * @param  {Object} options options de configuration (voir setSettings())
 * @return {Object} chart   retourne l'objet chart
 */
function drawLegend(id, data, options) {
	// data format   [{name: '', value: ''}, ...]
	var chart = { type: 'legend' };
	var settings = setSettings(options);
	var sum = d3.sum(data.map(d => d.value));

	let tempData = data;
	if (settings.sorting) {
		tempData.forEach((d,i) => d.color = settings.colors[i]);
		tempData.sort((a,b) => b.value - a.value);
	}
	if (settings.slice > 0) {
		tempData = tempData.slice(0, settings.slice);
	}
	
	let filteredData = tempData;

	d3.select(id)
		.attr('class', 'chart legendChart');

	// title div tag
	if (settings.title !== '') {
		d3.select(id)
			.style('width', settings.width + 'px')
		  .append('div')
			.attr('class', 'chart-title')
			.text(settings.title);
	}
	
	d3.select(id).style('vertical-align', 'top');
	
	// create table for legend.
	var legend = d3.select(id).append('table')
		.attr('class', 'legend')
		.style('width', settings.wm + 'px');
	
	// create one row per segment.
	var tr = legend.append('tbody').selectAll('tr').data(filteredData).enter().append('tr');

	chart.mouseoverItems = tr;
		
	// create the first column for each segment.
	tr.append('td').append('svg')
		.attr('width', '18')
		.attr('height', '18')
	  .append('circle')
		.attr('cx', 9)
		.attr('cy', 9)
		.attr('r', 8)
		.style('fill', (d,i) => d.color !== undefined ? d.color : settings.colors[i]);
		
	// create the second column for each segment.
	tr.append('td')
		.attr('class', 'legendLabel')
		.text(d => d.name);

	// create the third column for each segment.
	tr.append('td')
		.attr('class', 'legendVal')
		.text(d => d3.format(',')(d.value));

	// create the fourth column for each segment.
	tr.append('td')
		.attr('class', 'legendPerc')
		.text(d => getLegend(d.value));
	
	function initWithTransition(duration) {
		tr.select('.legendVal').text(0).transition().duration(duration).delay(settings.delay)
			.tween('text', textTween);
		tr.select('.legendPerc').text('0%').transition().duration(duration).delay(settings.delay)
			.tween('text', percTween);
	}
	
	function textTween(a) {
		let that = d3.select(this);
		let i = d3.interpolateRound(parseInt(this.textContent), a.value);
		return t => {that.text(i(t));};
	}
	
	function percTween(a) {
		let that = d3.select(this);
		function interpolateRoundPerc(a, b) {
			let re = /^(\d+)%$/;
			let da = parseInt(re.exec(a)[1]);
			let db = parseInt(re.exec(b)[1]);
			return t => `${Math.round(da*(1-t)+db*t)}%`;
		}
		let i = interpolateRoundPerc(this.textContent, getLegend(a.value));
		return t => {that.text(i(t));};
		// return t => 1;
	}
	
	chart.update = (data, duration, title, color) => {
		if (duration === undefined) { duration = 0; }
		if (title !== undefined && title !== null) {
			d3.select(id + ' .chart-title')
				.text(title);
		}
		sum = d3.sum(data.map(c => c.value));

		let tempData = data;
		if (settings.sorting) {
			tempData.forEach((d,i) => d.color = settings.colors[i]);
			tempData.sort((a,b) => b.value - a.value);
		}
		if (settings.slice > 0) {
			tempData = tempData.slice(0, settings.slice);
		}

		let filteredData = tempData;
		

		let tr = d3.select(id + ' tbody').selectAll('tr').data(filteredData);
		let newtr = tr.enter().append('tr');
		// create the first column for each segment.
		newtr.append('td').append('svg')
			.attr('width', '18')
			.attr('height', '18')
		  .append('circle')
			.attr('cx', 9)
			.attr('cy', 9)
			.attr('r', 8)
			.style('fill', (d,i) => d.color !== undefined ? d.color : settings.colors[i]);
			
		// create the second column for each segment.
		newtr.append('td')
			.attr('class', 'legendLabel')
			.text(d => d.name);

		// create the third column for each segment.
		newtr.append('td')
			.attr('class', 'legendVal')
			.text(d => d3.format(',')(d.value));

		// create the fourth column for each segment.
		newtr.append('td')
			.attr('class', 'legendPerc')
			.text(d => getLegend(d.value));

		

		// remove exit data
		tr.exit().style('display', 'none');

		tr.style('display', 'table-row');
		tr.select('.legendLabel').transition().duration(duration).delay(100)
			.text(d => d.name);
		tr.select('.legendVal').transition().duration(duration).delay(100)
			.tween('text', textTween);
		tr.select('.legendPerc').transition().duration(duration).delay(100)
			.tween('text', percTween);
		
		if (color !== undefined && color !== null) {
			tr.merge(newtr).select('circle')
				.style('fill', color);
		} else {
			tr.select('circle')
				.style('fill', (d,i) => d.color !== undefined ? d.color : settings.colors[i]);
		}
	};
	
	function getLegend(d){ // Utility function to compute percentage.
		if (sum === 0) { return d3.format('.0%')(0);}
		if (settings.totalIncluded) { return d3.format('.0%')(d * 2 / sum); }
		return d3.format('.0%')(d / sum);
	}
	
	if (settings.transition) {
		tr.select('.legendVal').text(0);
		tr.select('.legendPerc').text('0%');
		initWithTransition(2000);
	}
	
	
	return chart;
}

function infos(id, data) {
	var dataFiltered = data.filter(d => d.afficher);
	var infos = d3.select(id).append('table').append('tbody')
		.selectAll('tr').data(dataFiltered).enter().append('tr').append('td');
	infos.append('div')
		.attr('class', 'date')
		.text(d => d.date);
	infos.append('div')
		.attr('class', 'description')
		.text(d => d.description);
}

function drawMap (id, data, geodata, options) {
	var chart = {}, // chart variable will be returned
		settings = setSettings(options);

	var svg = d3.select(id).append('svg')
		.attr('width', settings.width)
		.attr('height', settings.height);
	
	// conversion from topoJSON to GeoJSON
	var equipes = topojson.feature(geodata, geodata.objects.imad).features;
	// add own variables to data
	equipes.forEach(d => {
		d.properties.priorite = {};
	});
	// define these own variables
	data.forEach(d => {
		let num = parseInt(d.equipe),
			elem = equipes.find(c => {
				if (c.properties.N0_EMD === num) { return true; }
				return false;
			});

		if (elem !== undefined) {
			if (d.priorite === null) {
				elem.properties.priorite.Total = d.count_incident;
			} else {
				elem.properties.priorite[d.priorite] = d.count_incident;
			}
		}
	});
	// define data min and max
	var values = equipes.map(d => d.properties.priorite.Total),
		incMax = d3.max(values),
		incMin = d3.min(values);
		
	// color scale
	let color = d3.scaleLinear()
		.domain(getRange(incMin, incMax, 9))
		.range(settings.colors)
		//.range(['#D8DBE2', '#A9BCD0', '#58A4B0', '#373F51', '#1B1B1E'])
		//.range(['#E8F1F2', '#1B98E0', '#247BA0', '#006494', '#13293D'])
		//.range(['#E09F7D', '#EF5D60', '#EC4067', '#A01A7D', '#311847'])
		//.range(['#6FFFE9', '#5BC0BE', '#3A506B', '#1C2541', '#0B132B'])
		//.range(['', '', '', '', ''])
		.nice();

	// display legend
	scale2(color);

	chart.legendData =  ['Total', '1 - Critique', '2 - Élevé', '3 - Modéré'].map(c => ({ name: c, value: d3.sum(equipes.map(d => c in d.properties.priorite?d.properties.priorite[c]:0))}));

	
	// define projection used with small scale
	var projection = d3.geoConicEquidistant()
		.center([6.133852429946175,46.25])
		.scale(1)
		.translate([settings.width / 2, 300]);
	
	// path generator
	var path = d3.geoPath()
		.projection(projection);
	
	var features = svg.append('g')
		.attr('class','features');
	
	// draw paths of cities
	chart.mouseoverItems = svg.selectAll('.equipes')
		.data(equipes)
		.enter().append('path')
		.attr('class', d => 'equipes e' + d.properties.N0_EMD)
		.attr('fill', d => color(d.properties.priorite.Total))
		.attr('d', path);
		// .on('mouseover', mouseover)
		// .on('mouseout', mouseout);
	// draw internal frontiers
	svg.append('path')
		.datum(topojson.mesh(geodata, geodata.objects.imad, (a, b) => a !== b))
		.attr('d', path)
		.attr('class', 'equipes-frontieres');
	// draw external frontiers
	svg.append('path')
		.datum(topojson.mesh(geodata, geodata.objects.imad, (a, b) => a === b))
		.attr('d', path)
		.attr('class', 'canton-frontieres');

	/*svg.selectAll('.equipes-label')
		.data(topojson.feature(geodata, geodata.objects.imad).features)
		.enter().append('text')
		.attr('class', d => { return 'equipes-label e' + d.properties.N0_EMD; })
		.attr('transform', d => { return 'translate(' + path.centroid(d) + ')'; })
		.attr('dy', '.35em')
		.text(d => { return d.properties.N0_EMD; });*/
	
	// transition by zooming on map
	projection.scale(230000);
	path = d3.geoPath()
		.projection(projection);
	svg.selectAll('path').transition().duration(1500)
		.attr('d', path);
	d3.select('#source').text('Infographie réalisée sur la base de données issues du Système d\'information du territoire à Genève (SITG), extrait en date du 5 janvier 2016.').transition().duration(1500).delay(800)
		.style('opacity', 1);
	d3.select('#scale').transition().duration(1500).delay(800)
		.style('opacity', 1);


	chart.update = function(priorite, colors, duration) {
		if (color.range() === colors) { return true; }
		if (duration === undefined) { duration = 0; }
		let extent = d3.extent(equipes.map(d => priorite in d.properties.priorite?d.properties.priorite[priorite]:0));
		color.domain(getRange(extent[0], extent[1], 9))
			.range(colors)
			.nice();
		let newScale = d3.scaleLinear()
			.domain(d3.extent(color.domain()))
			.range([11, 210].reverse());
		let yAxis = d3.axisRight(newScale)
			.tickSize(3);
		svg.selectAll('.equipes').transition().duration(duration)
			.attr('fill', d => color(priorite in d.properties.priorite?d.properties.priorite[priorite]:0));

		d3.select('#scale').transition().duration(duration/2)
			.style('opacity', 0);
		d3.select(id).selectAll('stop').data(color.range()).transition().delay(duration/2)
			.attr('style', d => 'stop-color:' + d + ';stop-opacity:1');
		d3.select('#scale .y').transition().delay(duration/2)
			.call(yAxis);
		d3.selectAll('#scale line').data(1).exit().transition().delay(duration/2)
			.style('stroke', d => color(d));
		d3.select('#scale').transition().duration(duration/2).delay(duration/2+200)
			.style('opacity', 1);

	};


	function scale2(scale) {

		var legend = svg.append('g')
			.attr('width', '100')
			.attr('height', '220')
			.attr('id', 'scale')
			.attr('transform', () => 'translate(' + (settings.width * 0.9) + ','+ (settings.height - 320) +')');
		// gradient definition
		var gradient = legend.append('defs').append('linearGradient')
			.attr('id', 'grad')
			.attr('x1', '0%')
			.attr('y1', '100%')
			.attr('x2', '0%')
			.attr('y2', '0%');
		gradient.selectAll('stop').data(scale.range()).enter()
			.append('stop')
			.attr('offset', (d,i) => getRange(0, 100, 9)[i]+'%')
			.attr('style', d => 'stop-color:' + d + ';stop-opacity:1');
		// rectangle filled by gradient
		legend.append('rect')
			.attr('width', '15')
			.attr('height', '200')
			.attr('y', '10')
			.attr('style', 'fill:url(#grad)');
		// scale with y values range
		var newScale = d3.scaleLinear()
			.domain(d3.extent(scale.domain()))
			.range([11, 210].reverse());
		// axis is used to display ticks and values
		var yAxis = d3.axisRight(newScale)
			.tickSize(3);
		// showing axis
		legend.append('g')
			.attr('class', 'y axis')
			.attr('transform', 'translate(15,0)')
			.call(yAxis);
		// define ticks color
		var test = legend.selectAll('line').data(1)
			.exit()
			.style('stroke', d => scale(d));
	}
	return chart;
}

/**
 * dessine une représentation du CAC
 * @param  {String} id      sélécteur CSS
 * @param  {Object} data    données à afficher
 * @param  {Object} options options de configuration (voir setSettings())
 * @return {Object} chart   retourne l'objet chart avec une fonction d'update
 */
function drawCAC (id, data, options) {
	let chart = {}, // chart variable will be returned
		settings = setSettings(options);

	let svg = d3.select(id).append('svg')
		.attr('width', settings.width)
		.attr('height', settings.height);

	let CAC = [
		{etage: '7', values: [{name: 'Production', equipes: [925]}, {name: 'Mobilité technologique', equipes: [1040]}, {name: 'Service clients', equipes: [929]}]},
		{etage: '6', values: [{name: 'Solutions métiers', equipes: [1039]}, {name: 'Patrimoine informationnel', equipes: [47]}]},
		{etage: '4', values: [{name: 'DAF', equipes: [1038, 11, 970]}, {name: 'DSP', equipes: [63, 64, 65, 66, 67]}, {name: 'DSGEN', equipes: [43, 13, 20, 14, 16, 38]}]},
		{etage: '3', values: [{name: 'RH', equipes: [913, 915]}, {name: 'DG', equipes: [907, 908]}]}
	];


	// calculate and format data for mouseoverItems
	let dataCAC = [];
	for (let i = 0; i < CAC.length; i++) {
		for (let j = 0; j < CAC[i].values.length; j++) {
			let elem = {name: CAC[i].values[j].name, priorite: {Total: 0, '1 - Critique': 0, '2 - Élevé': 0, '3 - Modéré': 0}};
			for (let k = 0; k < CAC[i].values[j].equipes.length; k++) {
				data.forEach(d => {
					let num = parseInt(d.equipe);
					if (num === CAC[i].values[j].equipes[k]) {
						if (d.priorite === null) {
							elem.priorite.Total += d.count_incident;
						} else {
							elem.priorite[d.priorite] += d.count_incident;
						}
					}
				});
			}
			dataCAC.push(elem);
		}
	}

	// define data min and max
	let values = dataCAC.map(d => d.priorite.Total),
		incMax = d3.max(values),
		incMin = d3.min(values);
		
	// color scale
	let color = d3.scaleLinear()
		.domain(getRange(incMin, incMax, 9, 'pow2'))
		.range(settings.colors)
		//.range(['#D8DBE2', '#A9BCD0', '#58A4B0', '#373F51', '#1B1B1E'])
		//.range(['#E8F1F2', '#1B98E0', '#247BA0', '#006494', '#13293D'])
		//.range(['#E09F7D', '#EF5D60', '#EC4067', '#A01A7D', '#311847'])
		//.range(['#6FFFE9', '#5BC0BE', '#3A506B', '#1C2541', '#0B132B'])
		//.range(['', '', '', '', ''])
		.nice();

	let strokeColor = 'black';
	let h = 300 / CAC.length;
	let buildingPoints = ['60,0 0,30 0,315 60,360', /*'10,60 10,80 25,74 25,54 10,60', '35,50 35,71 50,65 50,44 35,50',*/ '60,301 60,360 240,360 240,301', '135,360 135,335 165,335 165,360 135,360', '150,335 150,360'];
	for (let i = 0; i < CAC.length; i++) {
		buildingPoints.push(wind(10,60,h * i + h / 2 - 15,15,30));
		buildingPoints.push(wind(35,60,h * i + h / 2 - 15,15,30));
	}
	let building = svg.append('g').selectAll('polyline').data(buildingPoints).enter();
	building.append('polyline')
		.attr('points', d => d)
		.style('fill', 'lightgrey')
		.style('stroke', strokeColor);
	

	// replace with method to draw etage number
	svg.select('g').append('text')
		.attr('x', 38)
		.attr('y', 50)
		.text('7');
	svg.select('g').append('text')
		.attr('x', 38)
		.attr('y', 120)
		.text('6');
	svg.select('g').append('text')
		.attr('x', 38)
		.attr('y', 190)
		.text('4');
	svg.select('g').append('text')
		.attr('x', 38)
		.attr('y', 260)
		.text('3');
	svg.select('g').append('text')
		.attr('x', 115)
		.attr('y', 330)
		.style('font-size', '2em')
		.style('opacity', 0.6)
		.text('CAC');
	

	

	for (let i = 0; i < CAC.length; i++) {
		let w  = 180 / CAC[i].values.length;
		for (let j = 0; j < CAC[i].values.length; j++) {
			svg.append('rect')
				.attr('width', w)
				.attr('height', h)
				.attr('x', 60 + j * w)
				.attr('y', i * h)
				.style('stroke', strokeColor);
		}
	}
	
	chart.mouseoverItems = svg.selectAll('rect').data(dataCAC)
		.attr('fill', d => color(d.priorite.Total));

	chart.update = function (priorite, colors, duration) {
		if (color.range() === colors) { return true; }
		if (duration === undefined) { duration = 0; }
		let extent = d3.extent(dataCAC.map(d => d.priorite[priorite]));
		color.domain(getRange(extent[0], extent[1], 9, 'pow2'));
		color.range(colors);

		svg.selectAll('rect').transition().duration(duration)
			.attr('fill', d => color(d.priorite[priorite]));
	};
	
	return chart;
}

function drawIncidentsList (id, data, options) {
	let settings = setSettings(options);
	
}

/**
 * fonction qui permet aux graphiques de modifier leurs données quand on passe sur les données avec la souris
 * @param  {Object} args objet avec un attribut filtres et des attributs pour chaque graphique 
 * @param  {Array} data tableau de données
 */
function synchronizeCharts (args, data) {
	/*
	let args = {
		filters: incFilter, // filters array, same given to jsonToData()
		charts: [ 			// array of charts options: chart reference, xaxis array (xColumnName and seriesColumnName given to jsonToData()), updateNullValues to update charts with values equal to 0
			{chart: incOuvertsResolus, xaxis: ['type', 'week']},
			{chart: incPrioriteLegend, xaxis: ['priorite', null], updateNullValues: true},
			...
		]
	};
	 */
	
	// defining onmouseover and onmouseout for each chart
	for (let i = 0; i < args.charts.length; i++) {
		let chart = args.charts[i].chart;
		chart.mouseoverItems.debounce('mouseover', onmouseover(i), 50);
		chart.mouseoverItems.debounce('mouseout', onmouseout(i), 50);
	}

	// onmouseover defines updates on other charts on mouseover events
	function onmouseover (i) {
		return d => {
			let condition = false;
			let filters;
			args.charts[i].updateNullValues = args.charts[i].updateNullValues || false;
			let ppc = false;
			switch (args.charts[i].chart.type) { // define update condition and filters array
				case 'barChart':
					condition = d.value > 0;
					filters = dictToModify(args.filters, [args.charts[i].xaxis[0], d.name]);
					break;
				case 'multiBarChart':
					condition = d.value > 0;
					filters = dictToModify(args.filters, [args.charts[i].xaxis[0], d.parentValue, args.charts[i].xaxis[1], d.name]);
					break;
				case 'multiLineChart':
					condition = d.value > 0;
					filters = dictToModify(args.filters, [args.charts[i].xaxis[0], d.parentValue, args.charts[i].xaxis[1], d.name]);
					break;
				case 'pieChart':
					condition = true;
					filters = dictToModify(args.filters, [args.charts[i].xaxis[0], d.data.name]);
					break;
				case 'legend':
					condition = d.value > 0 || args.charts[i].updateNullValues;
					filters = dictToModify(args.filters, [args.charts[i].xaxis[0], d.name]);
					break;
				case 'partitionPieChart':
					var color;
					condition = true;
					ppc = true;
					if (d.depth === 1) {
						filters = dictToModify(args.filters, ['categorie', d.data.name]);
						color = d.color;
					} else if (d.depth === 2) {
						filters = dictToModify(args.filters, ['categorie', d.parent.data.name]);
						color = d.parent.color;
					}
					break;
			}
			if (condition) { // if condition
				for (let j = 0; j < args.charts.length; j++) { // for each chart
					let chartToUpdate = args.charts[j].chart; // define chart to update
					if (chartToUpdate === args.charts[i].legend) { // test if the chart to update is the legend of the chart selected
						let tmpData = jsonToData(data, filters, args.charts[i].xaxis[1]); // calculate data for update
						// if (ppc) { tmpData = tmpData.slice(0,11); }
						chartToUpdate.update(tmpData, 300, null, color); // update chart
					} else if (i !== j) { // test not to update oneself
						let showNullValues = chartToUpdate.type === 'multiBarChart'; // define if we must show values equal to 0
						let xaxis = args.charts[j].xaxis; // define xColumnName and seriesColumnName
						let tmpData = jsonToData(data, filters, xaxis[0], {seriesColumnName: xaxis[1], showNullAxesValues: showNullValues}); // calculate data for update
						chartToUpdate.update(tmpData, 300); // update chart
					}
				}
			}
		};
	}

	// onmouseout defines updates on other charts on mouseout events
	function onmouseout (i) {
		return function () {
			for (let j = 0; j < args.charts.length; j++) { // for each chart
				if (i !== j) { // test not to update oneself
					let xaxis = args.charts[j].xaxis; // define xColumnName and seriesColumnName
					let chartToUpdate = args.charts[j].chart; // define chart to update
					let tmpData = jsonToData(data, args.filters, xaxis[0], {seriesColumnName: xaxis[1]}); // calculate data for update
					chartToUpdate.update(tmpData, 300); // update chart
				}
			}
		};
	}
}


				//////////////////////
				// Helper functions //
				//////////////////////

/**
 * return default settings for blank options
 * @param {Object} options oprions defined by user
 */
function setSettings(options) {
	var settings = $.extend(true, {
		margin: {top: 0, right: 0, bottom: 0, left: 0},
		size: [300, 300],
		colors: ['#5BC0EB', '#E55934'],
		delay: 0,
		mouseover: function () {},
		title: '',
		transition: 0,
		duration: 2000,
		innerRadius: 0.9,
		type: 'arc',
		legend: false,
		legendSize: [],
		totalIncluded: false,
		init: true,
		scaleX: {},
		sorting: false,
		slice: 0,
		series_title: false,
		series_name: {ouverture: 'ouverts', fermeture: 'fermés'}
	}, options);
	settings.width = settings.size[0];
	settings.height = settings.size[1];
	settings.wm = settings.width - settings.margin.left - settings.margin.right;
	settings.hm = settings.height - settings.margin.top - settings.margin.bottom;
	settings.radius = Math.min(settings.wm, settings.hm) / 2;
	settings.innerRadius *= settings.radius;
	settings.dataTo0 = !(settings.init && !settings.transition);
	return settings;
}

/**
 * fournit les données formatées pour les la plupart des graphiques (sauf partitionPieChart)
 * [jsonToData description]
 * @param  {Object}  data              JSON Object
 * @param  {Object}  filters           object with column: value to filter
 * @param  {String}  xColumnName       column to show in x
 * @param  {String}  seriesColumnName  column to show in series
 * @param  {Boolean} includeSeriesTest inutilisé?
 * @return {Object}                    formatted data for charts
 */
function jsonToData (data, filters, xColumnName, options={}) {
	let seriesColumnName = options.seriesColumnName || null;
	let showNullAxesValues = options.showNullAxesValues || false;
	let showNullValues = options.showNullValues || true;
	let xValues = options.xValues || null;
	let seriesValues = options.seriesValues || null;
	let filteredData =  data.filter(d => {
		for (let key in filters) {
			// if data value different from filters value and xColumnName different from key and (key different from seriesColumn or includeSeriesTest) return false
			if (d[key] !== filters[key] && key !== xColumnName && (key !== seriesColumnName)) { return false; }
		}
		if (d[xColumnName] === null && !showNullAxesValues) { return false; }
		return true;
	});
	function getColumnValues (data, columnName) {
		switch (columnName) {
			case 'mois':
				return ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
			case 'priorite':
				return ['1 - Critique', '2 - Élevé', '3 - Modéré'];
			case 'type1':
				return ['ouverture', 'fermeture'];
			case 'etat':
				return ['Nouveau', 'En cours', 'En attente'];
			case 'week':
				return ['Semaine -3', 'Semaine -2', 'Semaine -1', 'Semaine 0'];
			case 'type':
				return ['ouverture', 'fermeture'];
			case '':
				return [];
			case null:
				return [];
			default:
				var result = [];
				for (let item in data) {
					if (result.indexOf(data[item][columnName]) === -1 && (data[item][columnName] || data[item][columnName] === '' || showNullAxesValues)) {
						result.push(data[item][columnName]);
					}
				}
				return result.sort();
		}
	}
	let x, series;
	if (showNullAxesValues) {
		x = getColumnValues(data, xColumnName);
		series = getColumnValues(data, seriesColumnName);
	} else {
		x = getColumnValues(filteredData, xColumnName);
		series = getColumnValues(filteredData, seriesColumnName);
	}
	if (xValues !== null) {
		x = xValues;
	}
	if (seriesValues !== null) {
		series = seriesValues;
	}

	if (seriesColumnName === null) {
		return x.map(d => {
			let filterByX = filteredData.filter(c => c[xColumnName] === d);
			return {name: d, value: d3.sum(filterByX.map(c => c.count_incident))};
		});
	}
	return x.map(d => {
		let filterByX = filteredData.filter(c => c[xColumnName] === d);
		return {name: d, values: series.map(c => {
			let filterBySeries = filterByX.filter(b => b[seriesColumnName] === c);
			let value = d3.sum(filterBySeries.map(b => b.count_incident));
			return {name:c, value:value, parentValue: d};
		}).filter(c => c.value !== 0 || showNullValues)};
	});
}

// deprecated: use jsonToData
function jsonToPpcData (data, filters, nest1, nest2, count) {
	var filter =  data.filter(d => {
		var result = true;
		for (var key in filters) {
			if (d[key] !== filters[key] && key !== nest1 && key !== nest2) { result = false; break; }
		}
		if (d[nest1] === null || d[nest2] === null) result = false;
		return result;
	});

	var lvl1 = [], lvl2 = [];
	function findIndexCallback (d) {
		if (this == d.name) { return true; }
	}
	for (var key in filter) {
		var n1 = filter[key][nest1],
			n2 = filter[key][nest2],
			c = filter[key][count];
		var indexlvl1 = lvl1.findIndex(findIndexCallback, n1);
		if (indexlvl1 !== -1) {
			lvl2 = lvl1[indexlvl1].children;
			var indexlvl2 = lvl2.findIndex(findIndexCallback, n2);
			if (indexlvl2 !== -1) {
				lvl2[indexlvl2].value += c;
				lvl1[indexlvl1].children = lvl2;
			} else {
				lvl2.push({name: n2, value: c});
				lvl1[indexlvl1].children = lvl2;
			}
		} else {
			lvl1.push({name: n1, children: [{name: n2, value: c}]});
		}
	}
	return {name: 'root', children: lvl1};
}

// get range for domain's or range's scale
function getRange(min, max, number, func) {
	if (number <= 2) {
		return [min, max];
	} else {
		let scale,
			items = [];
		if (func === 'pow2') {
			scale = d3.scalePow()
				.exponent(2);
		} else {
			scale = d3.scaleLinear();
		}
		scale
			.domain([1, number])
			.range([min, max]);
		for (var i = 0; i < number; i++) {
			items.push(scale(i + 1));
		}
		return items;
	}
}
