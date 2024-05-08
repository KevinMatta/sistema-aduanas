using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace sistema_aduana.DataAcces.Repository
{
    public interface IRepository<T>
    {
        public RequestStatus Insert(T item);
        public RequestStatus Update(T item);
        public RequestStatus Delete(int? id, int usuario, DateTime fecha);
        public IEnumerable<T> List();
        public T Find(int? id);
    }
}
