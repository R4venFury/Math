function toggleMenu(){
      const menu=document.getElementById('navMenu');
      menu.classList.toggle('show');
    }

    function graficar() {
      const A = parseFloat(document.getElementById("A").value);
      const k = parseFloat(document.getElementById("k").value);
      const meses = parseInt(document.getElementById("meses").value);
      const etiquetas = [];
      const valores = [];

      const cuerpoTabla = document.querySelector("#tabla tbody");
      cuerpoTabla.innerHTML = "";

      for (let t = 0; t <= meses; t++) {
        const f = A * Math.exp(k * t);
        etiquetas.push(t + " mes");
        valores.push(f.toFixed(2));

        const fila = `<tr><td>${t}</td><td>${f.toFixed(2)}</td></tr>`;
        cuerpoTabla.innerHTML += fila;
      }

      if (window.miGrafica) window.miGrafica.destroy();

      const ctx = document.getElementById("grafica").getContext("2d");
      window.miGrafica = new Chart(ctx, {
        type: "line",
        data: {
          labels: etiquetas,
          datasets: [{
            label: "Usuarios estimados",
            data: valores,
            borderColor: "#0078ff",
            backgroundColor: "rgba(0,120,255,0.2)",
            borderWidth: 3,
            tension: 0.3,
            fill: true,
            pointRadius: 4,
            pointBackgroundColor: "#fff"
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: false,
              title: { display: true, text: "Usuarios (f(t))" }
            },
            x: {
              title: { display: true, text: "Tiempo (meses)" }
            }
          },
          plugins: {
            legend: { labels: { color: "#000" } }
          }
        }
      });
    }

    graficar();