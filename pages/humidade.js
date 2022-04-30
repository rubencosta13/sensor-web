const Humidade = () => {
    return (
        <div className="container">
            <h2 className="text-center">A Humidade</h2>
            <div>
                A humidade é associada à quantidade de vapor de água existente no ar. No nosso sensor, esta, é medida em percentagem. A contagem é feita de minuto a minuto
            </div>
            <h3 className="text-center mt-5">Sensor responsavel</h3>
            <div>
                O sensor responsavel pela monitorização da humidade é o: <strong>BME280</strong>.
                <img 
                    src="https://www.distrelec.de/Web/WebShopImages/landscape_large/2-/01/Adafruit-2652-30091192-01.jpg"
                    alt="Picture of the sensor"
                    style={{"width": "100%", "height": "auto"}}
                    className='img-fluid'
                />
                <div>Imagem por <a href="https://www.distrelec.de">Ditrelec.de</a></div>
            </div>
        </div>
    )
}

export default Humidade