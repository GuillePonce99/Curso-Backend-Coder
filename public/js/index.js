
const socket = io() 

let user;

Swal.fire({
    title: 'Ingrese un nombre',
    input: 'text',
    inputAttributes: {
      autocapitalize: 'off'
    },
    showCancelButton: false,
    confirmButtonText: 'Look up',
    allowOutsideClick: false,
    inputValidator: (value) => {
        if (!value) {
            return 'Necesitas ingresar un nombre!'
        }
    }
}).then((result)=>{
    if(result.value){
        user = result.value
        socket.emit("nuevo_usuario",{user : user, id: socket.id})
    }
})