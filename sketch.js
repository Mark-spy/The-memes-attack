// Entidades
var aranha, ednaldo, ednaldoScore, faustao, obunga, shrek, troll, trollScore, player;
var aranhaImg, ednaldoImg, faustaoImg, obungaImg, shrekImg, trollFaceImg, trollTernoImg;
var sweep, sweepImg, blaster, blasterImg;
var playerLostImg, playerImg;

//Objetos e fundo
var rua, start, startDois, cebola, cebolaDois, nota, intro;
var portaImg, ruaImg, startImg, cebolaImg, notaImg, introImg, controles, controlesImg;

//Efeitos sonoros
var plim, pam, sus, vaiMorre, errou, destruiu, jumpscare, pereira, acertou, peee, camadas, cebolas;
var cebolasLoop, kkk, risadaUm, risadaDois, risadinha, risadaMaligna, banido;
var gottaSweep, sweepTime, uin, pou;

//Trilha sonora
var musMenu, musJogando, musPerdeu, musVenceu, musTrollado;

//Score
var cebolasColetadas = 0;
var distancia = 0;

//Variáveis para o ednaldo pereira
var protecao = 0;
var imune = 0;
var imunidade = 0;

//Outras variáveis para o funcionamento geral...
var fase = 1; //(Contagem de fases)
var riu = 0; //Para a risda da aranha não repetir
var gotta = 0; //Para a risada do Sweep não repetir
var trollado = 0; // Para não ser trollado mais de uma vez em um ataque
var satisfeito = 0;
var fome = 1;

//Variáveis para a geração de personagens e... CEBOLAAAAAAAAAAAAASSSSSSSSSSSS
var cebolaChance = 0;
var cebolasGeradas = 0;
var cebolaDoisChance = 0;
var cebolasDoisGeradas = 0;
var ednaldoChance = 0;
var ednaldosGerados = 0;
var aranhaChance = 0;
var aranhasGeradas = 0;
var shrekChance = 0;
var shreksGerados = 0;
var faustaoChance = 0;
var faustoesGerados = 0;
var trollChance = 0;
var trollsGerados = 0;
var sweepChance = 0;
var sweepGerados = 0;
var blasterChance = 0;
var blasterGerados = 0;

//Estados: 0 = Menu / 1 = Jogando / 2 = Perdeu / 3 = Ganhou
var estado = 0;

function preload(){
    //Entidades
    aranhaImg = loadImage("aranha.png");
    sweepImg = loadImage("swep.png");
    blasterImg = loadImage("blaster.png");
    ednaldoImg = loadImage("ednaldo-pereira.png");
    faustaoImg = loadImage("faustao.png");
    obungaImg = loadImage("obunga.png");
    shrekImg = loadImage("shrek.png");
    trollFaceImg = loadImage("troll-face.png");
    trollTernoImg = loadImage("troll-terno.png");
    playerImg = loadImage("mario.png");
    playerLostImg = loadImage("mario-lost.png");

    //Objetos
    ruaImg = loadImage("rua.png");
    startImg = loadImage("start.png");
    cebolaImg = loadImage("cebola.png");
    introImg = loadImage("intro.png");
    controlesImg = loadImage("controles.png")

    //Efeitos sonoros
    sus = loadSound("sus.mp3");
    vaiMorre = loadSound("vai-morrer.mp3");
    errou = loadSound("errou.mp3");
    destruiu = loadSound("você-destruiu.mp3");
    jumpscare = loadSound("jumpscare.mp3");
    pereira = loadSound("ednaldo-efeito.mp3");
    camadas = loadSound("camadas.mp3");
    cebolas = loadSound("cebolas.mp3");
    cebolasLoop = loadSound("cebolas.mp3");
    kkk = loadSound("kkk.mp3");
    risadaUm = loadSound("risada-1.mp3");
    risadaDois = loadSound("risada-2.mp3");
    risadinha = loadSound("risadinha.mp3");
    risadaMaligna = loadSound("risada-maligna.mp3");
    banido = loadSound("banido.mp3");
    gottaSweep = loadSound("gotta_sweep.mp3");
    sweepTime = loadSound("sweep_time.mp3");
    uin = loadSound("uin.mp3");
    pou = loadSound("pou.mp3");
    click = loadSound("click.mp3");

    //Trilha sonora
    musMenu = loadSound("carnival-kerfuffl.mp3");
    musJogando = loadSound("botanic-panic.mp3")
    musPerdeu = loadSound("spider-dance.mp3");
    musVenceu = loadSound("funfair-fever.mp3");
    musTrollado = loadSound("trolled.mp3")
}

function setup() {
  createCanvas(1370,650);

  //Loop da rua
  musMenu.loop();
  rua = createSprite(600,300);
  rua.addImage("rua",ruaImg);
  rua.scale = 1.25;
  rua.velocityY = 10

  //Personagens iniciais
  rua.depht = rua.depht + 100;
  player = createSprite (600,300);
  player.addImage ("player", playerImg)
  player.scale = 0.4;
  obunga = createSprite (600,560);
  obunga.addImage ("obunga", obungaImg);
  obunga.scale = 0.8;
  imagensGroup = new Group();
  ednaldoScore = createSprite (1300, 600);
  ednaldoScore.addImage ("ednaldo", ednaldoImg);
  ednaldoScore.scale = 0.3;
  ednaldoScore.visible = false;

  //Menu
  intro = createSprite(600,300);
  intro.addImage("intro",introImg);
  intro.scale = 0.95
  start = createSprite(600,300);
  start.addImage("start",startImg);
  start.scale = 0.25
  intro.depht = start.depht - 1

  //Colisão para o jogador não fugir do Obunga assim tão facilmente...
  bordasGroup = new Group();
  cima = createSprite(600, 0, 2000, 1);
  esquerda = createSprite(0, 300, 1, 1000);
  direita = createSprite(1200, 300, 1 , 1000);
  baixo = createSprite(600, 650, 2000, 1);
  bordasGroup.add(cima);
  bordasGroup.add(esquerda);
  bordasGroup.add(direita);
  bordasGroup.add(baixo);
  direita.visible = false;

  //Esta barreira é para  barrar personagens ou objetos que não...
  //... interagiram com o player
  limite = createSprite(600, 700, 2000, 1);
  limiteAranha = createSprite(600, 1200, 2000, 1);
}

function draw() {
  //Loop da rua e do score
  background("grey");
  if (rua.y > 640) {
    rua.y = 15
  }

  fill("black")
  text("Distance: "+ distancia, 1250,10);
  text("Onions: "+ cebolasColetadas, 1250,30);

  //Start
  if(estado == 0){
    if(mousePressedOver(start)){
      estado = 4;
      click.play();
      start.remove
      controles = createSprite(600, 350);
      controles.addImage("controles", controlesImg);
      controles.scale = 1.35;
      startDois = createSprite(600,550);
      startDois.addImage("startDois",startImg);
      startDois.scale = 0.25 
    }
  }

  if(estado == 4){
    if(mousePressedOver(startDois)){
      iniciando();
      controles.visible = false;
      startDois.scale = 0;
      estado = 1;
      intro.visible = false;
      start.scale = 0;
      musMenu.stop();
    }
  }

  //Uma correção de um bug envolvendo cebolas.loop()
  if (shreksGerados == 0){
    cebolasLoop.stop();
  }

  //Jogatina
  if (estado == 1){

    //Sistema do controle da corrida do player
    distancia = distancia + 0.1
    player.velocityY = player.velocityY + 0.3;
    if ((mouseWentDown()) || (keyDown("space"))){
      if ((player.velocityY > 0) && (trollado == 0)){
        player.velocityY = 0;
      }
     player.velocityY = player.velocityY - 3;
    }
    if (keyDown("a")){
      player.velocityX = -20;
    } else if ((keyDown("d"))) {
      player . velocityX = 20;
    } else {
      player.velocityX = 0;
    }
    if (keyDown("s")){
      if (player.velocityY < 0){
        player.velocityY = 0;
      }
      player.velocityY = player.velocityY + 0.2;
    }
    player.collide(bordasGroup);

    //Fases
    if ((distancia >= 100) && (distancia < 200)){
      fase = 2;
    }
    if ((distancia >= 200) && (distancia < 300)){
      fase = 3;
    }
    if ((distancia >=300) && (distancia < 400)){
      fase = 4;
    }
    if (distancia >= 400){
       fase = 5
    }       

    //Personagens mais complexos
    //Ednaldo pereira
    ednaldoConf()
    if (ednaldosGerados == 1){
      if ((ednaldo.isTouching(player)) && (protecao == 0)){
       protecao = 1
       pereira.play();
       ednaldo.remove();
      }
      if (ednaldo.isTouching(limite)){
       ednaldo.remove();
       ednaldosGerados = 0;
      }
      if (imune == 1){
        imunidade = imunidade + 1;
      }
      if (protecao == 1){
        ednaldoScore.visible = true;
      }
      if (imunidade >= 100){
        imune = 0;
        imunidade = 0;
        protecao = 0;
        ednaldosGerados = 0;
        ednaldoScore.visible = false;
        obunga.visible = true;
      }
    } 

    //Troll face
    trollConf();
    if (trollsGerados == 1){
      if ((troll.isTouching(player)) && (protecao == 0) && (trollado == 0)){
        trollando();
      } else if ((troll.isTouching(player)) && (protecao == 1) && (trollado == 0)){
        protegendoTroll();
      }
      if (troll.isTouching(limite)){
       trollado = 0;
       trollsGerados = 0;
       troll.remove();
      }
      if ((troll.isTouching(baixo)) && (trollado == 0)){
        revelando();
      }
    }

    //Sweep
    sweepConf()
    if(sweepGerados == 1){
      if((sweep.isTouching(ednaldoScore)) && (protecao == 1)){
        imunidade = 100;
      }
      if((sweep.isTouching(trollScore)) && (trollado == 1) && (estado == 2) && (trollScore != undefined)){
        trollScore.visible = false;
      }
    }

    //1: Obunga e cebolas (O Shrek só aparece na próxima fase)
    if ((fase == 1) || (fase == 2) || (fase == 3) || (fase == 4) || (fase == 5)){
       if ((obunga.isTouching(player)) && (protecao == 0)){
        estado = 2;
        perdendoParaObunga();
       } else if ((obunga.isTouching(player)) && (protecao == 1)){
        protegendoObunga();
        obunga.visible = false;
        inimigo = 0;
       }
       obunga.x = player.x;
       cebolasConf();
       cebolasConfDois();
       if (cebolasGeradas == 1){
         if (cebola.isTouching(player)){
          cebolasColetadas = cebolasColetadas + 1;
          cebolasGeradas = 0;
          cebolas.play();
          cebola.remove();
         }
         if (cebola.isTouching(limite)){
          cebola.remove();
          cebolasGeradas = 0;
         }
       }
    if (cebolasDoisGeradas == 1){
      if (cebolaDois.isTouching(player)){
       cebolasColetadas = cebolasColetadas + 1;
       cebolasDoisGeradas = 0;
       cebolas.play();
       cebolaDois.remove();
      }
      if (cebolaDois.isTouching(limite)){
       cebolaDois.remove();
       cebolasDoisGeradas = 0;
      }
    }
  }
    //2
    if ((fase == 2) || (fase == 3) || (fase == 4) || (fase == 5)){
      shrekConf();
      if (shreksGerados == 1){
        shrek.x = player.x;
       if ((shrek.isTouching(player)) && (protecao == 0) && (cebolasColetadas < 7)){
          estado = 2;
         perdendoParaShrek();
       } else if ((shrek.isTouching(player)) && (protecao == 1) && (cebolasColetadas < 7)){
          shreksGerados = 0;
         protegendoShrek();
       } else if ((shrek.isTouching(player)) && (cebolasColetadas >= 7)){
          shrek.visible = false;
          shrek.remove;
          shreksGerados = 0;
          shrekSatisfeito()
       }
      }
    }

    //3
    if ((fase == 3) || (fase == 4) || (fase == 5)){
      aranhaConf();
      if (aranhasGeradas == 1){
        if ((aranha.isTouching(player)) && (protecao == 0)){
          estado = 2;
          perdendoParaAranha();
        } else if ((aranha.isTouching(player)) && (protecao == 1)){
          aranhasGeradas = 0;
          protegendoAranha();
        }
        if (aranha.isTouching(limiteAranha)){
         aranha.remove();
         aranhasGeradas = 0;
         riu = 0;
        }
        if ((aranha.isTouching(cima)) && (riu == 0)){
          risadaDois.play();
          riu = 1;
        }
      }
    }

    //4
    if ((fase == 4) || (fase == 5)){
      blasterConf();
      if (blasterGerados == 1){
        if ((blaster.isTouching(player)) && (protecao == 0)){
          estado = 2;
          perdendoParaBlaster();
        } else if ((blaster.isTouching(player)) && (protecao == 1)){
          blasterGerados = 0;
          protegendoBlaster();
        }
      }
    }
    //5
    if (fase == 5){
      faustaoConf();
      if (faustoesGerados == 1){
        if (faustao.isTouching(player)){
          destruindoOvo();
          faustao.visible = false;
          faustao.remove();
          musJogando.stop();
          cebolasLoop.stop();
          camadas.stop();
          kkk.play();
        }
        if (faustao.isTouching(limite)){
         faustao.remove();
         faustoesGerados = 0;
         errou.play();
        }
      }
    }
  }

  //Caso o jogador M0RR4
  if ((estado == 2) && (protecao == 0)){
    player.velocityX = 0;
    player.velocityY = 0;
    rua.velocityY = 0;
    musJogando.stop();
    risadinha.stop();
    imagensGroup.velocityY = 0;
    text("YOU DIED!!!", 1250,50);
    player.addImage("player", playerLostImg);
    player.scale = 0.3;
  }

  //Caso o jogador VENÇA!
  if (estado == 3){
    text("VOCÊ VENCEU!!!", 1250,50);
    cebolasLoop.stop();
    camadas.stop();
    risadinha.stop();
    kkk.stop();
    player.velocityX = 0;
    player.velocityY = 0;
    ednaldoScore.visible = false;
  }
  drawSprites();
}

function iniciando(){
  musJogando.loop();
  vaiMorre.play();
  click.play();
}
//Configurações das ações dos personagens
//Obunga
function perdendoParaObunga(){
  if(trollado == 0){
    musPerdeu.loop();
  } else if (trollado == 1){
    musTrollado.play();
    kkk.stop();
    trollScore = createSprite (1300, 600);
    trollScore.scale = 0.2
    trollScore. addImage("troll", trollTernoImg);
  }
  jumpscare.play();
  imagensGroup.destroyEach();
}

//Ednaldo ADM
function ednaldoConf(){
  ednaldoChance = Math.floor(Math.random() * 2501);
  if ((ednaldoChance == 2500) && (ednaldosGerados == 0)){
    ednaldo = createSprite (Math.floor(Math.random() * 1151), -30);
    ednaldo.addImage ("ednalado", ednaldoImg);
    ednaldo.velocityY = 10;
    ednaldo.scale = 0.3;
    ednaldosGerados = 1;
    imagensGroup.add(ednaldo);
  }
 }
function protegendoObunga(){
  if (imune == 0){
    imune = 1;
    banido.play()
    ednaldoScore.visible = false;
  }
}
function protegendoAranha(){
  banido.play();
  imunidade = 100;
  aranha.remove;
}
function protegendoShrek(){
  banido.play();
  imunidade = 100;
  shrek.visible = false;
  shrek.remove;
  cebolasLoop.stop();
}
function protegendoTroll(){
  banido.play();
  imunidade = 100;
  revelando();
}
function protegendoBlaster(){
  banido.play();
  imunidade = 100;
  blaster.remove;
}

//Aranha
function aranhaConf(){
  aranhaChance = Math.floor(Math.random() * 1001);
  if ((aranhaChance == 100) && (aranhasGeradas == 0)){
    aranha = createSprite (player.x, -600);
    aranha.addImage ("aranha", aranhaImg);
    aranha.velocityY = 10;
    aranha.scale = 1.1;
    aranhasGeradas = 1;
    imagensGroup.add(aranha);
    risadaUm.play();
  }
}
function perdendoParaAranha(){
  musPerdeu.loop();
  risadaMaligna.play();
  aranha.velocityY = 0;
  risadaUm.stop();
  risadaDois.stop();
}

//Blaster
function blasterConf(){
  blasterChance = Math.floor(Math.random() * 1001);
  if ((blasterChance == 1000) && (blasterGerados == 0)){
    blaster = createSprite(1500, player.y);
    blaster.addImage ("blaster", blasterImg);
    blaster.scale = 0.5;
    blasterGerados = 1;
    imagensGroup.add(blaster);
    uin.play();
    setTimeout(function() {
      blaster.velocityX = -50;
      pou.play();
    }, 1000);
    setTimeout(function() {
      blaster.remove;
      blasterGerados = 0;
    }, 2000);
  }
}

function perdendoParaBlaster(){
  musPerdeu.loop();
}


//Shrek
function shrekConf(){
  shrekChance = Math.floor(Math.random() * 1501);
  if ((shrekChance == 1500) && (shreksGerados == 0)){
    shrek = createSprite (player.x, -50);
    shrek.addImage ("shrek", shrekImg);
    shrek.velocityY = 5;
    shrek.scale = 0.2;
    shreksGerados = 1;
    imagensGroup.add(shrek);
    cebolasLoop.loop();
  }
}
function perdendoParaShrek(){
  musPerdeu.loop();
  cebolasLoop.stop();
  camadas.play();
  shrek.velocityY = 0;
}
function shrekSatisfeito(){
  cebolasColetadas = cebolasColetadas - 7;
  cebolasLoop.stop();
  camadas.play();
}
function cebolasConf(){
  cebolaChance = Math.floor(Math.random() * 76);
  if ((cebolaChance == 75) && (cebolasGeradas == 0)){
    cebola = createSprite (Math.floor((Math.random() * 1176) + 25), -50);
    cebola.addImage ("cebola", cebolaImg);
    cebola.velocityY = 10;
    cebola.scale = 0.2;
    cebolasGeradas = 1;
    imagensGroup.add(cebola);
  }
  }
function cebolasConfDois(){
  cebolaDoisChance = Math.floor(Math.random() * 76);
  if ((cebolaDoisChance == 75) && (cebolasDoisGeradas == 0)){
    cebolaDois = createSprite (Math.floor((Math.random() * 1176) + 25), -50);
    cebolaDois.addImage ("cebola", cebolaImg);
    cebolaDois.velocityY = 10;
    cebolaDois.scale = 0.2;
    cebolasDoisGeradas = 1;
    imagensGroup.add(cebolaDois);
  }
  }
  //Faustão
function faustaoConf(){
  faustaoChance = Math.floor(Math.random() * 1001);
  if ((faustaoChance == 1000) && (faustoesGerados == 0)){
    faustao = createSprite (Math.floor(Math.random() * 1151), -50);
    faustao.addImage ("faustao", faustaoImg);
    faustao.velocityY = 15;
    faustao.scale = 0.2;
    faustoesGerados = 1;
    imagensGroup.add(faustao);
  }
}
function destruindoOvo(){
  musVenceu.loop();
  destruiu.play();
  estado = 3;
  intro.visible = true;
}

//Troll face
function trollConf(){
  trollChance = Math.floor(Math.random() * 2001);
  disfarce = Math.floor(Math.random() * 10);
  if ((trollChance == 2000) && (trollsGerados == 0)){
    troll = createSprite (Math.floor(Math.random() * 1151), Math.floor(Math.random() * -2000) - 500);
    troll.velocityY = 10;
    trollsGerados = 1;
    imagensGroup.add(troll);
    risadinha.play();
    if (disfarce == 0){
      troll.addImage("troll", ednaldoImg);
      troll.scale = 0.3;
    } else if (disfarce > 0){
      troll.addImage("troll", cebolaImg);
      troll.scale = 0.2;
    }
  }
}
function trollando(){
  troll.addImage("troll", trollFaceImg);
  trollado = 1;
  kkk.play();
  risadinha.stop();
  player.velocityY = player.velocityY + 20;
  troll.scale = 0.25;
}
function revelando(){
  troll.addImage ("troll", trollFaceImg);
  trollado = 1;
  sus.play();
  troll.scale = 0.25;
  risadinha.stop();
}

//Sweep
function sweepConf(){
  sweepChance = Math.floor(Math.random() * 5001);
  if ((sweepChance == 5000) && (sweepGerados == 0)){
    sweep = createSprite (1300, -100);
    sweep.addImage ("sweep", sweepImg);
    sweep.scale = 0.3;
    sweepGerados = 1;
    sweepTime.play();
    setTimeout(function() {
      gottaSweep.play();
    }, 2500);
    setTimeout(function() {
      sweep.velocityY = 50;
      cebolasColetadas = 0;
    }, 3000);
    setTimeout(function() {
      sweep.remove;
      sweepGerados = 0;
    }, 5000);
  }
}