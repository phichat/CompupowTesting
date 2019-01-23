using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CompupowTesting.Data;
using CompupowTesting.Models;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace CompupowTesting.Controllers
{
    [Route("api/[controller]")]
    public class EmpAddrController : Controller
    {
        private readonly db_CompupowContext ctx;

        public EmpAddrController(db_CompupowContext context)
        {
            ctx = context;
        }

        [HttpGet("GetByEmCode")]
        public IActionResult GetByEmCode(string emCode)
        {
            var Em = ctx.EmpAddrs.Where(x => x.EmCode == emCode).ToList();
            if (Em == null)
                return NoContent();

            var _Addr = new List<Addresses>();
            Em.ForEach(x =>
            {
                var addr = new Addresses
                {
                    EmType = x.EmType,
                    EmAddr1 = x.EmAddr1,
                    EmAddr2 = x.EmAddr2
                };
                _Addr.Add(addr);
            });

            var _Emp = new EmpAddrFromBody
            {
                EmCode = emCode,
                Address = _Addr.ToArray()
            };

            return Ok(_Emp);
        }

        // POST api/values
        [HttpPost]
        public IActionResult Post([FromBody]EmpAddrFromBody EmAddr)
        {
            using (var transaction = ctx.Database.BeginTransaction())
            {
                try
                {
                    var Em = ctx.EmpAddrs.Where(x => x.EmCode == EmAddr.EmCode).ToList();


                    if (!Em.Any())
                    {
                        //Insert
                        EmAddr.Address.ToList().ForEach(x =>
                        {
                            var _Em = Em.FirstOrDefault(em => em.EmType == x.EmType);
                            var _EmAddr = new EmpAddr
                            {
                                EmCode = EmAddr.EmCode,
                                Usr = EmAddr.Usr,
                                Smrt = DateTime.Now.Date,
                                EmType = x.EmType,
                                EmAddr1 = x.EmAddr1,
                                EmAddr2 = x.EmAddr2
                            };

                            //Insert
                            ctx.EmpAddrs.Add(_EmAddr);
                            ctx.SaveChanges();
                        });
                    }
                    else
                    {
                        //Update
                        EmAddr.Address.ToList().ForEach(x =>
                        {
                            var _Em = Em.FirstOrDefault(em => em.EmType == x.EmType);

                            var _EmAddr = new EmpAddr
                            {
                                EmCode = EmAddr.EmCode,
                                Usr = EmAddr.Usr,
                                Smrt = DateTime.Now.Date,
                                EmType = x.EmType,
                                EmAddr1 = x.EmAddr1,
                                EmAddr2 = x.EmAddr2
                            };

                            if (_Em == null)
                            {
                                //Insert
                                ctx.EmpAddrs.Add(_EmAddr);
                                ctx.SaveChanges();
                            }
                            else
                            {
                                //Update
                                ctx.EmpAddrs.Update(_EmAddr);
                                ctx.SaveChanges();
                            }
                        });

                    }

                    transaction.Commit();

                    return StatusCode(201);

                }
                catch (Exception ex)
                {
                    transaction.Rollback();
                    return StatusCode(500, ex);
                }

            }
        }

        public class EmpAddrFromBody
        {
            public string EmCode { get; set; }
            public string Usr { get; set; }
            public DateTime? Smrt { get; set; }
            public Addresses[] Address { get; set; }
        }

        public class Addresses
        {
            public string EmType { get; set; }
            public string EmAddr1 { get; set; }
            public string EmAddr2 { get; set; }
        }

    }
}
