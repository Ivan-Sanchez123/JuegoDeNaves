class Animacion {
    constructor(imagenSrc, modeloAncho, modeloAlto, velocidadRefresco, framesTotales){
        this.imagen = cache[imagenSrc];
        this.modeloAncho = modeloAncho;
        this.modeloAlto = modeloAlto;

        this.velocidadRefresco = velocidadRefresco;
        this.framesTotales = framesTotales;

        this.frameActual = 0;
        this.frameAncho = this.imagen.width / this.framesTotales;
        this.frameAlto = this.imagen.height;

        this.rectanguloDibujo = {};

        this.rectanguloDibujo.x = 0;
        this.rectanguloDibujo.y = 0;
        this.rectanguloDibujo.ancho = this.frameAncho;
        this.rectanguloDibujo.alto = this.frameAlto;

        this.ultimaActualizacion = 0;
    }
    actualizar(){
        this.ultimaActualizacion ++;
        if(this.ultimaActualizacion > this.velocidadRefresco){
            this.ultimaActualizacion = 0;
            console.log(this.ultimaActualizacion);
            this.frameActual ++;
            if(this.frameActual >= this.framesTotales){
                this.frameActual = 0;
            }
        }
        this.rectanguloDibujo.x = this.frameActual * this.frameAncho;
    }

    dibujar(x,y){ 
        contexto.drawImage(
            this.imagen,
            this.rectanguloDibujo.x,
            this.rectanguloDibujo.y,
            this.rectanguloDibujo.ancho,
            this.rectanguloDibujo.alto,
            x - this.modeloAncho / 2,
            y - this.modeloAlto / 2,
            this.modeloAncho,
            this.modeloAlto
        );

        
    }
}