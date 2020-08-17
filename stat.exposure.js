(function () {
	let option = {
	  root: null,
	  rootMargin: '0px',
	  threshold: 1,
	};
	class statObserve {
	  constructor(options = {}) {
		this.options = Object.assign(option, options);
		this.observers = [];
		this.elem = '';
	  }
	  observe(elem, callback) {
		let _this = this;
		const observer = new IntersectionObserver((entries, instance) => {
		  entries.forEach(({
			intersectionRatio,
			target
		  }) => {
			if (intersectionRatio <= 0) return;
			if (intersectionRatio >= 1) {
			  callback(target);
			  instance.unobserve(target);
			}
		  })
		}, _this.options);
		document.querySelectorAll(elem).forEach(function(k, v){
		  observer.observe(v);
		  _this.observers.push({
			observer,
			v
		  })
		})
	  }
	  disconnet() {
		this.observers.forEach(({
		  observer,
		  target
		}) => {
		  observer.disconnet(target);
		})
	  }
	}
  })()
  