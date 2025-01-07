import { useState } from "react";

const colorData = [
	{
		name: "black",
		usage: "Text, Icons",
		lightHex: "#333333",
		basicHex: "#000000",
		darkHex: "#121212",
	},
	{
		name: "silver",
		usage: "Subtext, Borders",
		lightHex: "#777777",
		basicHex: "#c0c0c0",
		darkHex: "#c0c0c0",
	},
	{
		name: "gray",
		usage: "Background, Cards",
		lightHex: "#555555",
		basicHex: "#808080",
		darkHex: "#aaaaaa",
	},
	{
		name: "white",
		usage: "Background, Cards, Text",
		lightHex: "#eeeeee",
		basicHex: "#ffffff",
		darkHex: "#f0f0f0",
	},
	{
		name: "maroon",
		usage: "Action Buttons, Links",
		lightHex: "#800000",
		basicHex: "#800000",
		darkHex: "#ff4d4d",
	},
	{
		name: "red",
		usage: "Error Messages, Alerts",
		lightHex: "#b30000",
		basicHex: "#ff0000",
		darkHex: "#ff3333",
	},
	{
		name: "purple",
		usage: "Highlights, Emphasis",
		lightHex: "#800080",
		basicHex: "#800080",
		darkHex: "#cc66cc",
	},
	{
		name: "fuchsia",
		usage: "Focus Rings, Active States",
		lightHex: "#b300b3",
		basicHex: "#ff00ff",
		darkHex: "#ff66ff",
	},
	{
		name: "green",
		usage: "Success Messages, Approval Buttons",
		lightHex: "#008000",
		basicHex: "#008000",
		darkHex: "#33cc33",
	},
	{
		name: "lime",
		usage: "Growth Indicators, Progress Bars",
		lightHex: "#2d7f2d",
		basicHex: "#00ff00",
		darkHex: "#66ff66",
	},
	{
		name: "olive",
		usage: "Backgrounds, Section Dividers",
		lightHex: "#666600",
		basicHex: "#808000",
		darkHex: "#cccc33",
	},
	{
		name: "yellow",
		usage: "Warnings, Attention Alerts",
		lightHex: "#999900",
		basicHex: "#ffff00",
		darkHex: "#ffff33",
	},
	{
		name: "navy",
		usage: "Headers, Navigation",
		lightHex: "#000080",
		basicHex: "#000080",
		darkHex: "#6666ff",
	},
	{
		name: "blue",
		usage: "Links, Action Buttons",
		lightHex: "#0000b3",
		basicHex: "#0000ff",
		darkHex: "#4d4dff",
	},
	{
		name: "teal",
		usage: "Information, Tooltips",
		lightHex: "#006666",
		basicHex: "#008080",
		darkHex: "#33cccc",
	},
	{
		name: "aqua",
		usage: "Highlights, Accent Colors",
		lightHex: "#009999",
		basicHex: "#00ffff",
		darkHex: "#66ffff",
	},
];

export default function ColorPalette() {
	const [tooltipContent, setTooltipContent] = useState(() => {
		const map: { [key: string]: string } = {};
		for (const c of colorData) {
			map[`light-${c.name}`] = c.lightHex;
			map[`basic-${c.name}`] = c.basicHex;
			map[`dark-${c.name}`] = c.darkHex;
		}
		return map;
	});

	const copyToClipboard = (hex: string, key: string) => {
		navigator.clipboard.writeText(hex).then(() => {
			setTooltipContent((prev) => {
				const next = { ...prev };
				next[key] = "Copied!";
				return next;
			});
			setTimeout(() => {
				setTooltipContent((prev) => {
					const next = { ...prev };
					next[key] = hex;
					return next;
				});
			}, 2000);
		});
	};

	return (
		<div className="w-full box-border px-8 py-8 bg-white text-black dark:bg-black dark:text-white overflow-x-auto">
			<table className="w-full border-collapse min-w-[600px]">
				<thead>
					<tr>
						<th className="p-2 text-center border border-[#ddd] bg-gray text-white dark:bg-dark-basic-gray">
							Color Name
						</th>
						<th className="p-2 text-center border border-[#ddd] bg-gray text-white dark:bg-dark-basic-gray">
							Light Mode
						</th>
						<th className="p-2 text-center border border-[#ddd] bg-gray text-white dark:bg-dark-basic-gray">
							Basic Mode
						</th>
						<th className="p-2 text-center border border-[#ddd] bg-gray text-white dark:bg-dark-basic-gray">
							Dark Mode
						</th>
						<th className="p-2 text-center border border-[#ddd] bg-gray text-white dark:bg-dark-basic-gray">
							Usage Examples
						</th>
					</tr>
				</thead>
				<tbody>
					{colorData.map((c) => (
						<tr key={c.name}>
							<td
								className="p-2 text-center border border-[#ddd]"
								style={{ textTransform: "capitalize" }}
							>
								{c.name}
							</td>
							<td className="p-2 text-center border border-[#ddd]">
								<button
									type="button"
									className="relative group w-[80%] max-w-[100px] aspect-square border border-[#ccc] rounded-[4px] transition-transform ease-in-out duration-300 cursor-pointer mx-auto hover:scale-[1.05] focus:scale-[1.05] hover:shadow-[0_4px_8px_rgba(0,0,0,0.2)] focus:shadow-[0_4px_8px_rgba(0,0,0,0.2)]"
									style={{ backgroundColor: c.lightHex }}
									onClick={() => copyToClipboard(c.lightHex, `light-${c.name}`)}
									aria-describedby={`tooltip-light-${c.name}`}
								>
									<span
										id={`tooltip-light-${c.name}`}
										className="invisible opacity-0 pointer-events-none group-hover:visible group-hover:opacity-100 group-focus:visible group-focus:opacity-100 absolute left-1/2 bottom-[125%] -translate-x-1/2 px-2 py-1 text-xs text-center rounded bg-white text-black dark:bg-dark-basic-black dark:text-dark-basic-white border border-[#ddd] dark:border-dark-basic-gray transition-opacity duration-300"
									>
										{tooltipContent[`light-${c.name}`]}
									</span>
								</button>
							</td>
							<td className="p-2 text-center border border-[#ddd]">
								<button
									type="button"
									className="relative group w-[80%] max-w-[100px] aspect-square border border-[#ccc] rounded-[4px] transition-transform ease-in-out duration-300 cursor-pointer mx-auto hover:scale-[1.05] focus:scale-[1.05] hover:shadow-[0_4px_8px_rgba(0,0,0,0.2)] focus:shadow-[0_4px_8px_rgba(0,0,0,0.2)]"
									style={{ backgroundColor: c.basicHex }}
									onClick={() => copyToClipboard(c.basicHex, `basic-${c.name}`)}
									aria-describedby={`tooltip-basic-${c.name}`}
								>
									<span
										id={`tooltip-basic-${c.name}`}
										className="invisible opacity-0 pointer-events-none group-hover:visible group-hover:opacity-100 group-focus:visible group-focus:opacity-100 absolute left-1/2 bottom-[125%] -translate-x-1/2 px-2 py-1 text-xs text-center rounded bg-white text-black dark:bg-dark-basic-black dark:text-dark-basic-white border border-[#ddd] dark:border-dark-basic-gray transition-opacity duration-300"
									>
										{tooltipContent[`basic-${c.name}`]}
									</span>
								</button>
							</td>
							<td className="p-2 text-center border border-[#ddd]">
								<button
									type="button"
									className="relative group w-[80%] max-w-[100px] aspect-square border border-[#ccc] rounded-[4px] transition-transform ease-in-out duration-300 cursor-pointer mx-auto hover:scale-[1.05] focus:scale-[1.05] hover:shadow-[0_4px_8px_rgba(0,0,0,0.2)] focus:shadow-[0_4px_8px_rgba(0,0,0,0.2)]"
									style={{ backgroundColor: c.darkHex }}
									onClick={() => copyToClipboard(c.darkHex, `dark-${c.name}`)}
									aria-describedby={`tooltip-dark-${c.name}`}
								>
									<span
										id={`tooltip-dark-${c.name}`}
										className="invisible opacity-0 pointer-events-none group-hover:visible group-hover:opacity-100 group-focus:visible group-focus:opacity-100 absolute left-1/2 bottom-[125%] -translate-x-1/2 px-2 py-1 text-xs text-center rounded bg-white text-black dark:bg-dark-basic-black dark:text-dark-basic-white border border-[#ddd] dark:border-dark-basic-gray transition-opacity duration-300"
									>
										{tooltipContent[`dark-${c.name}`]}
									</span>
								</button>
							</td>
							<td className="p-2 text-center border border-[#ddd] max-w-[200px] mx-auto text-sm text-basic-gray dark:text-dark-basic-silver">
								{c.usage}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
