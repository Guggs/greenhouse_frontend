import CellCard from './CellCard';
import React from 'react';


interface Props {
  targetTemp: number
  tolerance: number
}

interface State {
  date: string;
  time: string;
  cells: {cellname: string, celltemperature: number}[];
  currentCell: string;
  flag: string;
  co2_A: string;
  co2_B: string;
  co2_D: string;
  h2o_A: string;
  h2o_B: string;
  h2o_D: string;
}

class Cardlist extends React.Component<Props, State> {
  updateTimer: NodeJS.Timer;
  constructor(props: Props){
    super(props)
    this.state = {
      date: "",
      time: "",
      cells: [],
      currentCell: "",
      flag: "",
      co2_A: "",
      co2_B: "",
      co2_D: "",
      h2o_A: "",
      h2o_B: "",
      h2o_D: "",
    }
  }

render() {
  if(false){
    throw new Error('NOOOOO');
  }
  const {cells, currentCell, date, time, co2_A, co2_B, h2o_A, h2o_B} = this.state;
  const {tolerance, targetTemp} = this.props
  const cardComponent =cells.map((cellname, i) =>{
      return <CellCard key={cellname.cellname} cell={cells[i]} currentCell = {currentCell} tolerance={tolerance} targetTemp={targetTemp} />
  });

  return (
    <div  className="pt2">
      <div className="fl w-100 h6">
        <div className="ma3 tl fl w-30 ba bw2 pa3 shadow-5 br3">
          <h2 className='blue'>Current Cell Data:</h2>
          <h3>CO2 Input: {parseFloat(co2_A).toFixed(2)}</h3>
          <h3>CO2 Output: {parseFloat(co2_B).toFixed(2)}</h3>
          <h3>H2O Input: {parseFloat(h2o_A).toFixed(2)}</h3>
          <h3>H2O Output: {parseFloat(h2o_B).toFixed(2)}</h3>
        </div>
      <div className="fl w-60 tr">
        <h1 className="blue pa4 ">Last updated at: {date} {time} </h1>
      </div>
      </div>
      <div className="pa4">
        <div  className="fl flex flex-wrap justify-left">
        {cardComponent}
      </div>
      </div>
      
    </div>);
}

componentDidMount () {
  this.updateTimer = setInterval(() => this.loadData(), 3000);
  /*.then(data => console.log(data))
  /*.then(cells => this.setState({time: cells.Zeit, date: cells.Datum, cells: cells.cells}));*/

  /*.then(cells => this.setState({ cells: cells}));*/
}
componentWillUnmount(){
  clearInterval(this.updateTimer);
}


loadData() {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 5000);
  const req = async() => {
    fetch('http://172.27.80.119:3001/dashboardData')
    .then(response => response.json())
    //.then(response => console.log(response));
    .then(cells=> {
      if(cells.cells.length>0) {this.setState({time: cells.Time, date: cells.Datum, cells: cells.cells, currentCell: cells.currentCell, flag: cells.flag, co2_A: cells.co2_A, co2_B: cells.co2_B,co2_D: cells.co2_D,h2o_A: cells.h2o_A,h2o_B: cells.h2o_B,h2o_D: cells.h2o_D,})}
      else {throw new Error}}).catch((error) => {console.log(error)});
    clearTimeout(timeoutId);
  };
  req();
}   
};

export default Cardlist;
