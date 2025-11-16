function toggleMenu() {
      document.getElementById('navMenu').classList.toggle('show');
    }

    // Cambiar entre secciones
    function mostrarSeccion(id) {
      document.querySelectorAll('.seccion').forEach(sec => sec.classList.add('d-none'));
      document.getElementById(id).classList.remove('d-none');
    }

    // Analizar si la función es par o impar
    function verificarParImpar() {
      const expr = document.getElementById('funcionParImpar').value.trim();
      if (!expr) return alert('Por favor, ingresa una función.');

      try {
        const f = math.parse(expr).compile();
        let pasos = '';
        let esPar = true;
        let esImpar = true;

        pasos += `<h5>Proceso de análisis:</h5><ul>`;
        for (let x = -3; x <= 3; x++) {
          const fx = f.evaluate({x});
          const fnegx = f.evaluate({x: -x});
          pasos += `<li>Para x=${x}: f(x)=${fx}, f(-x)=${fnegx}</li>`;
          if (fx !== fnegx) esPar = false;
          if (fx !== -fnegx) esImpar = false;
        }
        pasos += `</ul>`;

        let resultado = `<h5>Función: f(x) = ${expr}</h5>`;
        if (esPar) resultado += `<p class="text-success fw-bold"> La función es PAR</p>`;
        else if (esImpar) resultado += `<p class="text-warning fw-bold"> La función es IMPAR</p>`;
        else resultado += `<p class="text-danger fw-bold"> La función NO es par ni impar</p>`;

        resultado += pasos;
        resultado += `<p><b>Dominio:</b> Todos los números reales (ℝ)</p>`;
        resultado += `<p><b>Contradominio:</b> ℝ (aproximado)</p>`;

        document.getElementById('resultadoParImpar').innerHTML = resultado;
      } catch (err) {
        alert('Error al analizar la función. Verifica la sintaxis.');
      }
    }

    // Evaluar una función paso a paso
    function evaluarFuncion() {
      const expr = document.getElementById('funcionEvaluar').value.trim();
      const xVal = parseFloat(document.getElementById('valorX').value);

      if (!expr || isNaN(xVal)) return alert('Ingresa la función y un valor válido.');

      try {
        const parsed = math.parse(expr);
        const f = parsed.compile();
        const result = f.evaluate({x: xVal});

        let pasos = `
          <h5>Proceso paso a paso:</h5>
          <ul>
            <li>Función original: f(x) = ${expr}</li>
            <li>Valor de x: ${xVal}</li>
            <li>Reemplazo: f(${xVal}) = ${expr.replaceAll('x', `(${xVal})`)}</li>
            <li>Cálculo: ${expr.replaceAll('x', `(${xVal})`)} = <b>${result}</b></li>
          </ul>
        `;

        let salida = `
          <h5>f(x) = ${expr}</h5>
          <p><b>Resultado:</b> f(${xVal}) = ${result}</p>
          ${pasos}
          <p><b>Dominio:</b> Todos los números reales (ℝ)</p>
          <p><b>Contradominio:</b> ℝ (aproximado)</p>
        `;

        document.getElementById('resultadoEvaluar').innerHTML = salida;
      } catch (err) {
        alert('Error al evaluar la función. Revisa la sintaxis.');
      }
    }