import logo from "./logo.svg";
import "./App.css";
import Children from './Children';
function App() {
  return (
    <div className="wrap">
      <Children>
        <div>hello react test1</div>
        <div>hello react test2</div>
        <div>hello react test3</div>
        <div>
          hello react test4
          <div>
            hello react test5
            <div>hello react test6</div>
          </div>
        </div>
      </Children>
    </div>
  );
}

export default App;
