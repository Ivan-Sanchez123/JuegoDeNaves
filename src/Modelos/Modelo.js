class Modelo{
    constructor(imagenRuta, x, y){
        this.imagen = cache[imagenRuta];
        this.x = x;
        this.y = y;
        this.ancho = this.imagen.width;
        this.alto = this.imagen.height;
    }
    dibujar(scrollX){
        scrollX = scrollX || 0;
        contexto.drawImage(this.imagen, this.x - this.ancho / 2 - scrollX, this.y - this.alto / 2);
    }

    colisiona(modelo){
        var colisiona = false;
        let lado_derecho_este = this.x + this.ancho / 3;
        let lado_izquierdo_este = this.x - this.ancho / 3;
        let lado_arriba_este = this.y - this.alto / 3;
        let lado_abajo_este = this.y + this.alto / 3;
        let lado_derecho_otro = modelo.x + modelo.ancho / 3;
        let lado_izquierdo_otro = modelo.x - modelo.ancho / 3;
        let lado_arriba_otro = modelo.y - modelo.alto / 3;
        let lado_abajo_otro = modelo.y + modelo.alto / 3;
        if(lado_derecho_este >= lado_izquierdo_otro
            && lado_arriba_este <= lado_abajo_otro
            && lado_abajo_este >= lado_arriba_otro
            && lado_izquierdo_este <= lado_derecho_otro
        ){
                colisiona = true;
            }
            return colisiona;
    }
    estaEnPantalla(){
        if((this.x - GameLayer.scrollX) - this.ancho / 2 <= 480 && (this.x - GameLayer.scrollX) - this.ancho / 2 >= 0 && this.y - this.alto / 2 <= 320 && this.y + this.alto / 2 >= 0){
            return true;
        }
        
        return false;
    }
}