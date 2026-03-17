class Enemigo extends Modelo {
    constructor(x, y){
        super(imagenes.enemigo, x, y);
        this.vx = -1.5;
        this.vy = 0;
        this.velocity = 2.0;
    };
    actualizar(){
        /*  if(this.x + this.ancho / 2 >= 480 || this.x - this.ancho / 2 <= 0){
                this.vx = this.vx * -1;  */
        this.x = this.x + this.vx * this.velocity;
    }
};