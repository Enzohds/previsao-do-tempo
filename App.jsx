import React, {useEffect, useState} from "react";
import './App.css'

function App(){
  const [cidade,setCidade] = useState('')

  const [previsao,setPrevisao] = useState(null)

  //const data = format(new Date(), 'dd/mm/aaa')

  const api = async () => {
    const chave = '3dfbc6ac607259bf51a123037c07017a';
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${chave}`);
      if (response.ok) {
        const data = await response.json();
        setPrevisao(data);
      } else {
        console.error('Error ao obter os dados da previsao do tempo!');
      }
    } catch (error) {
      console.error('Erro ao fazer a requisicao da API', error);
    }
  };

  const conversao = (kelvin) => {
    return (kelvin - 273.15).toFixed(2)
  }

  useEffect(() => {
    api();
  }, [])

  return (
    <div className="App">
      <h1>Previsao do Tempo</h1>

      <input 
      type="text"
      value={cidade}
      onChange={(e) => setCidade(e.target.value)}

      placeholder="Digite o nome da cidade"
      />

      <button onClick={api}>
         Obter Previsão do Tempo
      </button>
      {previsao && (
        <div className="info">

          <h3>{previsao.weather[0].description}</h3>

          <img
            className="weather-icon"
            src={`https://openweathermap.org/img/w/${previsao.weather[0].icon}.png`}
            alt="Ícone do Tempo"
          />

          <b>Minima: </b> {conversao(previsao.main.temp_min)}°C
          <b>Maxima: </b> {conversao(previsao.main.temp_max)}°C
          <b>Graus: </b> {conversao(previsao.main.temp)}°C
          <b>Vento: </b> {conversao(previsao.wind.speed)} m/s
          <b>Umidade: </b> {conversao(previsao.main.humidity)}%

        </div>
      )}


    </div>
  )
}

export default App;
