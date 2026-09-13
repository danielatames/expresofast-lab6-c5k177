package cr.ac.ucr.paraiso.ie.c5k177.expresofast.business;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import cr.ac.ucr.paraiso.ie.c5k177.expresofast.data.EmpresaLogisticaRepository;
import cr.ac.ucr.paraiso.ie.c5k177.expresofast.domain.EmpresaLogistica;

import java.util.List;

@Service
public class EmpresaLogisticaService {

    private final EmpresaLogisticaRepository empresaRepository;

    public EmpresaLogisticaService(EmpresaLogisticaRepository empresaRepository) {
        this.empresaRepository = empresaRepository;
    }

    @Transactional(readOnly = true)
    public List<EmpresaLogistica> listarTodas() {
        return empresaRepository.findAll();
    }

    @Transactional
    public EmpresaLogistica crear(EmpresaLogistica empresa) {
        return empresaRepository.save(empresa);
    }
}