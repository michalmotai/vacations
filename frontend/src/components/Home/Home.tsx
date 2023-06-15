import React, { FC } from 'react';
import styles from './Home.module.scss';
import {useAppDispatch, useAppSelector} from "../../hooks";
import {decrease, increase} from "../../counter/counterSlice";


interface HomeProps { }

const Home: FC<HomeProps> = () => {
    const counter = useAppSelector(state => state.counter);
    const dispatch = useAppDispatch();

    return (
        <div className={styles.Home}>
            <div className={styles.Home__counter}>
                <p>{counter.counter}</p>
                <button onClick={() => dispatch(increase())}>+</button>
                <button onClick={() => dispatch(decrease())}>-</button>
            </div>
        </div>
    )
}





export default Home;
