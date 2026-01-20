
const key = "reservas";

export function saveReservas(reservas){
    localStorage.setItem(key, JSON.stringify(reservas));

}

export function loadReservas(){
    return JSON.parse(localStorage.getItem(key))||[];
}
