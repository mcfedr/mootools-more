/*
---
name: Fx.Elements.CSS3
script: Fx.Elements.CSS3.js
license: MIT-style license.
description: Provides a CSS3 implementaton of Fx.Elements
copyright: Copyright (c) 2010, Dipl.-Ing. (FH) André Fiedler <kontakt at visualdrugs dot net>, based on code by eskimoblood (mootools users group)
copyright: Copyright (c) 2011 Fred Cox mcfedr@gmail.com
authors: [Fred Cox, André Fiedler, eskimoblood]

requires: [Core/Fx.CSS3Funcs, Fx.Elements]

provides: [Fx.Elements.CSS3]
...
*/

var elementsCSS2 = Fx.Elements;

Fx.Elements = new Class({
	Extends: elementsCSS2,

	check: function(obj){
		return (this.css3Supported && !this.boundComplete && Object.every(obj, function(properties) { return this.animatable().containsArray(Object.keys(properties)); }, this)) || this.parent();
	},

	start: function(obj){
		if (this.css3Supported){
			if (!this.check(obj)) return this;
		
			var count = 0;
			var complete = function() {
				if(count-- == 0) {
					this.fireEvent('complete', this);
				}
			}.bind(this);
		
			Object.each(obj, function(properties, key) {
				if(this.elements[key]) {
					new Fx.Morph(this.elements[key], Object.merge({}, this.options, {
						onComplete: complete
					})).start(properties);
				}
			}, this);
		
			this.fireEvent('start', this);
			return this;
		}
		return this.parent(properties);
	}
});

Fx.Elements.implement(Fx.CSS3Funcs);

Fx.Elements.CSS2 = elementsCSS2;
Fx.Elements.CSS3 = Fx.Elements;