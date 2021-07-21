document.querySelector('.busca').addEventListener('submit',async(event)=>{
    // previne o comportamento padrão do fórmulário
    event.preventDefault();
    // criando acesso ao que o usuároo digitou
    let input = document.querySelector('#searchInput').value;
    if(input !== ''){  
        clearInfo()
        showWarning('Carregando...');
    
        // API
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=3d16ebb17c6a812088e169e8d524f596&units=metric&lang=pt_br`;

        // requisitando a API e salvando os dados de resposta em json
        let results = await fetch(url);
        let json = await results.json();
        
        if(json.cod === 200){
            showInfo({
                name : json.name,
                country : json.sys.country,
                temp : json.main.temp,
                tempIcon : json.weather[0].icon,
                windSpeed : json.wind.speed,
                windAngle : json.wind.deg
            });
        }else {
            clearInfo();
            showWarning('Localização inválida.');
        }
    } else {
        clearInfo();
    }
});

function showInfo(json){
    showWarning(''); // para que o carregando saia da tela

    document.querySelector('.titulo').innerHTML = `${json.name}, ${json.country}`;
    document.querySelector('.tempInfo').innerHTML = `${json.temp}<sup>°C</sup>`;
    document.querySelector('.ventoInfo').innerHTML = `${json.windSpeed}<span>km/h</span>`;

    document.querySelector('.temp img').setAttribute('scr', `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`);
    
    document.querySelector('.ventoPonto').style.transform = `rotate(${json.windAngle -90})deg`;

    document.querySelector('.resultado').style.display = 'block';
}

function clearInfo(){
    showWarning('');
    document.querySelector('.resultado').style.display = 'none';
}

function showWarning(msg){
    document.querySelector('.aviso').innerHTML=msg;
}