package cr.ac.ucr.paraiso.ie.c5k177.expresofast.exception;

public class ResourceNotFoundException extends RuntimeException {
    public ResourceNotFoundException(String mensaje) {
        super(mensaje);
    }
}