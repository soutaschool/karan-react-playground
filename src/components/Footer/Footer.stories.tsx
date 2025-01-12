import type { Meta, StoryObj } from "@storybook/react";
import Footer from "./Footer";

const meta: Meta<typeof Footer> = {
	title: "Components/Footer",
	component: Footer,
	tags: ["autodocs"],
	argTypes: {
		logo: { control: "text" },
		navItems: { control: "object" },
	},
	args: {
		logo: "",
		navItems: [
			{ label: "Privacy Policy", href: "/privacy" },
			{ label: "Terms of Service", href: "/terms" },
			{ label: "Contact", href: "/contact" },
		],
	},
};

export default meta;
type Story = StoryObj<typeof Footer>;

export const Default: Story = {
	args: {
		logo: "",
		navItems: [
			{ label: "Privacy Policy", href: "/privacy" },
			{ label: "Terms of Service", href: "/terms" },
			{ label: "Contact", href: "/contact" },
		],
	},
};

export const WithLogo: Story = {
	args: {
		logo: "Footer Logo",
		navItems: [
			{ label: "Privacy Policy", href: "/privacy" },
			{ label: "Terms of Service", href: "/terms" },
			{ label: "Contact", href: "/contact" },
		],
	},
};

export const ManyLinks: Story = {
	args: {
		logo: "MyWebsite",
		navItems: [
			{ label: "Privacy Policy", href: "/privacy" },
			{ label: "Terms of Service", href: "/terms" },
			{ label: "Contact", href: "/contact" },
			{ label: "Careers", href: "/careers" },
			{ label: "Blog", href: "/blog" },
		],
	},
};
