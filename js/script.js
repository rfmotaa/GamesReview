var srcDict = {
    'minecraft':'../assets/games-pictures/minecraft.png',
    'apex legends':'../assets/games-pictures/apex.jpg',
    'rocket league':'../assets/games-pictures/rocketLeague.avif',
    'uncharted':'../assets/games-pictures/uncharted.jpeg',
    'god of war ragnarok':'../assets/games-pictures/godOfWar.jpeg',
    'gta v':'../assets/games-pictures/gtaV.png',
    'red dead redemption 2':'../assets/games-pictures/redDead2.png'
}

// Busca dinâmica

function createDivReview(item, divFinal) {
    let ancora = document.createElement('a');
    ancora.href = `gamePage.html?game=${item}`;

    let imgItem = document.createElement('img');
    imgItem.src = `${srcDict[item]}`;
    imgItem.classList.add('imgResult');

    let nomeItem = document.createElement('h4');
    nomeItem.textContent = `${capitalizeFirst(item)}`;

    ancora.appendChild(imgItem);
    ancora.appendChild(nomeItem);
    ancora.classList.add('result');

    divFinal.appendChild(ancora)
}

document.getElementById('searchField').addEventListener('input', (event) => {
    const query = event.target.value.trim().toLowerCase();
    const data = Object.keys(JSON.parse(localStorage.getItem('gameInfos')));
    const divResults = document.getElementById('searchResults');

    divResults.innerHTML = ''

    if (query.length < 2) {
        return;
    }

    const resultados = data.filter(item => item.includes(query));

    if (resultados.length === 0) {
        divResults.innerHTML = 'Não foram encontrados títulos.'
        return
    }

    // Renderiza os resultados
    resultados.forEach(result => {
        createDivReview(result, divResults);
    })
});

// Primeira letra maiuscula

function capitalizeFirst(str) {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

// Login e Logout

let userLogged = JSON.parse(localStorage.getItem('logged'));

let username = JSON.parse(localStorage.getItem('username'));

const userPic = document.getElementById('userLogSvg');
const userText = document.getElementById('userLogText');

const loginBox = document.getElementById('login');
const logoutBox = document.getElementById('logout');
const cadastroBox = document.getElementById('cadastro');

const shadow = document.getElementById('login-shadow');

function verifyUserContent() {
    if (userLogged === true) {
        userPic.style.display = 'block';
        userText.style.display = 'none';
    } else {
        userPic.style.display = 'none';
        userText.style.display = 'block';
    }
}

function showLoginBox() {
    logoutBox.style.display = 'none';
    cadastroBox.style.display = 'none';
    loginBox.style.display = 'flex';
    shadow.style.display = 'block';
}

function showCadastroBox() {
    logoutBox.style.display = 'none';
    loginBox.style.display = 'none';
    cadastroBox.style.display = 'flex';
    shadow.style.display = 'block';
}

function showLogoutBox() {
    cadastroBox.style.display = 'none';
    loginBox.style.display = 'none';
    logoutBox.style.display = 'flex';
    shadow.style.display = 'block';
}

function closeAll() {
    logoutBox.style.display = 'none';
    loginBox.style.display = 'none';
    cadastroBox.style.display = 'none';
    shadow.style.display = 'none';
}

function loginUser(user, password) {
    const dataStorage = JSON.parse(localStorage.getItem('usersData'));
    const userExist = dataStorage[`${user}`]
    
    if (userExist) {
        if (password == userExist['senha']) {
            localStorage.setItem('logged', JSON.stringify(true));
            userLogged = JSON.parse(localStorage.getItem('logged'));
            verifyUserContent();
            closeAll();
            localStorage.setItem('username', JSON.stringify(user));
            username = JSON.parse(localStorage.getItem('username'));
        }
    } else {
        Swal.fire({
            title: 'Login ou senha incorretos!',
            icon: 'error',
            confirmButtonText: 'Fechar',
            background: '#0b0a0a',
            color: '#edebd7'
        })
    }
}

function logoutUser() {
    shadow.style.display = 'none';
    logoutBox.style.display = 'none';
    localStorage.setItem('logged', JSON.stringify(false));
    userLogged = JSON.parse(localStorage.getItem('logged'));
    verifyUserContent();
    localStorage.setItem('username', JSON.stringify('null'));   
    username = JSON.parse(localStorage.getItem('username'));
}

function cadastroUser(user, password) {
    let actualData = JSON.parse(localStorage.getItem('usersData'))
    if (Object.keys(actualData).includes(user)) {
        Swal.fire({
            title: 'Já existe um usuário com esse nome.',
            icon: 'error',
            confirmButtonText: 'Fechar',
            background: '#0b0a0a',
            color: '#edebd7'
        })
    } else {
        actualData[user] = {
            'user':user,
            'senha':password
        }
        localStorage.setItem('usersData', JSON.stringify(actualData))
        loginUser(user, password)
        Swal.fire({
            title: 'Cadastro e Login realizados!',
            icon: "success",
            draggable: true,
            confirmButtonText: 'Fechar',
            background: '#0b0a0a',
            color: '#edebd7'
        })
    }
}

document.getElementById('formLogin').addEventListener('submit', (event) => {
    event.preventDefault();

    let user = document.getElementById('loginUser').value;
    let password = document.getElementById('loginSenha').value;

    loginUser(user, password);

    document.getElementById('formLogin').reset()
});

document.getElementById('formCadastro').addEventListener('submit', (event) => {
    event.preventDefault();

    let user = document.getElementById('cadastroUser').value;
    let password = document.getElementById('cadastroSenha').value;

    cadastroUser(user, password);

    document.getElementById('formCadastro').reset()
});

document.addEventListener('click', (event) => {
    if (loginBox.style.display === 'flex') {
        if (!loginBox.contains(event.target)) {
            shadow.style.display = 'none';
            loginBox.style.display = 'none';
        }
    }
    if (logoutBox.style.display === 'flex') {
        if (!logoutBox.contains(event.target)) {
            shadow.style.display = 'none';
            logoutBox.style.display = 'none';
        }
    }
    if (cadastroBox.style.display === 'flex') {
        if (!cadastroBox.contains(event.target)) {
            shadow.style.display = 'none';
            cadastroBox.style.display = 'none';
        }
    }
});

verifyUserContent();

document.getElementById('showCadastroBox').addEventListener('click', (event) => {
    event.stopPropagation();
    showCadastroBox();
})

document.getElementById('showLoginBox').addEventListener('click', (event) => {
    event.stopPropagation();
    showLoginBox();
})

userText.addEventListener('click', (event) => {
    event.stopPropagation();
    showLoginBox();
})

userPic.addEventListener('click', (event) => {
    event.stopPropagation();
    document.getElementById('logoutText').innerHTML = `Olá, ${username}`
    showLogoutBox();
})


// Parte do carrossel

const carousel = document.getElementById('carousel');
const pictures = document.querySelectorAll('.picture');
const pictureWidth = 216;
const numVisiveis = 5;
let index = 0;
const interval = 3500;

for (let i = 0; i < numVisiveis; i++) {
    let clone = pictures[i].cloneNode(true);
    carousel.appendChild(clone);
}

function startCarrossel() {
    index++;

    carousel.style.transition = 'transform 1s ease-in-out';
    carousel.style.transform = `translateX(${-index * pictureWidth}px)`;

    if (index >= pictures.length) {
        setTimeout(() => {
            index = 0;
            carousel.style.transition = 'none';
            carousel.style.transform = `translateX(0)`;
        }, 1000);
    }
}

setInterval(startCarrossel, interval)

// Parte das reviews

function criaReview(jogoInfo, userInfo, avaliacaoInfo, textoInfo, cardsHTML, itemId) {
    let cardBox = document.createElement('div');
    cardBox.classList.add('cardBox');

    let imgJogo = document.createElement('img');
    imgJogo.classList.add('pictureCard');
    imgJogo.src = `${srcDict[jogoInfo]}`;

    let divInfos = document.createElement('div');
    divInfos.classList.add('infosCard');

    let nomeJogo = document.createElement('h4');
    nomeJogo.textContent = `${capitalizeFirst(jogoInfo)}`;

    let usernameBox = document.createElement('div');
    usernameBox.classList.add('userTextReview');

    let imgUser = document.createElement('img');
    imgUser.src = '../assets/svg/usuario.svg';
    imgUser.classList.add('usernameReview');

    let user = document.createElement('h5');
    user.textContent = `${userInfo}`;

    let texto = document.createElement('p');
    texto.textContent = `${textoInfo}`;

    let ratingBox = document.createElement('div');
    ratingBox.classList.add('ratingBox');

    let rating = document.createElement('h2');
    rating.textContent = `${avaliacaoInfo}/5`

    let estrela = document.createElement('img');
    estrela.classList.add('svg');
    estrela.src = '../assets/svg/estrela.svg';
    
    usernameBox.appendChild(imgUser);
    usernameBox.appendChild(user);

    divInfos.appendChild(nomeJogo);
    divInfos.appendChild(usernameBox)
    divInfos.appendChild(texto);

    ratingBox.appendChild(rating);
    ratingBox.appendChild(estrela);

    cardBox.appendChild(imgJogo);
    cardBox.appendChild(divInfos);
    cardBox.appendChild(ratingBox);

    cardsHTML.appendChild(cardBox)

    cardBox.id = itemId;
}

const dataReviews = JSON.parse(localStorage.getItem("reviews"));
const cardsReview = document.getElementById('cards');

Object.keys(dataReviews).forEach(card => {
    criaReview(dataReviews[card]['jogo'], dataReviews[card]['user'], dataReviews[card]['avaliacao'], dataReviews[card]['texto'], cardsReview, card)
});