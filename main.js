let usuarios = [];

const $btnEditar = document.querySelector(".card__btn--editar");
const $btnEliminar = document.querySelector(".card__btn--eliminar");
const $btnAgregar = document.querySelector(".form__btn");
const $btnGuardar = document.querySelector(".form__btn--guardar");
const $btnCancelar = document.querySelector(".form__btn--cancelar");

window.addEventListener("click", (e) => {
  e.preventDefault();
  if(e.target.id === "eliminar") {
    let idUser = e.target.getAttribute("userid")
    eliminarUsuario(idUser);
    cargarUsuarios();
  }else if(e.target.id === "editar"){
    $btnGuardar.classList.add("form__btn--active");
    $btnCancelar.classList.add("form__btn--active");
    let idUser = e.target.getAttribute("userid")
    seleccionarUsuario(idUser);
    cargarUsuarios();
  }else if(e.target.id === "guardar") {
    $btnGuardar.classList.remove("form__btn--active");
    $btnCancelar.classList.remove("form__btn--active");
    let idUser = document.querySelector("#idhide").value;
    guardarUsuario(idUser);
  }else if(e.target.id === "cancelar") {
    $btnGuardar.classList.remove("form__btn--active");
    $btnCancelar.classList.remove("form__btn--active");
    limpiarForm();
  }
})


$btnAgregar.addEventListener("click", (e) => {
  e.preventDefault();

  const nombre = document.querySelector("#nombre").value;
  const dni = document.querySelector("#dni").value;
  const edad = document.querySelector("#edad").value;
  const genero = document.querySelector("#genero").value;
  const correo = document.querySelector("#correo").value;
  const telefono = document.querySelector("#telefono").value;
  const pais = document.querySelector("#pais").value;
  const estado = document.querySelector("#estado").value;

  const user = {
    nombre,
    dni,
    edad,
    genero,
    correo,
    telefono,
    pais,
    estado
  };

  usuarios = [...usuarios, user];
  cargarUsuarios();
});

window.addEventListener("load", () => {
  usuarios = JSON.parse(localStorage.getItem("usuarios"));
  if(usuarios === null) {
    usuarios = [];
  }else {
    cargarUsuarios();
  }
});

const cargarUsuarios = () => {
  const $containerUsers = document.querySelector(".container__list");
  const $fragment = document.createDocumentFragment();

  usuarios.forEach( (usuario, index, arr) => {
    const $cardUser = agregarUsuario(usuario, index);
    $fragment.appendChild($cardUser)
  });
  $containerUsers.innerHTML = "";
  $containerUsers.appendChild($fragment);
  localStorage.setItem("usuarios",JSON.stringify(usuarios));

}

const agregarUsuario = (usuario, index) => {
  const $card = document.createElement('div');
  $card.classList.add('card');
  const $card__top = `
    <div class="card__top">
      <span class="iconify" data-icon="bxs:user-circle"></span>
      <div class="container__btn">
        <button id="editar" userId=${index} class="card__btn card__btn--editar">Editar</button>
        <button id="eliminar" userId=${index} class="card__btn card__btn--eliminar">Eliminar</button>
      </div>
    </div>`;


  const $card__info = document.createElement('div');
  $card__info.classList.add('card__info');

  Object.entries(usuario).forEach( ([key, value]) => {
    const $p = document.createElement('p');
    const $span = document.createElement('span');
    $span.innerText = value;
    $p.innerText = key + ":";
    $p.appendChild($span);
    $card__info.appendChild($p);
  });
  $card.innerHTML = $card__top;
  $card.appendChild($card__info);

  return($card);
};

const eliminarUsuario = (idUser) => {
  usuarios.splice(idUser,1);
}

const seleccionarUsuario = (idUser) => {

  const {nombre, dni, edad, genero, correo, telefono, pais, estado} = usuarios[idUser];

  document.querySelector("#nombre").value = nombre;
  document.querySelector("#dni").value = dni;
  document.querySelector("#edad").value = edad;
  document.querySelector("#genero").value = genero;
  document.querySelector("#correo").value = correo;
  document.querySelector("#telefono").value = telefono;
  document.querySelector("#pais").value = pais;
  document.querySelector("#estado").value = estado;
  document.querySelector("#idhide").value = idUser;
}

const guardarUsuario = (idUser) => {
  const nombre = document.querySelector("#nombre").value;
  const dni = document.querySelector("#dni").value;
  const edad = document.querySelector("#edad").value;
  const genero = document.querySelector("#genero").value;
  const correo = document.querySelector("#correo").value;
  const telefono = document.querySelector("#telefono").value;
  const pais = document.querySelector("#pais").value;
  const estado = document.querySelector("#estado").value;

  const user = {
    nombre,
    dni,
    edad,
    genero,
    correo,
    telefono,
    pais,
    estado
  };

  usuarios.splice(idUser, 1, user);
  cargarUsuarios();
  limpiarForm();
}

const limpiarForm = () => {
  document.querySelector("#nombre").value = "";
  document.querySelector("#dni").value = "";
  document.querySelector("#edad").value = "";
  document.querySelector("#genero").value = "";
  document.querySelector("#correo").value = "";
  document.querySelector("#telefono").value = "";
  document.querySelector("#pais").value = "";
  document.querySelector("#estado").value = "";
}