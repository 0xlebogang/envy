"use client";

import { Slot } from "@radix-ui/react-slot";
import { cn } from "@repo/shadcn/lib/utils";
import * as React from "react";

export interface LinkProps
	extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
	/**
	 * If true, the Link will render as a Slot, allowing the consumer
	 * to provide their own Link component (e.g., Next.js Link)
	 */
	asChild?: boolean;
	/** External links will use regular anchor tags */
	external?: boolean;
}

/**
 * A polymorphic Link component that can work with different routing libraries.
 *
 * Usage examples:
 *
 * // Regular anchor tag (for external links)
 * <Link href="https://example.com" external>External Link</Link>
 *
 * // With Next.js Link
 * <Link asChild>
 *   <NextLink href="/internal">Internal Link</NextLink>
 * </Link>
 *
 * // Direct usage (falls back to anchor tag)
 * <Link href="/fallback">Fallback Link</Link>
 */
const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
	({
		className,
		asChild = false,
		external = false,
		href,
		children,
		...props
	}) => {
		// For external links, always use anchor tag
		if (
			external ||
			(href && (href.startsWith("http") || href.startsWith("mailto:")))
		) {
			return (
				<a
					href={href}
					className={cn(
						"transition-colors hover:text-foreground/80",
						className,
					)}
					target={
						external || href?.startsWith("http") || href?.startsWith("mailto:")
							? "_blank"
							: undefined
					}
					rel={
						external || href?.startsWith("http") || href?.startsWith("mailto:")
							? "noopener noreferrer"
							: undefined
					}
					{...props}
				>
					{children}
				</a>
			);
		}

		// Use Slot for polymorphic behavior
		if (asChild) {
			return (
				<Slot
					className={cn(
						"transition-colors hover:text-foreground/80",
						className,
					)}
					{...props}
				>
					{children}
				</Slot>
			);
		}

		// Fallback to regular anchor tag
		return (
			<a
				href={href}
				className={cn("transition-colors hover:text-foreground/80", className)}
				{...props}
			>
				{children}
			</a>
		);
	},
);

Link.displayName = "Link";

export { Link };
