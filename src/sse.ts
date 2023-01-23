
let URL: string = import.meta.env.VITE_URL
const serverSendEvent = new EventSource(`${URL}/api/v1/notificacion/subcribir`);
serverSendEvent.addEventListener('NUEVOS_MENSAJES_USUARIOS', (event) => {
    console.log(event.data);
})