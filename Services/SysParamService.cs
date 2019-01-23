using System;
using System.Linq;
using System.Collections.Generic;
using CompupowTesting.Data;

namespace CompupowTesting.Services
{
    public class SysParamService: ISysParamService
    {
        private readonly db_CompupowContext ctx;

        public SysParamService(db_CompupowContext context)
        {
            ctx = context;
        }

        public string GetEmCode()
        {
            var EmpCode = (from db in ctx.Employees
                           orderby db.EmCode descending
                           select db.EmCode).FirstOrDefault();

            if (EmpCode == null)
                return "001";

            var _EmpCode = int.Parse(EmpCode.Trim()) + 1;

            return _EmpCode.ToString().PadLeft(3, '0');
        }
    }
}
