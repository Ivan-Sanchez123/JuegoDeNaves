class Jugador extends Modelo{
    constructor(x,y){
        super(imagenes.jugador , x, y);
        this.vx = 0;//velocidad x
        this.vy = 0;//velocidad y
        this.velocity = 3.0;
        this.cadenciaDisparo = 15;
        this.tiempoDisparo = 0;
    }
    actualizar(){
        this.x = this.x + this.vx * this.velocity;
        this.y = this.y + this.vy * this.velocity;
        if(this.tiempoDisparo > 0){
            this.tiempoDisparo --;
        }
        /*console.log("Posicion en x de la nave = " + this.x);
        console.log("Posicion en y de la nave = " + this.y);
        */
    }
    moverX(direccion){
        this.vx = direccion;
    }
    moverY(direccion){
        this.vy = direccion;
    }
    disparar(){
        if(this.tiempoDisparo == 0){
            this.tiempoDisparo = this.cadenciaDisparo;
            return new disparo_jugador(this.x + 33,this.y);
        }else{
            return null;
        }
    }
}