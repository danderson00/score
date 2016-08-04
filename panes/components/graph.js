var d3 = require('d3'),
    throttle = require('tribe/utilities/throttle')

require('tribe').register.model(function (pane) {    
    var margins = {
            top: 20,
            right: 20,
            bottom: 20,
            left: 40
        },
        options = {            		
            width: (pane.data.width || 1000) - margins.left - margins.right,
            height: (pane.data.height || 400) - margins.top - margins.bottom,
            colors: pane.data.colors || ['steelblue', 'sandybrown', 'cadetblue', 'chocolate', 'darkcyan', 'darkseagreen', 'goldenrod']
        },

        scaling, graph, axes, paths, data = []

    this.paneRendered = function () {
        scaling = createScaling() 
        graph = createGraph()
        axes = createAxes()
        subscribe();
    }

    function subscribe() {
        var groups = pane.data.groups.asArray(),
            valuesExpression = pane.data.values

        groups.subscribe(function (changes) {
            changes.forEach(function (change) {
                if(change.status === 'added') {
                    var result = []
                    valuesExpression(change.value.underlyingObservable).subscribe(function (value) {
                        data.forEach(function(x) {
                            if(x === result)
                                x.push(value)
                            else
                                x.push(x[x.length - 1] || 0)
                        })
                        //result.push(value)
                        draw()
                    })
                    data.push(result)
                }
            })
        }, null, "arrayChange")

        paths = groups.map(createPath)
    }

    var draw = throttle(function () {
        setScaling()
        drawAxes()
        drawPaths()
    }, 10, { leading: false })

    function createScaling() {
        return {
            x: d3.scaleLinear().range([0, options.width]),
            y: d3.scaleLinear().range([options.height, 0]),
            line: d3.line().x((d, i) => scaling.x(i)).y(d => scaling.y(d))
        }
    }

    function createGraph() {
        return d3.select(pane.element).append("svg:svg")
            .attr("width", options.width + margins.right + margins.left)
            .attr("height", options.height + margins.top + margins.bottom)
            .attr("class", "graph")
            .append("svg:g")
            .attr("transform", "translate(" + margins.left + "," + margins.top + ")")
    }

    function createAxes() {
        return {
            x: {
                scale: d3.axisBottom().tickFormat(d3.format(",.0f")).tickSize(-options.height),
                element: graph.append("svg:g").attr("class", "x axis").attr("transform", "translate(0," + options.height + ")")
            },
            y: {
                scale: d3.axisLeft().tickFormat(d3.format(",.0f")).tickSize(-options.width),
                element: graph.append("svg:g").attr("class", "y axis")
            }
        }
    }
        
    function createPath(data, index) {
        return graph.append("svg:path").attr("class", "line").attr("style", "stroke:" + options.colors[index()])
    }

    function setScaling() {
        var x = d3.max(data.map(array => array.length)) - 1
        scaling.x.domain([0, x])
        axes.x.scale.scale(scaling.x).ticks(x)

        var y = d3.max(data.map(array => d3.max(array)))
        scaling.y.domain([0, y])
        axes.y.scale.scale(scaling.y).ticks(y)
    }

    function drawAxes() {
        axes.x.element.call(axes.x.scale)
        axes.y.element.call(axes.y.scale)
    }

    function drawPaths() {
        paths().forEach(drawPath)
    }

    function drawPath(path, index) {
        path.attr("d", scaling.line(data[index]))
    }
})