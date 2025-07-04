import { Component, AfterViewInit, ElementRef, ViewChild, OnInit, inject } from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { Chart, ChartConfiguration, ChartData, ChartOptions, ChartType } from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { PacienteService } from '../../ficha-medica/servicio/paciente.service';
import { DataService } from './data.service';
import { Router, ActivatedRoute } from '@angular/router';

Chart.register(ChartDataLabels);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']  
})
export class DashboardComponent implements AfterViewInit, OnInit {
  totalPac = 0;
  totalProf = 0;
  totalEst = 0;
  totalAtenciones = 0;

  @ViewChild('lineChart') lineChart!: ElementRef<HTMLCanvasElement>;
  patientData: { year: number; count: number }[] = [];

  public pieChartType: ChartType = 'doughnut';
  public pieChartData: ChartData<'doughnut'> = {
    labels: [],
    datasets: [{
      data: [],
      backgroundColor: [],
      borderWidth: 0,
      hoverOffset: 4
    }]
  };

  public pieChartOptions: ChartOptions<'doughnut'> = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '70%',
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: 'white',
        bodyColor: 'white',
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: true,
        callbacks: {
          label: (context) => {
            const label = context.label ?? '';
            const value = context.parsed;
            const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
            const percentage = ((value / total) * 100).toFixed(1);
            return `${label}: ${value} (${percentage}%)`;
          }
        }
      },
      datalabels: {
        color: '#fff',
        font: { weight: 'bold' },
        formatter: (value, context) => {
          const data = context.chart.data.datasets[0].data as number[];
          const total = data.reduce((a, b) => a + b, 0);
          return ((value / total) * 100).toFixed(1) + '%';
        }
      }
    },
    elements: {
      arc: { borderWidth: 0 }
    }
  };

  public barChartType: ChartType = 'bar';
  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Atenciones',
        backgroundColor: '#42A5F5',
        borderRadius: 4,
        barThickness: 20
      }
    ]
  };

  public barChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: 'white',
        bodyColor: 'white',
        cornerRadius: 8
      }
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: '#718096', font: { size: 12 } }
      },
      y: {
        beginAtZero: true,
        grid: { color: '#f7fafc' },
        ticks: { color: '#718096', font: { size: 12 } }
      }
    }
  };

  public carreraBarChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: [{
      data: [],
      label: 'Pacientes por Carrera',
      backgroundColor: '#FF6384',
      borderRadius: 4,
      barThickness: 20
    }]
  };

  public carreraBarChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: true },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: 'white',
        bodyColor: 'white',
        cornerRadius: 8
      }
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: '#718096', font: { size: 12 } }
      },
      y: {
        beginAtZero: true,
        grid: { color: '#f7fafc' },
        ticks: { color: '#718096', font: { size: 12 } }
      }
    }
  };

  private breakpointObserver = inject(BreakpointObserver);

  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => matches
      ? [
          { title: 'Visitas', cols: 1, rows: 1, type: 'visits' },
          { title: 'Enfermedades', cols: 1, rows: 1, type: 'diseases' },
          { title: 'Gráfico', cols: 1, rows: 1, type: 'lineChart' }
        ]
      : [
          { title: 'Visitas', cols: 2, rows: 1, type: 'visits' },
          { title: 'Enfermedades', cols: 1, rows: 2, type: 'diseases' },
          { title: 'Gráfico', cols: 1, rows: 2, type: 'lineChart' }
        ]
    )
  );

  constructor(
    private pacienteService: PacienteService,
    private dataService: DataService,
    private router: Router,
    private activateRouter: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadDashboardNumbers();
    this.loadPieChartData();
    this.loadPatientData(); // incluye el lineChart
  
  }

  ngAfterViewInit(): void {}

  private loadDashboardNumbers(): void {
    this.pacienteService.getPacientes().subscribe(pacientes => {
      this.totalPac = pacientes.length;
      this.totalProf = pacientes.filter(p => p.profesionPac === 'Profesor').length;
      this.totalEst = pacientes.filter(p => p.profesionPac === 'Estudiante').length;
    });
  }

  private loadPieChartData(): void {
    this.dataService.getEnfermedadesActuales().subscribe(data => {
      const labels = Object.keys(data);
      const values = Object.values(data);
      const backgroundColors = labels.map(() => this.generateRandomColor());

      this.pieChartData.labels = labels;
      this.pieChartData.datasets[0].data = values;
      this.pieChartData.datasets[0].backgroundColor = backgroundColors;
    });
  }

  private loadPatientData(): void {
    this.dataService.getAtencionesPorAno().subscribe(data => {
      const years = Object.keys(data).map(year => parseInt(year, 10));
      const counts = Object.values(data) as number[];
      this.patientData = years.map((year, index) => ({ year, count: counts[index] }));

      this.totalAtenciones = counts.reduce((sum, val) => sum + val, 0);

      this.barChartData.labels = years.map(y => y.toString());
      this.barChartData.datasets[0].data = counts;

      this.renderLineChart();
    });
  }

  private renderLineChart(): void {
    if (!this.lineChart) return;

    new Chart(this.lineChart.nativeElement, {
      type: 'line',
      data: {
        labels: this.patientData.map(d => d.year.toString()),
        datasets: [{
          data: this.patientData.map(d => d.count),
          label: 'Cantidad de Pacientes',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          pointBackgroundColor: 'rgba(75, 192, 192, 1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(75, 192, 192, 1)',
          fill: 'origin',
        }]
      },
      options: {
        responsive: true,
        scales: {
          x: { beginAtZero: true },
          y: {
            beginAtZero: true,
            ticks: {
              callback: (value: number | string) => {
                const numericValue = typeof value === 'string' ? parseFloat(value) : value;
                return Number.isInteger(numericValue) ? numericValue : null;
              }
            }
          }
        }
      }
    });
  }

  

  private generateRandomColor(): string {
    const letters = '0123456789ABCDEF';
    return '#' + Array.from({ length: 6 }, () =>
      letters[Math.floor(Math.random() * 16)]
    ).join('');
  }

  onDownloadReport(): void {
    this.router.navigate(['/reportes']);
    console.log('Descargar reporte...');
  }
  onRegister(): void {
    this.router.navigate(['/ficha-medica/form']);
  }
}
