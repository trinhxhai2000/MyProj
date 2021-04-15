using Abp.AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MyProj.App.Tinh.Dto;
namespace MyProj.App.Huyen.Dto
{
    [AutoMap(typeof(HuyenEntity))]

    public class HuyenDTO
    {
        public int Id { get; set; }
        public string name { get; set; }
        public TinhDTO tinhDto { get; set; }
        public HuyenDTO() {
            this.tinhDto = new TinhDTO();
        }
        public HuyenDTO(HuyenEntity he)
        {
            this.Id = he.Id;
            this.name = he.name;
            this.tinhDto = new TinhDTO(he.TinhEntity);
        }
    }
    public class GetHuyenByTinhIdDto
    {
        public int TinhId { get; set; }
    }
    public class ModifingHuyenInput
    {
        public int HuyenId { get; set; }
        public string name { get; set; }
        public int TinhId { get; set; }
    }
    public class HuyenIdInput
    {
        public int id { get; set; }
    }
    public class getHuyenPageInp
    {
        public int tinhId { get; set; }
        public int idx { get; set; }
        public int numPage { get; set; }
        
    }
    public class getHuyenPageOut
    {
        public int total { get; set; }
        public List<HuyenDTO> huyens { get; set; }

    }
}
