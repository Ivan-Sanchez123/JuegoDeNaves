class Espacio{
    constructor(gravedad){
        this.gravedad = gravedad;
        this.dinamicos = [];
        this.estaticos = [];
    }

    agregarCuerpoDinamico(modelo){
        this.dinamicos.push(modelo);
    }
    agregarCuerpoEstatico(modelo){
        this.estaticos.push(modelo);
    }
    eliminarCuerpoDinamico(modelo){
        for(var i = 0; i < this.dinamicos.length; i++){
            if(this.dinamicos[i] == modelo){
                this.dinamicos.splice(i,1);
            }
        }
    }
    eliminarCuerpoEstatico(modelo){
        for(var i = 0; i < this.estaticos.length; i++){
            if(this.estaticos[i] == modelo){
                this.estaticos.splice(i, 1);
            }
        }
    }
    actualizar(){
        for(var i = 0; i < this.dinamicos.length; i++){
            this.dinamicos[i].vy = this.dinamicos[i].vy + this.gravedad;
            if(this.dinamicos[i].vy > 20){
                this.dinamicos[i].vy = 20;
            }
            this.moverDerecha(i);
            this.moverIzquierda(i);
        }
    }
    moverDerecha(i){
        if(this.dinamicos[i].vx > 0){

            var movimientoPosible = this.dinamicos[i].vx;
            console.log("mover derecha");
            console.trace();
            for(let j = 0; j < this.estaticos.length; j++){
                var derechaDinamico = this.dinamicos[i].x + this.dinamicos[i].ancho/2;
                var arribaDinamico = this.dinamicos[i].y + this.dinamicos[i].alto/2;
                var abajoDinamico = this.dinamicos[i].y - this.dinamicos[i].alto/2;
                var izquierdaDinamico = this.dinamicos[i].x - this.dinamicos[i].ancho/2;

                var izquierdaEstatico = this.estaticos[j].x - this.estaticos[j].ancho/2;
                var arribaEstatico = this.estaticos[j].x + this.estaticos[j].ancho/2;
                var abajoEstatico = this.estaticos[j].x - this.estaticos[j].ancho/2;
                var derechaEstatico = this.estaticos[j].x + this.estaticos[j].ancho/2;
                if((derechaDinamico + this.dinamicos[i].vx) >= izquierdaEstatico &&
                    derechaDinamico <= izquierdaEstatico
                    && arribaEstatico < abajoDinamico
                    && abajoEstatico > arribaDinamico){
                        if(movimientoPosible >= izquierdaEstatico - derechaDinamico){
                            movimientoPosible = izquierdaEstatico - derechaDinamico;
                        }
                }
                this.dinamicos[i].x = this.dinamicos[i].x + movimientoPosible;
                this.dinamicos[i].vx = movimientoPosible;
                console.log("Cambiando velocidad en x...")

            }
            
        }
    }
    moverIzquierda(i){
        if(this.dinamicos[i].vx < 0){
            console.log("Mover izquierda");
            console.trace();
            var movimientoPosible = this.dinamicos[i].vx;
            for(let j = 0; j < this.estaticos.length; j++){
                var derechaDinamico = this.dinamicos[i].x + this.dinamicos[i].ancho/2;
                var arribaDinamico = this.dinamicos[i].y + this.dinamicos[i].alto/2;
                var abajoDinamico = this.dinamicos[i].y - this.dinamicos[i].alto/2;
                var izquierdaDinamico = this.dinamicos[i].x - this.dinamicos[i].ancho/2;

                var izquierdaEstatico = this.estaticos[j].x - this.estaticos[j].ancho/2;
                var arribaEstatico = this.estaticos[j].x + this.estaticos[j].ancho/2;
                var abajoEstatico = this.estaticos[j].x - this.estaticos[j].ancho/2;
                var derechaEstatico = this.estaticos[j].x + this.estaticos[j].ancho/2;
                if((derechaDinamico + this.dinamicos[i].vx) >= izquierdaEstatico &&
                    derechaDinamico <= izquierdaEstatico
                    && arribaEstatico < abajoDinamico
                    && abajoEstatico > arribaDinamico){
                        if(movimientoPosible >= izquierdaEstatico - derechaDinamico){
                            movimientoPosible = izquierdaEstatico - derechaDinamico;
                        }
                }
                this.dinamicos[i].x = this.dinamicos[i].x + movimientoPosible;
                this.dinamicos[i].vx = movimientoPosible;

            }
            
        }
    }
}
