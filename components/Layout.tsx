import 'bootstrap/dist/css/bootstrap.css'
import Navbar from './Navbar'

const Layout = ({children}) => {
    return (
      <div >
        <Navbar />
          {children}
      </div>
    )
}


export default Layout