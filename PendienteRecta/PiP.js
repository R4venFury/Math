function toggleMenu() {
  document.getElementById("navMenu").classList.toggle("show");
}

function gcd(a, b) {
  a = Math.abs(a);
  b = Math.abs(b);
  if (!Number.isFinite(a) || !Number.isFinite(b)) return 1;
  a = Math.round(a);
  b = Math.round(b);
  while (b) {
    let t = a % b;
    a = b;
    b = t;
  }
  return Math.abs(a);
}

function decimalToFraction(x, maxDen = 10000) {
  if (!isFinite(x)) return null;
  const sign = x < 0 ? -1 : 1;
  x = Math.abs(x);
  const eps = 1e-12;
  let lower_n = 0, lower_d = 1;
  let upper_n = 1, upper_d = 0;
  let n = 1, d = 1;
  while (true) {
    n = lower_n + upper_n;
    d = lower_d + upper_d;
    if (d > maxDen) break;
    if (x + eps < n / d) {
      upper_n = n;
      upper_d = d;
    } else if (x - eps > n / d) {
      lower_n = n;
      lower_d = d;
    } else {
      return [sign * n, d];
    }
  }
  const approxN = Math.round(x * maxDen);
  const g = gcd(approxN, maxDen);
  return [sign * (approxN / g), maxDen / g];
}

function mostrarPaso(html) {
  document.getElementById('output').innerHTML = html;
}

document.getElementById('calcBtn').addEventListener('click', () => {
  const x1 = parseFloat(document.getElementById('x1').value);
  const x2 = parseFloat(document.getElementById('x2').value);
  const y1 = parseFloat(document.getElementById('y1').value);
  const y2 = parseFloat(document.getElementById('y2').value);

  if (!isFinite(x1) || !isFinite(x2) || !isFinite(y1) || !isFinite(y2)) {
    mostrarPaso('<div class="paso alert">Por favor introduce valores numéricos válidos.</div>');
    return;
  }

  let html = '';
  html += `<div class="paso"><b>1) Fórmula general:</b><br>Δy / Δx = (y₂ - y₁) / (x₂ - x₁)</div>`;
  html += `<div class="paso"><b>2) Sustitución:</b><br>Sustituimos y₂=${y2}, y₁=${y1}, x₂=${x2}, x₁=${x1} →<br><span class="monos">Δy / Δx = (${y2} - ${y1}) / (${x2} - ${x1})</span></div>`;

  const dy = y2 - y1, dx = x2 - x1;
  html += `<div class="paso"><b>3) Calcula Δy y Δx:</b><br>Δy = ${y2} - ${y1} = <span class="monos">${dy}</span><br>Δx = ${x2} - ${x1} = <span class="monos">${dx}</span></div>`;

  if (Math.abs(dx) < 1e-15) {
    html += `<div class="paso alert"><b>Atención:</b> Δx = 0, no se puede dividir entre 0. La recta es vertical.</div>`;
    mostrarPaso(html);
    return;
  }

  html += `<div class="paso"><b>4) Fracción sin simplificar:</b><br><span class="monos">${dy} / ${dx}</span></div>`;

  function isIntegerish(n) { return Math.abs(n - Math.round(n)) < 1e-12; }

  let reducedInfo = '';
  if (isIntegerish(dy) && isIntegerish(dx)) {
    const ni = Math.round(dy), di = Math.round(dx), g = gcd(ni, di);
    if (g > 1) {
      reducedInfo = `<div class="paso"><b>5) Reducción (MCD=${g}):</b><br>${ni}/${di} = <span class="monos">${ni / g}/${di / g}</span></div>`;
    } else {
      reducedInfo = `<div class="paso"><b>5) Fracción irreducible:</b><br><span class="monos">${ni}/${di}</span></div>`;
    }
  }
  html += reducedInfo;

  const pendiente = dy / dx;
  const pendiente3 = Number(pendiente.toFixed(6));
  html += `<div class="paso"><b>6) Resultado decimal:</b><br>m = ${pendiente3}</div>`;

  const frac = decimalToFraction(pendiente, 10000);
  if (frac && frac.length === 2) {
    let fn = frac[0], fd = frac[1];
    const g2 = gcd(fn, fd);
    fn /= g2; fd /= g2;
    html += `<div class="paso"><b>7) Aproximación racional:</b><br><span class="monos">${fn}/${fd}</span></div>`;
  }

  html += `<div class="paso"><b>8) Interpretación:</b><br>La pendiente m = <span class="monos">${pendiente3}</span> indica que por cada unidad que aumenta x, y cambia en ${pendiente3} unidades.<br>${
    pendiente3 > 0 ? 'Recta ascendente.' : pendiente3 < 0 ? 'Recta descendente.' : 'Recta horizontal.'
  }</div>`;

  html += `<table class="results"><thead><tr><th>Concepto</th><th>Valor</th></tr></thead>
  <tbody>
    <tr><td>x₁</td><td>${x1}</td></tr>
    <tr><td>y₁</td><td>${y1}</td></tr>
    <tr><td>x₂</td><td>${x2}</td></tr>
    <tr><td>y₂</td><td>${y2}</td></tr>
    <tr><td>Δy</td><td>${dy}</td></tr>
    <tr><td>Δx</td><td>${dx}</td></tr>
    <tr><td>Pendiente m</td><td>${pendiente3}</td></tr>
  </tbody></table>`;

  mostrarPaso(html);
});

document.getElementById('calcBtn').click();
