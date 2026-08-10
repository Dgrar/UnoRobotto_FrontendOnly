// Cambiar de pantalla corrigiendo el flujo visual y limpiando eventos
function changeScreens(selectorDesaparece, selectorAparece) {
    const desaparece = document.querySelector(selectorDesaparece);
    const aparece = document.querySelector(selectorAparece);

    if (!desaparece || !aparece) {
    return console.error("No se encontraron los elementos");
    }

    desaparece.classList.add('hidden');

    // Callback que se ejecuta una sola vez al terminar la animación
    const onAnimationEnd = () => {
    desaparece.classList.add('start-hidden');
    aparece.classList.remove('hidden', 'start-hidden');

    // Limpiamos el event listener para evitar duplicados en el futuro
    desaparece.removeEventListener('animationend', onAnimationEnd);
    };

    desaparece.addEventListener('animationend', onAnimationEnd);
}

// Generar inputs de nombres
function getNames(num) {
    const container = document.querySelector('.playerNames');
    if (!container) return console.error("No se encontró el contenedor .playerNames");

    // Limpiar contenedor previo por si se reinicia el juego
    container.innerHTML = ''; 

    for (let i = 1; i <= num; i++) {
    const input = document.createElement('input');
    input.type = 'text';
    input.name = i;
    input.className = 'player-name-input';
    input.placeholder = `Jugador ${i}`;
    input.maxLength = 16;
    input.autocomplete = 'off';
    container.appendChild(input);
    }
}

function playerNames(num) {
    changeScreens('.player-count', '.player-names');
    getNames(num);
}

let names = [];

// Validar e iniciar el juego
function tryStart() {
    const inputs = document.querySelectorAll('.player-name-input');
    names = [];

    for (const input of inputs) {
    const name = input.value.trim();
    if (name === "") {
        alert(`Introduce el nombre del jugador número ${input.name}`);
        return;
    }
    names.push(name);
    }
    changeScreens('.player-names', '.game');
}

// Base de datos de eventos
const events = {
    "Confusíon de cartas": { descripción: "Cambiad todas vuestras cartas", afectados: 2, opciones: [] },
    "Discriminación textil": { descripción: "Descarta todas tus cartas s", afectados: 1, opciones: ["Rojas", "Verdes", "Amarillas", "Azules", "Comodines", "Impares", "Pares"] },
    "Búsqueda obsesiva": { descripción: "Roba cartas hasta que te salga una s", afectados: 1, opciones: ["Roja", "Verde", "Amarilla", "Azul"] },
    "Trueque": { descripción: "Intercambiad s de vuestras cartas", afectados: 2, opciones: [1, 2, 3] },
    "Regalo obligado": { descripción: "Elige a un rival y regálale s de tus cartas", afectados: 1, opciones: [1, 2, 3] },
    "Impuesto de juego": { descripción: "Todos los jugadores deben robar s cartas excepto tú", afectados: 1, opciones: [1, 2, 3] },
    "Ruleta numérica": { descripción: "Descarta todas tus cartas que tengan el número s", afectados: 1, opciones: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] },
    "Manos limpias": { descripción: "Muestra todas tus cartas al resto de jugadores si tienes s cartas o más", afectados: 1, opciones: [5, 6, 7, 8] },
    "Comodín Escondido": { descripción: "El color en juego cambia inmediatamente a s", afectados: 0, opciones: ["Rojo", "Verde", "Amarillo", "Azul"] },
    "Modo agresivo": {descripción: "Habeis entrado en modo agresivo, ahora cada vez que os hagan robar cartas robais el doble", afectados:0,opciones:[]},
    "Tranquilidad": {descripción: "Habeis entrado en modo tranquido, ahora cada vez que os hagan robar cartas, robais la mitad", afectados:0,opciones:[]},
    "Vuelta a la normalidad": {descripción: "Cualquier estado en el que estuvierais se ha detenido, volveis a jugar normal",afectados:0,opciones:[]}
};

// Seleccionar evento aleatorio y reemplazar la 's'
function chooseEvent() {
    const eventos = Object.keys(events);
    const nombreAzar = eventos[Math.floor(Math.random() * eventos.length)];
    const eventoOriginal = events[nombreAzar];

    let Evento = { ...eventoOriginal, nombre: nombreAzar };

    if (Evento.opciones && Evento.opciones.length > 0) {
    const chosenOption = Evento.opciones[Math.floor(Math.random() * Evento.opciones.length)];
    Evento.descripción = Evento.descripción.replace(/\bs\b/, chosenOption);
    }
    return Evento;
}

function randomSample(arr, size) {
    let shuffled = arr.slice(0);
    let i = arr.length;

    const actualSize = size > i ? i : size; 
    let min = i - actualSize;

    while (i-- > min) {
    let index = Math.floor((i + 1) * Math.random());
    let temp = shuffled[index];
    shuffled[index] = shuffled[i];
    shuffled[i] = temp;
    }
    return shuffled.slice(min);
}

let currentMode = "Normal"

let turns = 0
// Ejecutar el turno
function playTurn() {
    turns++
    const turnCounter = document.querySelector(".turns-counter")
    turnCounter.textContent = `Turnos jugados: ${turns}`
    if (Math.random() < 0.15) { // 15% de probabilidad de evento
        const event_chosen = chooseEvent();
        const afectados = randomSample(names, event_chosen.afectados);
        const turno = names[Math.floor(Math.random() * names.length)];

        const TrueEvent = {
            name: event_chosen.nombre,
            description: event_chosen.descripción,
            afectados: afectados,
            Juega: turno
        };
        
        if (TrueEvent.name === currentMode){
            return
        }

        if (TrueEvent.name === "Modo agresivo"){
            const hardIcon = document.querySelector(".fa-user-ninja")
            hardIcon.classList.add("active")
            if (currentMode != "Vuelta a la normalidad"){
                const easyIcon = document.querySelector(".fa-peace")
                easyIcon.classList.remove("active")
                currentMode = "Vuelta a la normalidad"
            }
            currentMode = "Modo agresivo"
        }
        if (TrueEvent.name === "Tranquilidad"){
            const easyIcon = document.querySelector(".fa-peace")
            easyIcon.classList.add("active")
            if (currentMode != "Vuelta a la normalidad"){
                const hardIcon = document.querySelector(".fa-user-ninja")
                hardIcon.classList.remove("active")
                currentMode = "Vuelta a la normalidad"
            }
            currentMode = "Tranquilidad"
        }
        if (TrueEvent.name === "Vuelta a la normalidad"){
            if (currentMode === "agresivo"){
                const hardIcon = document.querySelector(".fa-user-ninja")
                hardIcon.classList.remove("active")
            }
            if (currentMode === "tranquilo"){
                const easyIcon = document.querySelector(".fa-peace")
                easyIcon.classList.remove("active")
                currentMode = "Normal"
            }
            currentMode = "Vuelta a la normalidad"
        }
        showEvent(TrueEvent)
    }
    return null;
}

function showEvent(event){
    const event_name = document.querySelector(".event-name")
    const event_affected = document.querySelector(".event-affected")
    const event_description = document.querySelector(".event-description")
    const next_turn = document.querySelector(".event-turn")

    event_name.textContent = event.name
    if (event.afectados.length === 2){
        event_affected.textContent = `Afectados: ${event.afectados[0]} y ${event.afectados[1]}` 
    }
    else if(event.afectados.length === 1){
        event_affected.textContent = `Afectado: ${event.afectados[0]}` 
    }
    else{
        event_affected.textContent = "Todos"
    }

    event_description.textContent = event.description
    next_turn.textContent = event.Juega

    const container = document.querySelector(".event")
    container.classList.remove("start-hidden", "hidden")
    container.classList.add("appearing")
}

function keepPlaying(){
    const container = document.querySelector(".event")
    container.classList.remove("appearing")
    container.classList.add("hidden")

}