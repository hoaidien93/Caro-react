import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Button } from 'react-bootstrap'

class CaroComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            row: 20,
            column: 20,
            arrayPlay: [],
            isXturn: true,
            isWin: false,
            arrayChoose: [],
            isDecrease: false
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
                    this.hightlight("row", i, j);
                    this.props.dispatch({
                        type: "XWin"
                    });
                    this.setState({ isWin: true });
                }
                if (j < this.state.column - 5 &&
                    arrayCalc[i][j] + arrayCalc[i][j + 1] + arrayCalc[i][j + 2] + arrayCalc[i][j + 3] + arrayCalc[i][j + 4] === -5) {
                    this.hightlight("row", i, j);
                    alert("O Win");
                    this.props.dispatch({
                        type: "OWin"
                    });
                    this.setState({ isWin: true });
                }
                // Column
                if (i < this.state.row - 5 &&
                    arrayCalc[i][j] + arrayCalc[i + 1][j] + arrayCalc[i + 2][j] + arrayCalc[i + 3][j] + arrayCalc[i + 4][j] === 5) {
                    this.hightlight("column", i, j);
                    alert("X Win");
                    this.props.dispatch({
                        type: "XWin"
                    });
                    this.setState({ isWin: true });
                }
                if (i < this.state.row - 5 &&
                    arrayCalc[i][j] + arrayCalc[i + 1][j] + arrayCalc[i + 2][j] + arrayCalc[i + 3][j] + arrayCalc[i + 4][j] === -5) {
                    this.hightlight("column", i, j);
                    alert("O Win");
                    this.props.dispatch({
                        type: "OWin"
                    });
                    this.setState({ isWin: true });
                }
                // Cross line
                // Right
                if (i < this.state.row - 5 && j < this.state.column - 5 &&
                    arrayCalc[i][j] + arrayCalc[i + 1][j + 1] + arrayCalc[i + 2][j + 2] + arrayCalc[i + 3][j + 3] + arrayCalc[i + 4][j + 4] === 5) {
                    this.hightlight("cross-right", i, j);
                    alert("X Win");
                    this.props.dispatch({
                        type: "XWin"
                    });
                    this.setState({ isWin: true });
                }
                if (i < this.state.row - 5 && j < this.state.column - 5 &&
                    arrayCalc[i][j] + arrayCalc[i + 1][j + 1] + arrayCalc[i + 2][j + 2] + arrayCalc[i + 3][j + 3] + arrayCalc[i + 4][j + 4] === -5) {
                    this.hightlight("cross-right", i, j);
                    alert("O Win");
                    this.props.dispatch({
                        type: "OWin"
                    });
                    this.setState({ isWin: true });
                }
                // Left
                if (i >= 4 && j < this.state.column - 5 &&
                    arrayCalc[i][j] + arrayCalc[i - 1][j + 1] + arrayCalc[i - 2][j + 2] + arrayCalc[i - 3][j + 3] + arrayCalc[i - 4][j + 4] === 5) {
                    this.hightlight("cross-left", i, j);
                    alert("X Win");
                    this.props.dispatch({
                        type: "XWin"
                    });
                    this.setState({ isWin: true });
                }
                if (i >= 4 && j < this.state.column - 5 &&
                    arrayCalc[i][j] + arrayCalc[i - 1][j + 1] + arrayCalc[i - 2][j + 2] + arrayCalc[i - 3][j + 3] + arrayCalc[i - 4][j + 4] === -5) {
                    this.hightlight("cross-left", i, j);
                    alert("O Win");
                    this.props.dispatch({
                        type: "OWin"
                    });
                    this.setState({ isWin: true });
                }
            }
        }
    }

    hightlight(type, iStart, jStart) {
        var arrayHighlight = [];
        switch (type) {
            case "row":
                arrayHighlight.push(...[`${iStart}-${jStart}`, `${iStart}-${jStart + 1}`, `${iStart}-${jStart + 2}`, `${iStart}-${jStart + 3}`, `${iStart}-${jStart + 4}`]);
                break;
            case "column":
                arrayHighlight.push(...[`${iStart}-${jStart}`, `${iStart + 1}-${jStart}`, `${iStart + 2}-${jStart}`, `${iStart + 3}-${jStart}`, `${iStart + 4}-${jStart}`]);
                break;
            case "cross-right":
                arrayHighlight.push(...[`${iStart}-${jStart}`, `${iStart + 1}-${jStart + 1}`, `${iStart + 2}-${jStart + 2}`, `${iStart + 3}-${jStart + 3}`, `${iStart + 4}-${jStart + 4}`]);
                break;
            case "cross-left":
                arrayHighlight.push(...[`${iStart}-${jStart}`, `${iStart - 1}-${jStart + 1}`, `${iStart - 2}-${jStart + 2}`, `${iStart - 3}-${jStart + 3}`, `${iStart - 4}-${jStart + 4}`]);
                break;
            default:
                break;
        }
        arrayHighlight.forEach((ele) => {
            document.getElementById(ele).style.backgroundColor = "black";
        });
    }

    logoutClick(e){
        this.props.dispatch({
            type: "Logout"
        });
        localStorage.setItem("username", "");
        this.props.history.push('/login');
    }

    renderRedirect() {
        if (!this.props.isLogged) {
            return (
                <Redirect to='/login' />
            );
        } else {
            let username = localStorage.getItem("username");
            return (
                <div>
                    <div align="left" className="p2 f-left"><span>Hello {username}</span></div>
                    <div align="right" className="p2 f-right">
                        <Button variant="danger" type="button" onClick={(e)=>{this.logoutClick(e)}}>Logout</Button>
                    </div>
                </div>
            );
        }
    }
    render() {
        return (
            <div>
                <div className="p-2 menu-user">{this.renderRedirect()}</div>
                <div className="container">
                    <div className="wrapper">
                        <div className="info-turn">Quân đánh tiếp theo : {this.state.isXturn ? (<span className="c-red">X</span>) : <span className="c-blue">O</span>}</div>
                        <div className="table-caro">
                            {this.createTableCaro(this.state.row, this.state.column)}
                        </div>
                        <div className="">
                            <button className="btn-reset" onClick={() => {
                                this.reset();
                            }}>Chơi lại</button>
                        </div>
                    </div>
                    <div className="ListMove" align="right">
                        <div>Danh sách nước đi</div>
                        <table>
                            <thead>
                                <tr>
                                    <td>Nước đi</td>
                                    <td>Người đánh</td>
                                    <td>Vị trí</td>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.arrayChoose.map((ele, index) => {
                                        let hightlight = 0;
                                        if (!this.state.isDecrease) {
                                            hightlight = this.state.arrayChoose.length - 1;
                                        }
                                        return (
                                            <tr key={index} className={hightlight === index ? "active" : ""}>
                                                <td>{ele.turn}</td>
                                                <td>{ele.person}</td>
                                                <td>{ele.position}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                        <div align="center">
                            <button className="btn-sort" onClick={() => { this.handleSort() }}>Sắp xếp</button>
                        </div>
                    </div>
                </div>
            </div>
        );

    }

    handleSort() {
        //Reverse array
        let arrayTemp = this.state.arrayChoose;
        arrayTemp = arrayTemp.reverse();
        let sort = !this.state.isDecrease;
        this.setState({
            arrayChoose: arrayTemp,
            isDecrease: sort
        });
    }

    reset() {
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
            isWin: false,
            arrayChoose: []
        });
        // Clear hightLight
        var allButton = document.querySelectorAll("button:not(.btn-reset):not(.btn-sort)");
        allButton.forEach((button) => {
            button.style.backgroundColor = "#6f9e81";
        })
    }

    createTableCaro(numberOfRows, numberOfColumns) {
        let table = [];
        for (let i = 0; i <= numberOfRows; i++) {
            let row = [];
            for (let j = 0; j <= numberOfColumns; j++) {
                if (i === 0 || j === 0) {
                    if (i === 0 && j === 0) {
                        row.push(<span key={j}></span>);
                    }
                    else {
                        //A in asc ii = 65
                        if (i === 0) {
                            let charTemp = String.fromCharCode(65 + j - 1);
                            row.push(<span key={j}>{charTemp}</span>);
                        }
                        else {
                            row.push(<span key={j}>{i - 1}</span>);
                        }
                    }
                }
                else {
                    row.push(
                        <button id={`${i - 1}-${j - 1}`} onClick={() => this.handleClick(i - 1, j - 1)} key={j}>
                            {this.state.arrayPlay[i - 1][j - 1] === 1 ? (<span className="c-red">X</span>) : ""}
                            {this.state.arrayPlay[i - 1][j - 1] === -1 ? (<span className="c-blue">O</span>) : ""}
                        </button>);
                }
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
        let chooseClone = this.state.arrayChoose;
        let move = {};
        move.turn = Math.floor((chooseClone.length / 2) + 1);
        move.position = String.fromCharCode(65 + column) + row;
        if (this.state.isXturn) {
            arrClone[row][column] = 1;
            move.person = "X";
        }
        else {
            arrClone[row][column] = -1;
            move.person = "O";
        }
        if (this.state.isDecrease) {
            chooseClone.unshift(move);
        }
        else chooseClone.push(move);
        this.setState({
            arrayPlay: arrClone,
            isXturn: !this.state.isXturn,
            arrayChoose: chooseClone
        });
        this.handleWin();
    }

}
function mapStateToProps(state) {
    return {
        isLogged: state.isLogged
    };
};
export default connect(mapStateToProps)(CaroComponent);