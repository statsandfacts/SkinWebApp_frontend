import { useState } from "react";

const useLocalStorage = (key:string, defaultValue:any) => {
	// Create state variable to store 
	// localStorage value in state
	const [localStorageValue, setLocalStorageValue] = useState(() => {
		try {
			if (typeof window !== 'undefined') {
			const value = localStorage.getItem(key)
			// If value is already present in 
			// localStorage then return it
			
			// Else set default value in 
			// localStorage and then return it
			if (value) {
				return JSON.parse(value)
			} else {
				localStorage.setItem(key, JSON.stringify(defaultValue));
				return defaultValue
			}
		}
		} catch (error) {
			console.log(error)
			return null
		}
	})

	// this method update our localStorage and our state
	const setLocalStorageStateValue = (valueOrFn:any) => {
		try {
			
		let newValue;
		if (typeof valueOrFn === 'function') {
			const fn = valueOrFn;
			newValue = fn(localStorageValue)
		}
		else {
			newValue = valueOrFn;
		}
		if (typeof window !== 'undefined') {
			localStorage.setItem(key, JSON.stringify(newValue));
			setLocalStorageValue(newValue)
		}
		} catch (error) {
			console.log(error);
			
		}
	}
	return [localStorageValue, setLocalStorageStateValue]
}

export default useLocalStorage;
