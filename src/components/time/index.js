import React from "react";

import "./index.css";


class TimePicker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            start: null,
            range: {},
            quick_btn: null
        };
        this.day = ["星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"];
        this.quick_btn = ["工作日", "周末", "上午", "下午"];
        this.box = React.createRef();
        this.weekDataRev = {
            0: 'Monday',
            1: 'Tuesday',
            2: 'Wednesday',
            3: 'Thursday',
            4: 'Friday',
            5: 'Saturday',
            6: 'Sunday'
        };
        this.weekData = {
            Monday: 0,
            Tuesday: 1,
            Wednesday: 2,
            Thursday: 3,
            Friday: 4,
            Saturday: 5,
            Sunday: 6
        }
    }

    componentDidMount() {
        const range = {};
        Array(7)
            .fill(1)
            .map((el, idx) => {
                range[idx] = {};
                Array(24)
                    .fill(1)
                    .map((item, index) => {
                        range[idx][index] = false;
                    });
            });
        this.setState({
            range: this.props.data === '' || !this.props.data ? range : this.parseTime(this.props.data)
        });
        document.addEventListener("mouseup", this.mouseUp.bind(this));
    }
    componentWillUnmount() {
        document.removeEventListener("mouseup", this.mouseUp.bind(this));
    }
    mouseDown(e) {
        this.mouseFlag = true;
        this.start = e.target.dataset.index;
        this.end = e.target.dataset.index;
        this.startX = e.pageX;
        this.startY = e.pageY;
        if (this.box.current.style) {
            this.box.current.style.left = e.pageX + "px";
            this.box.current.style.top = e.pageY + "px";
        }
    };
    mouseMove(e) {
        if (this.mouseFlag && e.pageX > this.startX && e.pageY > this.startY) {
            if (this.box.current.style) {
                this.box.current.style.width = e.pageX - this.startX + "px";
                this.box.current.style.height = e.pageY - this.startY + "px";
            }
            this.end = e.target.dataset.index;
        }
    };
    mouseUp(e) {
        e.stopPropagation();
        e.preventDefault();
        if (this.box.current.style) {
            this.box.current.style.left = 0;
            this.box.current.style.top = 0;
            this.box.current.style.width = 0;
            this.box.current.style.height = 0;
        }

        this.mouseFlag && this.setSelectStatus(this.start, this.end);
        this.mouseFlag = false;
    };
    setSelectStatus(start, end) {
        const startX = Number(start.split("-")[0]);
        const startY = Number(start.split("-")[1]);
        const endX = Number(end.split("-")[0]);
        const endY = Number(end.split("-")[1]);
        const range = JSON.parse(JSON.stringify(this.state.range));
        Object.keys(range).map(el => {
            const child = range[el];
            Object.keys(child).map(item => {
                if (el >= startX && el <= endX && item >= startY && item <= endY) {
                    range[el][item] = !range[el][item];
                }
            });
        });
        this.setState(
            {
                range,
                quick_btn: null
            },
            () => {
                this.onTimeChange(range);
            }
        );
    }
    handleClick(quick_btn) {
        const range = JSON.parse(JSON.stringify(this.state.range));
        if (quick_btn === 0 && this.state.quick_btn !== 0) {
            Object.keys(range).map(el => {
                const child = range[el];
                Object.keys(child).map(item => {
                    if (el <= 4) {
                        range[el][item] = true;
                    } else {
                        range[el][item] = false;
                    }
                });
            });
        } else if (quick_btn === 1 && this.state.quick_btn !== 1) {
            Object.keys(range).map(el => {
                const child = range[el];
                Object.keys(child).map(item => {
                    if (el > 4) {
                        range[el][item] = true;
                    } else {
                        range[el][item] = false;
                    }
                });
            });
        } else if (quick_btn === 2 && this.state.quick_btn !== 2) {
            Object.keys(range).map(el => {
                const child = range[el];
                Object.keys(child).map(item => {
                    if (item <= 11) {
                        range[el][item] = true;
                    } else {
                        range[el][item] = false;
                    }
                });
            });
        } else if (quick_btn === 3 && this.state.quick_btn !== 3) {
            Object.keys(range).map(el => {
                const child = range[el];
                Object.keys(child).map(item => {
                    if (item > 11) {
                        range[el][item] = true;
                    } else {
                        range[el][item] = false;
                    }
                });
            });
        } else {
            Object.keys(range).map(el => {
                const child = range[el];
                Object.keys(child).map(item => {
                    range[el][item] = false;
                });
            });
        }
        this.setState(
            {
                range,
                quick_btn: quick_btn === this.state.quick_btn ? null : quick_btn
            },
            () => {
                this.onTimeChange(range);
            }
        );
    }
    handleClear() {
        const range = JSON.parse(JSON.stringify(this.state.range));
        Object.keys(range).map(el => {
            const child = range[el];
            Object.keys(child).map(item => {
                range[el][item] = false;
            });
        });
        this.setState(
            {
                range,
                quick_btn: null
            },
            () => {
                this.onTimeChange(range);
            }
        );
    }
    parseTime(data) {
        if (Object.keys(data).length === 0) return '';
        const res = {};
        Object.keys(data).map((el => {
            const item = data[el].split(',');
            const itemJSON = {};
            Array(24)
                .fill(1)
                .map((ell, index) => {
                    itemJSON[index] = item.includes(index.toString()) ? true : false;
                });
            res[this.weekData[el]] = itemJSON;
        }))
        return res;
    }
    onTimeChange(data) {
        const res = {};
        Object.keys(data).map((el => {
            const ell = data[el];
            res[this.weekDataRev[el]] = Object.keys(ell).filter(item => {
                return ell[item]
            }).join(',');
        }))
        this.props.onTimeChange && this.props.onTimeChange(res);
    }
    render() {
        const { range, quick_btn } = this.state;
        return (
            <div className='time-picker-rc'>
                <ul className="quick-btn">
                    {this.quick_btn.map((el, idx) => {
                        return (
                            <li key={idx} onClick={this.handleClick.bind(this, idx)} className={quick_btn === idx ? "cur" : ""}>
                                {el}
                            </li>
                        );
                    })}
                </ul>
                <div className="time-content">
                    <div className="day">
                        <div></div>
                        <div></div>
                        {this.day.map((el, idx) => {
                            return <div key={idx}>{el}</div>;
                        })}
                    </div>
                    <div className="time">
                        <div className="am-pm">
                            <div>00:00-12:00</div>
                            <div>12:00-24:00</div>
                        </div>
                        <div className="hour">
                            {Array(24)
                                .fill(1)
                                .map((el, idx) => (
                                    <div key={idx + "1"}>{idx + 1}</div>
                                ))}
                        </div>
                        <div onMouseDown={this.mouseDown.bind(this)} onMouseMove={this.mouseMove.bind(this)} onMouseUp={this.mouseUp.bind(this)}>
                            {Object.keys(range).map((el, idx) => {
                                return (
                                    <div className="half" key={idx}>
                                        {Object.keys(range[el]).map((item, index) => {
                                            return (
                                                <div
                                                    key={el + "-" + item}
                                                    data-index={el + "-" + item}
                                                    className={range[el][item] ? "cur" : ""}
                                                ></div>
                                            );
                                        })}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
                <div className="clear"><a onClick={this.handleClear.bind(this)}>一键撤销</a></div>
                <div
                    className="box"
                    ref={this.box}
                ></div>
            </div>
        );
    }
}
export default TimePicker;