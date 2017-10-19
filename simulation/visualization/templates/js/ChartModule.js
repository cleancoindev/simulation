var ChartModule = function(series, canvas_width, canvas_height) {
	// Create the elements
	
	// Create the tag:
	var canvas_tag = "<canvas width='" + canvas_width + "' height='" + canvas_height + "' ";
	canvas_tag += "style='border:1px dotted'></canvas>";
	// Append it to body:
	var canvas = $(canvas_tag)[0];
	//$("body").append(canvas);
	$("#elements").append(canvas);
	// Create the context and the drawing controller:
	var context = canvas.getContext("2d");
	context.lineWidth = 1;

	// Prep the chart properties and series:
	var datasets = [];
	for (var i in series) {
		var s = series[i];
		var new_series = {
			label: s.Label,
			backgroundColor: s.Color,
			borderColor: s.Color,
			fill: false,
			pointRadius: 0,
			data: []
		};
		datasets.push(new_series);
	}

	var data = {
		labels: [],
		datasets: datasets
	};

	var options = {
		responsive: false,
		tooltips: {
			mode: 'index',
			intersect: false,
		},
		hover: {
			mode: 'nearest',
			intersect: true
		},
		scales: {
			xAxes: [{
				display: true,
				scaleLabel: {
					display: true,
					labelString: 'Tick'
				}
			}],
			yAxes: [{
				display: true
			}]
		},
		elements: {
            line: {
                tension: 0, // disables bezier curves
            }
        },
		animation: false
	};

	var chart = new Chart(context, {type: 'line', data: data, options: options});

	this.render = function(step, data) {
		chart.data.labels.push(step);
		for (let i=0; i<data.length; i++) {
			chart.data.datasets[i].data.push(data[i]);
		}
		chart.update();
	};

	this.reset = function() {
		chart.destroy();
		data.labels = [];
		chart = new Chart(context, {type: 'line', data: data, options: options});
	};
};