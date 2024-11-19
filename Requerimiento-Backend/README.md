# Requerimiento
## Documentación de la Configuración para el Back-End (ASP.NET Core con SQL Server)

### PASOS:
1. Creamos un nuevo proyecto ASP.NETCore Web API.

2. Creamos la Base de Datos en el SQL.

3. Configuramos la conexión a SQL Server:
En el archivo `appsettings.json`, configuramos la cadena de conexión a la base de datos.

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost;Database=TuBaseDeDatos;User Id=sa;Password=tu_contraseña;"
  }
}
```

4. Configuramos el DBContext:
Creamos una clase `MyContext` para manejar la conexión a la base de datos:

```Csharp
namespace Requerimiento.Contexts
{
    public class MyContext : DbContext
    {
        public MyContext(DbContextOptions<MyContext> options) : base(options) { }
    }
}

```

5. Configuramos el servicio de la base de datos en el `Program.cs` y así mismo el CORS:
```Csharp
using Requerimiento.Contexts;

// Configuración de CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin",
        builder => builder.WithOrigins("http://localhost:4200")
                          .AllowAnyHeader()
                          .AllowAnyMethod());
});

// Otros Servicios
builder.Services.AddDbContext<MyContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
builder.Services.AddControllers();

// Uso de CORS
app.UseCors("AllowSpecificOrigin");

```

6. Creamos el controlador `TestController` para manejar la solicitud de prueba de la conexión:

```Csharp
using Requerimiento.Contexts;

[Route("api/[controller]")]
[ApiController]
public class TestController : ControllerBase
{
    private readonly MyContext _context;

    public TestController(MyContext context)
    {
        _context = context;
    }

    [HttpGet("test-connection")]
    public async Task<IActionResult> TestConnection()
    {
        try
        {
            await _context.Database.OpenConnectionAsync();
            await _context.Database.CloseConnectionAsync();
            return Ok("Conexión exitosa a la base de datos SQL Server.");
        }
        catch (Exception)
        {
            return StatusCode(500, "Error en la conexión a la base de datos.");
        }
    }
}
```

7. Ejecutamos el proyecto.

> [!NOTE]
> La API debería estar corriendo en `https://localhost:7143/api/empleado/`.
