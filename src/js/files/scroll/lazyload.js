import LazyLoad from "vanilla-lazyload";
import barba from '@barba/core';

// Працює з об'єктами з класом ._lazy
barba.hooks.afterEnter(() => {
	// Працює з об'єктами з класом ._lazy
	const lazyMedia = new LazyLoad({
		elements_selector: '[data-src],[data-srcset]',
		class_loaded: '_lazy-loaded',
		use_native: true
	});
	
	// Оновити модуль
	lazyMedia.update();
	
	});
// Оновити модуль
//lazyMedia.update();