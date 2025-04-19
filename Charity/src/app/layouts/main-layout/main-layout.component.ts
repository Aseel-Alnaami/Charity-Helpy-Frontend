import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent implements OnInit {
  ngOnInit() {
    this.loadStyles();  
    this.loadScripts();
  }

  loadStyles() {
    const styles = [
      "../../../assets/HomeDesign/css/plugins/bootstrap.min.css",
      "../../../assets/HomeDesign/css/plugins/aos.css",
      "../../../assets/HomeDesign/css/plugins/fontawesome.css",
      "../../../assets/HomeDesign/css/plugins/magnific-popup.css",
      "../../../assets/HomeDesign/css/plugins/mobile.css",
      "../../../assets/HomeDesign/css/plugins/owlcarousel.min.css",
      "../../../assets/HomeDesign/css/plugins/swiper-bundle.min.css",
      "../../../assets/HomeDesign/css/plugins/sidebar.css",
      "../../../assets/HomeDesign/css/plugins/slick-slider.css",
      "../../../assets/HomeDesign/css/plugins/nice-select.css",
      "../../../assets/HomeDesign/css/plugins/lightbox.css",
      "../../../assets/HomeDesign/css/main.css",
      "node_modules/leaflet/dist/leaflet.css"
    ];

    styles.forEach(href => {
      let link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = href;
      document.head.appendChild(link);
    });
  }

  loadScripts() {
    const scripts = [
      "../../../assets/HomeDesign/js/plugins/jquery-3.7.1.min.js", 
      "../../../assets/HomeDesign/js/plugins/bootstrap.min.js",
      "../../../assets/HomeDesign/js/plugins/fontawesome.js",
      "../../../assets/HomeDesign/js/plugins/aos.js",
      "../../../assets/HomeDesign/js/plugins/counter.js",
      "../../../assets/HomeDesign/js/plugins/sidebar.js",
      "../../../assets/HomeDesign/js/plugins/magnific-popup.js",
      "../../../assets/HomeDesign/js/plugins/mobilemenu.js",
      "../../../assets/HomeDesign/js/plugins/owlcarousel.min.js",
      "../../../assets/HomeDesign/js/plugins/swiper-bundle.min.js",
      "../../../assets/HomeDesign/js/plugins/nice-select.js",
      "../../../assets/HomeDesign/js/plugins/jquery.counterup.min.js",
      "../../../assets/HomeDesign/js/plugins/waypoints.js",
      "../../../assets/HomeDesign/js/plugins/slick-slider.js",
      "../../../assets/HomeDesign/js/plugins/circle-progress.js",
      "../../../assets/HomeDesign/js/plugins/gsap.min.js",
      "../../../assets/HomeDesign/js/plugins/ScrollTrigger.min.js",
      "../../../assets/HomeDesign/js/plugins/Splitetext.js",
      "../../../assets/HomeDesign/js/plugins/lightbox.js",
      "../../../assets/HomeDesign/js/main.js",
      "../../../assets/HomeDesign/js/progress.js"
    ];

    scripts.forEach(src => this.loadScript(src));
  }

  loadScript(src: string) {
    return new Promise((resolve, reject) => {
      let script = document.createElement('script');
      script.src = src;
      script.async = true;
      script.onload = resolve;
      script.onerror = reject;
      document.body.appendChild(script);
    });
  }
}