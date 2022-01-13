import React from 'react';
import {useRecoilState} from "recoil";
import {foodListState} from '@/atoms/FoodAtom'

function Foods() {
    const [foodItems, setFoodItems] = useRecoilState(foodListState)
    return (
        <div>
            {foodItems?.map((food) => (
                <li>
                    <span>{food.serving_qty} {food.serving_unit} {food.food_name}</span>
                </li>
            )


            )
            }

        </div>
    );
}

export default Foods;