/*
---
name: Fx.Tween.CSS3
script: Fx.Tween.CSS3.js
license: MIT-style license.
description: Provides a CSS3 implementaton of Fx.Tween
copyright: Copyright (c) 2010, Dipl.-Ing. (FH) André Fiedler <kontakt at visualdrugs dot net>, based on code by eskimoblood (mootools users group)
copyright: Copyright (c) 2011 Fred Cox mcfedr@gmail.com
authors: [Fred Cox, André Fiedler, eskimoblood]

requires: [Fx.CSS3Funcs, Core/Fx.Tween]

provides: [Fx.Tween.CSS3]
...
*/
(function() {
	
	var tweenCSS2 = Fx.Tween;

	Fx.Tween = new Class({

		Extends: tweenCSS2,

		checkCSS3: function(property){
			return (Fx.CSS3Funcs.css3Features && Fx.CSS3Funcs.animatable.contains(property));
		},

		start: function(property, from, to){
			if ((this.css3Supported = this.checkCSS3(property))) {
				if(this.boundComplete) return this;
				var args = Array.flatten(arguments);
				this.property = this.options.property || args.shift();
				var parsed = this.prepare(this.element, this.property, args);
				this.from = parsed.from;
				this.to = parsed.to;
				this.boundComplete = function(event){
					if (event.getPropertyName() == this.property){
						this.element.removeEvent(Fx.CSS3Funcs.css3Features.transitionend, this.boundComplete);
						this.boundComplete = null;
						this.fireEvent('complete', this);
					}
				}.bind(this);
				this.element.addEvent(Fx.CSS3Funcs.css3Features.transitionend, this.boundComplete);
				var trans = function(){
					this.element.setStyle(Fx.CSS3Funcs.css3Features.transition, this.property + ' ' + this.options.duration + 'ms cubic-bezier(' + Fx.CSS3Funcs.transitionTimings[this.options.transition] + ')');
					this.set(this.compute(parsed.from, parsed.to, 1));
				}.bind(this);
				if (args[1]){
					this.element.setStyle(Fx.CSS3Funcs.css3Features.transition, 'none');
					this.set(this.compute(parsed.from, parsed.to, 0));
					trans.delay(0.1);
				} else
					trans();
				this.fireEvent('start', this);
				return this;
			}
			return this.parent(property, from, to);
		}
	});

	Fx.Tween.implement(Fx.CSS3Funcs);

	Fx.Tween.CSS2 = tweenCSS2;
	Fx.Tween.CSS3 = Fx.Tween;
	
})();