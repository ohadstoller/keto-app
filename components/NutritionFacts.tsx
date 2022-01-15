import React, {useEffect, useState} from 'react';
import {useRecoilState} from "recoil";
import {foodListState} from "@/atoms/FoodAtom";

function NutritionFacts() {
    const [carbs, setCarbs] = useState([])
    const [totalCarbs, setTotalCarbs] = useState(0)
    const [foodItems, setFoodItems] = useRecoilState(foodListState)

    useEffect(() => {
        const updateCarbs = async () => {

            let initialValue = 0
            let sumCarbs = foodItems.reduce(
                (previousValue, currentValue) => previousValue + currentValue.nf_total_carbohydrate
                , initialValue
            )
            setTotalCarbs(sumCarbs)


            const carbList = foodItems.map(foodItem =>
                foodItem.nf_total_carbohydrate
            )
            setCarbs((carbList))
            await console.log("-> carbList", carbs);

        }
        updateCarbs()

    }, [foodItems])

    return (
        <div>
            {'NutritionFacts Component' + carbs.length + 'total carbs' + totalCarbs}
        </div>
    );
}

export default NutritionFacts;