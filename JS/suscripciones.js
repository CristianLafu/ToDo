const form = document.querySelector('#formsuscription');
const tbody = document.querySelector('#suscripciones tbody');
const arrayEmails = [];
let miId = 1;
// {id:1, value: 'jj@gmail'}
//tbody.innerHTML = `<tr><td>Juan Antonio</td><td><button>enviar</button></td></tr>`

function guardarEmail(lista, newEmail) {
    //1 busco con findIndex si existe el email en el array, si no existe me devuelve -1 y puedo pushearlo.
    let posicion = lista.findIndex(email => email.value === newEmail.value)
    if (posicion === -1) {
        //no esta duplicado puede guardar el email.
        lista.push(newEmail);
        miId++;
        return { status: true, msg: 'Email guardado correctamente' }
    } else {
        //esta duplicado envio un error de email duplicado
        return { status: false, msg: 'Email duplicado' }
    }

}

function borrarEmail(event) {
    //el proceso de borrar en web implica borrar del array y borrar del interfaz.

    let id = Number(event.target.dataset.id);
    //primero borrar del array
    let posicion = arrayEmails.findIndex(email => email.id === id);
    arrayEmails.splice(posicion, 1);

    //luego borro del html
    //localizo al padre de todos
    let tbody = event.target.parentNode.parentNode.parentNode;
    let hijo = event.target.parentNode.parentNode
    tbody.removeChild(hijo);

}

/*

<tr>
    <td>juan@gmail.com</td>
    <td><button>borrar</button></td>
</tr>

*/
function pintarUnEmail(newEmail, domElement) {
    const tr = document.createElement('tr');// <tr></tr>
    const td1 = document.createElement('td'); //<td></td>
    const td2 = document.createElement('td'); //<td></td>
    const button = document.createElement('button'); //<button></button>
    button.dataset.id = newEmail.id;
    button.textContent = 'borrar'; //<button>borrar</button>
    button.addEventListener('click', borrarEmail);
    td1.textContent = newEmail.value; //<td>juan@gmail.com</td>
    td2.appendChild(button); //<td><button>borrar</button></td>
    tr.append(td1, td2);
    domElement.appendChild(tr);
}



function capturarData(event) {
    event.preventDefault();
    const valor = event.target.email.value;
    const newEmail = {
        id: miId,
        value: valor
    }
    let response = guardarEmail(arrayEmails, newEmail);
    //quiero que guardeis el nuevo email en el array y aumenteis el id. Y no puede haber duplicados
    if (response.status) {
        //pintamos
        pintarUnEmail(newEmail, tbody)
    } else {
        //lanzamos un mensaje de error
        alert(response.msg)
    }
}

form.addEventListener('submit', capturarData);

