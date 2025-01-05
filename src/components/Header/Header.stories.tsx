import type { Meta, StoryObj } from "@storybook/react";
import Header from "./Header";

type NavItem = {
	label: string;
	href: string;
};

interface HeaderProps {
	logo?: string;
	navItems?: NavItem[];
}

const meta: Meta<HeaderProps> = {
	title: "Components/Header",
	component: Header,
	tags: ["autodocs"],
	argTypes: {
		logo: {
			control: "text",
			description: "The logo text or image URL displayed in the header.",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "LOGO" },
			},
		},
		navItems: {
			control: "object",
			description: "An array of navigation items with label and href.",
			table: {
				type: { summary: "NavItem[]" },
				defaultValue: {
					summary: `[
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
]`,
				},
			},
		},
	},
	args: {
		logo: "LOGO",
		navItems: [
			{ label: "Home", href: "/" },
			{ label: "About", href: "/about" },
			{ label: "Contact", href: "/contact" },
		],
	},
};

export default meta;
type Story = StoryObj<HeaderProps>;

export const Default: Story = {
	args: {
		logo: "LOGO",
		navItems: [
			{ label: "Home", href: "/" },
			{ label: "About", href: "/about" },
			{ label: "Contact", href: "/contact" },
		],
	},
};

export const CustomLogo: Story = {
	args: {
		logo: "MySite",
		navItems: [
			{ label: "Home", href: "/" },
			{ label: "Features", href: "/features" },
			{ label: "Pricing", href: "/pricing" },
		],
	},
};

export const AdditionalNavItems: Story = {
	args: {
		logo: "LOGO",
		navItems: [
			{ label: "Home", href: "/" },
			{ label: "Services", href: "/services" },
			{ label: "Portfolio", href: "/portfolio" },
			{ label: "Blog", href: "/blog" },
			{ label: "Contact", href: "/contact" },
		],
	},
};

export const LongLogo: Story = {
	args: {
		logo: "MySuperLongWebsiteName",
		navItems: [
			{ label: "Home", href: "/" },
			{ label: "Docs", href: "/docs" },
			{ label: "Support", href: "/support" },
		],
	},
};
