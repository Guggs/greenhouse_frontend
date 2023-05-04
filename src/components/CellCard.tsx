import classNames from 'classnames';

interface Props {
  cell: {cellname: string, celltemperature: number}
  currentCell : string,
  targetTemp: number
  tolerance: number

}

const CellCard = (props:Props) => {

  const {cell,currentCell, targetTemp, tolerance} = props;
  const targetTemperature = targetTemp;
  const margin = tolerance;
  const temperatureDiffs = targetTemperature - cell.celltemperature;
  const toCold = temperatureDiffs > margin && temperatureDiffs <= margin*2;
  const wayToCold = temperatureDiffs > margin*2;
  const toWarm = temperatureDiffs <= -margin && temperatureDiffs >= -margin*2;
  const wayToWarm = temperatureDiffs < -margin*2;
  const ok = temperatureDiffs >= -margin && temperatureDiffs <= margin;

  let thenum_a = currentCell.match(/\d+/);
  let thenum_b= cell.cellname.match(/\d+/);
  let currentCell_numper: string;
  let cell_number: string;
  let isThisCellCurrent: boolean = false;

  if(thenum_a){
    currentCell_numper = thenum_a[0];
    if(currentCell_numper.length === 1){
      currentCell_numper = '0'+currentCell_numper;
    }
  }else{
    currentCell_numper = "0";
  }
  if(thenum_b){
    cell_number = thenum_b[0];
  }else{
    cell_number = "100";
  } 
  if(currentCell_numper === cell_number){
    isThisCellCurrent = true;
  }

  

  const cell_area = currentCell.split('_');
  const showCurrentCellArea = isThisCellCurrent ? <h3>{cell_area[0]}</h3> : <div></div>;

  return (
    <div className={classNames('grow', 'dib', 'br3', 'pa4', 'ma2', 'shadow-5', 'tc', {
      'ba bw4': isThisCellCurrent
    },
    {'dark-green': ok,
    'lightest-blue': wayToCold,
    'dark-red': toWarm,
    'blue' : toCold,
    'light-yellow': wayToWarm }, 
    {'bg-light-green': ok,
    'bg-blue': wayToCold,
    'bg-light-red': toWarm,
    'bg-light-blue' : toCold,
    'bg-red': wayToWarm }
    )}>
        <h2>{cell.cellname}</h2>
        <h3>{cell.celltemperature}</h3>
        {showCurrentCellArea}
    </div>
  );
    
}

export default CellCard;
