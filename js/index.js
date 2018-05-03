const assert = require('assert')
const path = require('path')
const electron = require('electron')
const remote = electron.remote
const BrowserWindow = electron.remote.BrowserWindow
const ipc = electron.ipcRenderer
const co = require("../js/connection.js")

/*Sistema Administrador de Proyectos de Software (basados en la metodología "RUP").*/

/*Clase CRUD para interactuar con la base de datos por medio de la conexión establecida
  globalte, con funciones básicas de CRUD, información que será manejada será datos sobre
  el proyecto sin entrar en el detalle de la documentación sino solo datos de descripción.*/
class CRUDProjectInfo {
    constructor(){

    }
    /*Buscar datos descriptivos.*/
    find(show) {
        connection.query('SELECT idprojectInfo, titleproject, descriptionproject, versionproject FROM projectInfo', (err, rows, fields) => {
            console.log(rows[0].titleproject)

            for(var i = 0; i<rows.length; i++){
                show.showInfoProjects(rows[i])
            }
        })
    }
    /*Insertar datos descriptivos.*/
    insert(data) {
        var q = "INSERT INTO projectInfo (titleproject, descriptionproject, versionproject, password) VALUES('"
        +data.titlep+"','"
        +data.descriptionp+"','"
        +data.versionp+"','"
        +data.passp+"');";

        connection.query(q, (err, row, col) => {
            if(err) console.log('¡Error al ingresar los datos!')
        });

        idp = 0

        q = 'SELECT idprojectoInfo FROM projectInfo ORDER BY idprojectInfo DESC LIMIT 1'
        connection.query(q, (err, rows, fields)=> {
            idp = rows[0].idprojectInfo
        })

        q = 'INSERT INTO teamproject (namemember, idprojectInfo) VALUES ("'+data.teamp+'", "'+idp+'");';
        connection.query(q, (err, row, col)=> {
            if(err) console.log("¡Error al ingresar datos del equipo!")            
        })
    }
    /*Modificar datos descriptivos.*/
    update(data) {

    }
    /*Elimar proyecto totalmente, argumento 'pass' utilizado para hacer una comprobación
      por seguridad.*/
    delete(pass) {
        
    }
}

/*Clase para mostrar los datos obtenidos en la clase CRUD y presentarlos.*/
class showProjectsInfo {
    constructor() {
        this.dats = ""
        this.projectbox = document.getElementById('projectbox')
    }
    showInfoProjects(rows){
        this.dats = `<div class="principal">
		    <div class="contenedor">
                <div class="head">
                    <a>`+rows.titleproject+`</a>
                    <div class="menus">
                    <button class="btnmenu">:</button>
                    <div class="menu">
                        <a>Modificar</a>
                        <a onclick="javascript:dProject('`+ rows.idprojectInfo +`','`+ rows.titleproject +`')">Eliminar</a>
                        <a>Doc</a>
                    </div>
                    </div>
                </div>
                <div class="descripcion">
                    <p>`+rows.descriptionproject+`</p>
                </div>
                <div class="footer">
                    <p class="team">Alex, Meli, Armando</p><p class="version">`+rows.versionproject+`</p>
                </div>
		    </div>
		
	    </div>`

        this.projectbox.innerHTML += this.dats
    }
}

const connection = co.conect
const crud = new CRUDProjectInfo()
const showInfo = new showProjectsInfo() 
crud.find(showInfo)

/*Función para iniciar una nueva ventana, esta ventada contiene lo necesario para
  iniciar un nuevo proyecto y para actualizarlo.*/
cProject = document.getElementById('newproject')
cProject.addEventListener('click', (event)=> {
    const modalPath = path.join('file://', __dirname, '../templates/createproject.html')

    win = new BrowserWindow({width: 450, height: 500, frame:false, resizable: false})

    win.loadURL(modalPath)
    //win.webContents.openDevTools()
    win.show()
})

//Función para la opción de 'eliminar' que obtiene parametros id y title
function dProject(id, title) {
    //En esta ocasion estamos enviando datos atraves de la direccion del archivo por medio de parametros.
    const modalPath = path.join('file://', __dirname, '../templates/deleteproject.html?id='+id+'&title='+title)

    win = new BrowserWindow({width: 290, height: 140, frame: false, resizable:false})

    win.loadURL(modalPath)
    win.show()
}

c=document.getElementById("closes")
c.addEventListener('click', (event)=> {
    w = remote.getCurrentWindow()
    w.close()
})

//Obtiene los valores enviados desde la ventana de createprojects.html
ipc.on('valores', (event, args)=>{
    crud.insert(args);
    location.reload()
})