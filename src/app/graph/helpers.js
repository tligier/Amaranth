/*jshint esversion: 6 */
/* globals d3 */
$(function () {

	/**
	 * fonction qui pour chaque mot met la première letre est en majuscule et toutes les autres en minuscule
	 * @return {String}
	 */
	String.prototype.toTitleCase = function () {
		return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
	};

	/**
	 * fonction qui pour chaque mot met la première letre est en majuscule et toutes les autres en minuscule à moins que le mot ne fasse partie d'une liste de "petits mots" auquel cas le mot est en minuscules.
	 * @return {String} 
	 */
	String.prototype.toTitleCase2 = function(){
		var smallWords = /^(le|la|de|du|des)$/i;
		return this.toLowerCase().replace(/[A-Za-z0-9\u00C0-\u00FF]+[^\s-]*/g, function(match, index, title){
			if (index > 0 && index + match.length !== title.length &&
			match.search(smallWords) > -1 && title.charAt(index - 2) !== ':' &&
			(title.charAt(index + match.length) !== '-' || title.charAt(index - 1) === '-') &&
			title.charAt(index - 1).search(/[^\s-]/) < 0) {
				return match.toLowerCase();
			}
			if (match.substr(1).search(/[A-Z]|\../) > -1) {
				return match;
			}
			return match.charAt(0).toUpperCase() + match.substr(1);
		});
	};

	/**
	 * Etend jQuery avec la fonction debounce() mappée sur la fonction debounceJQ()
	 */
	$.extend($.fn, {
		debounce: function(event, callback, delay) {
			this.bind(event, debounceJQ.apply(this, [callback, delay]));
		}
	});

	/**
	 * Etend D3 avec la fonction debounce() mappée sur la fonction debounceD3()
	 */
	d3.selection.prototype.debounce = function(type, listener, delay) {
		if (delay === undefined) { delay = 250; }
		d3.selection.prototype.on.apply(this, [type, debounceD3.apply(this, [listener, delay])]);
	};
});

/**
 * [debounceJQ description]
 * @param  {Function} callback [description]
 * @param  {[type]}   delay    [description]
 * @return {[type]}            [description]
 */
function debounceJQ(callback, delay) {
	var self = this, timeout, _arguments;
	return function() {
		_arguments = Array.prototype.slice.call(arguments, 0);
		timeout = clearTimeout(timeout, _arguments);
		timeout = setTimeout(function() {
			callback.apply(self, _arguments);
			timeout = 0;
		}, delay);
		return this;
	};
}

/**
 * fonction debounce tirée de Underscore.js
 * @param  {[type]} func      [description]
 * @param  {[type]} wait      [description]
 * @param  {[type]} immediate [description]
 * @return {[type]}           [description]
 */
function debounceD3(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
}

function count(data, dateField) {
	var dict = {};
	for (var i in data) {
		var date = data[i][dateField];
		if (date !== null) {
			var m = moment(date.date),
				month = m.month(),
				year = m.year();
			
			if (typeof dict[year] === 'undefined')
			{
				dict[year] = {};
			}
			if (typeof dict[year][month] !== 'undefined')
			{
				dict[year][month] += 1;
			} else {
				dict[year][month] = 1;
			}
		}
		
	}
	console.log(dict);
	console.log('error', dict[2015][4]);
}

// returns a dict of GET elements
function getURLParameters() {
	var sPageURL = window.location.search.substring(1),
		sURLVariables = sPageURL.split('&'),
		result = {};
	for (var i = 0; i < sURLVariables.length; i++) {
		var sParameterName = sURLVariables[i].split('=');
		result[Handlebars.escapeExpression(sParameterName[0])] = Handlebars.escapeExpression(decodeURI(sParameterName[1]));
	}
	return result;
}

// formatDate takes a date object and a format string and returns the formatted date string
function formatDate(date, format) {
	var r = {
		'%d': ('0' + date.getDate()).slice(-2),
		'%m': ('0' + (date.getMonth() + 1)).slice(-2),
		'%Y': date.getYear() + 1900
	};
	
	return format.replace(/%d|%m|%Y/g, function(d) { return r[d]; });
}

function hexToRgb(hex) {
	var bigint = parseInt(hex.slice(1), 16);
	var r = (bigint >> 16) & 255;
	var g = (bigint >> 8) & 255;
	var b = bigint & 255;

    return {r: r, g: g, b: b};
}

function dictToModify (dict, toAdd, toRemove) {
	var result = $.extend({}, dict);
	
	if (toAdd) {
		for (let i = 0; i < toAdd.length; i+=2) {
			result[toAdd[i]] = toAdd[i+1];
		}
	}
	
	if (toRemove) {
		for (let i = 0; i < toRemove.length; i++) {
			delete result[toRemove[i]];
		}
	}
	return result;
}

function gradient(x1, x2, y2) {
	return (1/2 - y2 / 288) * (x2 - x1) + y2;
}

function wind(x1, x2, y2, w, h) {
	let rect = {};
	rect.y1 = gradient(x1, x2, y2);
	rect.y2 = gradient(x1 + w, x2, y2);
	rect.y3 = gradient(x1 + w, x2, y2 + h);
	rect.y4 = gradient(x1, x2, y2 + h);
	return x1 + ',' + rect.y1 + ' ' + (x1 + w) + ',' + rect.y2 + ' ' + (x1 + w) + ',' + rect.y3 + ' ' + x1 + ',' + rect.y4 + ' ' + x1 + ',' + rect.y1;
}

// fonction qui retourne une durée plus lisible que l'entrée en secondes
function prettyDuree (duree) {
	if (isNaN(duree)) {
		return '-';
	}
	let days = Math.floor(duree/28800);
	let remains = duree%28800;
	let hours = Math.floor(remains/3600);
	remains %= 3600;
	let minutes = Math.floor(remains/60);
	let seconds = remains % 60;
	if (days > 0) {
		return days + (days===1?' jour, ':' jours, ') + hours + (hours===1?' heure, ':' heures, ') + minutes + (minutes===1?' minute.':' minutes.');
	}
	if (hours > 0) {
		return hours + (hours===1?' heure, ':' heures, ') + minutes + (minutes===1?' minute.':' minutes.');
	}
	if (minutes > 0) {
		return minutes + (minutes===1?' minute, ':' minutes, ') + seconds + (seconds===1?' seconde.':' secondes.');
	}
	return seconds + (seconds===1?' seconde.':' secondes.');
}

// fonction qui supprime les doublons d'un tableau
function uniq(a) {
	var seen = {};
	return a.filter(function(item) {
		return seen.hasOwnProperty(item) ? false : (seen[item] = true);
	});
}

// fonction de mélange de tableau
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

// dropdown menu
function DropDown(el) {
	this.dd = el;
	this.placeholder = this.dd.children('span');
	this.opts = this.dd.find('ul.dropdown > li');
	this.val = this.placeholder.text();
	this.index = -1;
	this.initEvents();
}
DropDown.prototype = {
	initEvents : function() {
		var obj = this;

		obj.dd.on('click', function(event){
			$(this).toggleClass('active');
			return false;
		});

		obj.opts.on('click', function(){
			var opt = $(this);
			obj.val = opt.text();
			// console.log(obj.val);
			obj.index = opt.index();
			obj.placeholder.text(obj.val);
		});
	},
	getValue : function() {
		return this.val;
	},
	getIndex : function() {
		return this.index;
	}
};

// combination generator
function combinationGenerator (m, x) {
	let l = [];
	let result = [];
	let n = m.length;
	for (let t = 0; t < x; t++) {
		let a1 = [];
		for (let i = 0; i < n - x + 1; i++) {
			let a2 = [];
			if (t === 0) {
				a2.push(m[i]);
				if (x === 1) {
					let res = [];
					for (let j = 0; j < n; j++) {
						if (j === i) {
							res.push(m[j]);
						} else {
							res.push('null');
						}
					}
					result.push(res);
				}
			} else {
				for (let j = 0; j < i + 1; j++) {
					for (var k = 0; k < l[t - 1][j].length; k++) {
						a2.push(l[t - 1][j][k] + '|' + m[i + t]);
						if (t === x - 1) {
							let s = l[t - 1][j][k] + '|' + m[i + t];
							let res = [];
							for (var h = 0; h < n; h++) {
								if (s.indexOf(m[h]) === 0 || s.indexOf('|' + m[h]) !== -1) {
									res.push(m[h]);
								} else {
									res.push('null');
								}
							}
							result.push(res);
						}
					}
				}
			}
			a1.push(a2);
		}
		l.push(a1);
	}
	return result;
}
