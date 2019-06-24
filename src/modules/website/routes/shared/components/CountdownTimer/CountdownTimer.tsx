import React, { Component } from "react";
import s from "./CountdownTimer.scss";

interface Props {
    day: string;
    month: string;
    year: string;
    hour: string;
    minute: string;
    seconds: string;
}


interface State {
    end: boolean;
    days: any;
    hours: any;
    minutes: any;
    seconds: any;
}

export class CountdownTimerComponent extends Component<Props, State> {

    public timer: any;

    constructor(props: Props, state: State) {
        super(props, state);

        this.state = {
            end: false,
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
        };
    }

    public componentWillMount() {

        const { month, day, year, hour, minute, seconds } = this.props;

        // formate date 10/31/2018 23:57:02
        const endDate: Date = new Date(`${month}/${day}/${year} ${hour}:${minute}:${seconds}`);

        this.timer = setInterval(() => {
            const startDate: Date = new Date();

            const distance = endDate.getTime() - startDate.getTime();

            if (distance < 0) {
                this.setState({
                    end: true,
                }, () => {
                    clearInterval(this.timer);
                });
                return;
            }

            this.setState({
                days: Math.floor(distance / (1000 * 60 * 60 * 24)),
                hours: Math.floor(distance / (1000 * 60 * 60)),
                minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                seconds: Math.floor((distance % (1000 * 60)) / 1000),
            });
        }, 1000);
    }

    public componentWillUnmount() {
        this.setState({
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
        });
    }


    public render() {

        let seconds = (this.state.seconds < 10) ? `0${this.state.seconds}` : this.state.seconds.toString();
        seconds = seconds.match(/\d/g).map((num: number, index: number) => {
            if (index > 0) {
                return <span>{num}</span>;
            } else {
                return num;
            }
        });
        return (
            !this.state.end && <div className={s.countDown}>
                <div className={s.item}>{`${(this.state.hours < 10) ? `0${this.state.hours}` : this.state.hours}:`}</div>
                <div className={s.item}>{`${(this.state.minutes < 10) ? `0${this.state.minutes}` : this.state.minutes}:`}</div>
                <div className={s.item}>{seconds}</div>
            </div>
        );
    }
}