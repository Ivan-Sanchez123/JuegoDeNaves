var teclas = [];
window.addEventListener("keydown", onKeyDown, false);
window.addEventListener("keyup", onKeyUp, false);
function onKeyDown(event){
    var posicion = teclas.indexOf(event.keyCode);
    if (posicion == -1){
        teclas.push(event.keyCode);
        switch (event.keyCode){
            case 32:
                //tecla espaciadora
                controles.disparo = true;
                if(gameLayer.gameover){
                    gameLayer.gameover = false;
                    gameLayer.fondo.cambiarFondo(imagenes.fondo);
                    gameLayer.iniciar();
                }
                break;
            case 37:
                //flecha izq
                controles.moverX = -1;
                break;
            case 38:
                //flecha arriba
                controles.moverY = 1;
                break;
            case 39:
                //flecha derecha
                controles.moverX = 1;
                break;
            case 40:
                //flecha abajo
                controles.moverY = -1;
                break;
            default:
                break;
        };
    };
};
function onKeyUp(event){
    var posicion = teclas.indexOf(event.keyCode);
    teclas.splice(posicion, 1);
    switch (event.keyCode){
            case 32:
                //tecla espaciadora
                controles.disparo = false;
                break;
            case 37:
                //flecha izq
                if(controles.moverX == -1){
                    controles.moverX = 0;
                }
                break;
            case 38:
                //flecha arriba
                if(controles.moverY == 1){
                    controles.moverY = 0;
                }
                break;
            case 39:
                //flecha derecha
                if(controles.moverX == 1){
                    controles.moverX = 0;
                }
                break;
            case 40:
                //flecha abajo
                if(controles.moverY == -1){
                    controles.moverY = 0;
                }
                break;
            default:
                break;
        };
};