import 'bootstrap/dist/css/bootstrap.css'
import Footer from './Footer'
import Navbar from './Navbar'

const Layout = ({children}) => {
    return (
      <div className="content">
        <Navbar />
          {children}
        <Footer />
      </div>
    )
}


export default Layout