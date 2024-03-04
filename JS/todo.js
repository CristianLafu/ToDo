document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('#input');
    const canvas = document.querySelector('#articleContainer');
    const arrayTareas = [];
    let idInicial = 1;
    const selectUrgencia = document.querySelector('#selectUrgencia');
    selectUrgencia.addEventListener('change', actTarActualizadas);
    const buscarInput = document.querySelector('#buscadorTarea');
    buscarInput.addEventListener('input', buscarTareas);

    function limpiarTildes(cadena) {
        let texto = cadena.replaceAll('á', 'a');
        const arrayCon = ['é', 'í', 'ó', 'ú']
        const arraySin = ['e', 'i', 'o', 'u']
        for (let i = 0; i < arraySin.length; i++) {
            texto = texto.replaceAll(arrayCon[i], arraySin[i])
        }
        return texto
    }

    function guardarTarea(lista, newTarea) {
        let posicion = lista.findIndex(tarea => tarea.value === newTarea.value);
        if (posicion === -1) {
            lista.push(newTarea);
            idInicial++;

            return {
                status: true, msg: '¡Tarea guardada!'
            };

        } else {
            return { status: false, msg: '¡Tarea duplicada!' };
        }
    }

    function borrarTarea(event) {
        let id = Number(event.target.dataset.id);
        let posicion = arrayTareas.findIndex(tarea => tarea.id === id);
        arrayTareas.splice(posicion, 1);

        let article = event.target.parentNode.parentNode;
        article.parentNode.removeChild(article);
        alert('¡Tarea borrada!');

        actTarActualizadas();
    }

    function filtroUrgencia(listaTareas, urgencia) {
        const listaFiltrada = listaTareas.filter(tarea => tarea.seleccionarurgencia === urgencia);
        return listaFiltrada;
    }

    function buscarTareas() {
        const filtro = limpiarTildes(buscarInput.value.toLowerCase());
        const tareasFiltradas = arrayTareas.filter(tarea => {
            const tareaTexto = limpiarTildes(tarea.value.toLowerCase());
            return tareaTexto.includes(filtro);
        });
        pintarTodasLasTareas(tareasFiltradas, canvas);

        if (tareasFiltradas.length === 0) {
            canvas.innerHTML = '<h3 class="noResultado">¿Nada que hacer? Te has ganado el descanso chatina.</h3>';
        }
    }

    function pintarTarea(newTarea, domElement) {
        const article = document.createElement('article');
        const icon = document.createElement('i');
        const p = document.createElement('p');
        const button = document.createElement('button');

        button.addEventListener('click', borrarTarea);
        button.dataset.id = newTarea.id;
        button.innerHTML = '<i class="fa-solid fa-heart iconColor"></i>';

        icon.classList.add('fa-solid', 'fa-play', newTarea.seleccionarurgencia.toLowerCase());
        p.textContent = newTarea.value.toUpperCase();

        article.appendChild(icon);
        article.appendChild(p);
        article.appendChild(button);

        domElement.appendChild(article);
    }

    function pintarTodasLasTareas(lista, domElement) {
        if (lista.length > 0) {
            domElement.innerHTML = "";
            lista.forEach(tarea => pintarTarea(tarea, domElement));
        } else {
            domElement.innerHTML = '<h3 class="noResultado">¿Nada que hacer? Te has ganado el descanso chatina.</h3>';
        }
    }

    function capturarData(event) {
        event.preventDefault();

        const tareaInput = event.target.tareaInput;
        const urgenciaSelect = event.target.urgenciaInput;

        const tarea = event.target.tareaInput.value;
        const urgencia = event.target.urgenciaInput.value;

        if (tarea === "" && urgencia === "") {
            alert('¡Escribe la tarea y dinos la urgencia!');
        } else if (tarea === "") {
            alert('Una tarea vacia es un sin sentido');
        } else if (urgencia === "") {
            alert('Recuerda marcar la urgencia');
        } else {
            const newTarea = {
                id: idInicial,
                value: tarea,
                seleccionarurgencia: urgencia
            };

            let respuesta = guardarTarea(arrayTareas, newTarea);

            if (respuesta.status) {
                pintarTarea(newTarea, canvas);
                alert(respuesta.msg);

                tareaInput.value = "";
                urgenciaSelect.selectedIndex = 0;

            } else {
                console.log(respuesta, newTarea);
                alert(respuesta.msg)
            }

            pintarTodasLasTareas(arrayTareas, canvas);
            actTarActualizadas();
        }
    }

    function actTarActualizadas() {
        const urgenciaSelect = document.querySelector('#selectUrgencia').value;

        if (urgenciaSelect !== '') {
            const tareasFiltradas = filtroUrgencia(arrayTareas, urgenciaSelect);
            pintarTodasLasTareas(tareasFiltradas, canvas);

            if (tareasFiltradas.length === 0) {
                canvas.innerHTML = '<h3 class="noResultado">¿Nada que hacer? Te has ganado el descanso chatina.</h3>';
            }
        } else {
            pintarTodasLasTareas(arrayTareas, canvas);
        }
    }

    pintarTodasLasTareas(arrayTareas, canvas);

    form.addEventListener('submit', capturarData);
});






















