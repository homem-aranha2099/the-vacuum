const cursor = document.getElementById('custom-cursor');
const cursorVideos = document.querySelectorAll('.cursorVideo');
const up = document.querySelector('.up');
const down = document.querySelector('.down');
const left = document.querySelector('.left');
const right = document.querySelector('.right');
const defaultx = document.querySelector('.default');

let previousX = 0;
let previousY = 0;
let isMoving = false;
let idleTimer;
let idleRedirectTimer;
let valor = 0;



// Posiciona o cursor na tela
document.addEventListener('mousemove', e => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
});

document.addEventListener('mousemove', (event) => {
  const currentX = event.clientX;
  const currentY = event.clientY;

  let speed = 0;
  let directionDegrees = 0;

  if (isMoving) {
    const dx = currentX - previousX;
    const dy = currentY - previousY;

    speed = Math.sqrt(dx * dx + dy * dy);
    const direction = Math.atan2(dy, dx);
    directionDegrees = direction * (180 / Math.PI);
  }

  // Mostra apenas o vídeo correto
  cursorVideos.forEach(v => v.classList.add('hidden'));
  if (directionDegrees > 45 && directionDegrees < 135) {
    down.classList.remove('hidden');
  } else if (directionDegrees < -45 && directionDegrees > -135) {
    up.classList.remove('hidden');
  } else if (directionDegrees >= -45 && directionDegrees <= 45) {
    right.classList.remove('hidden');
  } else if (directionDegrees >= 135 || directionDegrees <= -135) {
    left.classList.remove('hidden');
  } else {
    defaultx.classList.remove('hidden');
  }

  // Ajusta a velocidade do vídeo visível
  const activeVideo = document.querySelector('.cursorVideo:not(.hidden)');
  if (activeVideo) {
    activeVideo.play();
    activeVideo.playbackRate = Math.min(Math.max(speed / 5, 0), 16);
  }

  previousX = currentX;
  previousY = currentY;
  isMoving = true;

  clearTimeout(idleTimer);
  idleTimer = setTimeout(() => {
    up.classList.add('hidden');
    down.classList.add('hidden');
    left.classList.add('hidden');
    right.classList.add('hidden');
    defaultx.classList.remove('hidden');
  }, 200);

  clearTimeout(idleRedirectTimer);
  idleRedirectTimer = setTimeout(() => {
    window.location.href = "desistencia.html"; // troque pelo HTML que deseja
  }, 30000); // 1000ms = 1 segundo


});

document.addEventListener('mousemove', (event) => {
    // ... código existente ...

    // Cria a fumacinha
    const smoke = document.createElement('div');
    smoke.classList.add('smoke');
    smoke.style.left = event.clientX + 'px';
    smoke.style.top = event.clientY + 'px';
    document.body.appendChild(smoke);

    // Remove a div depois da animação
    setTimeout(() => {
        smoke.remove();
    }, 1000); // deve ser igual à duração da animação
});

const blocosPretos = document.querySelectorAll('.bloco');

blocosPretos.forEach(bloco => {
  const bg = window.getComputedStyle(bloco).backgroundColor;

  // Só aplica se a cor de fundo for preta
  if (bg === "rgb(0, 0, 0)") {
    bloco.addEventListener("mouseover", morte);
  }
});



function morte() {
  localStorage.setItem("morte", valor);
  window.location.href = "dead.html";
}

function vencedor(){
  window.location.href = "win.html";
}

function fase2(){
  window.location.href = "winfase2.html";
}

function fase3(){
  window.location.href = "winfase3.html";
}

function fase4(){
  window.location.href = "winfase4.html";
}

function fase5(){
  window.location.href = "winfase5.html";
}

function susto() {
  const jumpscare = document.getElementById("jumpscare");
  const scream = document.getElementById("scream");

  jumpscare.classList.add("active");
  scream.currentTime = 0;
  scream.play();

  // Remove o jumpscare depois de 3 segundos
  setTimeout(() => {
    valor = 1;
    morte();
  }, 2800);
}




const music = document.getElementById('playerMusica');
const vento = document.getElementById('vento');
music.currentTime = 5;
vento.volume = 0.2;


  

