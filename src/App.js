import { ThemeProvider } from '@mui/material/styles';
import { Provider } from 'react-redux';

import './App.css';
import { theme } from './theme/theme';
import Header from './webui/header/header';
import { store } from './redux/store';

function App() {
   return (
      <Provider store={store}>
         <ThemeProvider theme={theme}>
            <div className='App'>
               <Header />
            </div>
         </ThemeProvider>
      </Provider>
   );
}

export default App;
