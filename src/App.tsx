import { Navbar } from "./components";
import { About, Footer, Header, Skills, Testimonial, Work } from "./container";
import "./App.scss";

const App = () => {
    return (
        <div className="app">
            <Header />
            <About />
            <Work />
            <Skills />
            <Testimonial />
            <Footer />
        </div>
    );
};

export default App;
