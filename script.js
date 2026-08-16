const formulario = document.getElementById('formulario');
const busca = document.getElementById('busca');
const cidade = document.getElementById('cidade');
const click = document.getElementById('click');
const dados = document.getElementById('dados');
const icone = document.getElementById('icone');
const temperatura = document.getElementById('temperatura');
const tempItem1 = document.getElementById('tempItem1');
const tempItem2 = document.getElementById('tempItem2');



const buscarClima =  async(parametroUrl) => {
    const resposta = await fetch(`https://api.openweathermap.org/data/2.5/weather?${parametroUrl}&appid=${API_KEY1}&units=metric&lang=pt_br`);
    const dadosClima = await resposta.json();
    console.log(dadosClima);
    // Lógica para exibir dados do clima
    cidade.textContent = dadosClima.name;
    temperatura.textContent = `${Math.round(dadosClima.main.temp)}°C`;
    dados.textContent = dadosClima.weather[0].description;
    tempItem1.textContent = `${Math.round(dadosClima.main.temp_min)}°C`;
    tempItem2.textContent = `${Math.round(dadosClima.main.temp_max)}°C`;
    icone.src = `https://openweathermap.org/img/wn/${dadosClima.weather[0].icon}@2x.png`;
};

formulario.addEventListener('submit', async(evento) => {
    evento.preventDefault();
    buscarClima(`q=${busca.value}`);
});

navigator.geolocation.getCurrentPosition(
    (posicao) => {
        const latitude = posicao.coords.latitude;
        const longitude = posicao.coords.longitude;
        buscarClima(`lat=${latitude}&lon=${longitude}`);
    }, (error) => {
        console.error(error);
    }
);