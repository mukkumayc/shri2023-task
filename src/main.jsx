import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './css/reset.css'
import './css/styles.css'
import './css/fonts.css'

setTimeout(() => {
	const root = ReactDOM.createRoot(document.getElementById('app'))
	root.render(
		<React.StrictMode>
			<App />
		</React.StrictMode>,
	)
}, 100)
