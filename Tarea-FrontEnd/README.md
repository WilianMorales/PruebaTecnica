# Tarea

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.2.18.

## Documentación de la Configuración en el Frontend

### PASOS:
1. Creaamos un componente para probar la conexión:
> En el CLI digitamos el siguiente comando:
```console
  ng generate component test-connection
```

2. Creaamos un servicio para conectarse a la API:
> En el CLI digitamos el siguiente comando:
```console
  ng generate service Service/test-connection
```
> Configuramos el servicio, creamos una variable privada para la url del api
> y luego procedemos a crear el metodo para conectarse.

```typescript
export class TestConnectionService {

  private apiUrl = 'https://localhost:5001/api/test/test-connection';

  constructor(private http: HttpClient) { }

  testConnection(): Observable<string> {
    return this.http.get(this.apiUrl, { responseType: 'text' });
  }
}

```

3. Procedemos a Modificar el Componente.ts para que nos muestre el mensaje:

```typescript
export class TestConnectionComponent implements OnInit {
  message: string = '';

  constructor(private testConnectionService: TestConnectionService) { }

  ngOnInit(): void {
    this.testConnectionService.testConnection().subscribe(
      response => this.message = response,
      error => this.message = 'Error en la conexión a la base de datos.'
    );
  }
}

```

4. Modificamos la vista del template del componente:
```html
<div>
  <h1>{{ message }}</h1>
</div>

```
 Asi mismo integramos el componente creado en el componente principal:

> [!NOTE]
> Nos aseguramos de que este importado el HttpClientModule en el módulo principal

5. Ejecutamos el proyecto:
```console
 ng serve -o
```
