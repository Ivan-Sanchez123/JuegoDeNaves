class Fondo extends Modelo {
    constructor(rutaImagen, x, y){
        super(rutaImagen, x, y);
    };
    cambiarFondo(rutaImagen){
        this.imagen = cache[rutaImagen];
        this.ancho = this.imagen.width;
        this.alto = this.imagen.height;
        console.log("game over");
    }
};