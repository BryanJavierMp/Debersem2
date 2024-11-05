document.getElementById("calculos").addEventListener("click", function() {
    const fechaNacimiento = document.getElementById("fechaNacimiento").value;
    const cedula = document.getElementById("cedula").value;
    const resultado = document.getElementById("resultado");

    // Validar que se haya ingresado una fecha de nacimiento
    if (!fechaNacimiento) {
        resultado.innerHTML = "Por favor, ingrese su fecha de nacimiento.";
        return;
    }

    // Validar que se haya ingresado una cédula
    if (!cedula) {
        resultado.innerHTML = "Por favor, ingrese su cédula.";
        return;
    }

    // Calcular años, meses y días desde la fecha de nacimiento hasta hoy
    const fechaNacimientoDate = new Date(fechaNacimiento);
    const hoy = new Date();
    const diffTime = hoy - fechaNacimientoDate;

    const edadAnios = hoy.getFullYear() - fechaNacimientoDate.getFullYear();
    const edadMeses = (edadAnios * 12) + (hoy.getMonth() - fechaNacimientoDate.getMonth());
    const edadDias = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    // Validar cédula ecuatoriana
    function validarCedulaEcuatoriana(cedula) {
        if (cedula.length !== 10) return false;

        const digitoRegion = parseInt(cedula.substring(0, 2));
        if (digitoRegion < 1 || digitoRegion > 24) return false;

        const coeficientes = [2, 1, 2, 1, 2, 1, 2, 1, 2];
        let suma = 0;

        for (let i = 0; i < coeficientes.length; i++) {
            let digito = parseInt(cedula[i]) * coeficientes[i];
            if (digito >= 10) digito -= 9;
            suma += digito;
        }

        const ultimoDigito = parseInt(cedula[9]);
        const digitoVerificador = (10 - (suma % 10)) % 10;

        return digitoVerificador === ultimoDigito;
    }

    const cedulaValida = validarCedulaEcuatoriana(cedula);

    // Mostrar resultados
    resultado.innerHTML = `
        <p>Edad en años: ${edadAnios}</p>
        <p>Edad en meses: ${edadMeses}</p>
        <p>Edad en días: ${edadDias}</p>
        <p>Cédula ecuatoriana: ${cedulaValida ? "Es Ecuatoriana" : "No es Ecuatoriana"}</p>
    `;
});
