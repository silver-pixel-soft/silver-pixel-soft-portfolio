import { Home } from "./pages/index.ts"
import { Header, Footer } from './components/layouts/index.ts'

const App = () => {
  return (
    <div>
      <Header />
      <Home />
      <Footer />
    </div>
  )
}

export default App