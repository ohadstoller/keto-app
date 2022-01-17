import React, {useEffect, useMemo, useState} from 'react';
import {useRecoilValue} from "recoil";
import {foodListState} from "@/atoms/FoodAtom";
import MacrosPieChart from "@/components/PieChart";

function NutritionFacts() {
    const [totalCarbs, setTotalCarbs] = useState(0)
    const [totalFats, setTotalFats] = useState(0)
    const [totalProtein, setTotalProtein] = useState(0)
    const [shouldRenderPie, setShouldRenderPie] = useState(false)
    const foodItems = useRecoilValue(foodListState)

    useEffect(() => {
        if (totalFats > 0 || totalCarbs > 0 || totalProtein > 0) {
            setShouldRenderPie(true)
        } else {
            setShouldRenderPie(false)
        }
    }, [foodItems, totalFats, totalCarbs, totalProtein])

    const renderPieChart = () => {
        if (shouldRenderPie) {
            return <MacrosPieChart data={getMacros}/>
        } else {
            return <></>
        }
    }

    const totalNutrients = (foodItems: any[], macro: string) => {
        let initialValue = 0
        let macroNutrientSum: number = foodItems.reduce(
            (previousValue, currentValue) => previousValue + currentValue[`${macro}`]
            , initialValue
        )
        return macroNutrientSum
    }

    const updateProtein = () => {
        let totalProtein: number = totalNutrients(foodItems, 'nf_protein')
        setTotalProtein(Math.round(totalProtein))
        return Math.round(totalProtein)
    }

    const updateCarbs = () => {
        let totalCarbs: number = totalNutrients(foodItems, 'nf_total_carbohydrate')
        setTotalCarbs(Math.round(totalCarbs))
        return Math.round(totalCarbs)
    }

    const updateFats = () => {
        let totalFats: number = totalNutrients(foodItems, 'nf_total_fat')
        setTotalFats(Math.round(totalFats))
        return Math.round(totalFats)
    }

    const calculateMacros = () => {
        const updatedProtein = updateProtein()
        const updatedCarbs = updateCarbs()
        const updatedFats = updateFats()
        return [
            {name: "Carbs", value: updatedCarbs},
            {name: "Fats", value: updatedFats},
            {name: "Protein", value: updatedProtein},
        ]
    }

    const getMacros = useMemo(() =>
        calculateMacros(), [foodItems]
    )


    return (
        <div>
            {
                renderPieChart()
            }
        </div>
    );
}

export default NutritionFacts;