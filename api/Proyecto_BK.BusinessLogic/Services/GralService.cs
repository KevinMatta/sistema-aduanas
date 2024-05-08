using Proyecto_BK.BusinessLogic;
using sistema_aduana.DataAccess.Repository;
using sistema_aduana.Entities.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace sistema_aduana.BusinessLogic.Services
{
    public class GralService
    {
        private readonly CiudadRepository _ciudadRepository;
        private readonly EstadoRepository _estadoRepository;
        private readonly PaisRepository _paisRepository;
        private readonly EmpresaRepository _empresaRepository;
        private readonly EmpleadoRepository _empleadoRepository;
        private readonly EstadoCivilRepository _estadoCivilRepository;
        private readonly OficinasRepository _oficinasRepository;
        private readonly ProfesionesRepository _profesionesRepository;
        private readonly PersonaNaturalRepository _personaNaturalRepository;
        private readonly ComercianteIndividualRepository _comercianteIndividualRepository;
        private readonly PersonaJuridicaRepository _personaJuridicaRepository;
        public GralService(CiudadRepository ciudadRepository, EstadoRepository estadoRepository, EstadoCivilRepository estadoCivilRepository, PaisRepository paisRepository, EmpresaRepository empresaRepository, EmpleadoRepository empleadoRepository, OficinasRepository oficinasRepository, ProfesionesRepository profesionesRepository, PersonaNaturalRepository personaNaturalRepository, ComercianteIndividualRepository comercianteIndividualRepository, PersonaJuridicaRepository personaJuridicaRepository)
        {
            _ciudadRepository = ciudadRepository;
            _estadoRepository = estadoRepository;
            _estadoCivilRepository = estadoCivilRepository;
            _paisRepository = paisRepository;
            _empresaRepository = empresaRepository;
            _empleadoRepository = empleadoRepository;
            _oficinasRepository = oficinasRepository;
            _profesionesRepository = profesionesRepository;
            _personaNaturalRepository = personaNaturalRepository;
            _comercianteIndividualRepository = comercianteIndividualRepository;
            _personaJuridicaRepository = personaJuridicaRepository;
        }

        #region Pais
        public ServiceResult PaisListar()
        {
            var result = new ServiceResult();
            try
            {
                var list = _paisRepository.List();
                return result.Ok(list);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult PaisBuscar(int id)
        {
            var result = new ServiceResult();
            try
            {
                var item = _paisRepository.Find(id);
                return result.Ok(item);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult PaisCrear(tbPaises item)
        {
            var result = new ServiceResult();
            try
            {
                var createdItem = _paisRepository.Insert(item);
                return createdItem.CodeStatus > 0 ? result.Ok(createdItem) : result.Error(createdItem);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult PaisActualizar(tbPaises item)
        {
            var result = new ServiceResult();
            try
            {
                var updatedItem = _paisRepository.Update(item);
                return updatedItem.CodeStatus > 0 ? result.Ok(updatedItem) : result.Error(updatedItem);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult PaisEliminar(int id, int usuario, DateTime fecha)
        {
            var result = new ServiceResult();
            try
            {
                var deletedItem = _paisRepository.Delete(id, usuario, fecha);
                return deletedItem.CodeStatus > 0 ? result.Ok(deletedItem) : result.Error(deletedItem);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }
        #endregion
        #region Estado
        public ServiceResult EstadoListar()
        {
            var result = new ServiceResult();
            try
            {
                var list = _estadoRepository.List();
                return result.Ok(list);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult EstadoBuscar(int id)
        {
            var result = new ServiceResult();
            try
            {
                var item = _estadoRepository.Find(id);
                return result.Ok(item);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult EstadoCrear(tbEstados item)
        {
            var result = new ServiceResult();
            try
            {
                var createdItem = _estadoRepository.Insert(item);
                return createdItem.CodeStatus > 0 ? result.Ok(createdItem) : result.Error(createdItem);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult EstadoActualizar(tbEstados item)
        {
            var result = new ServiceResult();
            try
            {
                var updatedItem = _estadoRepository.Update(item);
                return updatedItem.CodeStatus > 0 ? result.Ok(updatedItem) : result.Error(updatedItem);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult EstadoEliminar(int id, int usuario, DateTime fecha)
        {
            var result = new ServiceResult();
            try
            {
                var deletedItem = _estadoRepository.Delete(id, usuario, fecha);
                return deletedItem.CodeStatus > 0 ? result.Ok(deletedItem) : result.Error(deletedItem);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }
        #endregion
        #region Ciudad
        public ServiceResult CiudadListar()
        {
            var result = new ServiceResult();
            try
            {
                var list = _ciudadRepository.List();
                return result.Ok(list);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult CiudadBuscar(int id)
        {
            var result = new ServiceResult();
            try
            {
                var item = _ciudadRepository.Find(id);
                return result.Ok(item);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult CiudadCrear(tbCiudades item)
        {
            var result = new ServiceResult();
            try
            {
                var createdItem = _ciudadRepository.Insert(item);
                return createdItem.CodeStatus > 0 ? result.Ok(createdItem) : result.Error(createdItem);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult CiudadActualizar(tbCiudades item)
        {
            var result = new ServiceResult();
            try
            {
                var updatedItem = _ciudadRepository.Update(item);
                return updatedItem.CodeStatus > 0 ? result.Ok(updatedItem) : result.Error(updatedItem);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult CiudadEliminar(int id, int usuario, DateTime fecha)
        {
            var result = new ServiceResult();
            try
            {
                var deletedItem = _ciudadRepository.Delete(id, usuario, fecha);
                return deletedItem.CodeStatus > 0 ? result.Ok(deletedItem) : result.Error(deletedItem);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }
        #endregion
        #region Empresa
        public ServiceResult EmpresaListar()
        {
            var result = new ServiceResult();
            try
            {
                var list = _empresaRepository.List();
                return result.Ok(list);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult EmpresaBuscar(int id)
        {
            var result = new ServiceResult();
            try
            {
                var item = _empresaRepository.Find(id);
                return result.Ok(item);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult EmpresaCrear(tbEmpresas item)
        {
            var result = new ServiceResult();
            try
            {
                var createdItem = _empresaRepository.Insert(item);
                return createdItem.CodeStatus > 0 ? result.Ok(createdItem) : result.Error(createdItem);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult EmpresaActualizar(tbEmpresas item)
        {
            var result = new ServiceResult();
            try
            {
                var updatedItem = _empresaRepository.Update(item);
                return updatedItem.CodeStatus > 0 ? result.Ok(updatedItem) : result.Error(updatedItem);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult EmpresaEliminar(int id, int usuario, DateTime fecha)
        {
            var result = new ServiceResult();
            try
            {
                var deletedItem = _empresaRepository.Delete(id, usuario, fecha);
                return deletedItem.CodeStatus > 0 ? result.Ok(deletedItem) : result.Error(deletedItem);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }
        #endregion
        #region Empleado
        public ServiceResult EmpleadoListar()
        {
            var result = new ServiceResult();
            try
            {
                var list = _empleadoRepository.List();
                return result.Ok(list);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult EmpleadoBuscar(int id)
        {
            var result = new ServiceResult();
            try
            {
                var item = _empleadoRepository.Find(id);
                return result.Ok(item);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult EmpleadoCrear(tbEmpleados item)
        {
            var result = new ServiceResult();
            try
            {
                var createdItem = _empleadoRepository.Insert(item);
                return createdItem.CodeStatus > 0 ? result.Ok(createdItem) : result.Error(createdItem);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult EmpleadoActualizar(tbEmpleados item)
        {
            var result = new ServiceResult();
            try
            {
                var updatedItem = _empleadoRepository.Update(item);
                return updatedItem.CodeStatus > 0 ? result.Ok(updatedItem) : result.Error(updatedItem);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult EmpleadoEliminar(int id, int usuario, DateTime fecha)
        {
            var result = new ServiceResult();
            try
            {
                var deletedItem = _empleadoRepository.Delete(id, usuario, fecha);
                return deletedItem.CodeStatus > 0 ? result.Ok(deletedItem) : result.Error(deletedItem);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }
        #endregion
        #region EstadoCivil
        public ServiceResult EstadoCivilListar()
        {
            var result = new ServiceResult();
            try
            {
                var list = _estadoCivilRepository.List();
                return result.Ok(list);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult EstadoCivilBuscar(int id)
        {
            var result = new ServiceResult();
            try
            {
                var item = _estadoCivilRepository.Find(id);
                return result.Ok(item);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult EstadoCivilCrear(tbEstadosCiviles item)
        {
            var result = new ServiceResult();
            try
            {
                var createdItem = _estadoCivilRepository.Insert(item);
                return createdItem.CodeStatus > 0 ? result.Ok(createdItem) : result.Error(createdItem);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult EstadoCivilActualizar(tbEstadosCiviles item)
        {
            var result = new ServiceResult();
            try
            {
                var updatedItem = _estadoCivilRepository.Update(item);
                return updatedItem.CodeStatus > 0 ? result.Ok(updatedItem) : result.Error(updatedItem);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult EstadoCivilEliminar(int id, int usuario, DateTime fecha)
        {
            var result = new ServiceResult();
            try
            {
                var deletedItem = _estadoCivilRepository.Delete(id, usuario, fecha);
                return deletedItem.CodeStatus > 0 ? result.Ok(deletedItem) : result.Error(deletedItem);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }
        #endregion

        #region Oficinas
        public ServiceResult OficinasListar()
        {
            var result = new ServiceResult();
            try
            {
                var list = _oficinasRepository.List();
                return result.Ok(list);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult OficinasBuscar(int id)
        {
            var result = new ServiceResult();
            try
            {
                var item = _oficinasRepository.Find(id);
                return result.Ok(item);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult OficinasCrear(tbOficinas item)
        {
            var result = new ServiceResult();
            try
            {
                var createdItem = _oficinasRepository.Insert(item);
                return createdItem.CodeStatus > 0 ? result.Ok(createdItem) : result.Error(createdItem);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult OficinasActualizar(tbOficinas item)
        {
            var result = new ServiceResult();
            try
            {
                var updatedItem = _oficinasRepository.Update(item);
                return updatedItem.CodeStatus > 0 ? result.Ok(updatedItem) : result.Error(updatedItem);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult OficinasEliminar(int id, int usuario, DateTime fecha)
        {
            var result = new ServiceResult();
            try
            {
                var deletedItem = _oficinasRepository.Delete(id, usuario, fecha);
                return deletedItem.CodeStatus > 0 ? result.Ok(deletedItem) : result.Error(deletedItem);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        #endregion

        #region Profesiones
        public ServiceResult ProfesionesListar()
        {
            var result = new ServiceResult();
            try
            {
                var list = _profesionesRepository.List();
                return result.Ok(list);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult ProfesionesBuscar(int id)
        {
            var result = new ServiceResult();
            try
            {
                var item = _profesionesRepository.Find(id);
                return result.Ok(item);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult ProfesionesCrear(tbProfesiones item)
        {
            var result = new ServiceResult();
            try
            {
                var createdItem = _profesionesRepository.Insert(item);
                return createdItem.CodeStatus > 0 ? result.Ok(createdItem) : result.Error(createdItem);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult ProfesionesActualizar(tbProfesiones item)
        {
            var result = new ServiceResult();
            try
            {
                var updatedItem = _profesionesRepository.Update(item);
                return updatedItem.CodeStatus > 0 ? result.Ok(updatedItem) : result.Error(updatedItem);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult ProfesionesEliminar(int id, int usuario, DateTime fecha)
        {
            var result = new ServiceResult();
            try
            {
                var deletedItem = _profesionesRepository.Delete(id, usuario, fecha);
                return deletedItem.CodeStatus > 0 ? result.Ok(deletedItem) : result.Error(deletedItem);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        #endregion

        #region PersonaNatural
        public ServiceResult PersonasNaturalesListar()
        {
            var result = new ServiceResult();
            try
            {
                var list = _personaNaturalRepository.List();
                return result.Ok(list);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult PersonasNaturalesBuscar(int id)
        {
            var result = new ServiceResult();
            try
            {
                var item = _personaNaturalRepository.Find(id);
                return result.Ok(item);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult PersonasNaturalesCrear(tbPersonasNaturales item)
        {
            var result = new ServiceResult();
            try
            {
                var createdItem = _personaNaturalRepository.Insert(item);
                return createdItem.CodeStatus > 0 ? result.Ok(createdItem) : result.Error(createdItem);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult PersonasNaturalesActualizar(tbPersonasNaturales item)
        {
            var result = new ServiceResult();
            try
            {
                var updatedItem = _personaNaturalRepository.Update(item);
                return updatedItem.CodeStatus > 0 ? result.Ok(updatedItem) : result.Error(updatedItem);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult PersonasNaturalesEliminar(int id, int usuario, DateTime fecha)
        {
            var result = new ServiceResult();
            try
            {
                var deletedItem = _personaNaturalRepository.Delete(id, usuario, fecha);
                return deletedItem.CodeStatus > 0 ? result.Ok(deletedItem) : result.Error(deletedItem);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        #endregion

        #region ComercianteIndividual
        public ServiceResult ComerciantesIndividualesListar()
        {
            var result = new ServiceResult();
            try
            {
                var list = _comercianteIndividualRepository.List();
                return result.Ok(list);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult ComerciantesIndividualesBuscar(int id)
        {
            var result = new ServiceResult();
            try
            {
                var item = _comercianteIndividualRepository.Find(id);
                return result.Ok(item);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult ComerciantesIndividualesCrear(tbComerciantesIndividuales item)
        {
            var result = new ServiceResult();
            try
            {
                var createdItem = _comercianteIndividualRepository.Insert(item);
                return createdItem.CodeStatus > 0 ? result.Ok(createdItem) : result.Error(createdItem);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult ComerciantesIndividualesActualizar(tbComerciantesIndividuales item)
        {
            var result = new ServiceResult();
            try
            {
                var updatedItem = _comercianteIndividualRepository.Update(item);
                return updatedItem.CodeStatus > 0 ? result.Ok(updatedItem) : result.Error(updatedItem);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult ComerciantesIndividualesEliminar(int id, int usuario, DateTime fecha)
        {
            var result = new ServiceResult();
            try
            {
                var deletedItem = _comercianteIndividualRepository.Delete(id, usuario, fecha);
                return deletedItem.CodeStatus > 0 ? result.Ok(deletedItem) : result.Error(deletedItem);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        #endregion

        #region personaJuridica
        public ServiceResult PersonasJuridicasListar()
        {
            var result = new ServiceResult();
            try
            {
                var list = _personaJuridicaRepository.List();
                return result.Ok(list);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult PersonasJuridicasBuscar(int id)
        {
            var result = new ServiceResult();
            try
            {
                var item = _personaJuridicaRepository.Find(id);
                return result.Ok(item);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult PersonasJuridicasCrear(tbPersonasJuridicas item)
        {
            var result = new ServiceResult();
            try
            {
                var createdItem = _personaJuridicaRepository.Insert(item);
                return createdItem.CodeStatus > 0 ? result.Ok(createdItem) : result.Error(createdItem);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult PersonasJuridicasActualizar(tbPersonasJuridicas item)
        {
            var result = new ServiceResult();
            try
            {
                var updatedItem = _personaJuridicaRepository.Update(item);
                return updatedItem.CodeStatus > 0 ? result.Ok(updatedItem) : result.Error(updatedItem);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult PersonasJuridicasEliminar(int id, int usuario, DateTime fecha)
        {
            var result = new ServiceResult();
            try
            {
                var deletedItem = _personaJuridicaRepository.Delete(id, usuario, fecha);
                return deletedItem.CodeStatus > 0 ? result.Ok(deletedItem) : result.Error(deletedItem);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        #endregion
    }
}
