class Modelo{
    constructor(imagenRuta, x, y){
        this.imagen = cache[imagenRuta];
        this.x = x;
        this.y = y;
        this.ancho = this.imagen.width;
        this.alto = this.imagen.height;
    }
    dibujar(){
        contexto.drawImage(this.imagen, this.x - this.ancho / 2, this.y - this.alto / 2)
    }
}