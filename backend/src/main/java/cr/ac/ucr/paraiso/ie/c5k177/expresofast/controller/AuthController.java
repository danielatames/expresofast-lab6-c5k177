package cr.ac.ucr.paraiso.ie.c5k177.expresofast.controller;

import cr.ac.ucr.paraiso.ie.c5k177.expresofast.business.AuthService;
import cr.ac.ucr.paraiso.ie.c5k177.expresofast.dto.AuthRequestDTO;
import cr.ac.ucr.paraiso.ie.c5k177.expresofast.dto.AuthResponseDTO;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponseDTO> login(@Valid @RequestBody AuthRequestDTO request) {
        AuthResponseDTO respuesta = authService.login(request);
        return ResponseEntity.ok(respuesta);
    }
}