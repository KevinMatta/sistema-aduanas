using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace sistema_aduana.Common.Models
{
    class ArancelesPorItemViewModel
    {
        public int ArIt_Id { get; set; }
        public string ArIt_Descripcion { get; set; }
        public int? Aran_Id { get; set; }
        public int? Item_Id { get; set; }
        public bool? ArIt_Estado { get; set; }
        public int ArIt_Creacion { get; set; }
        public DateTime ArIt_FechaCreacion { get; set; }
        public int? ArIt_Modifica { get; set; }
        public DateTime? ArIt_FechaModifica { get; set; }
    }
}
