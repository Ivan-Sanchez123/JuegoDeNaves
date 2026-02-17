class Jugador extends Modelo{
    constructor(x,y){
        super(imagenes.jugador , x, y);
        this.vx = 0;//velocidad x
        this.vy = 0;//velocidad y
        this.velocity = 3.0;
    }
    actualizar(){
        this.x = this.x + this.vx * this.velocity;
        this.y = this.y + this.vy * this.velocity;
    }
    moverX(direccion){
        this.vx = direccion;
    }
    moverY(direccion){
        this.vy = direccion;
    }
}