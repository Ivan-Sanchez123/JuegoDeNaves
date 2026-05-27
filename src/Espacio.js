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
        }
    }
}