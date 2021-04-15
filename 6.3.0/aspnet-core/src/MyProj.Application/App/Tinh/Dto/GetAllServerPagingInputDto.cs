using Abp.AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyProj.App.Tinh.Dto
{
    [AutoMap(typeof(TinhEntity))]
    public class TinhDTO
    {
        public int TinhId { get; set; }
        public string name { get; set; }
        public Boolean TTTU { get; set; }
        public TinhDTO() {}
        public TinhDTO(TinhEntity te)
        {
            this.TinhId = te.Id;
            this.name = te.name;
            this.TTTU = te.TTTU;
        }
    }
    public class TinhIdInput
    {
        public int id { get; set; }
    }
    public class getTinhPageInp
    {
        public int idx { get; set; }
        public int numPage { get; set; }
    }
    public class getTinhPageOut
    {
        public int total { get; set; }
        public List<TinhDTO> tinhs { get; set; }

    }
}
