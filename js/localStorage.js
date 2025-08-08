function saveData() {
    if (!localStorage.getItem("logged")) {
        localStorage.setItem("logged", JSON.stringify(false))
    }
    if (!localStorage.getItem("data")) {
        localStorage.setItem("usersData", JSON.stringify(data))
    }
    if (!localStorage.getItem("username")) {
        localStorage.setItem("username", JSON.stringify('null'))
    }
    if (!localStorage.getItem("reviews")) {
        localStorage.setItem("reviews", JSON.stringify(reviews))
    }
    if (!localStorage.getItem("gameInfos")) {
        localStorage.setItem("gameInfos", JSON.stringify(gameInfos))
    }
}

const data = {
    "user123":{
        "user":"user123",
        "senha":"teste123"
    },
    "user1234":{
            "user":"user1234",
            "senha":"teste1234"
    }
}

const reviews = {
    "01": { 
        "user": "jaime37",
        "jogo": "minecraft",
        "avaliacao": "5",
        "texto": "Criatividade sem limites. Um jogo que consegue ser relaxante e desafiador ao mesmo tempo."
    },
    "02": { 
        "user": "lara_xx",
        "jogo": "apex legends",
        "avaliacao": "4",
        "texto": "Combate rápido e tático com personagens únicos. Perfeito para quem curte ação frenética em equipe."
    },
    "03": { 
        "user": "pedro.rl",
        "jogo": "rocket league",
        "avaliacao": "4",
        "texto": "Futebol com carros nunca fez tanto sentido. Diversão pura e partidas viciantes."
    },
    "04": { 
        "user": "nina88",
        "jogo": "uncharted",
        "avaliacao": "5",
        "texto": "Uma aventura cinematográfica com personagens marcantes e cenários de tirar o fôlego."
    },
    "05": { 
        "user": "kratos_br",
        "jogo": "god of war ragnarok",
        "avaliacao": "5",
        "texto": "Épico do início ao fim. Combina ação intensa com uma história emocional e profunda."
    },
    "06": { 
        "user": "leo_v",
        "jogo": "gta v",
        "avaliacao": "5",
        "texto": "Liberdade total em um mundo aberto cheio de possibilidades. Caos e diversão garantidos."
    },
    "07": { 
        "user": "cavalcante12",
        "jogo": "red dead redemption 2",
        "avaliacao": "5",
        "texto": "Um western detalhado e imersivo com narrativa impecável. Parece viver um filme de faroeste."
    }
}

const gameInfos = {
    "minecraft": "Minecraft é um universo aberto de criatividade infinita, onde blocos simples ganham vida em paisagens vastas e maleáveis. Jogadores exploram, constroem, sobrevivem e criam em mundos gerados aleatoriamente, repletos de cavernas profundas, vilarejos escondidos e criaturas únicas. Seja esculpindo castelos colossais ou fugindo de perigos noturnos, cada sessão é uma jornada diferente. Com modos variados e possibilidades ilimitadas, a liberdade de expressão é o centro da experiência. Seu visual pixelado icônico esconde uma profundidade de mecânicas, sistemas e aventuras que fascinam jogadores de todas as idades e estilos ao redor do mundo.",
    "apex legends": "Apex Legends é um battle royale tático e eletrizante, ambientado em um universo de ficção científica vibrante e cheio de perigos. Com esquadrões de três jogadores, o título mistura ação rápida com habilidades únicas de personagens, conhecidos como 'lendas', cada um com estilo próprio e histórias intrigantes. O mapa dinâmico, os tiroteios intensos e a movimentação fluida criam partidas cheias de reviravoltas. Estratégia e cooperação são essenciais para a vitória, enquanto o visual estilizado e a narrativa em constante evolução mantêm o jogo sempre fresco. Apex é mais que sobrevivência — é uma batalha épica por glória e destaque.",
    "rocket league": "Rocket League é uma mistura explosiva de futebol e carros impulsionados por foguetes, onde partidas frenéticas desafiam reflexos, estratégia e trabalho em equipe. Em arenas futuristas, jogadores controlam veículos velozes que voam, derrapam e colidem em busca do gol perfeito. Com física refinada e controles precisos, o jogo oferece uma experiência esportiva única, acessível para iniciantes mas profunda para veteranos. Modos variados, personalizações estilizadas e partidas online competitivas mantêm a ação sempre renovada. Seja em duelos amistosos ou torneios ranqueados, Rocket League transforma a simplicidade do esporte em uma adrenalina pura e viciante.",
    "uncharted": "Uncharted é uma saga de aventura cinematográfica que segue Nathan Drake, um caçador de tesouros carismático e ousado, em busca de relíquias perdidas e civilizações esquecidas. Com cenários deslumbrantes e sequências de ação intensas, o jogo combina exploração arqueológica com combates eletrizantes e enigmas inteligentes. A narrativa envolvente, digna de Hollywood, é acompanhada por diálogos afiados e relacionamentos cativantes entre os personagens. De ruínas na selva a fortalezas no deserto, cada local conta uma história visual rica e cheia de surpresas. Uncharted é uma viagem épica onde aventura, emoção e descoberta se encontram a cada passo.",
    "god of war ragnarok": "God of War: Ragnarok continua a saga brutal e emocional de Kratos e seu filho Atreus na mitologia nórdica. Com combates intensos, chefes colossais e um mundo envolvente cheio de deuses, criaturas e mistérios, o jogo combina ação visceral com narrativa profunda. A relação entre pai e filho evolui à medida que enfrentam profecias e escolhas difíceis, em um enredo que explora identidade, destino e redenção. Visualmente deslumbrante, com trilha sonora épica e jogabilidade refinada, Ragnarok é um épico moderno que honra suas raízes e eleva a franquia a novos patamares de excelência.",
    "gta v": "Grand Theft Auto V mergulha o jogador em uma versão fictícia e expansiva de Los Angeles, onde três protagonistas com passados turbulentos enfrentam o submundo do crime. Com uma narrativa envolvente, gráficos realistas e liberdade quase absoluta, o jogo combina ação cinematográfica, tiroteios intensos, perseguições de carro e missões caóticas. A cidade viva reage às escolhas do jogador, oferecendo desde roubos a banco até corridas clandestinas. Além do modo história, o GTA Online amplia ainda mais o universo, permitindo criar seu império criminoso com amigos. Uma obra ousada e irreverente que redefine os limites dos jogos de mundo aberto.",
    "red dead redemption 2": "Red Dead Redemption 2 transporta o jogador para o fim do Velho Oeste, em uma América violenta e em transformação. A história de Arthur Morgan e da gangue Van der Linde é contada com uma riqueza de detalhes raramente vista, misturando tiroteios, caçadas, laços emocionais e escolhas morais. O mundo aberto é vasto, belo e vivo, reagindo dinamicamente às ações do jogador. Com narrativa madura, trilha sonora marcante e mecânicas realistas, o jogo é uma ode melancólica à liberdade e ao preço da sobrevivência. Um western moderno que transcende os limites do entretenimento digital."
}

saveData()