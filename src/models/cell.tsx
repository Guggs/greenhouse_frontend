export default class Cell {
    date: string;
    time: string;
    cellname: string;
    celltemperature: number;

    constructor(date: string, time: string, cellName: string, cellTemperature: number) {
        this.date = date;
        this.time = time;
        this.cellname = cellName;
        this.celltemperature = cellTemperature;
    }

    setDate(date: string) {
        this.date = date;
    }
    
    getDate() { return this.date; }

    setTime(time: string) {
        this.time = time;
    }
    
    getTime() { return this.time; }

    setCellName(cellname: string) {
        this.cellname = cellname;
    }
    
    getCellName() { return this.cellname; }

    setCellTemperature(celltemperature: number) {
        this.celltemperature = celltemperature;
    }
    
    getCellTemperature() { return this.celltemperature; }
}
