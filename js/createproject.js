const electron = require('electron')
const remote = electron.remote
const ipc = electron.ipcRenderer

var register = document.getElementById('register-project')
var exit = document.getElementById('exit')
exit.addEventListener('click', (event)=>{
    var window = remote.getCurrentWindow();
    window.close()
})

register.addEventListener('click', (event)=>{
    ipc.send('infoProject', {
        titlep: document.getElementById('titleproject').value, 
        descriptionp: document.getElementById('descriptionproject').value,
        versionp: document.getElementById('versionproject').value,
        teamp: document.getElementById('teamproject').value,
        passp: "123123"
    })

    var window = remote.getCurrentWindow();
    window.close()
})