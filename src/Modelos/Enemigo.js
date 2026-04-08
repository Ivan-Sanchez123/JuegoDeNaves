class Enemigo extends Modelo {
    constructor(x, y){
        super(imagenes.enemigo, x, y);

        this.aMover = new Animacion(imagenes.enemigo_movimiento, this.ancho, this.alto, 6, 3);
        this.animacion = this.aMover
        this.vx = -1.5;
        this.vy = 0;
        this.velocity = 2.0;
    };
    actualizar(){
        this.animacion.actualizar();
        /*  if(this.x + this.ancho / 2 >= 480 || this.x - this.ancho / 2 <= 0){
                this.vx = this.vx * -1;  */
        this.x = this.x + this.vx * this.velocity;
    }
    dibujar(){
        this.animacion.dibujar(this.x, this.y);
    }

};