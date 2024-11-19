// frontend/src/app/test-connection/test-connection.component.ts
import { Component, OnInit } from '@angular/core';
import { TestConnectionService } from '../Service/test-connection.service';


@Component({
  selector: 'app-test-connection',
  templateUrl: './test-connection.component.html',
  styleUrls: ['./test-connection.component.css']
})
export class TestConnectionComponent implements OnInit {
  message: string = '';

  constructor(private testConnectionService: TestConnectionService) { }

  ngOnInit(): void {
    this.testConnectionService.testConnection().subscribe(
      response => {
        this.message = response;
        console.log('Conexión exitosa:', this.message); // Log de éxito
      },
      error => {
        this.message = 'Error en la conexión a la base de datos.';
        console.error('Error en la conexión:', this.message); // Log de error
      }
    );
  }


}
