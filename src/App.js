import { Route, Switch } from "react-router"
import "./App.css"
import Department from "./components/Department"
import Employee from "./components/Employee"
import Home from "./components/Home"
import NavigationBar from "./components/NavigationBar"

function App() {
	return (
		<div className="App container">
			<h1 className="center">Employee Management</h1>
			<NavigationBar />
			<Switch>
				<Route path="/" component={Home} exact />
				<Route path="/department" component={Department} />
				<Route path="/employee" component={Employee} />
			</Switch>
		</div>
	)
}

export default App
