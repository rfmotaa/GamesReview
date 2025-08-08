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

// Carregar reviews do usuário

let username = JSON.parse(localStorage.getItem('username'));

document.getElementById('usernameData').innerText = username;

const dataReviews = JSON.parse(localStorage.getItem("reviews"));
const cardsReview = document.getElementById('cards');
const myReviews = {}

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

    let div1 = document.createElement('div');

    let rating = document.createElement('h2');
    rating.textContent = `${avaliacaoInfo}/5`

    let estrela = document.createElement('img');
    estrela.classList.add('svg');
    estrela.src = '../assets/svg/estrela.svg';

    let div2 = document.createElement('div');

    let editar = document.createElement('img');
    editar.classList.add('svg');
    editar.src = '../assets/svg/editar.svg';
    editar.classList.add('edit');

    let excluir = document.createElement('img');
    excluir.classList.add('svg');
    excluir.src = '../assets/svg/lixo.svg';
    excluir.classList.add('exclude');
    
    usernameBox.appendChild(imgUser);
    usernameBox.appendChild(user);

    divInfos.appendChild(nomeJogo);
    divInfos.appendChild(usernameBox)
    divInfos.appendChild(texto);

    div1.appendChild(rating);
    div1.appendChild(estrela);

    div2.appendChild(editar);
    div2.appendChild(excluir);

    ratingBox.appendChild(div1);
    ratingBox.appendChild(div2);

    cardBox.appendChild(imgJogo);
    cardBox.appendChild(divInfos);
    cardBox.appendChild(ratingBox);

    cardsHTML.appendChild(cardBox)
    
    cardBox.id = itemId;

    editar.addEventListener('click', (event) => {
        event.stopPropagation();
        editReview.style.display = 'flex';
        shadow.style.display = 'block';
        let divCard = botao.closest('.cardBox');
        divId = divCard.id
        document.getElementById('avaliacaoReview').value = dataReviews[divId]['avaliacao'];
        document.getElementById('textReview').value = dataReviews[divId]['texto'];
    });

    excluir.addEventListener('click', () => {
        Swal.fire({
            title: 'Deseja mesmo excluir essa review?',
            icon: "question",
            draggable: true,
            confirmButtonText: 'Excluir',
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
            background: '#0b0a0a',
            color: '#edebd7'
        }).then((result) => {
            if (result.isConfirmed) {
                let divCard = excluir.closest('.cardBox');
                delete dataReviews[divCard.id];
                localStorage.setItem("reviews", JSON.stringify(dataReviews));
                divCard.remove();
                carregaReview();
            }
        })
    })
}

function carregaReview() {
    cardsReview.innerText = '';
    Object.keys(dataReviews).forEach(card => {
        if (dataReviews[card]['user'] === username) {
            criaReview(dataReviews[card]['jogo'], dataReviews[card]['user'], dataReviews[card]['avaliacao'], dataReviews[card]['texto'], cardsReview, card)
            myReviews[card] = dataReviews[card];
        } 
    });
    if (cardsReview.innerText == '') {
        document.getElementById('noReviews').style.display = 'flex';
    } else {
        document.getElementById('noReviews').style.display = 'none';
    }
}

carregaReview()

// Editar review

const editarBotoes = document.querySelectorAll('.edit');

const editReview = document.getElementById('newReview');
const shadow = document.getElementById('shadow');

let divId = null

editarBotoes.forEach(botao => {
    botao.addEventListener('click', (event) => {
        event.stopPropagation();
        editReview.style.display = 'flex';
        shadow.style.display = 'block';
        let divCard = botao.closest('.cardBox');
        divId = divCard.id
        document.getElementById('avaliacaoReview').value = dataReviews[divId]['avaliacao'];
        document.getElementById('textReview').value = dataReviews[divId]['texto'];
    })
})

document.getElementById('formNewReview').addEventListener('submit', (event) => {
    event.preventDefault();
    editReview.style.display = 'none';
    shadow.style.display = 'none';
    dataReviews[divId]['avaliacao'] = document.getElementById('avaliacaoReview').value;
    dataReviews[divId]['texto'] = document.getElementById('textReview').value;
    localStorage.setItem('reviews', JSON.stringify(dataReviews));
    carregaReview();
    Swal.fire({
            title: 'Sua review foi editada!',
            icon: "success",
            draggable: true,
            confirmButtonText: 'Fechar',
            background: '#0b0a0a',
            color: '#edebd7'
        })
})

document.addEventListener('click', (event) => {
    if (editReview.style.display === 'flex') {
        if (!editReview.contains(event.target)) {
            editReview.style.display = 'none';
            shadow.style.display = 'none';
        }
    }
});

// Excluir review

const excluirBotoes = document.querySelectorAll('.exclude');

excluirBotoes.forEach(botao => {
    botao.addEventListener('click', () => {
        Swal.fire({
            title: 'Deseja mesmo excluir essa review?',
            icon: "question",
            draggable: true,
            confirmButtonText: 'Excluir',
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
            background: '#0b0a0a',
            color: '#edebd7'
        }).then((result) => {
            if (result.isConfirmed) {
                let divCard = botao.closest('.cardBox');
                delete dataReviews[divCard.id];
                localStorage.setItem("reviews", JSON.stringify(dataReviews));
                divCard.remove();
                carregaReview();
            }
        })
    })
})