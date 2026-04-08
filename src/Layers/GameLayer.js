class GameLayer extends Layer {
    constructor(){
        super();
        this.iniciar();
    }
    iniciar(){
        //this.fondoPuntos = new Fondo(imagenes.icono_puntos, 480*0.15,320*0.03);
        reproducirMusica();
        this.puntos = new Texto(0, 480*0.9, 320*0.07);
        this.jugador = new Jugador(50,50);
        this.fondo = new Fondo(imagenes.fondo, 480*0.5, 320*0.5);
        this.disparosJugador = [];
        this.enemigos = [];
        this.estrellas = [];
        this.enemigos.push(new Enemigo(300,50));
        this.enemigos.push(new Enemigo(350, 200));
        this.contador_ovnis = 0;
        this.gameover = false;
        this.ovnis_matados = 0;
        this.ovnis20 = 0;
        this.posicion = [480*0.15, 320*0.07];
    }
    actualizar(){
        if(this.enemigosCreacion == null){
            this.enemigosCreacion = 0;
        }
        this.enemigosCreacion --;
        if(this.enemigosCreacion < 0){
            let randomY = this.generarAleatorioAltoPantalla();
            let enemigoNuevo = new Enemigo(480,randomY);
            this.enemigosCreacion = 50;
            this.enemigos.push(enemigoNuevo);
        }
        for(let index = 0; index < this.disparosJugador.length; index++){
            if(this.disparosJugador[index].x > 500){
                this.disparosJugador.splice(index,1);
                //console.log("Disparo eliminado");
            }
        }
        for(let index = 0; index < this.enemigos.length; index++){
            if(this.enemigos[index].x < -50){
                this.enemigos.splice(index,1);
                this.contador_ovnis++;
                //console.log("OVNI eliminado");
                if(this.contador_ovnis >= 5){
                    //console.log("el if va bien");
                    this.fondo.cambiarFondo(imagenes.game_over);
                    this.gameover = true;
                    this.contador_ovnis = 0;
                }
            }
        }
        this.jugador.actualizar();

        for(let index = 0; index < this.enemigos.length;index++){
            this.enemigos[index].actualizar();
        }
        if (!this.gameover){
            for(let index = 0; index < this.enemigos.length; index++){
                if(this.jugador.colisiona(this.enemigos[index])){
                    this.fondo.cambiarFondo(imagenes.game_over);
                    this.gameover = true;
                    pararMusica();
                    reproducirEfecto(efectos.gameover);
                    this.contador_ovnis = 0;
                }
            }
        }
        for(let index = 0; index < this.disparosJugador.length;index++){
            this.disparosJugador[index].actualizar();
        }
        for(let index = 0; index < this.enemigos.length;index++){
            for(let index2 = 0; index2 < this.disparosJugador.length;index2++){
                if(this.enemigos[index].colisiona(this.disparosJugador[index2])){
                    //console.log(this.enemigos[index].colisiona(this.disparosJugador[index2]));
                    this.ovnis_matados++;
                    reproducirEfecto(efectos.explosion);
                    this.ovnis20++;
                    this.puntos.valor = this.ovnis_matados;
                    this.enemigos.splice(index,1);
                    if(this.ovnis20 == 20){
                        this.estrellas.push(new Fondo(imagenes.icono_puntos, this.posicion[0], this.posicion[1]));
                        this.posicion[0] += 480 * 0.05;
                        this.ovnis20 = 0;
                    }
                    
                    this.disparosJugador.splice(index2,1);
                    index --;
                    index2 --;
                }
            }
        }
    }
    dibujar(){
        this.fondo.dibujar();
        if(!this.gameover){
            this.jugador.dibujar();
            for(let index = 0; index < this.enemigos.length; index++){
                this.enemigos[index].dibujar();
            }
            for(let index = 0; index < this.disparosJugador.length;index++){
                this.disparosJugador[index].dibujar();
            }
            this.puntos.dibujar();
            for(let index = 0; index < this.estrellas.length; index++){
                this.estrellas[index].dibujar();
            }
        }
    }
    procesarControles(){
        //disparar
        if(controles.disparo){
            let nuevoDisparo = this.jugador.disparar();
            console.log("disparando" + nuevoDisparo);
            if(nuevoDisparo != null){
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
            //console.log("mover arriba");
            this.jugador.moverY(-1);
        }
        else if(controles.moverY < 0){
            //console.log("mover abajo");
            this.jugador.moverY(1);
        }else{
            this.jugador.moverY(0);
        }
    }
    generarAleatorioAltoPantalla(){
        let random = Math.random();
        let numeroGenerado = 308 * random;
        console.log(numeroGenerado);
        return numeroGenerado;
    }
}