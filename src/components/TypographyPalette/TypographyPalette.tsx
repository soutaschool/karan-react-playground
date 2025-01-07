import type React from "react";
import { useState } from "react";

type TypographyItem = {
	label: string;
	sizeToken: string;
	px: string;
	lineHeight: string;
	usage: string;
	previewText: string;
};

const typographyList: TypographyItem[] = [
	{
		label: "XS",
		sizeToken: "--font-xs",
		px: "12px",
		lineHeight: "--lh-tight",
		usage: "Microcopy, Footnotes",
		previewText: "Typography XS: Quick brown fox",
	},
	{
		label: "SM",
		sizeToken: "--font-sm",
		px: "14px",
		lineHeight: "--lh-base",
		usage: "Captions, Subtexts",
		previewText: "Typography SM: Quick brown fox",
	},
	{
		label: "BASE",
		sizeToken: "--font-base",
		px: "16px",
		lineHeight: "--lh-base",
		usage: "Body Text, Default",
		previewText: "Typography BASE: Quick brown fox",
	},
	{
		label: "LG",
		sizeToken: "--font-lg",
		px: "18px",
		lineHeight: "--lh-base",
		usage: "Subheadings, Emphasis",
		previewText: "Typography LG: Quick brown fox",
	},
	{
		label: "XL",
		sizeToken: "--font-xl",
		px: "20px",
		lineHeight: "--lh-heading",
		usage: "Section Headings",
		previewText: "Typography XL: Quick brown fox",
	},
	{
		label: "2XL",
		sizeToken: "--font-2xl",
		px: "24px",
		lineHeight: "--lh-heading",
		usage: "H3/H2 Headings",
		previewText: "Typography 2XL: Quick brown fox",
	},
	{
		label: "3XL",
		sizeToken: "--font-3xl",
		px: "30px",
		lineHeight: "--lh-heading",
		usage: "H2/H1 Headings",
		previewText: "Typography 3XL: Quick brown fox",
	},
	{
		label: "4XL",
		sizeToken: "--font-4xl",
		px: "36px",
		lineHeight: "--lh-heading",
		usage: "Prominent H1",
		previewText: "Typography 4XL: Quick brown fox",
	},
	{
		label: "5XL",
		sizeToken: "--font-5xl",
		px: "48px",
		lineHeight: "--lh-heading",
		usage: "Hero Titles",
		previewText: "Typography 5XL: Quick brown fox",
	},
];

export default function TypographyPalette() {
	const [tooltipText, setTooltipText] = useState<{ [label: string]: string }>(
		() => {
			const initialTooltips: { [label: string]: string } = {};
			for (const item of typographyList) {
				initialTooltips[item.label] = "Click to copy";
			}
			return initialTooltips;
		},
	);

	const copyToClipboard = (text: string, label: string) => {
		navigator.clipboard
			.writeText(text)
			.then(() => {
				setTooltipText((prev) => {
					const newState: { [label: string]: string } = {};
					for (const key in prev) {
						newState[key] = prev[key];
					}
					newState[label] = "Copied!";
					return newState;
				});
				setTimeout(() => {
					setTooltipText((prev) => {
						const newState: { [label: string]: string } = {};
						for (const key in prev) {
							newState[key] = prev[key];
						}
						newState[label] = "Click to copy";
						return newState;
					});
				}, 1500);
			})
			.catch((err) => {
				console.error("Could not copy text: ", err);
			});
	};

	return (
		<div className="w-full box-border p-4 bg-white text-black dark:bg-black dark:text-white overflow-x-auto">
			<h2 className="text-3xl mb-4 text-center">Typography Palette</h2>
			<table className="w-full border-collapse min-w-[720px]">
				<thead>
					<tr>
						<th className="p-2 text-center border border-gray bg-gray text-white font-bold dark:bg-dark-basic-gray dark:text-dark-basic-white">
							Label
						</th>
						<th className="p-2 text-center border border-gray bg-gray text-white font-bold dark:bg-dark-basic-gray dark:text-dark-basic-white">
							Font Size (rem / px)
						</th>
						<th className="p-2 text-center border border-gray bg-gray text-white font-bold dark:bg-dark-basic-gray dark:text-dark-basic-white">
							Line Height Token
						</th>
						<th className="p-2 text-center border border-gray bg-gray text-white font-bold dark:bg-dark-basic-gray dark:text-dark-basic-white">
							Usage
						</th>
						<th className="p-2 text-center border border-gray bg-gray text-white font-bold dark:bg-dark-basic-gray dark:text-dark-basic-white">
							Preview
						</th>
					</tr>
				</thead>
				<tbody>
					{typographyList.map((item, index) => {
						const styleText: React.CSSProperties = {
							fontSize: `var(${item.sizeToken})`,
							lineHeight: `var(${item.lineHeight})`,
						};

						const copyText = `font-size: var(${item.sizeToken}); line-height: var(${item.lineHeight});`;

						return (
							<tr
								key={item.label}
								className={
									index % 2 === 1
										? "bg-light-basic-white dark:bg-dark-basic-black"
										: ""
								}
							>
								<td className="p-2 text-center border border-gray dark:border-dark-basic-gray">
									{item.label}
								</td>
								<td className="p-2 text-center border border-gray dark:border-dark-basic-gray">
									<div className="flex flex-col items-center gap-1">
										<span>{item.sizeToken}</span>
										<span>{item.px}</span>
									</div>
								</td>
								<td className="p-2 text-center border border-gray dark:border-dark-basic-gray">
									{item.lineHeight}
								</td>
								<td className="p-2 text-center border border-gray dark:border-dark-basic-gray">
									{item.usage}
								</td>
								<td className="p-2 text-center border border-gray dark:border-dark-basic-gray">
									<button
										type="button"
										className="
                      relative
                      group
                      inline-block
                      p-2
                      border
                      border-gray
                      dark:border-dark-basic-silver
                      rounded
                      cursor-pointer
                      transition-all
                      duration-300
                      ease-in-out
                      focus:outline-none
                      hover:scale-[1.02]
                      focus:scale-[1.02]
                      hover:shadow-[0_4px_8px_rgba(0,0,0,0.2)]
                      focus:shadow-[0_4px_8px_rgba(0,0,0,0.2)]
                    "
										style={styleText}
										onClick={() => copyToClipboard(copyText, item.label)}
										onKeyDown={(e) => {
											if (e.key === "Enter" || e.key === " ") {
												e.preventDefault();
												copyToClipboard(copyText, item.label);
											}
										}}
										aria-describedby={`tooltip-${item.label}`}
									>
										{item.previewText}
										<span
											id={`tooltip-${item.label}`}
											className="
                        absolute
                        left-1/2
                        -translate-x-1/2
                        bottom-[calc(100%+8px)]
                        w-max
                        px-2
                        py-1
                        text-xs
                        text-center
                        rounded
                        border
                        border-gray
                        dark:border-dark-basic-gray
                        bg-white
                        dark:bg-dark-basic-black
                        text-black
                        dark:text-dark-basic-white
                        pointer-events-none
                        z-10
                        opacity-0
                        invisible
                        transition-opacity
                        duration-300
                        ease-in-out
                        group-hover:opacity-100
                        group-hover:visible
                        group-focus:opacity-100
                        group-focus:visible
                      "
										>
											{tooltipText[item.label]}
										</span>
									</button>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
}
