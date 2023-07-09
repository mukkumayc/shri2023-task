import { useEffect, useRef, useState } from 'react'
import { Event } from './Event'

import TABS from './tabs.json'

const TABS_KEYS = Object.keys(TABS)

export function Devices() {
	const ref = useRef()
	const [activeTab, setActiveTab] = useState(
		new URLSearchParams(window.location.search).get('tab') || 'all',
	)
	const [hasRightScroll, setHasRightScroll] = useState(false)

	const onSelectInput = event => {
		setActiveTab(event.target.value)
	}

	useEffect(() => {
		const sumWidth = TABS[activeTab].items.length * 200

		const newHasRightScroll = sumWidth > ref.current.offsetWidth
		if (newHasRightScroll !== hasRightScroll) {
			setHasRightScroll(newHasRightScroll)
		}
	}, [activeTab, hasRightScroll])

	const onArrowCLick = () => {
		const scroller = ref.current.querySelector(
			'.section__panel:not(.section__panel_hidden)',
		)
		if (scroller) {
			scroller.scrollTo({
				left: scroller.scrollLeft + 400,
				behavior: 'smooth',
			})
		}
	}

	return (
		<section className="section main__devices">
			<div className="section__title">
				<h2 className="section__title-header">Избранные устройства</h2>

				<select
					className="section__select"
					defaultValue="all"
					onInput={onSelectInput}
				>
					{TABS_KEYS.map(key => (
						<option key={key} value={key}>
							{TABS[key].title}
						</option>
					))}
				</select>

				<ul role="tablist" className="section__tabs">
					{TABS_KEYS.map(key => (
						<li
							key={key}
							role="tab"
							aria-selected={key === activeTab ? 'true' : 'false'}
							tabIndex={key === activeTab ? '0' : undefined}
							className={
								'section__tab' +
								(key === activeTab ? ' section__tab_active' : '')
							}
							id={`tab_${key}`}
							aria-controls={`panel_${key}`}
							onClick={() => setActiveTab(key)}
						>
							{TABS[key].title}
						</li>
					))}
				</ul>
			</div>

			<div className="section__panel-wrapper" ref={ref}>
				{TABS_KEYS.map(key => (
					<div
						key={key}
						role="tabpanel"
						className={
							'section__panel' +
							(key === activeTab ? '' : ' section__panel_hidden')
						}
						aria-hidden={key === activeTab ? 'false' : 'true'}
						id={`panel_${key}`}
						aria-labelledby={`tab_${key}`}
					>
						<ul className="section__panel-list">
							{TABS[key].items.map((item, index) => (
								<Event key={index} {...item} />
							))}
						</ul>
					</div>
				))}
				{hasRightScroll && (
					<div className="section__arrow" onClick={onArrowCLick}></div>
				)}
			</div>
		</section>
	)
}
