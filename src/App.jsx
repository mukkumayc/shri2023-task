import { Header } from './Header'
import { General } from './General'
import { Scripts } from './Scripts'
import { Devices } from './Devices'

function Main() {
	return (
		<main className="main">
			<General />
			<Scripts />
			<Devices />
		</main>
	)
}

export default function App() {
	return (
		<>
			<Header />
			<Main />
		</>
	)
}
