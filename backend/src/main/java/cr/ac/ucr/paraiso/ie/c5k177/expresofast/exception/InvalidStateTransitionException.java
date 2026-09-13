package cr.ac.ucr.paraiso.ie.c5k177.expresofast.exception;

public class InvalidStateTransitionException extends RuntimeException {
    public InvalidStateTransitionException(String mensaje) {
        super(mensaje);
    }
}