// Підключення функціоналу "Чертоги Фрілансера"
import { isMobile, getHash } from "./functions.js";
// Підключення списку активних модулів
import { DynamicAdapt } from './../libs/dynamic_adapt.js';
import { flsModules } from "./modules.js";
import barba from '@barba/core';
import LocomotiveScroll from 'locomotive-scroll';
//import { gsap } from "gsap";
//import { ScrollTrigger } from "gsap/ScrollTrigger.js";
import { Draggable } from "gsap/Draggable.js";
//import { ScrollToPlugin } from 'gsap/ScrollToPlugin.js';
gsap.registerPlugin(ScrollTrigger, Draggable, ScrollToPlugin);

let scroll;

const body = document.body;
const select = (e) => document.querySelector(e);
const selectAll = (e) => document.querySelectorAll(e);

window.onload = function() {
  window.scrollTo(0, 0);
};

function initLoaderHome() {
  const tl = gsap.timeline();

  // Начальная настройка элементов
  tl.set(".transition__screen", { bottom: "-142%", opacity: 1 });
  tl.set(".transition__rounded-wrap.top", { opacity: 1 });
  tl.set(".transition__fade, .transition__container", { opacity: 1 });
  tl.set("html", { cursor: "wait" });

  // Установка высоты полукруга в зависимости от ширины экрана
  const roundedWrapHeight = window.innerWidth > 540 ? "20vh" : "10vh";
  tl.set(".transition__rounded-wrap.top", { height: roundedWrapHeight });

  // Анимация затемнения экрана
  tl.to(".transition__fade", {
    duration: 0.3,
    opacity: 1,
    ease: "linear",
  });

  // Подъем блока до середины экрана
  tl.to(".transition__screen", {
    duration: 0.8,
    bottom: "-30%",
    opacity: 1,
    ease: "Power2.easeIn",
  }, "+=0.1");

  // Уменьшение высоты полукруга
  tl.to(".transition__rounded-wrap.top", {
    duration: 0.8,
    height: roundedWrapHeight,
    ease: "none",
  }, "<");

  tl.to(".transition__rounded-wrap.top", {
    duration: 0.6,
    height: "1vh",
    opacity: 1,
    ease: "Expo.easeInOut",
    delay: 0.3,
  });

  // Подъем блока вверх и его исчезновение
  tl.to(".transition__screen", {
    duration: 1.6,
    bottom: "150%",
    opacity: 1,
    ease: "Expo.easeInOut",
  }, "-=1");

  // Исчезновение затемнения
  tl.to(".transition__fade, .transition__container", {
    duration: 1.8,
    opacity: 0,
    ease: "linear",
  }, "-=1");

  tl.call(function() {
   // initTricksWords();
  //  initSpanLinesAnimation();
 });

  // Анимация линии на домашней странице (если доступно)
  if (document.querySelector(".home .line")) {
    tl.from(".home .line", {
      duration: 1.5,
      scaleX: 0,
      ease: "Expo.easeOut",
      transformOrigin: "left top",
    }, "-=1.2");
  }

  // Возвращение нормального курсора
  tl.set("html", { cursor: "auto" });

  // Возврат блока в исходное положение
  tl.set(".transition__screen", { bottom: "-142%" }, "+=0.6");

  // Анимация текста на домашней странице (только для больших экранов)
  // if (window.innerWidth > 1024) {
  //   tl.call(() => {
  //     gsap.set(".home__text .span-line", {
  //       duration: 1.55,
  //       y: 130,
  //       ease: "Expo.easeOut",
  //       stagger: 0.066,
  //     });

  //     gsap.to(".home__text .span-line", {
  //       duration: 1.55,
  //       yPercent: -100,
  //       ease: "Expo.easeIn",
  //       stagger: 0.075,
  //       delay: 0.45,
  //       clearProps: "all",
  //     });
  //   }, null, 0.35);
  // }

  // Возобновление скролла и инициализация дополнительных функций
  tl.call(() => {
    if (typeof scroll !== "undefined" && typeof scroll.start === "function") {
      scroll.start();
    }
    if (typeof initMarqueeScrollV2 === "function") {
      initMarqueeScrollV2();
    }
    if (typeof ScrollTrigger !== "undefined") {
      ScrollTrigger.addEventListener("refresh", () => scroll.update && scroll.update());
      ScrollTrigger.refresh();
    }
  }, null, "+=3");
}

function pageTransitionIn() {
  const tl = gsap.timeline();

  // Остановка скролла (если доступно)
  // tl.call(() => {
  //   if (typeof scroll !== "undefined" && typeof scroll.stop === "function") {
  //     scroll.stop();
  //   }
  // });

  // Установка начальных параметров
  tl.set(".transition__screen", {
    bottom: "-142%",
    opacity: 1,
  });

  if (window.innerWidth > 1024) {
    tl.set(".wrapper", { opacity: 0, scale: 0.95, height: "100%", });
  } else {
    tl.set(".wrapper", { opacity: 0, y: "30vh" });
  }

  tl.set(".transition__rounded-wrap.top", {
    opacity: 1,
    height: $(window).width() > 540 ? "20vh" : "10vh",
  });

  tl.set("html", { cursor: "wait" });

  // Затемнение экрана
  tl.to(".transition__fade, .transition__container", {
    opacity: 1,
    ease: "linear",
    duration: 0.3,
  });

  // Анимация поднятия экрана
  tl.to(".transition__screen", {
    duration: 0.8,
    bottom: "-30%",
    ease: "Power2.easeIn",
  });

  // Поддержание высоты полукруга до начала уменьшения
  tl.to(".transition__rounded-wrap.top", {
    duration: 0.8,
    ease: "none",
  }, "<");

  // Уменьшение высоты полукруга и его исчезновение
  tl.to(".transition__rounded-wrap.top", {
    duration: 0.6,
    height: "1vh",
    ease: "Expo.easeInOut",
    delay: 0.3,
  });

  // Полное поднятие экрана
  tl.to(".transition__screen", {
    duration: 1.6,
    bottom: "150%",
    ease: "Expo.easeInOut",
  }, "-=1");

  if (window.innerWidth > 1024) {
    tl.to(".wrapper", {
      duration: 1.5,
      scale: 1,
      height: "auto",
      ease: "Expo.easeOut",
      delay: 0.1,
      clearProps: "all"
    }, "-=3");
  } else {
    tl.to(".wrapper", {
      duration: 1.5,
      y: "0em",
      ease: "Expo.easeOut",
      delay: 0.1,
      clearProps: "all"
    }, "-=3.7");
  }

  // Уменьшение затемнения
  tl.to(".transition__fade, .transition__container", {
    duration: 1.8,
    opacity: 0,
    ease: "linear",
  }, "-=1");

  // Анимация текста на домашней странице (только для больших экранов)
  if (window.innerWidth > 1024) {
    tl.call(() => {
      gsap.to(".home__text .span-line", {
        duration: 1.55,
        y: 130,
        ease: "Expo.easeOut",
        stagger: 0.066,
      });

      gsap.to(".home__text .span-line", {
        duration: 1.55,
        yPercent: -100,
        ease: "Expo.easeIn",
        stagger: 0.075,
        delay: 0.45,
        clearProps: "all",
      });
    }, null, 0.35);
  }

  if (document.querySelector(".home .line")) {
    tl.from(".home .line", {
      duration: 1.5,
      scaleX: 0,
      ease: "Expo.easeOut",
      transformOrigin: "left top",
    }, "-=1.4");
  }

  // Сброс параметров для следующей анимации
  tl.set("html", { cursor: "auto" });
  tl.set(".transition__screen", { bottom: "-142%" }, "+=0.6");

  tl.call(() => {
    if (typeof scroll !== "undefined" && typeof scroll.start === "function") {
      scroll.start();
    }
    if (typeof ScrollTrigger !== "undefined") {
      ScrollTrigger.addEventListener("refresh", () => scroll.update && scroll.update());
      ScrollTrigger.refresh();
    }
  }, null, "+=0.3");
}

function pageTransitionOut() {
  const tl = gsap.timeline();

  // Остановка скролла (если доступно)
  if (typeof scroll !== "undefined" && typeof scroll.stop === "function") {
    tl.call(() => scroll.stop());
  }
  
  // if (window.innerWidth > 1024 ) {
  //   tl.set(".home__text .span-line", { y: 200 }, "-=.2");
  // }

  // Анимация для больших экранов
  if (window.innerWidth > 1024) {
    tl.to(".wrapper", {
      scale: 0.95,
      height: "100%",
      opacity: 0,
    });
  } else {
    tl.to(".wrapper", { opacity: 0, });
  }

}

initPageTransitions();

function initPageTransitions() {

  barba.hooks.before(() => {
    select('html').classList.add('is-transition');
 });

  barba.hooks.after(() => {
    select('html').classList.remove('is-transition');
    initGridViewHandlers();
  });

  barba.hooks.enter(() => {
  });

  barba.hooks.afterEnter(() => {
    window.scrollTo(0, 0);
    setTimeout(() => {
      initCheckScrollUpDown();  // Отложенный вызов функции
    }, 100);
 });

barba.init({
  sync: true,
  debug: false,
  timeout: 7000,
  transitions: [{
    name: 'default',
    from: {
    },
    to: {
      namespace: ['home', 'about', 'product', 'work']
    },
    once(data) { // вызывается только один раз, когда пользователь впервые заходит на ваш сайт
      initSmoothScroll(data.next.container);
      initSpanLinesAnimation();
      initScript();
      initLoaderHome();
      initTricksWords();
    },
    
    afterEnter(data) { // после того, как новая страница полностью загружена
      initSmoothScroll(data.next.container);
      initCheckScrollUpDown();
      initTricksWords();
      initSpanLinesAnimation();
      updateActiveMenuItem();
    },
    async leave(data) {  // перед тем, как пользователь покидает текущую страницу
      pageTransitionOut(data.current);
      await delay(986);
      data.current.container.remove();
      const done = this.async();    
      done(); 
    },
    async enter(data) { // после того, как новая страница полностью загружена
      const da = new DynamicAdapt("min");
      da.init();
      initTHREEScene();
      pageTransitionIn(data.next); 
    },
    async beforeEnter(data) { // перед входом на страницу
      ScrollTrigger.getAll().forEach(t => t.kill());
      scroll.destroy();
      initScript();
    },
  }, 
  {
    name: 'to-home',
    from: {
    },
    to: {
      namespace: ['home']
    },
    once(data) { // вызывается только один раз, когда пользователь впервые заходит на ваш сайт
      initSmoothScroll(data.next.container);
      initScript();
      initTHREEScene();
      initLoaderHome();
      initSpanLinesAnimation();
    },
  }],
  prevent: ({ el }) => el.getAttribute('href')?.startsWith("#"),
});

function initSmoothScroll(container) {
  if (scroll) {
    scroll.destroy();
    scroll = null; // Убедимся, что старый экземпляр удалён
  } 

  scroll = new LocomotiveScroll({
    el: container.querySelector('[data-scroll-container]'),
    smooth: true,
    multiplier: 1,
    lerp: 0.1,
    class: "is-inview"
  });

  window.onresize = () => scroll.update();

  scroll.on("scroll", () => ScrollTrigger.update());

  ScrollTrigger.scrollerProxy('[data-scroll-container]', {
    scrollTop(value) {
      return arguments.length ? scroll.scrollTo(value, 0, 0) : scroll.scroll.instance.scroll.y;
    },
    getBoundingClientRect() {
      return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
    },
    pinType: container.querySelector('[data-scroll-container]').style.transform ? "transform" : "fixed"
  });

  ScrollTrigger.defaults({
    scroller: document.querySelector('[data-scroll-container]'),
  });

    // каждый раз, когда окно обновляется, мы должны обновить ScrollTrigger, а затем обновить LocomotiveScroll. 
    ScrollTrigger.addEventListener('refresh', () => scroll.update());

    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();
  } 
}

function delay(n) {
	n = n || 2000;
	return new Promise((done) => {
		setTimeout(() => {
			done();
		}, n);
	});
}
//========================================================================================================================================================
/**
* Active menu item
*/
const menuMapping = {
  "Home": "Home",
  "About": "About",
  "Work": "Work",
  "Julia Maisa": "Work",
  "Groove School": "Work",
  "Pizza-Next": "Work",
};

function updateActiveMenuItem() {
  const pageTitle = document.title.trim();
  document.querySelectorAll('[data-link-update]').forEach(item => {
    item.classList.remove('active');
  });
  const menuKey = Object.keys(menuMapping).find(key => pageTitle.toLowerCase().includes(key.toLowerCase()));

  if (menuKey) {
    document.querySelectorAll('[data-link-update]').forEach(item => {
      const menuText =
        item.querySelector('a .btn-text-p.change')?.textContent.trim() || 
        item.querySelector('a p:not([hidden])')?.textContent.trim() ||  
        item.querySelector('a')?.textContent.trim() ||                 
        item.querySelector('p')?.textContent.trim() ||                 
        item.textContent.trim();                                       

      if (menuText && menuText === menuMapping[menuKey]) {
        item.classList.add('active');
      }
    });
  }
};

/**
* Active menu item hover
*/
function initMenuHoverEffect() {
  const menuItems = document.querySelectorAll('[data-link-update]');
  menuItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
      menuItems.forEach(el => el.classList.remove('active'));
      item.classList.add('active');
    });
    item.addEventListener('mouseleave', () => {
      // Возвращаем .active на пункт, соответствующий текущей странице
      updateActiveMenuItem();
    });
  });
}

/**
*  Page navigation barba / scrolltrigger
*/
function initPageNavigationScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", function (e) {
      e.preventDefault(); // Отключаем стандартное поведение
  
      const targetId = this.getAttribute("href").substring(1); // Извлекаем ID секции
      const targetSection = document.getElementById(targetId);
  
      if (targetSection) {
        // Получаем точное смещение целевой секции
        const offsetTop = targetSection.getBoundingClientRect().top + window.pageYOffset;
  
        // Проверяем, уже ли мы находимся в пределах текущей секции
        const currentScroll = window.pageYOffset;
        const tolerance = 10; // Допустимая погрешность, чтобы избежать повторных движений из-за мелких различий
  
        if (Math.abs(currentScroll - offsetTop) <= tolerance) {
          // Уже на нужной секции, ничего не делаем
          return;
        }
  
        // Прокрутка через кастомный или стандартный скролл
        if (typeof scroll !== "undefined" && scroll.scrollTo) {
          // Если используется кастомный скролл
          scroll.scrollTo(offsetTop, { duration: 2 }); // Прокрутка через библиотеку
        } else {
          // Если кастомный скролл не используется
          gsap.to(window, {
            duration: 2,
            scrollTo: offsetTop, // Прокрутка к абсолютной позиции
            ease: "linear"
          });
        }
      }
    });
  });
}
//========================================================================================================================================================

/**
* Check Scroll up or Down
*/
function initCheckScrollUpDown() {

  var lastScrollTop = 0;
  var threshold = 150;

  function startCheckScroll() {
     scroll.on('scroll', (instance) => {
        var nowScrollTop = instance.scroll.y;

        if (Math.abs(lastScrollTop - nowScrollTop) >= threshold) {
           if (nowScrollTop > lastScrollTop) {
              document.querySelector('main').classList.add('scroll-direction-down');
              document.querySelector('header').classList.add('scroll-direction-down');
           } else {
              document.querySelector('main').classList.remove('scroll-direction-down');
              document.querySelector('header').classList.remove('scroll-direction-down');
           }
           lastScrollTop = nowScrollTop;

           if (nowScrollTop > threshold) {
              document.querySelector('main').classList.add('scroll-scrolled');
              document.querySelector('header').classList.add('scroll-scrolled');
              document.querySelector('header').classList.remove('nav-see-through');
           } else {
              document.querySelector('main').classList.remove('scroll-scrolled');
              document.querySelector('header').classList.remove('scroll-scrolled');
              document.querySelector('header').classList.add('nav-see-through');
           }
        }
     });
  }

  startCheckScroll();

  barba.hooks.after(() => {
    startCheckScroll();
  });
}

function initScript() {
  getHash();
//  initWindowInnerheight();
  initCheckTouchDevice();
  initHamburgerNav();
  initMagneticButtons();
  initStickyCursorWithDelay();
  updateActiveMenuItem();
  initMenuHoverEffect();
  setTimeout(() => {
    initCheckScrollUpDown();
    initScrollAnimation();
    initTimeZone();
    initPageNavigationScroll();
    initBgFooterLink();
    initPlayVideoInview();
    initMarqueeScrollV2();
    initVibration();
  }, 100);
}

//========================================================================================================================================================


function initTricksWords() {
  // Copyright start
  // © Code by T.RICKS, https://www.tricksdesign.com/
  // You have the license to use this code in your projects but not redistribute it to others
  // Tutorial: https://www.youtube.com/watch?v=xiAqTu4l3-g&ab_channel=TimothyRicks

  // Find all text with .tricks class and break each letter into a span
  var spanWord = document.getElementsByClassName("span-lines");
  for (var i = 0; i < spanWord.length; i++) {

  var wordWrap = spanWord.item(i);
  wordWrap.innerHTML = wordWrap.innerHTML.replace(/(^|<\/?[^>]+>|\s+)([^\s<]+)/g, '$1<span class="span-line"><span class="span-line-inner">$2</span></span>');
  }
}  

function initSpanLinesAnimation() {
  document.querySelectorAll('.span-lines.animate').forEach(function(triggerElement) {
    let targetElements = triggerElement.querySelectorAll('.span-line-inner');

    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: triggerElement,               
        toggleActions: 'play none none reset', 
        start: "0% 100%",                       
        end: "100% 0%",                         
       // scrub: 1                                
      }
    });

    if (targetElements.length > 0) {
      tl.from(targetElements, {
        y: "100%",                
        stagger: 0.01,            
        ease: "power3.out",       
        duration: 1,              
        delay: 0                  
      });
    }
  });
}

document.addEventListener('load', function() {
  // initSpanLinesAnimation();
  // initTricksWords();
 });

/**
* Check touch device
*/
function initCheckTouchDevice() {
    
  function isTouchScreendevice() {
    return 'ontouchstart' in window || navigator.maxTouchPoints;      
  };
  
  if(isTouchScreendevice()){
    $('main').addClass('touch');
    $('main').removeClass('no-touch');
  } else {
    $('main').removeClass('touch');
    $('main').addClass('no-touch');
  }
  $(window).resize(function() {
    if(isTouchScreendevice()){
       $('main').addClass('touch');
       $('main').removeClass('no-touch');
    } else {
       $('main').removeClass('touch');
       $('main').addClass('no-touch');
    }
  });

}

/**
* Hamburger Nav Open/Close
*/
function initHamburgerNav() {
  // Open/close navigation when clicked .btn-hamburger
  $(document).ready(function(){
    $(".hamburger, .icon-menu, .menu__body a").click(function(){
      if ($(".hamburger, .icon-menu").hasClass('active')) {
          $(".hamburger, .icon-menu").removeClass('active');
          $("main").removeClass('nav-active');
          scroll.start();
      } else {
          $(".hamburger, .icon-menu").addClass('active');
          $("main").addClass('nav-active');
          scroll.stop();
      }
    });
    $('.menu__overlay').click(function(){
      $(".hamburger, .icon-menu").removeClass('active');
      $("main").removeClass('nav-active');
      scroll.start();
    });
  });
  $(document).keydown(function(e){
    if(e.keyCode == 27) {
      if ($('main').hasClass('nav-active')) {
          $(".hamburger, .icon-menu").removeClass('active');
          $("main").removeClass('nav-active');
          scroll.start();
      } 
    }
  });

}

//========== canvas ==============================================================================================================================================
function initTHREEScene() {


const fragment = document.querySelector("#fragment").textContent;
const vertex = document.querySelector("#vertex").textContent;
const fragmentParticle = document.querySelector("#particle-fragment").textContent;
const vertexParticle = document.querySelector("#particle-vertex").textContent;

const backgroundVertex = document.querySelector("#background-vertex").textContent;
const backgroundFragment = document.querySelector("#background-fragment").textContent;

class THREEScene {
    constructor(container = document.body) {
        this.container = container;

        this.init();
    }

    init() {
        this.setup();
        this.camera();
        this.addToScene();
        this.createParticles();
        this.createBackground();
        this.eventListeners();
        this.render();
        this.animate();
    }

    setup() {
        this.scene = new THREE.Scene();
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(this.viewport.width, this.viewport.height);
      //  this.renderer.setPixelRatio = window.devicePixelRatio;
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.container.appendChild(this.renderer.domElement);
        this.material = new THREE.ShaderMaterial({
            vertexShader: vertex,
            fragmentShader: fragment,
            wireframe: false,
            uniforms: {
                u_time: { value: 0 },
                u_progress: { value: 0 }
            }
        });

        this.pointsMaterial = new THREE.ShaderMaterial({
            vertexShader: vertexParticle,
            fragmentShader: fragmentParticle,
            wireframe: false,
            side: THREE.DoubleSide,
            transparent: true,
            uniforms: {
                u_time: { value: 0 },
                u_progress: { value: 0 }
            }
        });
        this.clock = new THREE.Clock();
    }

    camera() {
        const fov = 40;
        const near = 0.1;
        const far = 10000;
        const aspectRatio = this.viewport.aspectRatio;
        this.camera = new THREE.PerspectiveCamera(fov, aspectRatio, near, far);
        this.camera.position.set(0, 0, 10);
    }

    addToScene() {
        this.geometry = new THREE.SphereGeometry(1, 162, 162);
        const sphere = new THREE.Mesh(this.geometry, this.material);

        this.scene.add(sphere);
    }

    createParticles() {
        const N = 30000;
        const position = new Float32Array(N * 3);
        this.particleGeometry = new THREE.BufferGeometry();

        let inc = Math.PI * (3 - Math.sqrt(5));
        let offset = 2 / N;
        let radius = 2;

        for (let i = 0; i < N; i++) {
            let y = i * offset - 1 + offset / 2;
            let r = Math.sqrt(1 - y * y);
            let phi = i * inc;

            position[3 * i] = radius * Math.cos(phi) * r;
            position[3 * i + 1] = radius * y;
            position[3 * i + 2] = radius * Math.sin(phi) * r;
        }

        this.particleGeometry.setAttribute(
            "position",
            new THREE.BufferAttribute(position, 3)
        );

        this.points = new THREE.Points(
            this.particleGeometry,
            this.pointsMaterial
        );
        this.scene.add(this.points);
    }

    createBackground() {
        const geometry = new THREE.PlaneGeometry(100, 15, 16);
        this.backgroundMaterial = new THREE.ShaderMaterial({
            vertexShader: backgroundVertex,
            fragmentShader: backgroundFragment,
            wireframe: false,
            uniforms: {
                u_time: { value: 0 },
                u_progress: { value: 0 }
            }
        });

        const mesh = new THREE.Mesh(geometry, this.backgroundMaterial);
        mesh.position.z = -2;
        this.scene.add(mesh);
    }

    render() {
        this.camera.lookAt(this.scene.position);
        this.renderer.render(this.scene, this.camera);
        this.material.uniforms.u_time.value = this.clock.getElapsedTime();
        this.pointsMaterial.uniforms.u_time.value = this.clock.getElapsedTime();
        this.backgroundMaterial.uniforms.u_time.value = this.clock.getElapsedTime();
        this.points.rotation.y += 0.005;

        requestAnimationFrame(() => {
            this.render();
        });
    }

    animate() {
        gsap.timeline({
            repeat: -1,
            yoyo: true
        })
            .to(this.material.uniforms.u_progress, {
                value: 5,
                duration: 5,
                ease: "power3.inOut"
            })
            .to(this.material.uniforms.u_progress, {
                value: 1,
                duration: 5,
                ease: "power3.inOut"
            });
        gsap.to(this.pointsMaterial.uniforms.u_progress, {
            value: 0.4,
            duration: 5,
            ease: "power3.inOut"
        });
    }

    eventListeners() {
        window.addEventListener("resize", this.onWindowResize.bind(this));
    }

    onWindowResize() {
        this.material.uniforms.u_time.value = this.clock.getElapsedTime();
        this.camera.aspect = this.viewport.aspectRatio;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(this.viewport.width, this.viewport.height);
    }

    get viewport() {
        const width = this.container.clientWidth;
        const height = this.container.clientHeight;
        const aspectRatio = width / height;

        return {
            width,
            height,
            aspectRatio
        };
    }
}

const canvasContainer = document.getElementById("myCanvas");
if (canvasContainer) {
  const scene = new THREEScene(canvasContainer); 
} else {
 // console.log("Required elements not found on the page.");
}

};
//========================================================================================================================================================
/**
* Marquee on Scroll Direction
*/
function initMarqueeScrollV2() {

  $('[data-marquee-target]').each(function(){

     let marquee = $(this);
     
     let marqueeItemsWidth = marquee.find(".marquee-content").width();
     let marqueeSpeed = marquee.attr('data-marquee-speed') * (marqueeItemsWidth / $(window).width());

     // Speed up Marquee on Tablet & Mobile
     if($(window).width() <= 540){
        marqueeSpeed = marqueeSpeed * 0.25;
     } else if($(window).width() <= 1024){
        marqueeSpeed = marqueeSpeed * 0.5;
     }

     let marqueeDirection = 1;
     let marqueeContent = gsap.to(marquee.find('.marquee-content'), {xPercent: -100, repeat: -1, duration: marqueeSpeed, ease: "linear", paused: true}).totalProgress(0.5);
  
     gsap.set(marquee.find(".marquee-content"), {xPercent: 50});

     ScrollTrigger.create({
        trigger: marquee,
        start: "top bottom",
        end: "bottom top",
        onUpdate(self) {
           if (self.direction !== marqueeDirection) {
              marqueeDirection *= -1;
              if(marquee.attr('data-marquee-direction') == 'right') {
                 gsap.to([marqueeContent], { timeScale: (marqueeDirection * -1), overwrite: true });
              } else {
                 gsap.to([marqueeContent], { timeScale: marqueeDirection, overwrite: true });
              }
           }
           self.direction === -1 ? marquee.attr('data-marquee-status', 'normal') : marquee.attr('data-marquee-status', 'inverted');
        },
        onEnter: () => marqueeContent.play(),
        onEnterBack: () => marqueeContent.play(),
        onLeave: () => marqueeContent.pause(),
        onLeaveBack: () => marqueeContent.pause()
     });

     // Extra speed on scroll
     marquee.each(function () {

        let triggerElement = $(this);
        let targetElement = $(this).find('.marquee-scroll');
        let marqueeScrollSpeed = $(this).attr('data-marquee-scroll-speed');
     
        let tl = gsap.timeline({
           scrollTrigger: {
              trigger: $(this),
              start: "0% 100%",
              end: "100% 0%",
              scrub: 0
           }
        });   

        if(triggerElement.attr('data-marquee-direction') == 'left') {         
           tl.fromTo(targetElement, {
              x: marqueeScrollSpeed + "vw",
           }, {
              x: marqueeScrollSpeed * -1 + "vw",
              ease: "none"
           });
        }

        if(triggerElement.attr('data-marquee-direction') == 'right') {         
           tl.fromTo(targetElement, {
              x: marqueeScrollSpeed * -1 + "vw",
           }, {
              x: marqueeScrollSpeed + "vw",
              ease: "none"
           });
        }
     });
  });
}
$(document).ready(function() {
  initMarqueeScrollV2();
});

/**
* Window Inner Height Check
*/
//function initWindowInnerheight() {
    
  // https://css-tricks.com/the-trick-to-viewport-units-on-mobile/
//  $(document).ready(function(){
//    let vh = window.innerHeight * 0.01;
//    document.documentElement.style.setProperty('--vh', `${vh}px`);
//    $('.hamburger, .menu').click(function(){
//      let vh = window.innerHeight * 0.01;
//      document.documentElement.style.setProperty('--vh', `${vh}px`);
//    });
//  });

//}
/**
/* Marquee on Scroll
*/
// initMarqueeScroll()
// function initMarqueeScroll() {
//    // Scrolling Letters Both Direction
//    // https://codepen.io/GreenSock/pen/rNjvgjo
//    // Fixed example with resizing
//    // https://codepen.io/GreenSock/pen/QWqoKBv?editors=0010

//    if(document.querySelector(".marquee")) {
 
//    let direction = 1; // 1 = forward, -1 = backward scroll
 
//    const roll1 = roll(".marquee .marquee-inner-wrap", {duration: 18}),
//    roll2 = roll(".rollingText02", {duration: 18}, true),
//    scroll = ScrollTrigger.create({
//       trigger: document.querySelector('[data-scroll-container]'),
//       onUpdate(self) {
//          if (self.direction !== direction) {
//             direction *= -1;
//             gsap.to([roll1, roll2], {timeScale: direction, overwrite: true});
//          }
//          self.direction === -1 ? $(".marquee").removeClass('flipped') : $(".marquee").addClass('flipped')
//       }
//    });
 
//    // helper function that clones the targets, places them next to the original, then animates the xPercent in a loop to make it appear to roll across the screen in a seamless loop.
//    function roll(targets, vars, reverse) {
//      vars = vars || {};
//      vars.ease || (vars.ease = "none");
//      const tl = gsap.timeline({
//              repeat: -1,
//              onReverseComplete() { 
//                this.totalTime(this.rawTime() + this.duration() * 10); // otherwise when the playhead gets back to the beginning, it'd stop. So push the playhead forward 10 iterations (it could be any number)
//              }
//            }), 
//            elements = gsap.utils.toArray(targets),
//            clones = elements.map(el => {
//              let clone = el.cloneNode(true);
//              el.parentNode.appendChild(clone);
//              return clone;
//            }),
//            positionClones = () => elements.forEach((el, i) => gsap.set(clones[i], {position: "absolute", overwrite: false, top: el.offsetTop, left: el.offsetLeft + (reverse ? -el.offsetWidth : el.offsetWidth)}));
//      positionClones();
//      elements.forEach((el, i) => tl.to([el, clones[i]], {xPercent: reverse ? 100 : -100, ...vars}, 0));
//      window.addEventListener("resize", () => {
//        let time = tl.totalTime(); // record the current time
//        tl.totalTime(0); // rewind and clear out the timeline
//        positionClones(); // reposition
//        tl.totalTime(time); // jump back to the proper time
//      });
//      return tl;
//    }

//    }
// }


//========================================================================================================================================================

/**
* Magnetic Buttons
*/
function initMagneticButtons() {
    
  // Magnetic Buttons
  // Found via: https://codepen.io/tdesero/pen/RmoxQg
  var magnets = document.querySelectorAll('.magnetic');
  var strength = 100;
  
  // START : If screen is bigger as 540 px do magnetic
  if(window.innerWidth > 540){
  // Mouse Reset
  magnets.forEach((magnet) => {
      // Добавляем обработчик события 'mousemove' для перемещения магнита
      magnet.addEventListener('mousemove', moveMagnet);
      // Удаляем класс 'not-active' у родительского элемента
      magnet.parentNode.classList.remove('not-active');
      // Добавляем обработчик события 'mouseleave' для возврата элемента на исходную позицию
      magnet.addEventListener('mouseleave', function(event) {
        gsap.to(event.currentTarget, {
          duration: 1.5,
          x: 0, 
          y: 0, 
          ease: Elastic.easeOut,
          clearProps: "all",
        });
    
        const btnText = magnet.querySelector('.btn__text');
        if (btnText) {
          gsap.to(btnText, {
            duration: 1.5,
            x: 0, 
            y: 0, 
            ease: Elastic.easeOut,
            clearProps: "all",
          });
        }
      });
    });

  // Mouse move
  function moveMagnet(event) {
    var magnetButton = event.currentTarget;
    var bounding = magnetButton.getBoundingClientRect();
    var magnetsStrength = magnetButton.getAttribute("data-strength");
    var magnetsStrengthText = magnetButton.getAttribute("data-strength-text");
      
    gsap.to(magnetButton, {
      duration: 1.5,
      x: (((event.clientX - bounding.left) / magnetButton.offsetWidth) - 0.5) * magnetsStrength,
      y: (((event.clientY - bounding.top) / magnetButton.offsetHeight) - 0.5) * magnetsStrength,
      rotate: "0.001deg",
      ease: Power4.easeOut
    });
    gsap.to(magnetButton.querySelector(".btn__text"), {
      duration: 1.5,
      x: (((event.clientX - bounding.left) / magnetButton.offsetWidth) - 0.5) * magnetsStrengthText,
      y: (((event.clientY - bounding.top) / magnetButton.offsetHeight) - 0.5) * magnetsStrengthText,
      rotate: "0.001deg",
      ease: Power4.easeOut
    });
  //   gsap.to(magnetButton.querySelector(".btn-text"), {
  //     x: 0, 
  //     y: 0, 
  //     scale: 1,
  //     rotate: 0,
  //     duration: 1.5,
  //     ease: "elastic.out(1, 0.5)"
  // });
  }

  }; // END : Если экран больше 540 px, сделайте магнитный

// Получаем все кнопки с классом .btn-click.magnetic
document.querySelectorAll('.btn.magnetic, .hamburger.magnetic').forEach(function(btn) {

  // Mouse Enter (Наведение курсора на элемент)
  btn.addEventListener('mouseenter', function() {
    const btnTextInner = btn.querySelector('.btn-text-p.change');

    if (btnTextInner) {
      gsap.to(btnTextInner, {
        duration: 0.3,
        startAt: { color: "#0c1725" },
        color: "#000000",
        ease: Power3.easeIn,
      });
    }

    btn.parentNode.classList.add('not-active');
  });

  // Mouse Leave (Уход курсора с элемента)
  btn.addEventListener('mouseleave', function() {
    const btnTextInner = btn.querySelector('.btn-text-p.change');

    if (btnTextInner) {
      gsap.to(btnTextInner, {
        duration: 0.3,
       // color: "#0c1725",
        color: btn.classList.contains('footer__mail') ? "#ebe3dc" : "#0c1725",
        ease: Power3.easeOut,
        delay: 0.1,
        
      });
    }

    
    btn.parentNode.classList.add('not-active');
  });
});
}  

 /**
   * Button hover
   */
// Button hover animation
$('[data-btn-hover]').on('mouseenter mouseleave', function (event) {

  // Get the button's offset and dimensions
  var buttonOffset = $(this).offset();
  var buttonWidth = $(this).outerWidth();
  var buttonHeight = $(this).outerHeight();

  // Calculate the center of the button
  var buttonCenterX = buttonOffset.left + buttonWidth / 2;
  var buttonCenterY = buttonOffset.top + buttonHeight / 2;

  // Calculate the mouse position relative to the top-left corner of the button
  var mouseX = event.pageX;
  var mouseY = event.pageY;

  // Offset from the top-left corner in percentage
  var offsetXFromLeft = ((mouseX - buttonOffset.left) / buttonWidth) * 100;
  var offsetYFromTop = ((mouseY - buttonOffset.top) / buttonHeight) * 100;

  // Offset from the center in percentage
  var offsetXFromCenter = ((mouseX - buttonCenterX) / (buttonWidth / 2)) * 50;
  // var offsetYFromCenter = ((mouseY - buttonCenterY) / (buttonHeight / 2)) * 50;

  // Convert to absolute values
  offsetXFromCenter = Math.abs(offsetXFromCenter);
  // offsetYFromCenter = Math.abs(offsetYFromCenter);

  // Set position of .btn__circle
  $(this).find('.btn__circle').css('left', offsetXFromLeft.toFixed(1) + '%')
    .css('top', offsetYFromTop.toFixed(1) + '%')
    .css('width', 115 + (offsetXFromCenter.toFixed(1) * 2) + '%');
});
      
//=  time    =======================================================================================================================================================
function initTimeZone() {
  if (document.querySelector(".time-millisec")) {
    function getTimeMillis() {
      var myTime = document.querySelector(".time-millisec");
      var date = new Date();
      var getTime = date.toLocaleTimeString([], {
        hour:'2-digit',
        minute:'2-digit',
        second:'2-digit',
        fractionalSecondDigits:'1' // Adds 1 digit milliseconds
      });
      var time = `${getTime}`;
      myTime.innerText = time
    }
    
    setInterval(getTimeMillis, 100); //Change from 1000 to 100 update the milliseconds
  }
}

//=========== logo - footer ==============================================================================================================================================
function initScrollAnimation() {
  gsap.registerPlugin(ScrollTrigger);
  let tl = gsap.timeline();
  const htmlElement = document.documentElement; 
  const mainElement = document.querySelector('main.page'); 

  if (window.innerWidth > 1024 && document.querySelector('.line-shadow') ) {
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.line-main',
        start: "top 65%",
        end: "bottom 60%",
        scrub: 1,
      //  markers: true,
      },
    });
  
    tl.to('.line-shadow', {
      opacity: .56,
      ease: "power1.inOut",
    }, 0)
  }
// product-header button
  if (window.innerWidth > 479.98 && document.querySelector('.product-header-pr')) {
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.product-header-pr',
        start: "top 250px",
        end: "bottom 150px",
        scrub: 1,
      },
    });

    tl.to('.product-header-pr', {
      x: "-5em",
    }, 0)
  }

  if (htmlElement.classList.contains('touch') && mainElement && document.querySelector('.line-shadow')) {
    tl.set('.line-shadow', {
      opacity: 0,
    });
  } 


  if (window.innerWidth > 900 && document.querySelector('.right-footer__logo')) {
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.footer',
        start: "top bottom",
        end: "bottom 95%",
        scrub: 1,
      //  markers: true,
      },
    });
    
    tl.to('.right-footer__logo--v', {
      yPercent: -120,
      rotate: 0,
      ease: "power1.inOut",
    }, 0) 
    
    .to('.right-footer__logo--a', {
      yPercent: -120,
      rotate: 0,
      ease: "power1.inOut",
    }, "-=0.4"); 
  }

  if (window.innerWidth > 540 && document.querySelector('.works, .product-wrap')) {
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.color-container',
        start: "center bottom",
        end: "bottom top",
        scrub: 1,
      //  markers: true,
        scroller: ".color-container"
      },
    });
  
    tl.to('.works__color', {
      opacity: .02,
      ease: "power1.inOut",
    })

  }
}

/**   
 * backgroundColorLink   
 * */
function initBgFooterLink() {
  document.querySelectorAll('.footer-product__link-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
      // Получаем цвет из .footer-product__image-color
      const colorElement = document.querySelector('.footer-product__image-color');
      const backgroundColor = window.getComputedStyle(colorElement).backgroundColor;
  
      // Устанавливаем цвет для псевдоэлемента с прозрачностью через rgba
      const rgbaColor = backgroundColor.replace('rgb', 'rgba').replace(')', ', 0.05)');
      document.querySelector('.footer').style.setProperty('--footer-before-color', rgbaColor);
  
      // Устанавливаем цвет для самой .footer
      document.querySelector('.footer').style.backgroundColor = rgbaColor;
  
      // Скрываем или делаем прозрачным .footer-product__image-color
      if (colorElement) {
        colorElement.style.opacity = '0';
      }
    });
  
    item.addEventListener('mouseleave', () => {
      // Сбрасываем цвет переменной
      document.querySelector('.footer').style.setProperty('--footer-before-color', 'transparent');
  
      // Сбрасываем фон самой .footer
      document.querySelector('.footer').style.backgroundColor = '';
  
      // Восстанавливаем видимость .footer-product__image-color
      const colorElement = document.querySelector('.footer-product__image-color');
      if (colorElement) {
        colorElement.style.opacity = '0.05';
      }
    });
  });
}

//========================================================================================================================================================

/**
* Sticky Cursor with Delay
*/
function initStickyCursorWithDelay() {
    
  // Sticky Cursor with delay
  // https://greensock.com/forums/topic/21161-animated-mouse-cursor/
  var cursorImage = $(".mouse-image")
  var cursorBtn = $(".mouse-btn");
  var cursorSpan = $(".mouse-span");

  var posXImage = 0
  var posYImage = 0
  var posXBtn = 0
  var posYBtn = 0
  var posXSpan = 0
  var posYSpan = 0
  var mouseX = 0
  var mouseY = 0

  if(document.querySelector(".mouse-image, .mouse-btn, .mouse-span")) {
  gsap.to({}, 0.0083333333, {
    repeat: -1,
    onRepeat: function() {

      if(document.querySelector(".mouse-image")) {
        posXImage += (mouseX - posXImage) / 12;
        posYImage += (mouseY - posYImage) / 12;
        gsap.set(cursorImage, {
          css: {
          left: posXImage,
          top: posYImage,
          }
        });
      }
      if(document.querySelector(".mouse-btn")) {
        posXBtn += (mouseX - posXBtn) / 7;
        posYBtn += (mouseY - posYBtn) / 7;
        gsap.set(cursorBtn, {
          css: {
          left: posXBtn,
          top: posYBtn
          }
        });
      }
      if(document.querySelector(".mouse-span")) {
        posXSpan += (mouseX - posXSpan) / 6;
        posYSpan += (mouseY - posYSpan) / 6;   
        gsap.set(cursorSpan, {
          css: {
          left: posXSpan,
          top: posYSpan
          }
        });
      }
    }
  });
  }

  $(document).on("mousemove", function(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // Animated Section Assortiment Single Floating Image ..  следование за курсором
  // Source: http://jsfiddle.net/639Jj/1/ 

  $('.work-wrapper a').on('mouseenter', function() {
    $('.mouse-image, .mouse-btn, .mouse-span, .mouse-pos-list-span-big').addClass('active');
  });
  $('.work-wrapper a').on('mouseleave', function() {
    $('.mouse-image, .mouse-btn, .mouse-span, .mouse-pos-list-span-big').removeClass('active');
  });

  $('.work-tiles-wrapper a').on('mouseenter', function() {
    $('.mouse-btn, .mouse-span, .mouse-pos-list-span-big').addClass('active');
  });
  $('.work-tiles-wrapper a').on('mouseleave', function() {
    $('.mouse-btn, .mouse-span, .mouse-pos-list-span-big').removeClass('active');
  });


  $('.works-link, .next-case').on('mouseenter', function() {
    $('.mouse-btn, .mouse-span').addClass('active-big');
  });
  $('.works-link, .next-case').on('mouseleave', function() {
    $('.mouse-btn, .mouse-span').removeClass('active-big');
  });


  $('main').on('mousedown', function() {
    $(".mouse-btn, .mouse-span").addClass('pressed');
  });
  $('main').on('mouseup', function() {
    $(".mouse-btn, .mouse-span").removeClass('pressed');
  });


  
  $('.work-wrapper li.visible').on('mouseenter', function() {
    
    var $elements = $(".work-wrapper li.visible");
    var index =  $elements.index($(this));
    var count = $(".mouse-image li.visible").length;
    // var index =  $(this).index();
    if($(".mouse-image__float-wrap")) {
        gsap.to($(".mouse-image__float-wrap"), {
          y: (index*100)/(count*-1) + "%",
          duration: .6,
          ease: Power2.easeInOut
        });
    }
    $(".mouse-image.active .mouse-image__bounce").addClass("active").delay(400).queue(function(next){
        $(this).removeClass("active");
        next();
    });

  });


  $('.archive-work-grid li').on('mouseenter', function() {
    $(".mouse-btn").addClass("hover").delay(100).queue(function(next){
      $(this).removeClass("hover");
      next();
    });
  });

}

/**
* Visual Filter Grid View
*/
// Функция для изменения вида страниц
function initGridViewHandlers() {
  // Основная логика переключения вида
  function setGridView(view) {
    const isColumns = view === "columns";

    // Управление классами кнопок
    $('.works-switch__buttons .btn-normal').removeClass('active not-active');
    if (isColumns) {
      $('.works-switch__buttons .columns-btn').addClass('active');
      $('.works-switch__buttons .rows-btn').addClass('not-active');
    } else {
      $('.works-switch__buttons .rows-btn').addClass('active');
      $('.works-switch__buttons .columns-btn').addClass('not-active');
    }

    // Показываем/скрываем нужные секции
    $('.grid-columns-part').toggleClass('visible', isColumns);
    $('.grid-rows-part').toggleClass('visible', !isColumns);

    // Обновляем ScrollTrigger и Locomotive Scroll
    ScrollTrigger.refresh();
    scroll.update();

    // Сохраняем выбранный вид в localStorage и Cookies
    localStorage.setItem("view", view);
    Cookies.set("view", view, { expires: 14, path: "/" });
  }

  // Функция для инициализации текущего вида при загрузке
  function initSavedGridView() {
    const savedView = localStorage.getItem("view") || Cookies.get("view") || "rows";
    setGridView(savedView);
  }

  // Устанавливаем обработчики для кнопок переключения
  $('.works-switch__buttons .rows-btn').off("click").on('click', function () {
    if (!$(this).hasClass('active')) {
      $('.grid-fade').addClass('grid-fade-out');
      scroll.stop();
      scroll.scrollTo('top', {
        offset: 0,
        duration: 700,
        easing: [0.7, 0.00, 0.35, 1.00],
        disableLerp: true
      });
      setTimeout(() => $('.grid-fade').removeClass('grid-fade-out').addClass('grid-fade-in'), 300);
      setTimeout(() => {
        $('.grid-fade').removeClass('grid-fade-in');
        setGridView("rows");
        scroll.start();
      }, 700);
    }
  });

  $('.works-switch__buttons .columns-btn').off("click").on('click', function () {
    if (!$(this).hasClass('active')) {
      $('.grid-fade').addClass('grid-fade-out');
      scroll.stop();
      scroll.scrollTo('top', {
        offset: 0,
        duration: 700,
        easing: [0.7, 0.00, 0.35, 1.00],
        disableLerp: true
      });
      setTimeout(() => $('.grid-fade').removeClass('grid-fade-out').addClass('grid-fade-in'), 300);
      setTimeout(() => {
        $('.grid-fade').removeClass('grid-fade-in');
        setGridView("columns");
        scroll.start();
      }, 700);
    }
  });

  // Инициализация вида
  initSavedGridView();
}

// Инициализация на загрузке страницы
$(document).ready(function () {
  initGridViewHandlers();
});

//========================================================================================================================================================
/**
* Play Video Inview
*/
function initPlayVideoInview() {
  let allVideoDivs = gsap.utils.toArray('.playpauze');

  allVideoDivs.forEach((videoDiv) => {
    let videoElem = videoDiv.querySelector('video');

    ScrollTrigger.create({
      scroller: document.querySelector('[data-scroll-container]'),
      trigger: videoElem,
      start: '0% 120%',
      end: '100% -20%',
      onEnter: () => handleVideoPlay(videoElem),
      onEnterBack: () => handleVideoPlay(videoElem),
      onLeave: () => videoElem.pause(),
      onLeaveBack: () => videoElem.pause(),
    });
  });

  function handleVideoPlay(video) {
    const playPromise = video.play();

    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          console.log('Video is playing successfully');
        })
        .catch((error) => {
          console.warn('Autoplay was prevented:', error);
          // Здесь можно добавить сообщение для пользователя или альтернативное действие
        });
    }
  }
}

//========================================================================================================================================================
//========== Lenis-scroll ==============================================================================================================================================

// const lenis = new Lenis({
//   duration: 1.1,
//   easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Функция easing для более естественного движения
//   direction: "vertical", // Направление скролла: вертикальное
//   gestureDirection: "vertical", // Направление жестов: вертикальное
//   smooth: true, // Включаем плавный скролл
//   mouseMultiplier: 1, // Уровень чувствительности для мыши
//   smoothTouch: false, // Отключаем плавный скролл для сенсорных экранов
//   touchMultiplier: 2, // Уровень чувствительности для сенсорных экранов
//   infinite: false, // Отключаем бесконечный скролл
// });

// Удаление старого скроллбара (если нужно)
// const scrollbar = document.querySelectorAll('.c-scrollbar');
// if (scrollbar.length > 1) {
//   // scrollbar[0].remove(); // Это можно активировать по необходимости
// }

// // Отслеживаем элементы с атрибутом `data-scroll-speed`
// const speedElements = document.querySelectorAll('[data-scroll-speed]');

// lenis.on('scroll', (e) => {
//   // Обновляем ScrollTrigger
//   ScrollTrigger.update();

//   // Применяем parallax эффект для элементов
//   speedElements.forEach((el) => {
//     const speed = parseFloat(el.getAttribute('data-scroll-speed')) || 1;
//     const y = window.scrollY * speed;  // Вычисляем на основе прокрутки
//     el.style.transform = `translateY(${y}px)`;  // Применяем смещение
//   });
// });

// // Обновляем ScrollTrigger при изменении размера окна
// window.addEventListener('resize', () => {
//   ScrollTrigger.refresh();
// });

// function raf(time) {
//   const startTime = performance.now();
//   lenis.raf(time); // Запускаем анимацию прокрутки
//   const endTime = performance.now();
//   const elapsedTime = endTime - startTime;

//   if (elapsedTime < 16) {
//     requestAnimationFrame(raf);
//   } else {
//     setTimeout(() => {
//       requestAnimationFrame(raf);
//     }, elapsedTime - 16);
//   }
// }

// requestAnimationFrame(raf); // Инициируем анимацию
// ScrollTrigger.refresh(); // Обновляем ScrollTrigger после инициализации

//========================================================================================================================================================
/**
* Vibration
*/
function initVibration() {
  // Функция для вибрации
  function vibratePhone() {
    if (navigator.vibrate) {
      navigator.vibrate(50);
    } else {
      console.log("Vibration API is not supported in your browser.");
    }
  }

  // Привязка обработчиков событий
  const buttons = document.querySelectorAll("a, li, .hamburger, .menu");
  buttons.forEach(button => {
    button.addEventListener("click", vibratePhone);
  });
}
window.addEventListener("load", initVibration);
//========================================================================================================================================================
