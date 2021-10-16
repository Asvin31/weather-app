import { createContext, useState } from 'react';

export const ThemeContext = createContext();

const ThemeContextProvider = (props) => {
    const [currentTheme, setTheme] = useState('light');
    const storeTheme = theme => {
        setTheme(theme)
    }
    return (
        <ThemeContext.Provider value={{ currentTheme, storeTheme }}>
            {props.children}
        </ThemeContext.Provider>
    )
}
export default ThemeContextProvider;