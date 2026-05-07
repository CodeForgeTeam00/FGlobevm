import {dictionary} from "./dictionary"

export function useDictionary() {
    const locale = "en" 

    return dictionary[locale]
}
