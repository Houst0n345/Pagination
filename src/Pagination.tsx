import React from 'react';
import {observer} from "mobx-react";
import store from './store';
import s from './App.module.css';

type Props = {
    width: number
}

@observer
class Pagination extends React.Component<Props, Props> {
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
    componentDidUpdate() {
        store.setWidthOfComponent(this.props.width)
    }

    render(): React.ReactNode {
        let tickClick = (direction: string) => {
            if(direction==='right'){
                if(store.state.initialArrayOfElements.length>store.state.currentPosition+1){
                    store.changeCurrentPosition(store.state.currentPosition+1)
                } else {
                    store.changeCurrentPosition(0)
                }
            } else {
                if(0<=store.state.currentPosition-1){
                    store.changeCurrentPosition(store.state.currentPosition-1)
                } else {
                    store.changeCurrentPosition(store.state.initialArrayOfElements.length-1)
                }
            }
        }


        let itemClick = (page: number) => {
            store.changeCurrentPosition(page)
        }

        return (
            <>
                <span onClick={() => tickClick('left')} className={s.tick__left}/>
                {(store.renderArrOfElements.length > 1) ? store.renderArrOfElements.map((a) => {
                    return <div key={a.id}
                                className={store.state.currentPosition === a.id ? s.active : s.container__row_element}
                                style={{width: `${a.elementWidth}px`}} onClick={()=>itemClick(a.id)}>
                        {a.elementWidth}px
                    </div>
                }) : ''}
                <span onClick={() => tickClick('right')} className={s.tick__right}/>
            </>
        )
    }
}

export default Pagination;
