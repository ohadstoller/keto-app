import React from 'react';
import {useRecoilValue} from "recoil";
import {foodListState} from '@/atoms/FoodAtom'
import hash from "object-hash";

function Foods() {
    const foodItems = useRecoilValue(foodListState)
    return (
        <div>
            {foodItems?.map((food) => (
                    <li key={hash(food)}>
                        <span>{food.serving_qty} {food.serving_unit} {food.food_name}</span>
                    </li>
                )
            )}
        </div>
    );
}

export default Foods;