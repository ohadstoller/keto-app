import {atom, RecoilState} from 'recoil'


interface Food {
    common_type: any,
    food_name: string,
    local: string,
    photo: {thumb: string},
    serving_qty: number,
    serving_unit: string,
    tag_id: string,
    tag_name: string
}

// @ts-ignore
export const foodListState: RecoilState<Food[]> = atom({
    'key': 'foodListState',
    default: []
})
