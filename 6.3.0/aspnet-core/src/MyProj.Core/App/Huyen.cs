using Abp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyProj.App.Huyen
{
    [Table("Huyen")]
    public class HuyenEntity : Entity
    {
        public int Id { get; set; }
        public string name { get; set; }
        public int TinhEntityId { get; set; }
        public TinhEntity TinhEntity { get; set; }
    }
}
