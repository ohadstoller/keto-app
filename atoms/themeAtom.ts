import {atom, RecoilState} from 'recoil'


export const themeState: RecoilState<string> = atom({
    'key': 'themeState',
    default: 'light'
})

