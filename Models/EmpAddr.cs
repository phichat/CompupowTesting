using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CompupowTesting.Models
{
    public class EmpAddr
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ID { get; set; }
        public string EmCode { get; set; }
        public string EmType { get; set; }
        public string EmAddr1 { get; set; }
        public string EmAddr2 { get; set; }
        public string Usr { get; set; }
        public DateTime? Smrt { get; set; }
    }
}
