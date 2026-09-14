const API_URL_BASE = 'http://localhost:8080';
const API_URL = `${API_URL_BASE}/api/envios`;

async function fetchWithAuth(url, options = {}) {
    const token = localStorage.getItem('jwt_token');

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        ...(options.headers || {})
    };

    const respuesta = await fetch(url, { ...options, headers });

    if (respuesta.status === 401 || respuesta.status === 403) {
        localStorage.removeItem('jwt_token');
        localStorage.removeItem('jwt_username');
        localStorage.removeItem('jwt_roles');
        window.location.href = 'login.html';
        throw new Error('Sesión expirada');
    }

    return respuesta;
}

function verificarAutenticacion() {
    const token = localStorage.getItem('jwt_token');
    if (!token) {
        window.location.href = 'login.html';
        return false;
    }
    return true;
}

function obtenerRoles() {
    try {
        return JSON.parse(localStorage.getItem('jwt_roles')) || [];
    } catch {
        return [];
    }
}

let envios = [];
let filtroActual = 'TODOS';
let bitacoraCompleta = [];
let envioIdActualEnModal = null;

function inicializarUI() {
    const roles = obtenerRoles();
    const username = localStorage.getItem('jwt_username');

    document.getElementById('usuario-actual').textContent = username ? ` ${username}` : '';

    if (roles.includes('ROLE_CONDUCTOR') && !roles.includes('ROLE_ADMIN') && !roles.includes('ROLE_OPERADOR')) {
        document.getElementById('seccion-formulario').style.display = 'none';
    }
}

async function cargarEnvios() {
    try {
        const respuesta = await fetchWithAuth(`${API_URL}/optimizados`);
        envios = await respuesta.json();
        renderizarTablero();
    } catch (error) {
        console.error('Error al cargar envíos:', error);
    }
}

function renderizarTablero() {
    const contenedor = document.getElementById('tablero-envios');
    contenedor.innerHTML = '';

    const roles = obtenerRoles();
    const puedeVerBitacora = roles.includes('ROLE_ADMIN') || roles.includes('ROLE_OPERADOR');

    const enviosFiltrados = filtroActual === 'TODOS'
        ? envios
        : envios.filter(e => e.estadoEnvio === filtroActual);

    document.getElementById('contador-envios').textContent = `${enviosFiltrados.length} envíos`;

    enviosFiltrados.forEach(envio => {
        const tarjeta = document.createElement('article');
        tarjeta.className = 'tarjeta-envio';
        tarjeta.innerHTML = `
            <h3>${envio.codigoRastreo}</h3>
            <span class="pill-status ${envio.estadoEnvio}">${envio.estadoEnvio}</span>
            <p><strong>Destino:</strong> ${envio.direccionDestino}</p>
            <p><strong>Peso:</strong> ${envio.pesoKg} kg</p>
            <p><strong>Costo:</strong> ₡${envio.costo}</p>
            <p><strong>Vehículo:</strong> ${envio.placaVehiculo ?? '—'}</p>
            <p><strong>Conductor:</strong> ${envio.nombreConductor ?? '—'}</p>
            <div class="tarjeta-acciones">
                <button onclick="actualizarEstado(${envio.id}, 'EN_TRANSITO')">Marcar en Tránsito</button>
                <button onclick="actualizarEstado(${envio.id}, 'ENTREGADO')">Marcar Entregado</button>
            </div>
            ${puedeVerBitacora ? `<button class="btn-bitacora" onclick="abrirBitacora(${envio.id})">Ver Bitácora</button>` : ''}
        `;
        contenedor.appendChild(tarjeta);
    });
}

async function registrarEnvio(datosEnvio) {
    try {
        const respuesta = await fetchWithAuth(API_URL, {
            method: 'POST',
            body: JSON.stringify(datosEnvio)
        });

        if (!respuesta.ok) {
            const errorData = await respuesta.json();
            const detalle = errorData.errores
                ? Object.values(errorData.errores).join(', ')
                : (errorData.error ?? 'No se pudo registrar el envío');
            alert(`Error: ${detalle}`);
            return;
        }

        await cargarEnvios();
    } catch (error) {
        console.error('Error al registrar envío:', error);
    }
}

async function actualizarEstado(id, nuevoEstado) {
    try {
        const respuesta = await fetchWithAuth(`${API_URL}/${id}/estado`, {
            method: 'PATCH',
            body: JSON.stringify({ nuevoEstado, observaciones: '' })
        });

        if (!respuesta.ok) {
            const errorData = await respuesta.json();
            alert(`Error: ${errorData.error ?? 'No se pudo actualizar el estado'}`);
            return;
        }

        await cargarEnvios();
    } catch (error) {
        console.error('Error al actualizar estado:', error);
    }
}

async function abrirBitacora(envioId) {
    envioIdActualEnModal = envioId;
    try {
        const respuesta = await fetchWithAuth(`${API_URL}/${envioId}/bitacora`);
        bitacoraCompleta = await respuesta.json();
        renderizarBitacora(bitacoraCompleta);
        document.getElementById('modal-bitacora').hidden = false;
    } catch (error) {
        console.error('Error al cargar bitácora:', error);
    }
}

function renderizarBitacora(lista) {
    const contenedor = document.getElementById('lista-bitacora');

    if (lista.length === 0) {
        contenedor.innerHTML = '<p>No hay registros de auditoría para este rango.</p>';
        return;
    }

    contenedor.innerHTML = lista.map(entrada => `
        <div class="entrada-bitacora">
            <p><strong>${entrada.estadoAnterior} → ${entrada.estadoNuevo}</strong></p>
            <p>${new Date(entrada.fechaCambio).toLocaleString()}</p>
            <p>${entrada.usuario}</p>
            ${entrada.observaciones ? `<p> ${entrada.observaciones}</p>` : ''}
        </div>
    `).join('');
}

function filtrarBitacoraPorFecha() {
    const desde = document.getElementById('fecha-inicio').value;
    const hasta = document.getElementById('fecha-fin').value;

    let filtrada = bitacoraCompleta;

    if (desde) {
        filtrada = filtrada.filter(e => new Date(e.fechaCambio) >= new Date(desde));
    }
    if (hasta) {
        const hastaFin = new Date(hasta);
        hastaFin.setHours(23, 59, 59, 999);
        filtrada = filtrada.filter(e => new Date(e.fechaCambio) <= hastaFin);
    }

    renderizarBitacora(filtrada);
}


//eventos
document.getElementById('form-envio').addEventListener('submit', (evento) => {
    evento.preventDefault();

    const nuevoEnvio = {
        codigoRastreo: document.getElementById('codigoRastreo').value,
        direccionDestino: document.getElementById('direccionDestino').value,
        pesoKg: parseFloat(document.getElementById('pesoKg').value),
        costo: parseFloat(document.getElementById('costo').value),
        vehiculoId: parseInt(document.getElementById('vehiculoId').value),
        conductorId: parseInt(document.getElementById('conductorId').value)
    };

    registrarEnvio(nuevoEnvio);
    evento.target.reset();
});

document.getElementById('nav-filtros').addEventListener('click', (evento) => {
    if (evento.target.classList.contains('filtro-btn')) {
        document.querySelectorAll('.filtro-btn').forEach(btn => btn.classList.remove('activo'));
        evento.target.classList.add('activo');
        filtroActual = evento.target.dataset.estado;
        renderizarTablero();
    }
});

document.getElementById('btn-logout').addEventListener('click', () => {
    localStorage.removeItem('jwt_token');
    localStorage.removeItem('jwt_username');
    localStorage.removeItem('jwt_roles');
    window.location.href = 'login.html';
});

document.getElementById('btn-cerrar-modal').addEventListener('click', () => {
    document.getElementById('modal-bitacora').hidden = true;
});

document.getElementById('btn-filtrar-fecha').addEventListener('click', filtrarBitacoraPorFecha);

if (document.getElementById('tablero-envios')) {
    if (verificarAutenticacion()) {
        inicializarUI();
        cargarEnvios();
    }
}

document.addEventListener('keydown', (evento) => {
    if (evento.key === 'Escape') {
        document.getElementById('modal-bitacora').hidden = true;
    }
});

document.getElementById('modal-bitacora').addEventListener('click', (evento) => {
    if (evento.target.id === 'modal-bitacora') {
        document.getElementById('modal-bitacora').hidden = true;
    }
});