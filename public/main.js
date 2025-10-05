let usuarios = [];

function mostrarInicioSesion() {
    const modal = document.getElementById('modal-inicio-sesion');
    modal.style.display = 'flex';
    setTimeout(() => {
        modal.style.opacity = '1';
    }, 10);
}

function cerrarInicioSesion() {
    const modal = document.getElementById('modal-inicio-sesion');
    modal.style.opacity = '0';
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300);
}

function mostrarRegistro() {
    const modal = document.getElementById('modal-registro');
    modal.style.display = 'flex';
    setTimeout(() => {
        modal.style.opacity = '1';
    }, 10);
}

function cerrarRegistro() {
    const modal = document.getElementById('modal-registro');
    modal.style.opacity = '0';
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300);
}

function mostrarInicio() {
    document.querySelector('.contenedor-principal').style.display = 'flex';
    document.querySelector('.sobre-nosotros-seccion').style.display = 'none';
    document.querySelector('.contenido-principal-seccion').style.display = 'none';
}

function mostrarSobreNosotros() {
    document.querySelector('.contenedor-principal').style.display = 'none';
    document.querySelector('.sobre-nosotros-seccion').style.display = 'flex';
    document.querySelector('.contenido-principal-seccion').style.display = 'none';
}

function mostrarContenidoPrincipal() {
    document.querySelector('.contenedor-principal').style.display = 'none';
    document.querySelector('.sobre-nosotros-seccion').style.display = 'none';
    document.querySelector('.contenido-principal-seccion').style.display = 'block';
}

function cambiarTab(tabId) {
    document.querySelectorAll('.tab-button').forEach(button => {
        button.classList.remove('active');
    });
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });

    document.querySelector(`button[onclick="cambiarTab('${tabId}')"]`).classList.add('active');
    document.getElementById(tabId).classList.add('active');
}

function iniciarSesion() {
    const usuario = document.getElementById('input-usuario').value;
    const contrasena = document.querySelector('#modal-inicio-sesion input[type="password"]').value;

    const usuarioEncontrado = usuarios.find(u =>
        (u.usuario === usuario || u.email === usuario) && u.contrasena === contrasena
    );

    if (usuarioEncontrado) {
        localStorage.setItem('nombreUsuario', usuarioEncontrado.usuario);
        document.getElementById('nombre-usuario').textContent = usuarioEncontrado.usuario;
        cerrarInicioSesion();

        document.querySelector('.contenedor-usuario').style.display = 'flex';
        document.querySelectorAll('.boton-nav').forEach(btn => {
            if (btn.textContent === 'Iniciar sesión' || btn.textContent === 'Registrarse') {
                btn.style.display = 'none';
            }
        });
    } else {
        alert('Usuario o contraseña incorrectos');
    }
}

function registrarUsuario() {
    const usuario = document.getElementById('input-registro-usuario').value;
    const email = document.querySelector('#modal-registro input[type="email"]').value;
    const contrasena = document.querySelector('#modal-registro input[type="password"]').value;
    const confirmarContrasena = document.querySelectorAll('#modal-registro input[type="password"]')[1].value;

    if (usuario && email && contrasena && confirmarContrasena) {
        if (usuarios.find(u => u.usuario === usuario || u.email === email)) {
            alert('El usuario o email ya está registrado');
            return;
        }

        if (contrasena === confirmarContrasena) {
            usuarios.push({
                usuario: usuario,
                email: email,
                contrasena: contrasena
            });

            alert('Registro exitoso. Por favor inicie sesión.');
            cerrarRegistro();
            mostrarInicioSesion();
        } else {
            alert('Las contraseñas no coinciden');
        }
    } else {
        alert('Por favor, complete todos los campos');
    }
}

function toggleBarraLateral() {
    const barraLateral = document.getElementById('barra-lateral');
    const barraAjustes = document.getElementById('barra-ajustes');

    if (barraLateral.classList.contains('activa')) {
        barraLateral.classList.remove('activa');
        barraAjustes.classList.remove('activa');
    } else {
        barraLateral.classList.add('activa');
    }
}

function toggleModoOscuro() {
    document.body.classList.toggle('modo-oscuro');
    const modoOscuroActivo = document.body.classList.contains('modo-oscuro');
    localStorage.setItem('modoOscuro', modoOscuroActivo);
}

function mostrarBarraAjustes() {
    document.getElementById('barra-lateral').classList.add('activa');

    const barraAjustes = document.getElementById('barra-ajustes');
    barraAjustes.classList.add('activa');
}

function mostrarOpcionAjuste(opcion) {
    const mensaje = document.createElement('div');
    mensaje.className = 'mensaje-pronta-funcion';
    mensaje.textContent = 'Próxima función';

    const mensajesAnteriores = document.querySelectorAll('.mensaje-pronta-funcion');
    mensajesAnteriores.forEach(m => m.remove());

    document.getElementById('barra-ajustes').appendChild(mensaje);

    setTimeout(() => {
        mensaje.remove();
    }, 2000);
}

function cerrarSesion() {
    localStorage.removeItem('nombreUsuario');
    localStorage.removeItem('modoOscuro');
    document.body.classList.remove('modo-oscuro');
    document.querySelector('.contenedor-usuario').style.display = 'none';
    document.querySelectorAll('.boton-nav').forEach(btn => {
        if (btn.textContent === 'Iniciar sesión' || btn.textContent === 'Registrarse') {
            btn.style.display = 'block';
        }
    });

    document.getElementById('barra-lateral').classList.remove('activa');
    document.getElementById('barra-ajustes').classList.remove('activa');

    mostrarInicio();
}


function mostrarInformacion(tipo) {
    const modal = document.getElementById('modal-informacion');
    const titulo = document.getElementById('titulo-modal-informacion');
    const contenido = document.getElementById('contenido-modal-informacion');

    const informacion = {
        'quienes-somos': {
            titulo: '¿Quiénes somos?',
            contenido: 'Contenido pendiente...'
        },
        'que-buscamos': {
            titulo: '¿Qué buscamos?',
            contenido: 'Contenido pendiente...'
        },
        'como-trabajamos': {
            titulo: '¿Cómo trabajamos?',
            contenido: 'Contenido pendiente...'
        }
    };

    titulo.textContent = informacion[tipo].titulo;
    contenido.textContent = informacion[tipo].contenido;
    modal.style.display = 'flex';
}

function cerrarModalInformacion() {
    document.getElementById('modal-informacion').style.display = 'none';
}

function mostrarSeccion(seccion) {
    document.querySelectorAll('.seccion').forEach(s => {
        s.classList.remove('activa');
    });

    const barraAjustes = document.getElementById('barra-ajustes');
    if (seccion === 'ajustes') {
        barraAjustes.classList.add('activa');
    } else {
        barraAjustes.classList.remove('activa');
        const seccionActual = document.getElementById(seccion);
        if (seccionActual) {
            seccionActual.classList.add('activa');
        }
    }
}

function cerrarBarrasLaterales() {
    document.getElementById('barra-lateral').classList.remove('activa');
    document.getElementById('barra-ajustes').classList.remove('activa');
}

document.addEventListener('click', function(event) {
    const barraLateral = document.getElementById('barra-lateral');
    const barraAjustes = document.getElementById('barra-ajustes');
    const contenedorUsuario = document.querySelector('.contenedor-usuario');

    if (!barraLateral.contains(event.target) &&
        !barraAjustes.contains(event.target) &&
        !contenedorUsuario.contains(event.target)) {
        cerrarBarrasLaterales();
    }
});

document.addEventListener('DOMContentLoaded', () => {
    localStorage.clear();
    const contenedorUsuario = document.querySelector('.contenedor-usuario');
    contenedorUsuario.style.display = 'none';

    document.querySelectorAll('.boton-nav').forEach(btn => {
        if (btn.textContent === 'Iniciar sesión' || btn.textContent === 'Registrarse') {
            btn.style.display = 'block';
        }
    });

    document.querySelector('.boton-comenzar').addEventListener('click', mostrarContenidoPrincipal);

    mostrarInicio();
});

document.getElementById('modal-inicio-sesion').addEventListener('click', function(event) {
    if (event.target === this) {
        cerrarInicioSesion();
    }
});

document.getElementById('modal-registro').addEventListener('click', function(event) {
    if (event.target === this) {
        cerrarRegistro();
    }
});

document.getElementById('modal-informacion').addEventListener('click', function(event) {
    if (event.target === this) {
        cerrarModalInformacion();
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const toggleModoOscuroCheckbox = document.getElementById('toggle-modo-oscuro');
    if (toggleModoOscuroCheckbox) {
        const modoOscuro = localStorage.getItem('modoOscuro') === 'true';
        toggleModoOscuroCheckbox.checked = modoOscuro;
        document.body.classList.toggle('modo-oscuro', modoOscuro);

        toggleModoOscuroCheckbox.addEventListener('change', toggleModoOscuro);
    }
});
