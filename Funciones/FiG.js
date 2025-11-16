function toggleMenu(){
  const menu=document.getElementById('navMenu');
  menu.classList.toggle('show');
}

function graficar(){
  const expresion=document.getElementById('funcion').value.trim();
  const resultado=document.getElementById('resultado');
  const grafica=document.getElementById('grafica');
  if(!expresion){
    resultado.innerHTML="Escribe una o más funciones antes de graficar.";
    return;
  }
  const funciones=expresion.split(",").map(f=>f.trim()).filter(f=>f);
  const xValues=math.range(-10,10,0.05).toArray();
  const colores=['#0078ff','#e91e63','#4caf50','#ff9800','#9c27b0'];
  let trazos=[];
  funciones.forEach((exp,i)=>{
    try{
      const f=math.compile(exp);
      const yValues=xValues.map(x=>{
        try{return f.evaluate({x});}catch{return NaN;}
      });
      trazos.push({x:xValues,y:yValues,mode:'lines',name:`f${i+1}(x) = ${exp}`,line:{color:colores[i%colores.length],width:2}});
    }catch(err){
      resultado.innerHTML="Error en la función: "+exp;
    }
  });
  const layout={title:'Gráfica de Funciones',xaxis:{title:'Eje X',zeroline:true},yaxis:{title:'Eje Y',zeroline:true},showlegend:true,hovermode:'closest'};
  Plotly.newPlot(grafica,trazos,layout,{scrollZoom:true});
  resultado.innerHTML="Gráfica generada. Usa el mouse para hacer zoom o mover la vista.";
}