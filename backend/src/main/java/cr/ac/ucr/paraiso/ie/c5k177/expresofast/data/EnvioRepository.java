package cr.ac.ucr.paraiso.ie.c5k177.expresofast.data;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import cr.ac.ucr.paraiso.ie.c5k177.expresofast.domain.Envio;

import java.util.List;

public interface EnvioRepository extends JpaRepository<Envio, Integer> {

   
    @Query("SELECT e FROM Envio e " +
           "JOIN FETCH e.vehiculo v " +
           "JOIN FETCH v.empresa " +
           "JOIN FETCH e.conductor " +
           "ORDER BY e.id DESC")
    List<Envio> findAllOptimizado();

    @Modifying(clearAutomatically = true)
    @Query("UPDATE Envio e SET e.estadoEnvio = :estado WHERE e.vehiculo.id = :vehiculoId")
    int actualizarEstadoPorVehiculo(@Param("vehiculoId") Integer vehiculoId, @Param("estado") String estado);
}