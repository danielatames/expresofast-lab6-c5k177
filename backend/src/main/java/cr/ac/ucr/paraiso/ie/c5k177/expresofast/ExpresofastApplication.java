package cr.ac.ucr.paraiso.ie.c5k177.expresofast;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
public class ExpresofastApplication {

    public static void main(String[] args) {
        SpringApplication.run(ExpresofastApplication.class, args);
    }

    //temporal para generar hash de contraseña
    @Bean
    CommandLineRunner generarHash(PasswordEncoder passwordEncoder) {
        return args -> {
            System.out.println("HASH GENERADO: " + passwordEncoder.encode("secret"));
        };
    }
}