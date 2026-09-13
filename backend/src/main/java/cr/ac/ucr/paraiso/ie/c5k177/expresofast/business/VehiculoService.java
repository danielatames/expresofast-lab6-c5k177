package cr.ac.ucr.paraiso.ie.c5k177.expresofast.business;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import cr.ac.ucr.paraiso.ie.c5k177.expresofast.data.VehiculoRepository;
import cr.ac.ucr.paraiso.ie.c5k177.expresofast.domain.Vehiculo;

import java.util.List;

@Service
public class VehiculoService {

    private final VehiculoRepository vehiculoRepository;

    public VehiculoService(VehiculoRepository vehiculoRepository) {
        this.vehiculoRepository = vehiculoRepository;
    }

    @Transactional(readOnly = true)
    public List<Vehiculo> listarTodos() {
        return vehiculoRepository.findAll();
    }

    @Transactional
    public Vehiculo crear(Vehiculo vehiculo) {
        return vehiculoRepository.save(vehiculo);
    }
}