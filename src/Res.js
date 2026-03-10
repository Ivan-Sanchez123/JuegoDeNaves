var cache = [];

var imagenes = {
    jugador: "res/jugador.png",
    fondo: "res/fondo.png",
    enemigo: "res/enemigo.png",
    enemigo_movimiento: "res/enemigo_movimiento.png",
    disparo_jugador: "res/disparo_jugador.png",
    disparo_enemigo: "res/disparo_enemigo.png",
    icono_puntos: "res/icono_puntos.png",
    game_over: "res/game_over.jpg",
};
var rutasImagenes = Object.values(imagenes);
cargarImagenes(0);
function cargarImagenes(i){
    cache[rutasImagenes[i]] = new Image();
    cache[rutasImagenes[i]].src = rutasImagenes[i];
    cache[rutasImagenes[i]].onload = function(){
        if(i < rutasImagenes.length - 1){
            i++;
            cargarImagenes(i);
        }else{
            iniciarJuego();
        };
    };
};