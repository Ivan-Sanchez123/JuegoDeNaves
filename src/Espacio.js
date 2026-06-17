class Espacio{
    constructor(gravedad){
        this.gravedad = gravedad;
        this.dinamicos = [];
        this.estaticos = [];
    }


    actualizar(){
    for( var i=0; i < this.dinamicos.length; i++){

        this.dinamicos[i].vy = this.dinamicos[i].vy + this.gravedad;

        if (this.dinamicos[i].vy > 20) {
            this.dinamicos[i].vy = 20;
        }

        // reiniciar choques
        this.dinamicos[i].choqueAbajo = false;
        
        // reiniciar fuera
        this.dinamicos[i].fueraPorDerecha = true;
        this.dinamicos[i].fueraPorIzquierda = true;

        
        this.moverDerecha(i);
        this.moverIzquierda(i);
        this.moverArriba(i);
        this.moverAbajo(i);
    }
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


    
moverArriba(i){
    if ( this.dinamicos[i].vy < 0){
        var movimientoPosible = this.dinamicos[i].vy;

        for(var j=0; j < this.estaticos.length; j++){
            var arribaDinamico
                = this.dinamicos[i].y - this.dinamicos[i].alto/2;
            var abajoDinamico
                = this.dinamicos[i].y + this.dinamicos[i].alto/2;
            var derechaDinamico
                = this.dinamicos[i].x + this.dinamicos[i].ancho/2;
            var izquierdaDinamico
                = this.dinamicos[i].x - this.dinamicos[i].ancho/2;
            var arribaEstatico
                = this.estaticos[j].y - this.estaticos[j].alto/2;
            var abajoEstatico
                = this.estaticos[j].y + this.estaticos[j].alto/2;
            var derechaEstatico
                = this.estaticos[j].x + this.estaticos[j].ancho/2;
            var izquierdaEstatico
                = this.estaticos[j].x - this.estaticos[j].ancho/2;

            if ( (arribaDinamico +  this.dinamicos[i].vy) <= 
            	abajoEstatico 
            	&& abajoDinamico > arribaEstatico
                && izquierdaDinamico < derechaEstatico
                && derechaDinamico > izquierdaEstatico ){

                if (movimientoPosible <= 
                	abajoEstatico - arribaDinamico ){

                    movimientoPosible = 
                    	abajoEstatico - arribaDinamico;
                }

            }
        }

        this.dinamicos[i].y = 
        	  this.dinamicos[i].y + movimientoPosible;
        this.dinamicos[i].vy = movimientoPosible;
    }
}
 



moverAbajo(i){
    if ( this.dinamicos[i].vy > 0){
        var movimientoPosible = this.dinamicos[i].vy;

        for(var j=0; j < this.estaticos.length; j++){
            var arribaDinamico
                = this.dinamicos[i].y - this.dinamicos[i].alto/2;
            var abajoDinamico
                = this.dinamicos[i].y + this.dinamicos[i].alto/2;
            var derechaDinamico
                = this.dinamicos[i].x + this.dinamicos[i].ancho/2;
            var izquierdaDinamico
                = this.dinamicos[i].x - this.dinamicos[i].ancho/2;
            var arribaEstatico
                = this.estaticos[j].y - this.estaticos[j].alto/2;
            var abajoEstatico
                = this.estaticos[j].y + this.estaticos[j].alto/2;
            var derechaEstatico
                = this.estaticos[j].x + this.estaticos[j].ancho/2;
            var izquierdaEstatico
                = this.estaticos[j].x - this.estaticos[j].ancho/2;

            if ( (abajoDinamico +  this.dinamicos[i].vy) >= 
            	arribaEstatico &&
                arribaDinamico < abajoEstatico
                && izquierdaDinamico < derechaEstatico
                && derechaDinamico > izquierdaEstatico ){



                if (movimientoPosible 
                		>= arribaEstatico - abajoDinamico ){
                    // La distancia es MENOR que movimiento posible
                    // actualizar el movimiento posible a uno menor
                    movimientoPosible = 
                    	arribaEstatico - abajoDinamico ;
                    this.dinamicos[i].choqueAbajo = true;
                    
                    if (izquierdaDinamico >= izquierdaEstatico) {
                        this.dinamicos[i].fueraPorIzquierda = false;
                    }

                    if (derechaDinamico <= derechaEstatico) {
                        this.dinamicos[i].fueraPorDerecha = false;
                    }


                }
            }
        }

        this.dinamicos[i].y = 
        	  this.dinamicos[i].y + movimientoPosible;
        this.dinamicos[i].vy = movimientoPosible;
    }
}



moverDerecha(i){
    if ( this.dinamicos[i].vx > 0){
        var movimientoPosible = this.dinamicos[i].vx;

        


        for(var j=0; j < this.estaticos.length; j++){
            var derechaDinamico
                = this.dinamicos[i].x + this.dinamicos[i].ancho/2;
            var arribaDinamico
                = this.dinamicos[i].y - this.dinamicos[i].alto/2;
            var abajoDinamico
                = this.dinamicos[i].y + this.dinamicos[i].alto/2;
            var izquierdaEstatico
                = this.estaticos[j].x - this.estaticos[j].ancho/2;
            var arribaEstatico
                = this.estaticos[j].y - this.estaticos[j].alto/2;
            var abajoEstatico
                = this.estaticos[j].y + this.estaticos[j].alto/2;


            if ( (derechaDinamico + this.dinamicos[i].vx) 
            		>= izquierdaEstatico
                && derechaDinamico <= izquierdaEstatico
                && arribaEstatico < abajoDinamico
                && abajoEstatico > arribaDinamico){

                if (movimientoPosible 
                		>= izquierdaEstatico - derechaDinamico){

                    movimientoPosible = 
                    	izquierdaEstatico - derechaDinamico ;
                }

            }

        }
        this.dinamicos[i].x = 
        	this.dinamicos[i].x + movimientoPosible;
        this.dinamicos[i].vx = movimientoPosible;
    }
}




    /*
    moverDerecha(i){
        if(this.dinamicos[i].vx > 0){

            var movimientoPosible = this.dinamicos[i].vx;
            for(let j = 0; j < this.estaticos.length; j++){
                
                //TO FIX THIS






                var derechaDinamico = this.dinamicos[i].x + this.dinamicos[i].ancho/2;
                var arribaDinamico = this.dinamicos[i].y - this.dinamicos[i].alto/2;
                var abajoDinamico = this.dinamicos[i].y + this.dinamicos[i].alto/2;

                var izquierdaEstatico = this.estaticos[j].x - this.estaticos[j].ancho/2;
                var arribaEstatico = this.estaticos[j].y - this.estaticos[j].ancho/2;
                var abajoEstatico = this.estaticos[j].y + this.estaticos[j].ancho/2;
                
                if((derechaDinamico + this.dinamicos[i].vx) >= izquierdaEstatico &&
                    derechaDinamico <= izquierdaEstatico
                    && arribaEstatico < abajoDinamico
                    && abajoEstatico > arribaDinamico){
                        if(movimientoPosible >= izquierdaEstatico - derechaDinamico){
                            movimientoPosible = izquierdaEstatico - derechaDinamico;
                        }
                }else{
                    console.log("Hay algo delante...");
                }
                console.log("movimientoPosible: " + movimientoPosible);
                this.dinamicos[i].x = this.dinamicos[i].x + movimientoPosible;
                this.dinamicos[i].vx = movimientoPosible;

            }
            
        }
    }
        */
    moverIzquierda(i){
        if(this.dinamicos[i].vx < 0){
            var movimientoPosible = this.dinamicos[i].vx;
            for(let j = 0; j < this.estaticos.length; j++){

            var izquierdaDinamico
	            = this.dinamicos[i].x - this.dinamicos[i].ancho/2;
	        var arribaDinamico
	            = this.dinamicos[i].y - this.dinamicos[i].alto/2;
	        var abajoDinamico
	            = this.dinamicos[i].y + this.dinamicos[i].alto/2;
	        var derechaEstatico
	            = this.estaticos[j].x + this.estaticos[j].ancho/2;
	        var arribaEstatico
	            = this.estaticos[j].y - this.estaticos[j].alto/2;
	        var abajoEstatico
	            = this.estaticos[j].y + this.estaticos[j].alto/2;

            if ( (izquierdaDinamico + this.dinamicos[i].vx) <= 
	        	derechaEstatico
	            && izquierdaDinamico >= derechaEstatico
	            && arribaEstatico < abajoDinamico
	            && abajoEstatico > arribaDinamico ){


	            if (movimientoPosible <= 
	            	derechaEstatico - izquierdaDinamico ){

	                movimientoPosible = 
	                	derechaEstatico - izquierdaDinamico ;
	            }
	        }
        }

	    this.dinamicos[i].x = 
	    	this.dinamicos[i].x + movimientoPosible;
	    this.dinamicos[i].vx = movimientoPosible;
            
        }
    }

    
}
