class GameLayer extends Layer {
    constructor(){
        super();
        this.iniciar();
    }
    iniciar(){
        //this.fondoPuntos = new Fondo(imagenes.icono_puntos, 480*0.15,320*0.03);
        reproducirMusica();
        this.scrollX = 0;
        this.espacio = new Espacio(1);
        this.bloques = [];
        this.puntos = new Texto(0, 480*0.9, 320*0.07);
        //this.jugador = new Jugador(50,50);
        this.fondo = new Fondo(imagenes.fondo_2, 480*0.5, 320*0.5);
        this.disparosJugador = [];
        this.enemigos = [];
        this.estrellas = [];
        this.fondo.vx = -1;
        //this.enemigos.push(new Enemigo(300,50));
        //this.enemigos.push(new Enemigo(350, 200));
        this.contador_ovnis = 0;
        //this.gameover = false;
        this.ovnis_matados = 0;
        this.ovnis20 = 0;
        this.posicion = [480*0.15, 320*0.07];
        this.cargaMapa("res/0.txt");
        console.log("juego iniciado")
        this.en_el_suelo = true;
    }
    actualizar(){
        this.espacio.actualizar();
        this.fondo.actualizar();
        
        for(var j = 0; j < this.enemigos.length; j++){
            if(this.enemigos[j] != null && this.enemigos[j].estado == estados.muerto){
                this.enemigos.splice(j, 1);
                this.espacio.eliminarCuerpoDinamico(enemigos[j]);
                j -= 1;
            }
        }
        /*if(this.enemigosCreacion == null){
            this.enemigosCreacion = 0;
        }
        this.enemigosCreacion --;
        if(this.enemigosCreacion < 0){
            let randomY = this.generarAleatorioAltoPantalla();
            let enemigoNuevo = new Enemigo(480,randomY);
            this.enemigosCreacion = 50;
            this.enemigos.push(enemigoNuevo);
        }*/
        // Eliminar disparos sin velocidad
        for (var i=0; i < this.disparosJugador.length; i++){
            if ( this.disparosJugador[i] != null &&
                    this.disparosJugador[i].vx == 0){
                
                this.espacio
                    .eliminarCuerpoDinamico(this.disparosJugador[i]);
                this.disparosJugador.splice(i, 1);
            }
        }


        // Enemigos muertos fuera del juego
        for (var j=0; j < this.enemigos.length; j++){
            if ( this.enemigos[j] != null &&
                this.enemigos[j].estado == estados.muerto  ) {
                this.espacio
                    .eliminarCuerpoDinamico(this.enemigos[j]);
                this.enemigos.splice(j, 1);
                j = j-1;
            }
        }
        
        // Eliminar disparos fuera de pantalla
        for (var i=0; i < this.disparosJugador.length; i++){
            if ( this.disparosJugador[i] != null &&
                !this.disparosJugador[i].estaEnPantalla()){
                this.espacio
                    .eliminarCuerpoDinamico(this.disparosJugador[i]);
                this.disparosJugador.splice(i, 1);
                i=i-1;
            }
        }

        this.jugador.actualizar();
        for (var i=0; i < this.enemigos.length; i++){
            this.enemigos[i].actualizar();
        }
        for (var i=0; i < this.disparosJugador.length; i++) {
            this.disparosJugador[i].actualizar();
        }


        for (var i=0; i < this.enemigos.length; i++){
            if ( this.jugador.colisiona(this.enemigos[i])){
                this.jugador.golpeado();
                if (this.jugador.vidas <= 0){
                    this.iniciar();
                }
            }
        }
        // colisiones , disparoJugador - Enemigo
        for (var i=0; i < this.disparosJugador.length; i++){
            for (var j=0; j < this.enemigos.length; j++){
                if (this.disparosJugador[i] != null &&
                    this.enemigos[j] != null &&
                    this.disparosJugador[i].colisiona(this.enemigos[j])) {
                    
                    this.espacio
                        .eliminarCuerpoDinamico(this.disparosJugador[i]);
                    this.disparosJugador.splice(i, 1);
                    i = i-1;

                    this.enemigos[j].impactado();
                    this.puntos.valor++;
                }
            }
        }  

    }
    dibujar(){
        this.calcularScroll();
        this.fondo.dibujar();
        for (var i=0; i < this.bloques.length; i++){
            this.bloques[i].dibujar(this.scrollX);
        }
        for (var i=0; i < this.disparosJugador.length; i++) {
            this.disparosJugador[i].dibujar(this.scrollX);
        }
        this.jugador.dibujar(this.scrollX);
        for (var i=0; i < this.enemigos.length; i++){
            this.enemigos[i].dibujar(this.scrollX);
        }




















        /*

        for(var i = 0; i < this.bloques.length; i++){
            this.bloques[i].dibujar(this.scrollX);
        }
        if(!this.gameover){
            this.jugador.dibujar(this.scrollX);
            for(let index = 0; index < this.enemigos.length; index++){
                this.enemigos[index].dibujar(this.scrollX);
            }
            for(let index = 0; index < this.disparosJugador.length;index++){
                this.disparosJugador[index].dibujar(this.scrollX);
            }
            this.puntos.dibujar();
            for(let index = 0; index < this.estrellas.length; index++){
                this.estrellas[index].dibujar(this.scrollX);
            }
        }
            */
    }
    procesarControles(){
        //disparar
        if(controles.disparo){
            let nuevoDisparo = this.jugador.disparar();
            //console.log("disparando" + nuevoDisparo);
            if(nuevoDisparo != null){
                this.espacio.agregarCuerpoDinamico(nuevoDisparo);
                this.disparosJugador.push(nuevoDisparo);
            }
        }
        
        //eje x
        if(controles.moverX > 0){
            //console.log("mover derecha");
            this.jugador.moverX(1);
        }
        else if(controles.moverX < 0){
            //console.log("mover izquierda");
            this.jugador.moverX(-1);
        }
        else{
            this.jugador.moverX(0);
        }

        //eje y
        if(controles.moverY > 0){
                this.jugador.saltar(-16);
        }
        else if(controles.moverY < 0){
            //console.log("mover abajo");
        }else{
            //this.jugador.moverY(0);
        }
    }
    generarAleatorioAltoPantalla(){
        let random = Math.random();
        let numeroGenerado = 308 * random;
        return numeroGenerado;
    }
    cargaMapa(mapa, caracteresAncho, caracteresAlto){
        var fichero = new XMLHttpRequest();
        console.log("Fichero cogido");
        fichero.open("GET", mapa, false);
        console.log("Fichero abierto...");

        fichero.onreadystatechange = function(){
            console.log("Leyendo fichero...");
            var texto = fichero.responseText;
            var lineas = texto.split('\n');
            console.log("Lineas cogidas...");
            for(var i = 0; i < lineas.length; i++){
                var linea = lineas[i];
                for(var j = 0; j < linea.length; j++){
                    var simbolo = linea[j];
                    var x = 40 / 2 + j * 40;
                    var y = 32 + i * 32;
                    this.cargarObjetoMapa(simbolo, x, y);
                }
            }
        }.bind(this);

        fichero.send(null);
        
    }
    cargarObjetoMapa(simbolo, x, y){
        switch(simbolo){
            case "1":
                this.jugador = new Jugador(x, y);
                this.jugador.y = this.jugador.y - this.jugador.alto / 2;
                this.espacio.agregarCuerpoDinamico(this.jugador);
                break;
            case "#":
                var bloque = new Bloque(imagenes.bloque_tierra, x, y);
                bloque.y = bloque.y - bloque.alto / 2;
                this.bloques.push(bloque);
                this.espacio.agregarCuerpoEstatico(bloque);
                break;
            case "E":
                var enemigo = new Enemigo(x,y);
                enemigo.y = enemigo.y - enemigo.alto / 2;
                this.enemigos.push(enemigo);
                this.espacio.agregarCuerpoDinamico(enemigo);
                break;
            default:
                break;
        }
    }
    calcularScroll(){
        this.scrollX = this.jugador.x - 250;
    }
}