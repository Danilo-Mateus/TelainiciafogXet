const app = new PIXI.Application();
const screenWidth = window.innerWidth;
const screenHeight = window.innerHeight;

let sprite;
let et;
let homem;
let astronauta; // Declaração do astronauta fora do escopo da função de animação

async function init() {
    await app.init({ width: screenWidth, height: screenHeight });
    document.body.appendChild(app.view);
    await PIXI.Assets.load(['sample.png', 'estrela.png', 'et.png', 'astronauta.png', 'start.png']);

    const starsContainer = new PIXI.Container();
    app.stage.addChild(starsContainer);
    const startButton = PIXI.Sprite.from('start.png');
    startButton.anchor.set(0.5);
    startButton.x = app.screen.width / 2;
    startButton.y = app.screen.height / 2;
    startButton.interactive = true; // Habilita interatividade para cliques
    startButton.buttonMode = true; // Altera o cursor quando hover

    // Adiciona evento de clique ao botão "Start"
    startButton.on('pointerdown', () => {
        window.location.href = "https://danilo-mateus.github.io/fogueteXet/"; // Altere para o URL desejado
    });

    app.stage.addChild(startButton);


    const numStars = 200;
    const starTexture = PIXI.Texture.from('estrela.png');

    // Criando as estrelas
    for (let i = 0; i < numStars; i++) {
        const star = new PIXI.Sprite(starTexture);
        star.anchor.set(0.5);
        star.scale.set(0.01 + Math.random() * 0.01);
        star.x = Math.random() * app.screen.width;
        star.y = Math.random() * app.screen.height;
        starsContainer.addChild(star);
    }

    // Função para reposicionar estrelas
    function resetStarPosition(star) {
        star.y = -star.height; // reposiciona no topo
        star.x = Math.random() * app.screen.width;
    }

    // Animação das estrelas
    app.ticker.add(() => {
        // Move cada estrela para baixo
        starsContainer.children.forEach(star => {
            star.y += 1;

            // Repositiona estrela no topo se sair da tela
            if (star.y > app.screen.height) {
                resetStarPosition(star);
            }
        });

        // Move o sprite (foguete) para cima
        sprite.y -= 2;
        // Se o sprite sair da tela, reposiciona-o na parte inferior

        // Move o ET para cima
        et.y -= 1.5; // Um pouco mais rápido que o foguete

    });

    sprite = PIXI.Sprite.from('sample.png');
    const spriteScaleFactor = 0.7;
    sprite.scale.set(spriteScaleFactor, spriteScaleFactor);
    app.stage.addChild(sprite);
    sprite.x = app.screen.width / 2 - sprite.width / 2;
    sprite.y = app.screen.height; // Posição inicial na parte inferior

    et = PIXI.Sprite.from('et.png');
    const etScaleFactor = 0.5;
    et.scale.set(etScaleFactor, etScaleFactor);
    app.stage.addChild(et);
    et.x = app.screen.width / 2 - et.width / 2; // Posição inicial no centro horizontal
    et.y = app.screen.height / 2 - et.height / 2; // Posição inicial no centro 

    

    // Adicione esta linha dentro do bloco app.ticker.add() onde você move o foguete
    // Após mover o foguete, verifique se ele saiu da tela e, em seguida, faça o ET aparecer e se mover
    
  
}

init();

const sound = new Howl({
    src: ['Musica.mp3'],
    loop: true,
});

sound.play();
