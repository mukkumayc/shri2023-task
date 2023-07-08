import { useEffect, useRef, useState } from 'react'
import { Event } from './Event'

const TABS = {
	all: {
		title: 'Все',
		items: [
			{
				icon: 'light2',
				iconLabel: 'Освещение',
				title: 'Xiaomi Yeelight LED Smart Bulb',
				subtitle: 'Включено',
			},
			{
				icon: 'light',
				iconLabel: 'Освещение',
				title: 'D-Link Omna 180 Cam',
				subtitle: 'Включится в 17:00',
			},
			{
				icon: 'temp',
				iconLabel: 'Температура',
				title: 'Elgato Eve Degree Connected',
				subtitle: 'Выключено до 17:00',
			},
			{
				icon: 'light',
				iconLabel: 'Освещение',
				title: 'LIFX Mini Day & Dusk A60 E27',
				subtitle: 'Включится в 17:00',
			},
			{
				icon: 'light2',
				iconLabel: 'Освещение',
				title: 'Xiaomi Mi Air Purifier 2S',
				subtitle: 'Включено',
			},
			{
				icon: 'light',
				iconLabel: 'Освещение',
				title: 'Philips Zhirui',
				subtitle: 'Включено',
			},
			{
				icon: 'light',
				iconLabel: 'Освещение',
				title: 'Philips Zhirui',
				subtitle: 'Включено',
			},
			{
				icon: 'light2',
				iconLabel: 'Освещение',
				title: 'Xiaomi Mi Air Purifier 2S',
				subtitle: 'Включено',
			},
		],
	},
	kitchen: {
		title: 'Кухня',
		items: [
			{
				icon: 'light2',
				iconLabel: 'Освещение',
				title: 'Xiaomi Yeelight LED Smart Bulb',
				subtitle: 'Включено',
			},
			{
				icon: 'temp',
				iconLabel: 'Температура',
				title: 'Elgato Eve Degree Connected',
				subtitle: 'Выключено до 17:00',
			},
		],
	},
	hall: {
		title: 'Зал',
		items: [
			{
				icon: 'light',
				iconLabel: 'Освещение',
				title: 'Philips Zhirui',
				subtitle: 'Выключено',
			},
			{
				icon: 'light2',
				iconLabel: 'Освещение',
				title: 'Xiaomi Mi Air Purifier 2S',
				subtitle: 'Выключено',
			},
		],
	},
	lights: {
		title: 'Лампочки',
		items: [
			{
				icon: 'light',
				iconLabel: 'Освещение',
				title: 'D-Link Omna 180 Cam',
				subtitle: 'Включится в 17:00',
			},
			{
				icon: 'light',
				iconLabel: 'Освещение',
				title: 'LIFX Mini Day & Dusk A60 E27',
				subtitle: 'Включится в 17:00',
			},
			{
				icon: 'light2',
				iconLabel: 'Освещение',
				title: 'Xiaomi Mi Air Purifier 2S',
				subtitle: 'Включено',
			},
			{
				icon: 'light',
				iconLabel: 'Освещение',
				title: 'Philips Zhirui',
				subtitle: 'Включено',
			},
		],
	},
	cameras: {
		title: 'Камеры',
		items: [
			{
				icon: 'light2',
				iconLabel: 'Освещение',
				title: 'Xiaomi Mi Air Purifier 2S',
				subtitle: 'Включено',
			},
		],
	},
}

for (let i = 0; i < 6; ++i) {
	TABS.all.items = [...TABS.all.items, ...TABS.all.items]
}

const TABS_KEYS = Object.keys(TABS)

export function Devices() {
	const ref = useRef()
	const initedRef = useRef(false)
	const [activeTab, setActiveTab] = useState('')
	const [hasRightScroll, setHasRightScroll] = useState(false)

	useEffect(() => {
		if (!activeTab && !initedRef.current) {
			initedRef.current = true
			setActiveTab(new URLSearchParams(location.search).get('tab') || 'all')
		}
	})

	const onSelectInput = event => {
		setActiveTab(event.target.value)
	}

	let sizes = []
	const onSize = size => {
		sizes = [...sizes, size]
	}

	useEffect(() => {
		const sumWidth = sizes.reduce((acc, item) => acc + item.width, 0)
		const sumHeight = sizes.reduce((acc, item) => acc + item.height, 0)

		const newHasRightScroll = sumWidth > ref.current.offsetWidth
		if (newHasRightScroll !== hasRightScroll) {
			setHasRightScroll(newHasRightScroll)
		}
	})

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
								<Event key={index} {...item} onSize={onSize} />
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
