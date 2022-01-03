import * as React from 'react'

const ThemeContext = React.createContext({ username: '', age: '' })
const { Provider, Consumer } = ThemeContext

export default ThemeContext;