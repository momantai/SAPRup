const electron = require('electron')
const remote = electron.remote
const co = require("../js/connection.js")
const connection = co.conect

//Cerrar ventana
function closewindow (){
    var win = remote.getCurrentWindow()
    win.close()
}

//Función para obtener los valores que han sido enviados por medio de la url.
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function title(valor) {
    var a = document.getElementById("title")
    a.innerText += valor
}
//title(getParameterByName("title"))

//Función para comprobar los datos con la base de datos y proceder al borrado.
function comproba(v) {
    q = "SELECT password FROM projectInfo WHERE idprojectInfo = "+getParameterByName("id")+";"
    connection.query(q, (err, rows, fields) => {
        if(rows[0].password == v){
            q = "DELETE FROM projectInfo WHERE idprojectInfo = "+getParameterByName("id")+"";
            connection.query(q, (err, rows, col) => {
                if(!err) alert("¡Eliminado correctamente!")
                closewindow()
            })
        } else {
            alert("¡Contraseña erronea!")
        }
    })
}

d = document.getElementById("deleteproj")
//Evento para enviar datos
d.addEventListener('click', (event)=>{
    v = document.getElementById("passproject").value
    comproba(v)
})

e = document.getElementById("passproject")
e.addEventListener('keyup', (event)=>{
    event.preventDefault()
    if(event.keyCode === 13) {
        document.getElementById("deleteproj").click()
    }
})

c = document.getElementById("cancel")
c.addEventListener('click', (event)=> {
    closewindow()
})