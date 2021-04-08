using Abp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyProj.App
{
    [Table("Tinh")]
    public class TinhEntity : Entity
    {
        public int MyProperty { get; set; }
        public int MyProperty2 { get; set; }
    }
}
