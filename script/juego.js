var juego = {
  filas:[[],[],[]],
  espacioVacio: {
    fila:0,
    columna:2
  },
  iniciar:function(elemento){
    console.log(this.filas);
    console.log(elemento);
    this.instalarPiezas(elemento);
    this.mezclarFichas(100);
    this.capturarTeclas();
  },
  crearPieza:function(numero, filas, columnas){
    var elemento = $('<div/>');
    elemento.addClass("pieza");
    elemento.css({
       backgroundImage:"url('piezas/"+numero+".png')",
       top: filas*200,
       left: columnas*200
    });
    var retorno = {
      nuevoElemento : elemento,
      filaInicial: filas,
      columnaInicial: columnas,
      numero: numero
    }
    return retorno;
  },
  chequearSiGano:function(){
    for (var fila = 0; fila < 3; fila++) {
            for (var columna = 0; columna < 3; columna++) {
              var ficha = this.filas [fila][columna];
              if (ficha && !(fila==ficha.filaInicial && columna==ficha.columnaInicial)) {
                return false;
              } 
            }
    }
    return swal("Enhorabuena!", "Haz completado el desafio", "success");
  },
  moverFichaFilaColumna:function(ficha, fila, columna){
    ficha.nuevoElemento.animate({
      top: this.espacioVacio.fila*200,
      left: this.espacioVacio.columna*200

    }, 100);
    var nuevaFila = this.espacioVacio.fila;
    var nuevaCol = this.espacioVacio.columna; 
    this.filas[nuevaFila][nuevaCol] = ficha;
    },
  guardarEspacioVacio:function(fila, columna){
    this.filas [fila] [columna] =null;
    this.espacioVacio.fila=fila;
    this.espacioVacio.columna=columna;
  },
  intercambiarPosicionConEspacioVacio:function(fila, columna){
    var pieza= this.filas [fila] [columna];
    this.moverFichaFilaColumna(pieza, fila, columna);
    this.guardarEspacioVacio(fila, columna);

  },
  mezclarFichas:function(veces){

  	if (veces < 0) {return};

    var mezclar = ["moverHaciaAbajo", "moverHaciaArriba", "moverHaciaLaDerecha", "moverHaciaLaIzquierda"];
    
    //for (var i = 0; i < veces; i++) {
      var numAl = Math.floor((Math.random()*4));
      
      var funcionAejecutar = mezclar[numAl];
      this[funcionAejecutar]();
    //}
    var that=this;
    setTimeout(function(){
    	veces--;
    	that.mezclarFichas(veces);
    }, 2)
  },
  instalarPiezas:function(elemento){
    var numero=1;
    for (var filas = 0; filas < 3; filas++) {
      for (var columnas = 0; columnas < 3; columnas++) {
      if (filas===this.espacioVacio.fila && columnas===this.espacioVacio.columna) {
        this.filas[filas][columnas]=null;
      }
      else{
        var derivada = this.crearPieza(numero, filas, columnas);
        elemento.append(derivada.nuevoElemento);
        this.filas[filas][columnas]=derivada;
        numero++; 
      }  
      }
    }
  },
  moverHaciaAbajo:function(){
    console.log("Abajo");
    if(this.espacioVacio.fila-1 > -1){
      var filaOrigen = this.espacioVacio.fila-1;
      var columnaOrigen = this.espacioVacio.columna;

      this.intercambiarPosicionConEspacioVacio(filaOrigen, columnaOrigen);  
    }
    


  },
  moverHaciaArriba:function(){
    console.log("Arriba");
    if (this.espacioVacio.fila+1 < this.filas.length) {
      var filaOrigen = this.espacioVacio.fila+1;
      var columnaOrigen = this.espacioVacio.columna;

    this.intercambiarPosicionConEspacioVacio(filaOrigen, columnaOrigen);
    }

  },
  moverHaciaLaDerecha:function(){
    console.log("Derecha");
    if (this.espacioVacio.columna-1 > -1) {
      var filaOrigen = this.espacioVacio.fila;
      var columnaOrigen = this.espacioVacio.columna-1;

    this.intercambiarPosicionConEspacioVacio(filaOrigen, columnaOrigen);

    }

  },
  moverHaciaLaIzquierda:function(){
    console.log("izquierda");
    if (this.espacioVacio.columna+1 < 3) {
      var filaOrigen = this.espacioVacio.fila;
      var columnaOrigen = this.espacioVacio.columna+1;

    this.intercambiarPosicionConEspacioVacio(filaOrigen, columnaOrigen);

    }

  },
  capturarTeclas:function(){
    var that = this;
    var fn = function(evento){
    console.log(evento.which);
    switch(evento.which){
      case 38:
        this.moverHaciaArriba();
        break;
      case 39:
        this.moverHaciaLaDerecha();
        break;
      case 40:
        this.moverHaciaAbajo();
        break;
      case 37:
        this.moverHaciaLaIzquierda();

        break;
      default:
        // que hago si no es ninguna de las anteriores
      return false;
        break;
    }
    that.chequearSiGano(); 
   }
   $(document).keydown(fn.bind(this)

    );

  }
}
$(document).ready(function(){
	juego.iniciar($("#juego"));

});

