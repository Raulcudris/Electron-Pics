'use strict'
// instanciando los objetos app y BrowserWindow
import { app, BrowserWindow } from 'electron';
import devtools from './devtools';

if(process.env.NODE_ENV === 'development'){
    devtools();
}


// Imprimiendo un mensaje en la consola antes de salir
app.on('before-quit',()=>{
    console.log('Saliendo...');
})

//Ejecutando ordenes cuando la aplicacion esta lista
app.on('ready',() =>{
    //creando una ventana
    let win = new BrowserWindow({
        width: 800,
        height: 600,
        title: 'Hola mundo!',
        center: true,
        maximizable: false,
        show: false
    });

    win.once('ready-to-show',()=>{
        win.show();
    })

    //Posicionamiento en la pantalla
    /*win.on('move',()=>{
        const position = win.getPosition();
        console.log(`la Posicion de la ventana es ${position}`)
    })*/

    //detectando el cierre de la ventana para cerrar el aplicativo
    win.on('close',()=>{
        win = null;
        app.quit();
    })

    //Cargar contenido en electron
    win.loadURL(`file://${__dirname}/renderer/index.html`);

    win.toggleDevTools();

})

