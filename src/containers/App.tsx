import React from 'react';
import Cardlist from '../components/Cardlist';
import ErrorBoundry from './ErrorBoundry';
import './App.css';
import axios from "axios";

interface Props {
}

interface State {
  tolerances: number;
  targetTemps: number;
}




class App extends React.Component<Props, State> {
  constructor(props: Props){
     
    super(props);
    //this.updateTimer = 0
    this.state = { 
      tolerances: 25,
      targetTemps: 0.0
    };
  }

  /*onSearchChange = (event: React.ChangeEvent<{value: string}>) => {
    this.setState({searchfield: event.target.value})

  }*/

  /*onSubmit(event:React.ChangeEvent<HTMLInputElement>){this.setState({solltemperatur: event.target..solltemperatur, tolerance: event.tolerance.value})}*/

  render () {
    /*const filterRobots = robots.filter(robot => {
      return robot.name.toLowerCase().includes(searchfield.toLowerCase());
    });*/
    const { tolerances, targetTemps} = this.state;

    const handleTargentTempChange = event => {
      //console.log(event.target.value, targetTemps);
      this.setState({targetTemps: event.target.value});
    }

    const handleToleranceChange = event => {
      this.setState({tolerances: event.target.value});
    }
    const onSubmit = event => {
      event.preventDefault();
      axios.post('http://172.27.80.119:3001/setConfigurationData', {"targetTemp": targetTemps, "tolerance": tolerances});
    }

    return <div className="App ">
            <div className="h4 cf ph2-ns bg-light-blue">
              <div className="fl w-30 pa2">
                <img src={`https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Logo_KIT.svg/1200px-Logo_KIT.svg.png`} alt={"KIT-Logo"} className="h4 tl" />
              </div>
              <div className="fl w-70 pa2">
                <p className="f1 fw5 v-mid tl">REAL TIME GREENHOUSE-MONITOR</p>
              </div>
            </div>           
            <div className="aspect-ratio--4x3-ns">
            <div className="pa4">
              <div className="fl w-80">
                <form onSubmit={onSubmit}>
                  <div className="fl w-100 h2">
                    <div className="fl w-60">
                    <div className="tl ma2 blue">
                    <label className=" f3 blue tl fw5 fl w-60 6rem">Target temperature: </label>
                    <div className="tr fl w-20">
                      <input className="tr" type="number" value={targetTemps} onChange={handleTargentTempChange} />
                    </div>
                  </div>
                  <div className="tl ma2 blue">
                    <label className="f3 blue tl fw5 fl w-60">Tolerance: </label>
                    <div className="tr fl w-20">
                      <input className="tr " type="number" value={tolerances} onChange={handleToleranceChange} />
                    </div>
                  </div>
                  </div>
                  <div className="ma3 tl fl w-100">
                    <input className="bg-light-blue w-20 h3 f4 shadow-5 br3 grow bw0"  type="submit" value="Save"/>
                  </div>
                  </div>      
              </form>
              </div>
              <div className="fl w-20">
                <h2 className="blue tl">Legend:</h2>
                <h3 className="red tl ma1">&rsaquo; {tolerances*2} degrees to warm</h3>
                <h3 className="light-red tl ma1">&rsaquo; {tolerances} degrees to warm</h3>
                <h3 className="light-green tl ma1">  temperature is ok</h3>
                <h3 className="light-blue tl ma1">&rsaquo; {tolerances} degrees to cold</h3>
                <h3 className="blue tl ma1">&rsaquo; {tolerances*2} degrees to cold</h3>
              </div>
            </div>    
            <div className="fl">
              <ErrorBoundry >
                <Cardlist tolerance={tolerances} targetTemp={targetTemps} />
              </ErrorBoundry>
            </div>
            </div>
            {/*<iframe src="http://172.27.80.119:3000/grafana/d-solo/zopQFFwnk/imk-ifu-climate-stations-sta?orgId=1&from=1657546880393&to=1658162480393&panelId=8" width="450" height="200"></iframe>*/}
          </div>
  }

  componentDidMount () {
    this.loadData();
  }
  
  loadData(){
    //'http://172.27.80.119:3001/configurationData'
    fetch('http://localhost:8000/configurationData')
      .then(response => response.json())
      .then(configurationData => {this.setState({ tolerances: configurationData.tolerance, targetTemps: configurationData.targetTemp })});
  }

  
}

export default App;
