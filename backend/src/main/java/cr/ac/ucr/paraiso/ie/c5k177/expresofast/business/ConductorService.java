package cr.ac.ucr.paraiso.ie.c5k177.expresofast.business;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import cr.ac.ucr.paraiso.ie.c5k177.expresofast.data.ConductorRepository;
import cr.ac.ucr.paraiso.ie.c5k177.expresofast.domain.Conductor;

import java.util.List;

@Service
public class ConductorService {

    private final ConductorRepository conductorRepository;

    public ConductorService(ConductorRepository conductorRepository) {
        this.conductorRepository = conductorRepository;
    }

    @Transactional(readOnly = true)
    public List<Conductor> listarTodos() {
        return conductorRepository.findAll();
    }

    @Transactional
    public Conductor crear(Conductor conductor) {
        return conductorRepository.save(conductor);
    }
}