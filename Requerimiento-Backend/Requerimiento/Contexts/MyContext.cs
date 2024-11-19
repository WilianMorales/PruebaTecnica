using Microsoft.EntityFrameworkCore;

namespace Requerimiento.Contexts
{
    public class MyContext : DbContext
    {
        public MyContext(DbContextOptions<MyContext> options) : base(options) { }
    }
}
