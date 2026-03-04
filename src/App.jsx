
import './App.css'
import { EmployeeList } from './pages/EmployeeList';
import { Provider } from 'react-redux';
import { store } from './redux/store/store';
import Toast from './components/common/Toast';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline'
const theme = createTheme({
  palette: {
    primary: {
      main: '#ff416c',
    },
    secondary: {
      main: '#ff4b2b',
    },
  },
});
function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Provider store={store}>
          <EmployeeList />
          <Toast />
        </Provider>
      </ThemeProvider>
    </>
  )
}

export default App
