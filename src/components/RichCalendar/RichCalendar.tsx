import type React from "react";
import { type KeyboardEvent, useState } from "react";

interface CalendarEvent {
	date: string;
	content: string[];
}

interface RichCalendarProps {
	year?: number;
	month?: number;
	events?: CalendarEvent[];
}

type TransitionState = "entering" | "entered" | "exiting";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const getTransitionClasses = (state: TransitionState) => {
	if (state === "entering") return "translate-x-full opacity-0";
	if (state === "exiting") return "-translate-x-full opacity-0";
	return "translate-x-0 opacity-100";
};

export const RichCalendar: React.FC<RichCalendarProps> = ({
	year,
	month,
	events = [],
}) => {
	const [currentYear, setCurrentYear] = useState(
		year ?? new Date().getFullYear(),
	);
	const [currentMonth, setCurrentMonth] = useState(
		month ?? new Date().getMonth() + 1,
	);
	const [transitionState, setTransitionState] =
		useState<TransitionState>("entered");
	const [selectedYear, setSelectedYear] = useState<number | null>(null);
	const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
	const [selectedDay, setSelectedDay] = useState<number | null>(null);
	const [selectedEvents, setSelectedEvents] = useState<string[]>([]);
	const [panelVisible, setPanelVisible] = useState(false);

	const goToToday = () => {
		const today = new Date();
		setCurrentYear(today.getFullYear());
		setCurrentMonth(today.getMonth() + 1);
	};

	const prevMonth = () => {
		if (transitionState !== "entered") return;
		setTransitionState("exiting");
		const y = currentMonth === 1 ? currentYear - 1 : currentYear;
		const m = currentMonth === 1 ? 12 : currentMonth - 1;
		setTimeout(() => {
			setCurrentYear(y);
			setCurrentMonth(m);
			setTransitionState("entering");
			requestAnimationFrame(() => setTransitionState("entered"));
		}, 300);
	};

	const nextMonth = () => {
		if (transitionState !== "entered") return;
		setTransitionState("exiting");
		const y = currentMonth === 12 ? currentYear + 1 : currentYear;
		const m = currentMonth === 12 ? 1 : currentMonth + 1;
		setTimeout(() => {
			setCurrentYear(y);
			setCurrentMonth(m);
			setTransitionState("entering");
			requestAnimationFrame(() => setTransitionState("entered"));
		}, 300);
	};

	const closePanel = () => {
		setPanelVisible(false);
		setSelectedYear(null);
		setSelectedMonth(null);
		setSelectedDay(null);
		setSelectedEvents([]);
	};

	const getDaysInMonth = (y: number, m: number) => {
		const lastDay = new Date(y, m, 0).getDate();
		return Array.from({ length: lastDay }, (_, i) => i + 1);
	};

	const formatDate = (y: number, m: number, d: number) => {
		const mm = String(m).padStart(2, "0");
		const dd = String(d).padStart(2, "0");
		return `${y}-${mm}-${dd}`;
	};

	const toggleDayInfo = (y: number, m: number, d: number, list: string[]) => {
		if (
			panelVisible &&
			y === selectedYear &&
			m === selectedMonth &&
			d === selectedDay
		) {
			closePanel();
			return;
		}
		setSelectedYear(y);
		setSelectedMonth(m);
		setSelectedDay(d);
		setSelectedEvents(list);
		setPanelVisible(true);
	};

	const handleKeyDown = (
		e: KeyboardEvent<HTMLDivElement>,
		y: number,
		m: number,
		d: number,
		list: string[],
	) => {
		if (e.key === "Enter") {
			toggleDayInfo(y, m, d, list);
		}
	};

	const getHoverClasses = (hasEvent: boolean) => {
		if (hasEvent) return "hover:border-[var(--basic-fuchsia)]";
		return "hover:bg-[var(--basic-aqua)] hover:border-[var(--basic-fuchsia)]";
	};

	const getDateCellClasses = (
		isToday: boolean,
		hasEvent: boolean,
		isWeekend: boolean,
	) => {
		const baseClasses = [
			"relative",
			"border",
			"border-[var(--basic-gray)]",
			"dark:border-[var(--dark-basic-gray)]",
			"flex",
			"flex-col",
			"justify-start",
			"items-center",
			"rounded",
			"text-sm",
			"cursor-pointer",
			"focus:outline-none",
			"focus:ring-2",
			"focus:ring-offset-0",
			"focus:ring-[var(--basic-aqua)]",
			"transition-colors",
			"w-[44px]",
			"h-[44px]",
			"sm:w-[52px]",
			"sm:h-[52px]",
			"md:w-[60px]",
			"md:h-[60px]",
			"p-1",
			getHoverClasses(hasEvent),
		];

		let bgColor =
			"bg-[var(--basic-white)] text-[var(--basic-black)] " +
			"dark:bg-[var(--dark-basic-black)] dark:text-[var(--dark-basic-white)]";

		if (isWeekend) {
			bgColor =
				"bg-[#f7f7f7] text-[var(--basic-black)] " +
				"dark:bg-[#444] dark:text-[var(--dark-basic-white)]";
		}

		if (isToday) {
			bgColor =
				"border-2 border-[var(--basic-aqua)] bg-[var(--basic-aqua)] text-[var(--basic-black)]";
		}

		if (hasEvent) {
			bgColor =
				"bg-[var(--basic-lime)] border-[var(--basic-red)] text-[var(--basic-black)] " +
				"dark:text-[var(--dark-basic-white)]";
			if (isWeekend) {
				bgColor =
					"bg-[var(--basic-lime)] border-[var(--basic-red)] text-[var(--basic-black)] dark:text-[var(--dark-basic-white)]";
			}
			if (isToday) {
				bgColor =
					"border-2 border-[var(--basic-aqua)] bg-[var(--basic-lime)] text-[var(--basic-black)]";
			}
		}

		return [...baseClasses, bgColor].join(" ");
	};

	const renderDays = () => {
		const y = currentYear;
		const m = currentMonth;
		const days = getDaysInMonth(y, m);
		const firstDayIndex = new Date(y, m - 1, 1).getDay();
		const todayStr = formatDate(
			new Date().getFullYear(),
			new Date().getMonth() + 1,
			new Date().getDate(),
		);

		const emptyCells = Array.from({ length: firstDayIndex }, () => {
			const keyVal = `empty-${y}-${m}-${Math.random().toString(36).slice(2)}`;
			return <div key={keyVal} />;
		});

		const cells = days.map((day) => {
			const dayStr = formatDate(y, m, day);
			const ev = events.find((e) => e.date === dayStr)?.content ?? [];
			const isToday = dayStr === todayStr;
			const hasEvent = ev.length > 0;
			const dayIndex = (firstDayIndex + (day - 1)) % 7;
			const isWeekend = dayIndex === 0 || dayIndex === 6;
			const ariaLabel = hasEvent
				? `${y}年${m}月${day}日、イベント${ev.length}件`
				: `${y}年${m}月${day}日`;

			return (
				<div
					key={`${dayStr}-cell`}
					className={getDateCellClasses(isToday, hasEvent, isWeekend)}
					aria-label={ariaLabel}
					aria-current={isToday ? "date" : undefined}
					onClick={() => toggleDayInfo(y, m, day, ev)}
					onKeyDown={(e) => handleKeyDown(e, y, m, day, ev)}
				>
					<span className="font-bold overflow-hidden text-ellipsis max-w-full whitespace-nowrap text-xs sm:text-sm">
						{day}
						{hasEvent && <span className="ml-1 text-[10px] sm:text-xs">🗓</span>}
					</span>
					{hasEvent && (
						<>
							<div className="flex justify-center mt-1 flex-wrap">
								{ev.slice(0, 3).map((evItem) => {
									const dotKey = `${dayStr}-dot-${evItem}-${Math.random()
										.toString(36)
										.slice(2)}`;
									return (
										<span
											key={dotKey}
											className="w-[6px] h-[6px] bg-[var(--basic-red)] rounded-full mr-[1px] mb-[1px]"
										/>
									);
								})}
								{ev.length > 3 && (
									<span className="w-auto h-auto text-[var(--basic-red)] text-[8px] p-0 ml-[2px]">
										+
									</span>
								)}
							</div>
							<div className="hidden sm:block mt-1 text-[var(--basic-red)] text-xs max-w-full whitespace-nowrap overflow-hidden text-ellipsis">
								{ev[0]}
								{ev.length > 1 && (
									<span className="font-bold text-[var(--basic-black)] dark:text-[var(--dark-basic-white)] ml-1">
										+{ev.length - 1} more
									</span>
								)}
							</div>
						</>
					)}
				</div>
			);
		});

		return [...emptyCells, ...cells];
	};

	return (
		<div className="flex flex-col items-center relative p-4 font-sans shadow rounded bg-[var(--basic-white)] text-[var(--basic-black)] dark:bg-[var(--dark-basic-black)] dark:text-[var(--dark-basic-white)]">
			<div
				className="flex items-center w-full max-w-[460px] mb-4 justify-between text-base"
				aria-label={`${currentYear}年${currentMonth}月カレンダー`}
				aria-live="polite"
				aria-atomic="true"
			>
				<button
					type="button"
					className="p-1 px-2 transition-colors rounded focus:outline-none bg-none border-none hover:text-[var(--basic-aqua)]"
					aria-label="前月へ"
					onClick={prevMonth}
				>
					&lt;
				</button>
				<div
					className="flex-1 text-center text-lg font-bold relative"
					id="calendar-title"
				>
					{currentYear}年 {currentMonth}月
					<div className="absolute bottom-[-0.5rem] left-1/2 -translate-x-1/2 w-[60%] h-[2px] bg-[var(--basic-aqua)] rounded" />
				</div>
				<div className="flex items-center">
					<button
						type="button"
						className="p-1 px-2 transition-colors rounded focus:outline-none bg-none border-none hover:text-[var(--basic-aqua)]"
						aria-label="次月へ"
						onClick={nextMonth}
					>
						&gt;
					</button>
					<button
						type="button"
						className="ml-2 bg-[var(--basic-aqua)] text-[var(--basic-black)] p-1 px-2 rounded transition-colors hover:bg-[var(--basic-fuchsia)]"
						aria-label="今日へ"
						onClick={goToToday}
					>
						Today
					</button>
				</div>
			</div>

			<div className="grid grid-cols-7 gap-2 mb-2 text-sm text-center font-bold w-full max-w-[460px]">
				{WEEKDAYS.map((day) => (
					<div key={`weekday-${day}`} className="p-1 rounded">
						{day}
					</div>
				))}
			</div>

			{/* role="grid" */}
			<div
				className={[
					"grid",
					"grid-cols-7",
					"gap-2",
					"w-full",
					"max-w-[460px]",
					"mb-4",
					"transition-transform",
					"transition-opacity",
					"duration-300",
					getTransitionClasses(transitionState),
				].join(" ")}
				aria-labelledby="calendar-title"
				aria-live="polite"
				aria-atomic="true"
			>
				{renderDays()}
			</div>

			<div
				className={[
					"w-full",
					"max-w-[460px]",
					"bg-[var(--basic-white)]",
					"dark:bg-[var(--dark-basic-black)]",
					"border",
					"border-[var(--basic-gray)]",
					"dark:border-[var(--dark-basic-gray)]",
					"shadow",
					"p-2",
					"text-sm",
					"rounded",
					"text-[var(--basic-black)]",
					"dark:text-[var(--dark-basic-white)]",
					"mt-4",
					panelVisible ? "block" : "hidden",
					"relative",
				].join(" ")}
				aria-live="polite"
			>
				<button
					type="button"
					onClick={closePanel}
					className="absolute top-1 right-1 bg-none border-none cursor-pointer text-lg hover:text-[var(--basic-aqua)]"
					aria-label="パネルを閉じる"
				>
					×
				</button>
				{panelVisible &&
				selectedYear !== null &&
				selectedMonth !== null &&
				selectedDay !== null ? (
					selectedEvents.length > 0 ? (
						<>
							<h3 className="text-sm font-bold border-b border-[var(--basic-gray)] dark:border-[var(--dark-basic-gray)] pb-1 mb-2 text-left">
								{selectedYear}年{selectedMonth}月{selectedDay}日
							</h3>
							{/* role="list" */}
							<ul className="list-disc pl-5 max-h-[100px] overflow-y-auto text-sm">
								{selectedEvents.map((evItem) => {
									const liKey = `${selectedYear}-${selectedMonth}-${selectedDay}-${evItem}-${Math.random()
										.toString(36)
										.slice(2)}`;
									return (
										// role="listitem"
										<li key={liKey} className="mb-1">
											{evItem}
										</li>
									);
								})}
							</ul>
						</>
					) : (
						<>
							<h3 className="text-sm font-bold border-b border-[var(--basic-gray)] dark:border-[var(--dark-basic-gray)] pb-1 mb-2 text-left">
								{selectedYear}年{selectedMonth}月{selectedDay}日
							</h3>
							<p className="text-center text-sm">イベントはありません</p>
						</>
					)
				) : null}
			</div>
		</div>
	);
};
