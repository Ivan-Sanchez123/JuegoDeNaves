class Jugador extends Modelo{
    constructor(x,y){
        super(imagenes.jugador , x, y);
        this.vx = 0;//velocidad x
        this.vy = 0;//velocidad y
        this.velocity = 5.0;
        this.orientacion = orientaciones.derecha;

        this.cadenciaDisparo = 10;
        this.tiempoDisparo = 0;

        this.aIdleDerecha = new Animacion(imagenes.jugador_idle_derecha, this.ancho, this.alto, 6, 8);
        this.aIdleIzquierda = new Animacion(imagenes.jugador_idle_izquierda, this.ancho, this.alto, 6, 8);
        this.aCorriendoDerecha = new Animacion(imagenes.jugador_corriendo_derecha, this.ancho, this.alto, 6, 8);
        this.aCorriendoIzquierda = new Animacion(imagenes.jugador_corriendo_izquierda, this.ancho, this.alto, 6, 8);
        this.aDispararDerecha = new Animacion(imagenes.jugador_disparando_derecha, this.ancho, this.alto, 6, 4, this.finAnimacionDisparar.bind(this));
        this.aDispararIzquierda = new Animacion(imagenes.jugador_disparando_izquierda, this.ancho, this.alto, 6, 4, this.finAnimacionDisparar.bind(this));

        this.animacion = this.aIdleDerecha;
        this.estado = estados.movimiento;
    }
    actualizar(){
        this.animacion.actualizar();
        /*if(this.vx > 0){
            this.animacion = this.aCorriendoDerecha;
            this.orientacion = orientaciones.derecha;
        }
        if(this.vx < 0){
            this.animacion = this.aCorriendoIzquierda;
            this.orientacion = orientaciones.izquierda;
        }
        if(this.vx == 0){
            if(this.orientacion == orientaciones.derecha){
                this.animacion = this.aIdleDerecha;
            }else if(this.orientacion == orientaciones.izquierda){
                this.animacion = this.aIdleIzquierda;
            }
        }*/
        switch(this.estado){
            case estados.movimiento:
                if(this.vx > 0){
                    this.animacion = this.aCorriendoDerecha;
                    this.orientacion = orientaciones.derecha;
                }
                if(this.vx < 0){
                    this.animacion = this.aCorriendoIzquierda;
                    this.orientacion = orientaciones.izquierda;
                }
                if(this.vx == 0){
                    if(this.orientacion == orientaciones.derecha){
                        this.animacion = this.aIdleDerecha;
                    }else if(this.orientacion == orientaciones.izquierda){
                        this.animacion = this.aIdleIzquierda;
                    }
                }
                        break;
            case estados.disparando:
                if(this.orientacion == orientaciones.derecha){
                    this.animacion = this.aDispararDerecha;
                }else if(this.orientacion == orientaciones.izquierda){
                    this.animacion = this.aDispararIzquierda;
                }
                break;
        }
        
        this.x = this.x + this.vx * this.velocity;
        this.y = this.y + this.vy * this.velocity;
        if(this.tiempoDisparo > 0){
            this.tiempoDisparo --;
        }
        /*console.log("Posicion en x de la nave = " + this.x);
        console.log("Posicion en y de la nave = " + this.y);
        */
    }
    dibujar(){
        this.animacion.dibujar(this.x, this.y);
    }
    moverX(direccion){
        this.vx = direccion;
    }
    moverY(direccion){
        this.vy = direccion;
    }
    disparar(){
        if(this.tiempoDisparo == 0){
            this.estado = estados.disparando;
            reproducirEfecto(efectos.disparo);
            this.tiempoDisparo = this.cadenciaDisparo;
            var disparo = new disparo_jugador(this.x + 33,this.y);
            if(this.orientacion == orientaciones.derecha){
                    disparo.vx *= 1;
                }else if(this.orientacion == orientaciones.izquierda){
                    disparo.vx *= -1;
                }
            return disparo;
        }else{
            return null;
        }
    }
    finAnimacionDisparar(){
        this.estado = estados.movimiento;
    }
}