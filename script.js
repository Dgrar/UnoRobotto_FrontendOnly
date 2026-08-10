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