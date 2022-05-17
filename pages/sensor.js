import Image from 'next/image'


const index = () => {
  return (
    <div className="container">
        <h2>O nosso sensor</h2>
        <details className='mb-4'>
            <summary>Componentes do sensor</summary>
            <ul>
                <li>NodeMCU - Microcontrolador responsavel por todo o sensor</li>
                <li>SDS011 - Sensor de Particulas</li>
                <li>BME280 - Sensor de Temperatura, Humidade e Pressão</li>
            </ul>
        </details>
        <div>Localização do sensor: <br /></div>
        <div class="d-flex justify-content-center ">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3067.094907000569!2d-8.926989784623961!3d39.759977479446825!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd220e801e03b46f%3A0x89b1517f5e7ad402!2sEscola%20Secund%C3%A1ria%2F3%20Pinhal%20do%20Rei!5e0!3m2!1spt-PT!2spt!4v1651263087980!5m2!1spt-PT!2spt" width="100%" height="100%" allowfullscreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
        </div>
        <div>
            Este sensor, está programado para recolher dados de 60 em 60 segundos. Este, depois envia os dados para uma API, a qual é utilizada por este website.<br></br>
        </div>
        <div class="d-flex flex-row mt-5">

            <div className="col-md-6">
                <img
                src="https://i.imgur.com/GeX7i0I.jpeg"
                alt="Sensor's Image"
                loading='lazy'
                style={{"width": "100%", "height": "auto"}}
                className='img-fluid'
            />   
            </div>
            <div className="col-md-6">
                <img
                    src="https://sensor.community/docs/airrohr/sds011-jammed-into-tube.jpeg"
                    loading='lazy'
                    alt="Sensor's Image"
                    style={{"width": "100%", "height": "auto"}}
                    className='img-fluid'
                /><div>Imagem por: <a href="https://sensor.community/en/sensors/airrohr/">Sensor Community</a></div> 
            </div>
        </div>
    </div>
    
  )
}

export default index