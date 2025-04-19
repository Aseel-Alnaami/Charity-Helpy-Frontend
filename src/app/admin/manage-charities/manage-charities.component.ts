import { Component, ElementRef, OnInit, TemplateRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { AdminService } from 'src/app/Services/admin.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateCharityComponent } from '../create-charity/create-charity.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { ChartData, ChartOptions } from 'chart.js';
import * as L from 'leaflet';
import { HttpClient } from '@angular/common/http';


interface Charity {
  charityname: string;
  category?: {
    categoryname: string;
    profit: number;
  };
  status: string;
}

@Component({
  selector: 'app-manage-charities',
  templateUrl: './manage-charities.component.html',
  styleUrls: ['./manage-charities.component.css']
})
export class ManageCharitiesComponent implements OnInit {

  constructor(public admin: AdminService, public dialog: MatDialog, private cdr: ChangeDetectorRef, private http: HttpClient) { }

  filteredCharities: any[] = []; 
  startDate: Date = new Date();  
  endDate: Date = new Date();

  ngOnInit(): void {
    this.getCategories();
    this.getAllCharities();
    this.admin.GetAllCharities();
    this.getProfitData();
  }

  @ViewChild('callDeletDailog') deleteDialog!: TemplateRef<any>;
  @ViewChild('callUpdateDailog') updateDialog!: TemplateRef<any>;
  @ViewChild('charityTable') charityTable!: ElementRef;

  // ---------------------------
  // Create Dialog
  // ---------------------------
  openCreateDialog() {
    this.dialog.open(CreateCharityComponent, { autoFocus: true });
  }

  // ---------------------------
  // Delete Dialog
  // ---------------------------
  openDeleteDialog(id: number) {
    const dialogRef = this.dialog.open(this.deleteDialog);
    dialogRef.afterClosed().subscribe((result) => {
      if (result == 'yes') {
        this.admin.DeleteCharity(id);
      }
    });
  }

  // ---------------------------
  // Update Dialog 
  // ---------------------------
  openUpdateDialog(obj: any) {
    console.log(obj);
    this.getCategories().then(() => {
      this.updateForm.patchValue(obj);
      this.disableStatusField();
      this.dialog.open(this.updateDialog, { autoFocus: true });
      this.initializeMap();
    });
  }

  // ---------------------------
  // Update Charity Form
  // ---------------------------
  updateForm: FormGroup = new FormGroup({
    charityid: new FormControl(),
    charityname: new FormControl('', Validators.required),
    description: new FormControl(''),
    charityimg: new FormControl(''),
    goals: new FormControl(''),
    location: new FormControl(''),
    status: new FormControl(''),
    target: new FormControl('', Validators.min(1)),
    userid: new FormControl('', Validators.required),
    categoryid: new FormControl('', Validators.required),
    latitude: new FormControl('', [Validators.required]),
    longitude: new FormControl('', [Validators.required])
  });

  map: any;
  marker: any;
  initializeMap() {
      this.map = L.map('map').setView([31.9539, 35.9106], 13);
      L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '© OpenStreetMap & CartoDB',
        subdomains: 'abcd'
      }).addTo(this.map);
  
      this.map.on('click', (e: any) => {
        if (this.marker) {
          this.map.removeLayer(this.marker);
        }
        this.marker = L.marker(e.latlng).addTo(this.map);
  
        this.updateForm.patchValue({
          latitude: e.latlng.lat,
          longitude: e.latlng.lng,
        });
  
        this.reverseGeocode(e.latlng.lat, e.latlng.lng);
      });
    }

    reverseGeocode(lat: number, lng: number) {
      const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&accept-language=en`;
    
      this.http.get(url).subscribe((data: any) => {
        let area = data.address.suburb || data.address.neighbourhood || "";
        let city = data.address.city || data.address.town || data.address.village || "Unknown";
        let country = data.address.country || "Unknown";
        let shortAddress = `${area}, ${city}, ${country}`.trim();
    
        this.updateForm.patchValue({
          location: shortAddress
        });
      }, (error: any) => {
        console.error("Error fetching location:", error);
      });
    }

  // ---------------------------
  // Load categories with promise
  // ---------------------------
  categories: any[] = [];

  getCategories(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.admin.getCategories().subscribe(
        (data) => {
          this.categories = data;
          resolve(data);
        },
        (error) => {
          console.error('Error fetching categories', error);
          reject(error);
        }
      );
    });
  }

  // ---------------------------
  // Update Button Action
  // ---------------------------

  disableStatusField(): void {
    if (this.updateForm.value.status === 'Paid') {
      this.updateForm.get('status')?.disable();
      
    } else {
      this.updateForm.get('status')?.enable();
    }
  }

  Update() {
    this.admin.UpdateCharity(this.updateForm.value);
    this.dialog.closeAll();
  }

  updateCharitytWithImage(event: Event) {
    const input = event.target as HTMLInputElement;
  
    if (!input.files || input.files.length === 0) return;
  
    let fileToUpload = input.files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
  
    this.admin.uploadCharityImage(formData).subscribe(
      (response: any) => {
        console.log("Image uploaded:", response);
        const imageName = response.imagename;
  
        // ربط الصورة بالفورم
        this.updateForm.patchValue({ charityimg: imageName });
  
      },
      (error) => {
        console.error('Error uploading image:', error);
      }
    );
  }

  charities: any[] = [];

  getAllCharities() {
    this.admin.GetAllCharities().subscribe(
      (data) => {
        this.admin.charities = data;
        this.charities = data; 
        this.filteredCharities = data; 
        console.log('Charities retrieved successfully:', this.charities);
        console.log('Number of charities:', this.charities.length);

        this.totalProfit = this.getCategoryData(this.charities).totalProfit;
        this.getProfitData();
      },
      (error) => {
        console.error('Error while fetching charities:', error);
      }
    );
  }

  totalProfit: number = 0;

  searchByDate() {
    if (this.startDate && this.endDate) {
      if (this.endDate >= this.startDate) {
        const startDateTime = new Date(this.startDate).setHours(0, 0, 0, 0);
        const endDateTime = new Date(this.endDate).setHours(23, 59, 59, 999);

        const filteredCharities = this.charities.filter(charity => {
          const createdDateTime = new Date(charity.createddate).setHours(0, 0, 0, 0);
          return createdDateTime >= startDateTime && createdDateTime <= endDateTime;
        });

        const categoryData = this.getCategoryData(filteredCharities);

        this.chartData = {
          labels: categoryData.labels,
          datasets: [
            {
              label: 'Total Profit ($)',
              data: categoryData.profitData,
              backgroundColor: 'rgba(143, 95, 232, 0.2)', 
              borderColor: 'rgba(143, 95, 232, 1)', 
              borderWidth: 1,
            }
          ],
        };

        this.filteredCharities = filteredCharities;
        this.totalProfit = categoryData.totalProfit;

        this.cdr.detectChanges();
      } else {
        alert('⚠️ End date must be greater than or equal to the start date.');
      }
    } else {
      console.log('📢 Please select a valid date range.');
    }
  }

  profitData: number[] = [];
  labels: string[] = [];
  categoryCounts: number[] = [];

  chartData: any;
  chartOptions: any = {
    responsive: true,
  };

getCategoryData(charities: any[]): { labels: string[], profitData: number[], categoryCounts: number[], totalProfit: number } {
  const categoryMap = new Map<string, { count: number, totalProfit: number }>();

  const acceptedCharities = charities.filter(charity => charity.status === 'Paid');

  acceptedCharities.forEach((charity) => {
    if (charity.category && charity.category.categoryname) {
      const categoryName = charity.category.categoryname;
      const profit = charity.category.profit || 0;

      if (!categoryMap.has(categoryName)) {
        categoryMap.set(categoryName, { count: 0, totalProfit: 0 });
      }

      categoryMap.get(categoryName)!.count += 1; 
      categoryMap.get(categoryName)!.totalProfit += profit; 
    }
  });

  const labels = Array.from(categoryMap.keys());  
  const profitData = Array.from(categoryMap.values()).map(v => v.totalProfit); 
  const categoryCounts = Array.from(categoryMap.values()).map(v => v.count);  
  const totalProfit = profitData.reduce((sum, profit) => sum + profit, 0);  

  return { labels, profitData, categoryCounts, totalProfit };
}

getProfitData() {
  this.admin.GetAllCharities().subscribe((data: Charity[]) => {
    const categoryMap = new Map<string, { count: number, totalProfit: number }>();

    const acceptedCharities = data.filter((charity: Charity) => charity.status === 'Paid');

    acceptedCharities.forEach((charity: Charity) => {
      if (charity.category && charity.category.categoryname) {
        const categoryName = charity.category.categoryname;
        const profit = charity.category.profit || 0;

        if (!categoryMap.has(categoryName)) {
          categoryMap.set(categoryName, { count: 0, totalProfit: 0 });
        }

        categoryMap.get(categoryName)!.count += 1; 
        categoryMap.get(categoryName)!.totalProfit += profit; 
      }
    });

    this.labels = Array.from(categoryMap.keys()); 
    this.profitData = Array.from(categoryMap.values()).map(v => v.totalProfit); 
    this.categoryCounts = Array.from(categoryMap.values()).map(v => v.count); 

    this.chartData = {
      labels: this.labels,
      datasets: [
        {
          label: 'Total Profit ($)',
          data: this.profitData,
          backgroundColor: 'rgba(95, 232, 175, 0.2)', 
          borderColor: 'rgb(95, 232, 163)',        
          borderWidth: 1,
        }
      ],
    };
  });
}


updateChart() {
  this.chartData = {
    labels: this.labels,
    datasets: [
      {
        label: 'Total Profit ($)',
        data: this.profitData,  
        backgroundColor: 'rgba(95, 232, 175, 0.2)', 
        borderColor: 'rgb(95, 232, 163)',        
        borderWidth: 1,
        yAxisID: 'y-axis-1', 
      }
    ]
  };

  this.chartOptions = {
    responsive: true,
    scales: {
      yAxes: [
        {
          id: 'y-axis-1', 
          type: 'linear',
          position: 'left',
          ticks: {
            beginAtZero: true,  
            min: 0, 
            max: Math.max(...this.profitData) + 1000, 
          }
        }
      ]
    }
  };
}

resetFilters() {
  this.filteredCharities = this.admin.charities;
}


generateReport() {
  const doc = new jsPDF();

  const imgPath = './assets/HomeDesign/img/preloader/vl-preloader-1.1.png'; 
  
  const img = new Image();
  img.src = imgPath;
  img.onload = () => {
    doc.addImage(img, 'PNG', 150, 10, 35, 35); 

    if (!this.startDate || !this.endDate) {
      console.error("Start date or end date is not set.");
      return;
    }

    const start = new Date(this.startDate);
    const end = new Date(this.endDate);
    const yearDifference = end.getFullYear() - start.getFullYear();
    const monthDifference = end.getMonth() - start.getMonth();

    const reportType = (yearDifference > 1 || (yearDifference === 1 && monthDifference > 0)) 
      ? 'Yearly Report' 
      : 'Monthly Report';
    
    const today = new Date();
    const reportDate = today.toLocaleDateString(); 

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(20);
    doc.text(`Charity ${reportType}`, 14, 20);

    doc.setFont('times', 'italic');
    doc.setFontSize(12);
    doc.text(`Report Date: ${reportDate}`, 14, 30);

    doc.text(`From: ${start.toLocaleDateString()} - To: ${end.toLocaleDateString()}`, 14, 40);

    if (!this.filteredCharities || this.filteredCharities.length === 0) {
      console.warn("No data available for the report.");
      return;
    }

    const tableData = this.filteredCharities.map((charity, index) => [
      index + 1,
      charity.charityname,
      charity.category?.categoryname || 'Unknown',
      charity.status,
      charity.category?.profit ? `$${charity.category.profit.toFixed(2)}` : '$0.00'
    ]);

    let finalY = 50;

    autoTable(doc, {
      head: [['#', 'Charity Name', 'Category', 'Status', 'Profit']],
      body: tableData,
      startY: finalY,
      didDrawPage: (data) => {
        if (data.cursor) {
          finalY = data.cursor.y;
        }
      },
      // 
      theme: 'grid', 
      headStyles: {
        fillColor: [51, 122, 110],  
        textColor: 0,  
        fontStyle: 'bold',
      },
      bodyStyles: {
        fillColor: [220, 240, 220], 
        textColor: 0,  
      },
      alternateRowStyles: {
        fillColor: [200, 230, 200],  
      },
      margin: { top: 60 },
    });

    const totalProfit = this.filteredCharities
      .filter(c => c.status === 'Paid')
      .reduce((sum, charity) => sum + (charity.category?.profit || 0), 0);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.text(`Total Profit (Accepted Charities): $${totalProfit.toFixed(2)}`, 14, finalY + 10);

    const chartCanvas = document.getElementById('categoryChart') as HTMLCanvasElement;
    const chartImage = chartCanvas.toDataURL('img/png');

    doc.addImage(chartImage, 'PNG', 14, finalY + 20 ,180, 100);

    doc.save(`Charity_Report_${reportType}.pdf`);
  };
}

}
