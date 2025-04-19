import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartType } from 'chart.js';
import { AdminService } from 'src/app/Services/admin.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  pieChartLabels: string[] = [];
  pieChartType: ChartType = 'pie';
  totalCharities: number = 0;

  pieChartData: ChartConfiguration<'pie'>['data'] = {
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: [], 
      }
    ]
  };

  pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      }
    }
  };

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadCounts();
    this.categoryChart();
    this.getPendingCharities();
    this.getUser();
  }

  usersCount: number = 0;
  charitiesCount: number = 0;
  totalprofit: number = 0;
  categoryCount: number = 0;
  
  loadCounts(): void {
    this.adminService.getUsersCount().subscribe(count => {
      this.usersCount = count;
    });

    this.adminService.getCharitiesCount().subscribe((data: any)  => {
      this.charitiesCount = data.charityCount;
      this.totalprofit = data.totalProfit;
    });

  
    this.adminService.getCategories().subscribe((data: any)=> {
      this.categoryCount = data.length; 
    });
 
  }



  categoryChart(){
    this.adminService.GetAllCharities().subscribe((charities: any[]) => {
      const acceptedCharities = charities.filter(charity => charity.status === 'Paid');
      const categoryMap: { [key: string]: number } = {};

      acceptedCharities.forEach(charity => {
        const category = charity.category?.categoryname || 'Other';
        categoryMap[category] = (categoryMap[category] || 0) + 1;
      });

      const labels = Object.keys(categoryMap);
      const data = Object.values(categoryMap);
      const colors = this.generateColors(labels.length);

      this.pieChartLabels = labels;
      this.pieChartData = {
        labels: labels,
        datasets: [
          {
            data: data,
            backgroundColor: colors,
          }
        ]
      };
      this.totalCharities = acceptedCharities.length;
    });
  }

  generateColors(length: number): string[] {
    const colors: string[] = [];
    const baseColors = ['rgb(0, 142, 231)', 'rgb(0, 210, 91)', 'rgb(252, 66, 112)', 'rgb(255, 170, 0)', 'rgb(143, 95, 232)', 'rgb(232, 95, 198)', 'rgb(95, 232, 186)'];

    for (let i = 0; i < length; i++) {
      colors.push(baseColors[i % baseColors.length]); // تدوير الألوان
    }

    return colors;
  }

  latestPendingCharities: any[] = [];

  getPendingCharities() {
    this.adminService.GetAllCharities().subscribe((res: any[]) => {
      this.latestPendingCharities = res
        .filter(c => c.status === 'Pending') 
        .sort((a, b) => new Date(b.createddate).getTime() - new Date(a.createddate).getTime())
        .slice(0, 5); 
    });
  }

  latestJoinUsers: any[] = [];

  getUser(){
    this.adminService.getAllUsers().subscribe((res: any[]) => {
      this.latestJoinUsers = res
        .sort((a, b) => new Date(b.dateadded).getTime() - new Date(a.dateadded).getTime())
        .slice(0, 5); 
        console.log("user",this.latestJoinUsers);
    });
    // console.log(this.latestJoinUsers);
  }
  
  
}
