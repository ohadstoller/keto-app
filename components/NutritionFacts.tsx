import React, {useEffect, useState} from 'react';
import {useRecoilState} from "recoil";
import {foodListState} from "@/atoms/FoodAtom";
import MacrosPieChart from "@/components/PieChart";

function NutritionFacts() {
    const [totalCarbs, setTotalCarbs] = useState(0)
    const [totalFats, setTotalFats] = useState(0)
    const [totalProtein, setTotalProtein] = useState(0)
    const [totalMacros, setTotalMacros] = useState([])
    const [shouldRenderPie, setShouldRenderPie] = useState(false)
    const [foodItems, setFoodItems] = useRecoilState(foodListState)

    const totalNutrients = (foodItems: any[], macro: string) => {
        let initialValue = 0
        let macroNutrientSum: number = foodItems.reduce(
            (previousValue, currentValue) => previousValue + currentValue[`${macro}`]
            , initialValue
        )
        return macroNutrientSum
    }


    const updateCarbs = () => {
        let totalCarbs: number = totalNutrients(foodItems, 'nf_total_carbohydrate')
        setTotalCarbs(Math.round(totalCarbs))
    }

    const updateFats = () => {
        let totalFats: number = totalNutrients(foodItems, 'nf_total_fat')
        setTotalFats(Math.round(totalFats))
    }

    const updateProtein = () => {
        let totalProtein: number = totalNutrients(foodItems, 'nf_protein')
        setTotalProtein(Math.round(totalProtein))
    }

    useEffect(() => {
        updateCarbs()
        updateFats()
        updateProtein()
        const newTotalMacros = [
            {name: "Carbs", value: totalCarbs},
            {name: "Fats", value: totalFats},
            {name: "Protein", value: totalProtein},
        ]
        setTotalMacros(newTotalMacros)
        if (totalFats > 0 || totalCarbs > 0 || totalProtein > 0) {
            setShouldRenderPie(true)
        } else {
            setShouldRenderPie(false)
        }
    }, [foodItems, totalFats, totalCarbs, totalProtein])

    const renderPieChart = () => {
        if (shouldRenderPie) {
            return <MacrosPieChart data={totalMacros}/>
        } else {
            return <></>
        }


    }

    return (
        <div>
            {
                renderPieChart()
            }
        </div>
    );
}

export default NutritionFacts;