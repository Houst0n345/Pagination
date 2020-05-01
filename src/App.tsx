import React from 'react';
import s from './App.module.css';
import sizeMe from "react-sizeme";
import Pagination from './Pagination';



let App = (props: any) => {
    // using sizeMe for taking current width of component
    let width: number = props.size.width;
    return (
        <div>
            <div className={s.container}>
                <div className={s.container__row}>
                    <Pagination width={width}/>
                </div>
            </div>
            {/*<button className={s.button} onClick={() => setRegenerate(regenerate + 1)}>Сlick to regenerate</button>*/}
        </div>
    );
}

export default sizeMe()(App);
