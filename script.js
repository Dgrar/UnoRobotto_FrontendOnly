function changeScreens(selectorDesaparece, selectorAparece) {
    const desaparece = document.querySelector(selectorDesaparece);
    const aparece = document.querySelector(selectorAparece);

    if (!desaparece || !aparece) return console.error("No se encontraron los elementos");

    desaparece.classList.add("hidden");
    
    desaparece.addEventListener("animationend", () => {
        aparece.classList.remove("start-hidden");
        desaparece.classList.add("start-hidden")
    });
}

function getNames(num){
    for (let i =1; i<=num; i++){
        let input = document.createElement("input")
        input.type = "text"
        input.name = i
        input.className = "player-name-input"
        input.placeholder = `Jugador ${i}`
        input.maxLength = 16
        input.autocomplete = "off"
        const container = document.querySelector(".playerNames")

        container.appendChild(input)
    }
}

function playerNames(num){
    changeScreens('.player-count', '.player-names')
    getNames(num)
}

let names = []

function tryStart(){
    inputs = document.querySelectorAll(".player-name-input")
    names = []
    for (const input of inputs){
        const name = input.value.trim()
        if (name === ""){
            alert(`Introduce el nombre del jugador número ${input.name}`)
            return
        }
        names.push(name)
    }
    changeScreens(".player-names", ".game")

}

const events = {
    // s representa una opción cualquiera
    "Confusíon de cartas": {
        "descripción": "Cambiad todas vuestras cartas",
        "afectados": 2,
        "opciones": []
    },
    "Discriminación textil": {
        "descripción": "Descarta todas tus cartas s",
        "afectados": 1,
        "opciones": ["Rojas", "Verdes", "Amarillas", "Azules", "Comodines", "Impares", "Pares"]
    },
    "Búsqueda obsesiva": {
        "descripción": "Roba cartas hasta que te salga una s",
        "afectados": 1,
        "opciones": ["Roja", "Verde", "Amarilla", "Azul"]
    },
    "Trueque": {
        "descripción": "Intercambiad s de vuestras cartas",
        "afectados": 2,
        "opciones": [1, 2, 3]
    },
    "Regalo obligado": {
        "descripción": "Elige a un rival y regálale s de tus cartas",
        "afectados": 1,
        "opciones": [1, 2, 3]
    },
    "Impuesto de juego": {
        "descripción": "Todos los jugadores deben robar s cartas excepto tú",
        "afectados": 1,
        "opciones": [1, 2, 3]
    },
    "Ruleta numérica": {
        "descripción": "Descarta todas tus cartas que tengan el número s",
        "afectados": 1,
        "opciones": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    },
    "Manos limpias": {
        "descripción": "Muestra todas tus cartas a los demás jugadores si tienes s cartas o más",
        "afectados": 1,
        "opciones": [5, 6, 7, 8]
    },
    "Comodín Escondido": {
        "descripción": "El color en juego cambia inmediatamente a s",
        "afectados": 0,
        "opciones": ["Rojo", "Verde", "Amarillo", "Azul"]
    }
}

function chooseEvent() {
  const eventos = Object.keys(events);
  const nombreAzar = eventos[Math.floor(Math.random() * eventos.length)];
  const eventoOriginal = events[nombreAzar];
  
  let Evento = { ...eventoOriginal, nombre: nombreAzar };
  
  if (Evento.opciones && Evento.opciones.length > 0) {
    const chosenIndex = Math.floor(Math.random() * Evento.opciones.length);
    const chosenOption = Evento.opciones[chosenIndex];
    Evento.descripción = Evento.descripción.replace(/\bs\b/, chosenOption);
  }
  
  return Evento;
}

function randomSample(arr, size) {

  let shuffled = arr.slice(0); 
  let i = arr.length;
  let min = i - size;
  
  if (size > i) return shuffled; 

  while (i-- > min) {
    let index = Math.floor((i + 1) * Math.random());
    let temp = shuffled[index];
    shuffled[index] = shuffled[i];
    shuffled[i] = temp;
  }
  return shuffled.slice(min);
}

function playTurn(){
    if (Math.random() < .15){
        const event_chosen = chooseEvent()
        const afectados = randomSample(names,event_chosen.afectados)
        const turno = names[Math.floor(Math.random() * names.length)]
        const TrueEvent = {
            "name": event_chosen.nombre,
            "description": event_chosen.descripción,
            "afectados": afectados,
            "Juega": turno
        }
        console.log(TrueEvent)
    }
}
