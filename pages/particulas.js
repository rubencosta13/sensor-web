const Particulas = () => {
  return (
    <div className="container">
        <h2 className="text-center">As Particulas</h2>
        <div>As PM (Particulas Materiais) podem ser classificadas quanto à dimensão do seu diâmetro aerodinâmico equivalente, termo usado para definir as propriedades aerodinâmicas das partículas, é definido como sendo o diâmetro de uma esfera equivalente</div>
        <div className="mb-4">
            <h3 className="text-center">Particulas PM 10</h3>
            <div>(PM10) partículas de pequenas dimensões com um diâmetro aerodinâmico equivalente inferior a 10 micrómetros De forma a garantir a proteção das pessoas à exposição deste poluente, foi estabelecido o valor limite (VL) diário de PM10 (50 μg/m3, que não deve ser excedido mais de 35 dias por ano civil) e do VL anual (40 μg/m3). </div>
            
            <div>São utilizados dois indicadores para avaliar a exposição às partículas PM10: o número de excedências ao valor limite diário e o valor limite da média anual, e sempre que os níveis medidos se encontrem acima do VL devem ser implementadas medidas, no mais curto espaço de tempo, para garantir que a população não esteja exposta a níveis que representem riscos significativos para a saúde</div>
            <h3 className="text-center">Particulas PM 2.5</h3>
            <div>(PM2.5)  partículas de  pequenas dimensões com um diâmetro aerodinâmico equivalente inferior a 2.5 micrómetro são geradas principalmente pela queima de combustível fóssil por veículos e pela queima de 21 biomassa por indústrias.</div>
            <hr/>
        </div>
        <div>Na tabela que se segue, são apresentados os valores para a classificação das particulas</div>
        <div className="row justify-content-center"> 
            <div className="table-responsive col-auto" style={{"width": "60%"}} >
                <table className="table p-3 mb-2">
                    <thead className="text-center">
                        <tr style={{"backgroundColor": "grey"}}>
                        <th scope="col">Classificação</th>
                        <th scope="col">PM10</th>
                        <th scope="col">PM2.5</th>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        <tr>
                            <th scope="row" style={{"backgroundColor": "#178509"}} className=" text-white">Muito Bom</th>
                            <td>0-20</td>
                            <td>0-10</td>
                        </tr>
                        <tr>
                            <th scope="row"  className="text-white bg-success">Bom</th>
                            <td>21-35</td>
                            <td>11-20</td>
                        </tr>
                        <tr>
                            <th scope="row" className="bg-warning text-white">Médio</th>
                            <td>36-50</td>
                            <td>21-25</td>                    
                        </tr>
                        <tr>
                            <th scope="row" style={{"backgroundColor": "#FFA500"}} className="text-white">Fraco</th>
                            <td>51-100</td>
                            <td>26-50</td>                    
                        </tr>
                        <tr>
                            <th scope="row" className="bg-danger text-white">Mau</th>
                            <td>101-1200</td>
                            <td>51-800</td>                    
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  )
}

export default Particulas