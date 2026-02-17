class GameLayer extends Layer {
    constructor(){
        super();
        this.iniciar();
    }
    iniciar(){
        this.jugador = new Jugador(50,50);
        this.fondo = new Fondo(imagenes.fondo, 480*0.5, 320*0.5);

        this.enemigos = [];
        this.enemigos.push(new Enemigo(300,50));
        this.enemigos.push(new Enemigo(350, 200));
    }
    actualizar(){
        this.jugador.actualizar();
        for(let index = 0; index < this.enemigos.length;index++){
            this.enemigos[index].actualizar();
        }
    }
    dibujar(){
        this.fondo.dibujar();
        this.jugador.dibujar();
        for(let index = 0; index < this.enemigos.length; index++){
            this.enemigos[index].dibujar();
        }
    }
    procesarControles(){
        //disparar
        if(controles.disparo){
            console.log("disparando");
        }
        
        //eje x
        if(controles.moverX > 0){
            console.log("mover derecha");
            this.jugador.moverX(1);
        }
        else if(controles.moverX < 0){
            console.log("mover izquierda");
            this.jugador.moverX(-1);
        }
        else{
            this.jugador.moverX(0);
        }

        //eje y
        if(controles.moverY > 0){
            console.log("mover arriba");
            this.jugador.moverY(-1);
        }
        else if(controles.moverY < 0){
            console.log("mover abajo");
            this.jugador.moverY(1);
        }else{
            this.jugador.moverY(0);
        }
    }
}