const Temperatura = () => {
    return (
        <div className="container">
            <h2 className="text-center">A Temperatura</h2>
            <div>
                A temperatura é o fenómeno fisico da agitação das moléculas, indicando se um corpo está quente ou frio. Esta, pode ser medida em celsius ou em Fahrenheit, medida imperial ou métrica
            </div>
            <h3 className="text-center mt-5">Sensor responsavel</h3>
            <div>
                O sensor responsavel pela monitorização da temperatura é o: <strong>BME280</strong>. Os dados da temperatura são recolhidos de 60 em 60 segundos
                <img 
                    src="https://www.distrelec.de/Web/WebShopImages/landscape_large/2-/01/Adafruit-2652-30091192-01.jpg"
                    alt="Picture of the sensor"
                    loading="lazy"
                    style={{"width": "100%", "height": "auto"}}
                    className='img-fluid'
                />
                <div>Imagem por <a href="https://www.distrelec.de">Ditrelec.de</a></div>
            </div>
        </div>
    )
}

export default Temperatura