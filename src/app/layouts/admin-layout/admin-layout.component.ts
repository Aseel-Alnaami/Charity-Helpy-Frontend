import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css']
})
export class AdminLayoutComponent implements OnInit {
  ngOnInit(): void {
    this.loadStyles();
    this.loadScripts();
  }

  // ---------------------------
  // Load External Styles and Scripts
  // ---------------------------
  loadStyles() {
    const styles = [
      "../../../assets/AdminDesign/vendors/mdi/css/materialdesignicons.min.css",
      "../../../assets/AdminDesign/vendors/css/vendor.bundle.base.css",
      "../../../assets/AdminDesign/vendors/jvectormap/jquery-jvectormap.css",
      "../../../assets/AdminDesign/vendors/flag-icon-css/css/flag-icon.min.css",
      "../../../assets/AdminDesign/vendors/owl-carousel-2/owl.carousel.min.css",
      "../../../assets/AdminDesign/vendors/owl-carousel-2/owl.theme.default.min.css",
      "../../../assets/AdminDesign/css/style.css"
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
      "../../../assets/AdminDesign/vendors/js/vendor.bundle.base.js",
      "../../../assets/AdminDesign/vendors/chart.js/Chart.min.js",
      "../../../assets/AdminDesign/vendors/progressbar.js/progressbar.min.js",
      "../../../assets/AdminDesign/vendors/jvectormap/jquery-jvectormap.min.js",
      "../../../assets/AdminDesign/vendors/jvectormap/jquery-jvectormap-world-mill-en.js",
      "../../../assets/AdminDesign/vendors/owl-carousel-2/owl.carousel.min.js",
      "../../../assets/AdminDesign/js/off-canvas.js",
      "../../../assets/AdminDesign/js/hoverable-collapse.js",
      "../../../assets/AdminDesign/js/misc.js",
      "../../../assets/AdminDesign/js/settings.js",
      "../../../assets/AdminDesign/js/todolist.js"
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