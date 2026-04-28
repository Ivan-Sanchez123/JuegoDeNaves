class Enemigo extends Modelo {
    constructor(x, y){
        super(imagenes.enemigo, x, y);

        this.aMover = new Animacion(imagenes.enemigo_movimiento, this.ancho, this.alto, 6, 3);
        this.animacion = this.aMover;
        this.estado = estados.movimiento;
        this.aMorir = new Animacion(imagenes.enemigo_morir, this.ancho, this.alto, 6, 8, this.finAnimacionMorir.bind(this));
        this.vx = -1.5;
        this.vy = 0;
        this.velocity = 2.0;
    };
    actualizar(){
        this.animacion.actualizar();
        switch(this.estado){
            case estados.movimiento:
                this.animacion = this.aMover;
                break;
            case estados.muriendo:
                this.animacion = this.aMorir;
                break;
        }
        /*  if(this.x + this.ancho / 2 >= 480 || this.x - this.ancho / 2 <= 0){
                this.vx = this.vx * -1;  */
        this.x = this.x + this.vx * this.velocity;
    }
    dibujar(){
        this.animacion.dibujar(this.x, this.y);
    }
    finAnimacionMorir(){
        this.estado = estados.muerto;
    }
    

};