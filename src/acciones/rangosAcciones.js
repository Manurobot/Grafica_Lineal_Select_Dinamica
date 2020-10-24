import axios from "axios";
import moment from "moment";


export const getData = ({ mes, pais, estatus}) => async dispatch => {
  try {
    dispatch({
      type: "AWAITING_BITCOIN"
    })

    var paisLabel, backgroundColor, borderColor, pointBorderColor, desde, a, hoy;

    switch (pais) {
      case "mexico":
        paisLabel = "México";
        backgroundColor = "rgba(6, 112, 72, 0.5)";
        borderColor = "rgba(6, 112, 72, 1)";
        pointBorderColor = "rgba(6, 112, 72, 1)";
        break;
      case "japan":
        paisLabel = "Japón";
        backgroundColor = 'rgba(188, 0, 45, 0.5)';
        borderColor = "rgba(188, 0, 45, 1)";
        pointBorderColor = "rgba(188, 0, 45, 1)";        
        break;
      case "brazil":
        paisLabel = "Brasil";
        backgroundColor = 'rgba(255, 223, 0,0.5)';
        borderColor = "rgba(255, 223, 0, 1)";
        pointBorderColor = "rgba(255, 223, 0, 1)";        
        break;
      case "italy":
        paisLabel = "Italia";
        backgroundColor = 'rgba(0, 51, 153,0.5)';
        borderColor = "rgba(0, 51, 153, 1)";   
        pointBorderColor = "rgba(0, 51, 153, 1)";        
        break;      
      default:
        break;
    }

    if (mes === 12)
    {
        desde = moment().month(0).startOf('month').format("YYYY-MM-DD")
        a = moment().format("YYYY-MM-DD")
    } else {
        desde = moment().month(mes).startOf('month').format("YYYY-MM-DD")
        a = moment().month(mes).endOf('month').format("YYYY-MM-DD")
        hoy = moment().format("YYYY-MM-DD")
      }

    if (a > hoy)
    {
      a = hoy;
    }
    
      const response = await axios
        .get(`https://api.covid19api.com/country/${pais}/status/${estatus}?from=${desde}&to=${a}`)
    
      const labels = [];
      const data = [];
      const label = [];
    
      label.unshift('En '+paisLabel+ ' se han registrado el rango de ' + (estatus === 'confirmed' ? ("Confirmados") : ("Muertos")))
    
      for (let i = 0; i < response.data.length; i++) {
        labels.unshift(moment(response.data[i].Date).add(1,'day').format("DD/MM/YYYY"))
        data.unshift(response.data[i].Cases)
      }
    
    labels.reverse()
    data.reverse()

    dispatch({
      type: "SUCCESS_BITCOIN",
      payload: {
        data,
        labels,
        label,
        backgroundColor,
        borderColor,
        pointBorderColor
      }
    })
  } catch (e) {
    dispatch({
      type: "REJECTED_BITCOIN",
    })
  }
}
