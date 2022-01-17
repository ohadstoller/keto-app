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

    const calculateMacros = (totalCarbs: number, totalFats: number, totalProtein: number) => {
        return [
            {name: "Carbs", value: totalCarbs},
            {name: "Fats", value: totalFats},
            {name: "Protein", value: totalProtein},
        ]
    }
    const getMacros = useMemo(() =>
        calculateMacros(totalCarbs, totalFats, totalProtein), [totalCarbs, totalFats, totalProtein]
    )



    const totalNutrients = (foodItems: any[], macro: string) => {
        let initialValue = 0
        let macroNutrientSum: number = foodItems.reduce(
            (previousValue, currentValue) => previousValue + currentValue[`${macro}`]
            , initialValue
        )
        return macroNutrientSum
    }


    const updateCarbs = () => {
        let totalCarbs: number = totalNutrients(foodItems, 'carbs')
        setTotalCarbs(Math.round(totalCarbs))
    }

    const updateFats = () => {
        let totalFats: number = totalNutrients(foodItems, 'fat')
        setTotalFats(Math.round(totalFats))
    }

    const updateProtein = () => {
        let totalProtein: number = totalNutrients(foodItems, 'protein')
        setTotalProtein(Math.round(totalProtein))
    }

    useEffect(() => {
        updateCarbs()
        updateFats()
        updateProtein()
        if (foodItems.length > 0) {
            setShouldRenderPie(true)
        } else {
            setShouldRenderPie(false)
        }
    }, [foodItems])

    const renderPieChart = () => {
        if (shouldRenderPie) {
            return <MacrosPieChart data={getMacros}/>
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