import { createRoot } from "react-dom/client";
import { MainView } from './components/main-view/main-view';
import "bootstrap/dist/css/bootstrap.min.css";
import './index.scss';







const App = () => {
 return <MainView />;
};

const container = document.querySelector("#root");
const root = createRoot(container);
root.render(<App />);