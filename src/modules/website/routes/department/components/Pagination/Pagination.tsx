import * as React from "react";
import SVGInline from "react-svg-inline";
import s from "./Pagination.scss";
import prev from "../../../../assets/icons/arrow-prev.svg";
import next from "../../../../assets/icons/arrow-next.svg";


export interface PaginationProps {
    totalProdutos: number;
    offsetPag: number;
    initDisparch: boolean;
    productsPerPag: number;
    className?: string;
    arrowWithName?: boolean;
    handleSearch(from: number, to: number, currentPage: number): void;
    handleInit?(): void;
}

export interface PaginationState {
    pags: number[];
    currentPage: number;
    from: number;
    to: number;
}

export class PaginationComponent extends React.Component<PaginationProps, PaginationState> {

    constructor(props: PaginationProps) {
        super(props);

        this.state = {
            pags: [],
            currentPage: 0,
            from: 0,
            to: 0,
        };
    }

    public componentDidMount() {
        // tslint:disable-next-line:no-unused-expression
        // this.props.initDisparch && this.reset();
    }

    public reset = (callSearch: boolean = true) => {
        this.setState({
            pags: new Array(Math.ceil(this.props.totalProdutos / this.props.productsPerPag)).fill(1),
            currentPage: 0,
            from: 0 * this.props.productsPerPag,
            to: this.props.productsPerPag - 1,
        }, () => {
            if (callSearch) {
                this.props.handleSearch(this.state.from, this.state.to, this.state.currentPage);
            }
        });
    }

    public callPagination = () => {
        this.setState({
            from: this.state.currentPage * this.props.productsPerPag,
            to: (this.state.currentPage === 0) ? this.props.productsPerPag - 1 : this.state.currentPage * this.props.productsPerPag + (this.props.productsPerPag - 1),
        }, () => {
            this.props.handleSearch(this.state.from, this.state.to, this.state.currentPage);
        });
    }

    public prev = () => {
        if ((this.state.currentPage - 1) > -1) {
            this.setState({
                currentPage: this.state.currentPage - 1,
            }, () => {
                this.callPagination();
            });
        }
    }

    public next = () => {
        if (this.state.currentPage <= (this.state.pags.length - this.props.offsetPag)) {
            this.setState({
                currentPage: this.state.currentPage + 1,
            }, () => {
                this.callPagination();
            });
        }
    }

    public setCurrentPage(currentPage: number) {
        this.setState({
            currentPage,
        });
    }

    public onclick = (event: any, direction: number) => {
        this.setState({
            currentPage: this.state.currentPage + direction,
        }, () => {
            this.callPagination();
        });
    }

    public render() {
        return (
            <section className={[s.pagination, this.props.className].join(" ")}>
                <button className={[s.controls, this.props.arrowWithName ? s.withName : "", s.prev].join(" ")} onClick={this.prev}><SVGInline className={s.arrow} svg={prev} /></button>
                <ul className={s.listpages}>
                    {this.state.pags.map((pag, index) => {
                        if ((index >= (this.state.currentPage - 1) && index <= (this.state.currentPage + (this.state.currentPage === 0 ? this.props.offsetPag : (this.props.offsetPag - 1)))) ||
                            (this.state.currentPage >= (this.state.pags.length - this.props.offsetPag) && index >= (this.state.pags.length - this.props.offsetPag))) {
                            return (
                                <li
                                    key={index}
                                    className={[this.state.currentPage === index ? s.active : s.inactive, s.item].join(" ")}
                                    onClick={() => {
                                        this.setState({
                                            currentPage: index,
                                        }, () => {
                                            this.callPagination();
                                        });
                                    }}>{index + 1}</li>
                            );
                        }
                    })}
                    {(this.state.currentPage + this.props.offsetPag) < this.state.pags.length && <li
                        className={s.item}
                        key={this.state.pags.length + 1}
                        onClick={() => {
                            this.setState({
                                currentPage: this.state.pags.length - 1,
                            }, () => {
                                this.callPagination();
                            });
                        }}>...{this.state.pags.length}</li>}
                </ul>
                <button className={[s.controls, this.props.arrowWithName ? s.withName : "", s.next].join(" ")} onClick={this.next}><SVGInline className={s.arrow} svg={next} /></button>
            </section>
        );
    }
}
