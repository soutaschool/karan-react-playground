import { useState } from "react";

type NavItem = {
	label: string;
	href: string;
};

type HeaderProps = {
	logo?: string;
	navItems?: NavItem[];
};

export default function Header({
	logo = "LOGO",
	navItems = [
		{ label: "Home", href: "/" },
		{ label: "About", href: "/about" },
		{ label: "Contact", href: "/contact" },
	],
}: HeaderProps) {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<header className="w-full bg-white text-black dark:bg-black dark:text-white">
			<div className="flex items-center justify-between px-4 py-4 md:px-8">
				<h1 className="text-xl font-bold overflow-hidden text-ellipsis whitespace-nowrap">
					<a
						href="/"
						className="transition-colors duration-200 hover:opacity-75 focus:opacity-75"
					>
						{logo}
					</a>
				</h1>
				<button
					onClick={() => setIsOpen(!isOpen)}
					aria-label="Toggle Menu"
					type="button"
					aria-expanded={isOpen}
					className="inline-flex items-center justify-center p-2 rounded md:hidden hover:bg-gray/10 dark:hover:bg-white/10"
				>
					<div className="relative w-6 h-6">
						<span
							className={`absolute block h-[2px] w-6 bg-current transition-transform duration-300 ease-in-out ${
								isOpen ? "top-[13px] rotate-45" : "top-[6px]"
							}`}
						/>
						<span
							className={`absolute block h-[2px] w-6 bg-current transition-opacity duration-300 ease-in-out ${
								isOpen ? "opacity-0" : "top-[13px]"
							}`}
						/>
						<span
							className={`absolute block h-[2px] w-6 bg-current transition-transform duration-300 ease-in-out ${
								isOpen ? "bottom-[6px] -rotate-45" : "bottom-[6px]"
							}`}
						/>
					</div>
				</button>
				<nav className="hidden md:flex md:items-center md:space-x-8">
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
			<div
				className={`md:hidden transition-[max-height] duration-300 overflow-hidden ${
					isOpen
						? "max-h-96 border-t border-gray/30 dark:border-white/30"
						: "max-h-0"
				}`}
			>
				<ul className="flex flex-col gap-4 py-4 px-4">
					{navItems.map(({ label, href }) => (
						<li key={href}>
							<a
								href={href}
								className="block px-2 py-1 transition-opacity duration-200 hover:opacity-75 focus:opacity-75"
							>
								{label}
							</a>
						</li>
					))}
				</ul>
			</div>
		</header>
	);
}
