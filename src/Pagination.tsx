import React from 'react';
import {observer} from "mobx-react";
import store from './store';
import s from './App.module.css';


@observer
class Pagination extends React.Component<any, any> {
    // set initial random array and current width
    componentDidMount(): void {
        let array: Array<number> = [];
        for (let i = 1; i < 15; i++) {
            let currentValue = Math.floor(Math.random() * 70 + 30)
            array.push(currentValue)
        }
        store.setInitialArrayOfElements(array)
        store.setWidthOfComponent(this.props.width)
    }

    // update current width of component
    componentWillUpdate() {
        store.setWidthOfComponent(this.props.width)
    }

    render(): React.ReactNode {
        // change page clicking on tick
        let tickClick = (direction: string) => {
            if (direction === 'left') {
                if (store.state.currentPage - 1 >= 0) {
                    store.changeCurrentPage(store.state.currentPage - 1)
                } else {
                    store.changeCurrentPage(store.state.initialArrayOfElements.length - 1)
                }
            } else {
                if (store.state.currentPage + 1 < store.state.initialArrayOfElements.length) {
                    store.changeCurrentPage(store.state.currentPage + 1)
                } else {
                    store.changeCurrentPage(0)
                }
            }
        }
        return (
            <>
                <span onClick={() => tickClick('left')}>&#129092;</span>
                {(store.renderArrOfElements.length > 1) ? store.renderArrOfElements.map(a => {
                    return <div key={a.id}
                                className={store.state.currentPage === a.id ? s.active : s.container__row_element}
                                style={{width: `${a.elementWidth}px`}} onClick={() => {
                        store.changeCurrentPage(a.id)
                    }
                    }>
                        {a.elementWidth}px
                    </div>
                }) : ''}
                <span onClick={() => tickClick('right')}>&#129094;</span>
            </>
        )
    }
}

export default Pagination;
