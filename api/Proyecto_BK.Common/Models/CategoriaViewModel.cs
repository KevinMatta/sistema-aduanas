using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace sistema_aduana.Common.Models
{
    public class CategoriaViewModel
    {
        public int Cate_Id { get; set; }
        public string Cate_Descripcion { get; set; }
        public bool? Cate_Estado { get; set; }
        public int Cate_Creacion { get; set; }
        public DateTime Cate_FechaCreacion { get; set; }
        public int? Cate_Modifica { get; set; }
        public DateTime? Cate_FechaModifica { get; set; }
    }
}
