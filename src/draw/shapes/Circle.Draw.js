L.Circle.Draw = L.SimpleShape.Draw.extend({
	statics: {
		TYPE: 'circle'
	},

	options: {
		shapeOptions: {
			stroke: true,
			color: '#f06eaa',
			weight: 4,
			opacity: 0.5,
			fill: true,
			fillColor: null, //same as color by default
			fillOpacity: 0.2,
			clickable: true
		}
	},

	initialize: function (map, options) {
		// Save the type so super can fire, need to do this as cannot do this.TYPE :(
		this.type = L.Circle.Draw.TYPE;

		L.Handler.Draw.prototype.initialize.call(this, map, options);
	},

	_initialLabelText: 'Click and drag to draw circle.',

	_drawShape: function (latlng) {
		if (!this._shape) {
			this._shape = new L.Circle(this._startLatLng, this._startLatLng.distanceTo(latlng), this.options.shapeOptions);
			this._map.addLayer(this._shape);
		} else {
			this._shape.setRadius(this._startLatLng.distanceTo(latlng));
		}
	},

	_fireCreatedEvent: function () {
		this._map.fire(
			'draw:circle-created',
			{ circ: new L.Circle(this._startLatLng, this._shape.getRadius(), this.options.shapeOptions) }
		);
	}
});