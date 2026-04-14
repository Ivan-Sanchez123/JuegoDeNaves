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

        this.animacion = this.aIdleDerecha;
    }
    actualizar(){
        this.animacion.actualizar();
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
            }else{
                console.log("Algo va muy mal porque el else if va mal y lo has programado mal porque no sabes hacer juegos");
            }
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
            reproducirEfecto(efectos.disparo);
            this.tiempoDisparo = this.cadenciaDisparo;
            return new disparo_jugador(this.x + 33,this.y);
        }else{
            return null;
        }
    }
}