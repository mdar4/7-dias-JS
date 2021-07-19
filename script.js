// keyup é quando aperta a tecla e solta, keydown é quando a tecla fica pressionada
document.body.addEventListener('keyup', (event)=>{
    // identificar qual tecla foi apertada
    //   console.log(event.code); identifica as teclas
    playSound(event.code.toLowerCase());
    
});

// evento que ativa o botão
document.querySelector('.composer button').addEventListener('click', ()=> {
    //pegando os valores do input
    let song = document.querySelector('#input').value;
    
    // se diferente de vazio, coloca os valores dentro de um array
    if(song !== ''){
        let songList = song.split('');
        
        playComposition(songList);
    }
});

function playSound(sound) {
    let audioElement = document.querySelector(`#s_${sound}`);
    let keyElement = document.querySelector(`div[data-key="${sound}"]`);

    if(audioElement) {
        // zera o evento 
        audioElement.currentTime = 0;
        // toca o som 
        audioElement.play();
    }

    if(keyElement) {
        // acessa a classe active para criar animação das teclas (liga)
        keyElement.classList.add('active');

        setTimeout(()=>{
            // desliga a animação ao fim de cada click
            keyElement.classList.remove('active');
        }, 300);
    }
}

function playComposition(songList) {
    let wait = 0;

    for(let songItem of songList){
        setTimeout(()=> {
            playSound(`key${songItem}`);
        }, wait);

        wait += 250;
    }
}