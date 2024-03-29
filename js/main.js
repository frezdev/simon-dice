const celeste = document.getElementById('celeste');
const violeta = document.getElementById('violeta');
const naranja = document.getElementById('naranja');
const verde = document.getElementById('verde');
const btnEmpezar = document.getElementById('btnEmpezar');
const ULTIMO_NIVEL = 10;

class Juego {
    constructor() {
        this.inicializar = this.inicializar.bind(this);
        this.inicializar();
        this.generarSecuencia();
        this.siguienteNivel();
    }

    inicializar() {
        this.siguienteNivel = this.siguienteNivel.bind(this);
        this.elegirColor = this.elegirColor.bind(this);
        this.toggleBtnEmpezar();
        this.nivel = 1;
        this.colores = {
            celeste,
            violeta,
            naranja,
            verde
        }
    }

    toggleBtnEmpezar() {
        if (btnEmpezar.classList.contains('hide')) 
        {
            btnEmpezar.classList.remove('hide');
        }
        else {
            btnEmpezar.classList.add('hide');
        }
    }


    generarSecuencia() {
        this.secuencia = new Array(ULTIMO_NIVEL).fill(0).map(n => Math.floor(Math.random() * 4));
    }
    
    siguienteNivel() {
        this.subnivel = 0;
        this.iluminarSecuencia();
        this.agregarEventosClick();
    }

    transformarNumeroAColor(numero) {
        switch (numero)
        {
            case 0:
                return 'celeste'
            case 1:
                return 'violeta'
            case 2:
                return 'naranja'
            case 3:
                return 'verde'
        }
    }

    transformarColorANumero(color) {
        switch (color)
        {
            case 'celeste':
                return 0

            case 'violeta':
                return 1

            case 'naranja':
                return 2

            case 'verde':
                return 3
        }
    }

    iluminarSecuencia() {
        setTimeout(() => {
            for (let i = 0; i < this.nivel; i++) {
                const color = this.transformarNumeroAColor(this.secuencia[i]);
                setTimeout(() => {
                    console.log(color);
                    this.iluminarColor(color)
                }, 1000 * i);
            }
        }, 1500)
    }

    iluminarColor(color) {
        this.colores[color].classList.add('light');
        setTimeout(() => this.apagarColor(color), 350)
    }

    apagarColor(color) {
        this.colores[color].classList.remove('light');
    }

    agregarEventosClick() {
        this.colores.celeste.addEventListener('mousedown', this.elegirColor);
        this.colores.violeta.addEventListener('mousedown', this.elegirColor);
        this.colores.naranja.addEventListener('mousedown', this.elegirColor);
        this.colores.verde.addEventListener('mousedown', this.elegirColor);
    }

    eliminarEventosClick() {
        this.colores.celeste.removeEventListener('mousedown', this.elegirColor);
        this.colores.violeta.removeEventListener('mousedown', this.elegirColor);
        this.colores.naranja.removeEventListener('mousedown', this.elegirColor);
        this.colores.verde.removeEventListener('mousedown', this.elegirColor);
    }

    elegirColor(ev) {
        const nombreColor = ev.target.dataset.color;
        const numeroColor = this.transformarColorANumero(nombreColor);
        this.iluminarColor(nombreColor);
        if (numeroColor === this.secuencia[this.subnivel]) 
        {
            this.subnivel++;
            if (this.subnivel === this.nivel) 
            {
                this.nivel++
                this.eliminarEventosClick()
                if (this.nivel === (ULTIMO_NIVEL + 1)) 
                {
                    setTimeout(() => {
                        this.ganoElJuego();
                    }, 700);
                }
                else
                {
                    setTimeout(this.siguienteNivel, 500)
                }
            }
        }
        else 
        {
            this.perdioElJuego();
        }
    }

    ganoElJuego() {
        swal("FELICIDADES", "GANASTE EL JUEGO!!!", "success")
            .then(this.inicializar);
    }

    perdioElJuego() {
        swal("PERDISTE", "Ni ésto haces bien", "error")
            .then(() => {
                this.eliminarEventosClick();
                this.inicializar();
            });
    }
}

function empezarJuego () {
    window.juego = new Juego();
}