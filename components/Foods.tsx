import React from 'react';
import {useRecoilState} from "recoil";
import {foodListState} from '@/atoms/FoodAtom'

function Foods() {
    const [foodItems, setFoodItems] = useRecoilState(foodListState)
    return (
        <div>
            {foodItems?.map((food) => (
                <li>
                    {food.food_name}
                </li>
            )


            )
            }

        </div>
    );
}

export default Foods;