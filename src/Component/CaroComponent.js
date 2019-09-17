import React from 'react';
class CaroComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            row: 20,
            column: 20,
            arrayPlay: [],
            isXturn: true,
            isWin: false
        };

        /** 
         * Define
         * X : 1
         * O : -1
         * Empty : 0
        */
        for (let i = 0; i < this.state.row; i++) {
            this.state.arrayPlay[i] = [];
            for (let j = 0; j < this.state.column; j++) {
                this.state.arrayPlay[i][j] = 0;
            }
        }

    }

    handleWin() {
        let arrayCalc = this.state.arrayPlay;
        for (let i = 0; i < this.state.row; i++) {
            for (let j = 0; j < this.state.column; j++) {
                // Row
                if (j < this.state.column - 5 && 
                    arrayCalc[i][j] + arrayCalc[i][j + 1] + arrayCalc[i][j + 2] + arrayCalc[i][j + 3] + arrayCalc[i][j + 4] === 5) {
                    this.hightlight("row",i,j);
                    alert("X Win");
                    this.setState({isWin: true});
                }
                if (j < this.state.column - 5 && 
                    arrayCalc[i][j] + arrayCalc[i][j + 1] + arrayCalc[i][j + 2] + arrayCalc[i][j + 3] + arrayCalc[i][j + 4] === -5) {
                    this.hightlight("row",i,j);
                    alert("O Win");
                    this.setState({isWin: true});
                }
                // Column
                if (i < this.state.row - 5 && 
                    arrayCalc[i][j] + arrayCalc[i + 1][j] + arrayCalc[i + 2][j] + arrayCalc[i + 3][j] + arrayCalc[i + 4][j] === 5) {
                    this.hightlight("column",i,j);
                    alert("X Win");
                    this.setState({isWin: true});
                }
                if (i < this.state.row - 5 &&  
                    arrayCalc[i][j] + arrayCalc[i + 1][j] + arrayCalc[i + 2][j] + arrayCalc[i + 3][j] + arrayCalc[i + 4][j] === -5) {
                    this.hightlight("column",i,j);
                    alert("O Win");
                    this.setState({isWin: true});
                }
                // Cross line
                // Right
                if (i < this.state.row - 5 &&  j < this.state.column - 5 && 
                    arrayCalc[i][j] + arrayCalc[i + 1][j + 1] + arrayCalc[i + 2][j + 2] + arrayCalc[i + 3][j + 3] + arrayCalc[i + 4][j + 4] === 5) {
                    this.hightlight("cross-right",i,j);
                    alert("X Win");
                    this.setState({isWin: true});
                }
                if (i < this.state.row - 5 &&  j < this.state.column - 5 && 
                    arrayCalc[i][j] + arrayCalc[i + 1][j + 1] + arrayCalc[i + 2][j + 2] + arrayCalc[i + 3][j + 3] + arrayCalc[i + 4][j + 4] === -5) {
                    this.hightlight("cross-right",i,j);
                    alert("O Win");
                    this.setState({isWin: true});
                }
                // Left
                if (i >= 4 &&  j < this.state.column - 5 && 
                    arrayCalc[i][j] + arrayCalc[i - 1][j + 1] + arrayCalc[i - 2][j + 2] + arrayCalc[i - 3][j + 3] + arrayCalc[i - 4][j + 4] === 5) {
                    this.hightlight("cross-left",i,j);
                    alert("X Win");
                    this.setState({isWin: true});
                }
                if (i >= 4 &&  j < this.state.column - 5 && 
                    arrayCalc[i][j] + arrayCalc[i - 1][j + 1] + arrayCalc[i - 2][j + 2] + arrayCalc[i - 3][j + 3] + arrayCalc[i - 4][j + 4] === -5) {
                    this.hightlight("cross-left",i,j);
                    alert("O Win");
                    this.setState({isWin: true});
                }
            }
        }
    }

    hightlight(type,iStart,jStart){
        var arrayHighlight = [];
        switch(type){
            case "row":
                    arrayHighlight.push(...[`${iStart}-${jStart}`,`${iStart}-${jStart + 1}`,`${iStart}-${jStart + 2}`,`${iStart}-${jStart + 3}`,`${iStart}-${jStart + 4}`]);
                break;
            case "column":
                    arrayHighlight.push(...[`${iStart}-${jStart}`,`${iStart + 1}-${jStart}`,`${iStart + 2}-${jStart}`,`${iStart + 3}-${jStart}`,`${iStart + 4}-${jStart}`]);
                break;
            case "cross-right":
                    arrayHighlight.push(...[`${iStart}-${jStart}`,`${iStart + 1}-${jStart + 1}`,`${iStart + 2}-${jStart + 2}`,`${iStart + 3}-${jStart + 3}`,`${iStart + 4}-${jStart + 4}`]);
                break;
            case "cross-left":
                    arrayHighlight.push(...[`${iStart}-${jStart}`,`${iStart - 1}-${jStart + 1}`,`${iStart - 2}-${jStart + 2}`,`${iStart - 3}-${jStart + 3}`,`${iStart - 4}-${jStart + 4}`]);
                break;
            default:
                break;
        }
        arrayHighlight.forEach((ele)=>{
            document.getElementById(ele).style.backgroundColor = "black";
        });
    }

    render() {
        return (
            <div className="wrapper">
                <div className="info-turn">Quân đánh tiếp theo : {this.state.isXturn ? (<span className="c-red">X</span>) : <span className="c-blue">O</span>}</div>
                <div className="table-caro">
                    {this.createTableCaro(this.state.row, this.state.column)}
                </div>
                <div className="">
                    <button className="btn-reset" onClick={()=>{
                        this.reset();
                    }}>Chơi lại</button>
                </div>
            </div>
        );

    }

    reset(){
        let arrClone = [];
        for (let i = 0; i < this.state.row; i++) {
            arrClone[i] = [];
            for (let j = 0; j < this.state.column; j++) {
                arrClone[i][j] = 0;
            }
        }
        this.setState({
            arrayPlay: arrClone,
            isXturn: true,
            isWin: false
        });
        // Clear hightLight
        var allButton = document.querySelectorAll("button:not(.btn-reset)");
        allButton.forEach((button)=>{
            button.style.backgroundColor = "#6f9e81";
        })
    }
    
    createTableCaro(numberOfRows, numberOfColumns) {
        let table = [];
        for (let i = 0; i < numberOfRows; i++) {
            let row = [];
            for (let j = 0; j < numberOfColumns; j++) {
                row.push(
                <button id={`${i}-${j}`} onClick={() => this.handleClick(i, j)} key={j}>
                    {this.state.arrayPlay[i][j] === 1? (<span className="c-red">X</span>):""}
                    {this.state.arrayPlay[i][j] === -1? (<span className="c-blue">O</span>):""}
                </button>);
            }
            table.push(<div key={i} className="row">{row}</div>);
        }
        return table;
    }

    handleClick(row, column, e) {
        // Get turn
        if (this.state.arrayPlay[row][column] !== 0 || this.state.isWin) {
            return;
        }
        let arrClone = this.state.arrayPlay;

        if (this.state.isXturn) {
            arrClone[row][column] = 1;
        }
        else {
            arrClone[row][column] = -1;
        }
        this.setState({
            arrayPlay: arrClone,
            isXturn: !this.state.isXturn
        });
        this.handleWin();
    }

}

export default CaroComponent;