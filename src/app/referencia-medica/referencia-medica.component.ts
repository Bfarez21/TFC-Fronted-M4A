import { Component, OnInit } from '@angular/core';
import { ReferenciaMedicaService } from './referencia-medica.service';
import { ReferenciaMedica } from './referencia-medica';

@Component({
  selector: 'app-referencia-medica',
  templateUrl: './index-referencia-medica.component.html',
  styleUrls: ['./referencia-medica.component.css']
})
export class ReferenciaMedicaComponent {

  referencias: ReferenciaMedica[] = [];

  constructor(private referenciaService: ReferenciaMedicaService) {}

  ngOnInit(): void {
    this.cargarReferencias();
  }

  cargarReferencias(): void {
    this.referenciaService.getReferencias().subscribe(referencias => {
      referencias = this.referencias = referencias;
    });
  }
}
