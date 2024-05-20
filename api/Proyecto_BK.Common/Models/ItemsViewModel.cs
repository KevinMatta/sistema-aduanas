using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace sistema_aduana.Common.Models
{
    public class ItemsViewModel
    {
        public int Item_Id { get; set; }
        public string Item_Descripcion { get; set; }
        public int? Cate_Id { get; set; }
        public bool? Item_Estado { get; set; }
        public int Item_Creacion { get; set; }
        public DateTime Item_FechaCreacion { get; set; }
        public int? Item_Modifica { get; set; }
        public DateTime? Item_FechaModifica { get; set; }

    }
}
