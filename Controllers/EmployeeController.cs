using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CompupowTesting.Data;
using CompupowTesting.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CompupowTesting.Services;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace CompupowTesting.Controllers
{
    [Route("api/[controller]")]
    public class EmployeeController : Controller
    {
        private readonly db_CompupowContext ctx;
        private ISysParamService ISysParam;

        public EmployeeController(
            db_CompupowContext context,
            ISysParamService _sysParam
            )
        {
            ctx = context;
            ISysParam = _sysParam;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var Emp = ctx.Employees.ToList();

            if (Emp == null)
                return NoContent();

            return Ok(Emp);
        }

        [HttpGet("SearchEmployee")]
        public IActionResult SearchEmployee(string term)
        {
            var Emp = ctx.Employees.Where(x =>
                    x.EmCode.Contains(term) ||
                    x.EmTname.Contains(term) ||
                    x.EmEname.Contains(term)
                ).Select(x => new EmployeeDropDown
                {
                    EmCode = x.EmCode,
                    EmName = x.EmTname,
                }).Take(50).ToList();

            if (Emp == null)
                return NoContent();

            return Ok(Emp);
        }

        public class EmployeeDropDown
        {
            public string EmCode { get; set; }
            public string EmName { get; set; }
        }

        // POST api/values
        [HttpPost]
        public IActionResult Post([FromBody]Employee emp)
        {
            if (emp == null)
                return BadRequest();

            emp.EmCode = ISysParam.GetEmCode();

            ctx.Employees.Add(emp);
            ctx.SaveChanges();

            return Ok(emp);
        }

        // PUT api/values/5
        [HttpPut]
        public IActionResult Put([FromBody]Employee emp)
        {
            if (emp == null)
                return BadRequest();

            ctx.Employees.Update(emp);
            ctx.SaveChanges();

            return StatusCode(201);
        }

        // DELETE api/values/5
        [HttpDelete]
        public IActionResult Delete(string emCode)
        {
            if (emCode == null)
                return BadRequest();

            var Emp = ctx.Employees.SingleOrDefault(x => x.EmCode == emCode);
            ctx.Employees.Remove(Emp);
            ctx.SaveChanges();

            return Ok();
        }

    }
}
