using Microsoft.AspNetCore.Mvc;
using ReactAppAspNet.Server.Models;
using MySql.Data.MySqlClient;
using System.Data;
using Microsoft.Extensions.Configuration;
using System.Threading.Tasks;

namespace ReactAppAspNet.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public ProductsController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Product>>> Get()
        {
            var products = new List<Product>();

            using (var connection = new MySqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await connection.OpenAsync();

                using (var command = new MySqlCommand("SELECT * FROM products;", connection))
                using (var reader = await command.ExecuteReaderAsync())
                {
                    while (await reader.ReadAsync())
                    {
                        var product = new Product
                        {
                            Id = reader.GetInt32(0),
                            Name = reader.GetString(1),
                            Price = reader.GetDecimal(2)
                        };

                        products.Add(product);
                    }
                }
            }

            return products;
        }
    }
}
