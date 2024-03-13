import OurRouter from './components/OurRouter.jsx'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './style/index.css'
import { useModal } from './contexts/LogInContext.jsx';
import LogIn from './pages/LogIn.jsx';



function App() {
  const { isLoginModalVisible, toggleLoginModal } = useModal();
  
//Lägger till ToastContainer runt hela applikationen för att kunna använda toast-funktionerna
  return (
    <>
        <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
          transition:Bounce />
        <OurRouter />
        {isLoginModalVisible && <LogIn closeModal={() => toggleLoginModal()} />}


    </>
  )
}
export default App
