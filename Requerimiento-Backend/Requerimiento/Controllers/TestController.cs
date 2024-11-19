using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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
