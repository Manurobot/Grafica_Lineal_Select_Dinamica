import React from 'react';
import { Line } from 'react-chartjs-2';
import { useDispatch, useSelector } from "react-redux";
import { getData } from "./acciones/rangosAcciones";

function App() {

  const dispatch = useDispatch();
  const state = useSelector(state => state.bitcoin)
  const [pais, setPais] = React.useState("");
  const [estatus, setEstatus] = React.useState("");
  const [mes, setMes] = React.useState("");
  const fetchData = () => {
    dispatch(getData({
      pais: pais,
      estatus: estatus,
      mes: mes
  }))
  }

  return (
    <div className="container">
      {state.loading && <p>Esperando el proceso...</p>}
      <div className="row">
        <div className="col-8">                
          <div className={"chart-wrapper"}>
          <Line
            data={state.data}
            />
          </div>
        </div>  
        <div className="col-4">
          <div className="row">
            <div className="col-lg-12 p-2">
              <b>Países:</b>
              <select className="custom-select m-4" value={pais} onChange={e => setPais(e.target.value)}>
                <option>Seleccion una opcion ...</option>
                  <option value="mexico">México</option>
                  <option value="japan">Japón</option>
                  <option value="brazil">Brasil</option>
                  <option value="italy">Italia</option>
                </select>
           </div>
            <div className="col-lg-12">
                      <b>Casos:</b>
              <select className="custom-select m-4" value={estatus} onChange={e => setEstatus(e.target.value)}>
                <option>Seleccion una opcion ...</option>
                  <option value="confirmed">Confirmados</option>
                  <option value="deaths">Muertos</option>
              </select>
            </div>
            <div className="col-lg-12">
              <b>Meses:</b>
              <select className="custom-select m-4" value={mes} onChange={a => setMes(a.target.value)}>
                <option>Seleccion una opcion ...</option>
                <option value="12">Todos los meses</option>
                <option value="0">Enero</option>
                <option value="1">Febrero</option>
                <option value="2">Marzo</option>
                <option value="3">Abril</option>
                <option value="4">Mayo</option>
                <option value="5">Junio</option>
                <option value="6">Julio</option>
                <option value="7">Agosto</option>
                <option value="8">Septiembre</option>
                <option value="9">Octubre</option>
              </select>
              </div>
            </div>
            <button className="btn btn-primary" onClick={() => fetchData("rango")}>Enviar</button>        

        </div>
      </div>
</div>
  );
}

export default App;
