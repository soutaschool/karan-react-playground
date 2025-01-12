type NavItem = {
	label: string;
	href: string;
};

type FooterProps = {
	logo?: string;
	navItems?: NavItem[];
};

export default function Footer({
	logo,
	navItems = [
		{ label: "About", href: "/about" },
		{ label: "Contact", href: "/contact" },
		{ label: "Q&A", href: "/qa" },
	],
}: FooterProps) {
	return (
		<footer className="relative w-full bg-white text-black dark:bg-black dark:text-white mt-8">
			<div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-lime-500 via-teal-400 to-blue-500" />
			<div
				className={`flex flex-col md:flex-row items-center px-4 py-6 gap-4 text-center md:text-left md:px-8 ${
					logo ? "md:justify-between" : "md:justify-end"
				}`}
			>
				{logo && (
					<h2 className="text-xl font-bold overflow-hidden text-ellipsis whitespace-nowrap">
						{logo}
					</h2>
				)}
				<nav className="flex flex-wrap items-center gap-4 md:gap-8 justify-center md:justify-end w-full md:w-auto">
					{navItems.map(({ label, href }) => (
						<a
							key={href}
							href={href}
							className="block px-2 py-1 transition-opacity duration-200 hover:opacity-75 focus:opacity-75"
						>
							{label}
						</a>
					))}
				</nav>
			</div>
			<div className="border-t border-dashed border-gray/30 dark:border-white/30 px-4 py-4 md:px-8 text-sm text-center">
				© {new Date().getFullYear()} Your Company
			</div>
		</footer>
	);
}
