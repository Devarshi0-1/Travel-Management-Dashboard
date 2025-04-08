'use client';

import * as PopoverPrimitive from '@radix-ui/react-popover';
import * as React from 'react';

import { cn } from '@/lib/utils';

function Popover({
	...props
}: React.ComponentProps<typeof PopoverPrimitive.Root>) {
	return (
		<PopoverPrimitive.Root
			data-slot='popover'
			{...props}
		/>
	);
}

function PopoverTrigger({
	...props
}: React.ComponentProps<typeof PopoverPrimitive.Trigger>) {
	return (
		<PopoverPrimitive.Trigger
			data-slot='popover-trigger'
			{...props}
		/>
	);
}

function PopoverContent({
	className,
	align = 'center',
	sideOffset = 4,
	...props
}: React.ComponentProps<typeof PopoverPrimitive.Content>) {
    console.log("PopoverContent")
	return (
		<PopoverPrimitive.Portal>
			<PopoverPrimitive.Content
				data-slot='popover-content'
				align={align}
				sideOffset={sideOffset}
				className={cn(
					'tw:bg-popover tw:text-popover-foreground data-[state=open]:tw:animate-in data-[state=closed]:tw:animate-out data-[state=closed]:tw:fade-out-0 data-[state=open]:tw:fade-in-0 data-[state=closed]:tw:zoom-out-95 data-[state=open]:tw:zoom-in-95 data-[side=bottom]:tw:slide-in-from-top-2 data-[side=left]:tw:slide-in-from-right-2 data-[side=right]:tw:slide-in-from-left-2 data-[side=top]:tw:slide-in-from-bottom-2 tw:z-50 tw:w-72 tw:origin-(--radix-popover-content-transform-origin) tw:rounded-md tw:border tw:p-4 tw:shadow-md tw:outline-hidden',
					className
				)}
				{...props}
			/>
		</PopoverPrimitive.Portal>
	);
}

function PopoverAnchor({
	...props
}: React.ComponentProps<typeof PopoverPrimitive.Anchor>) {
	return (
		<PopoverPrimitive.Anchor
			data-slot='popover-anchor'
			{...props}
		/>
	);
}

export { Popover, PopoverAnchor, PopoverContent, PopoverTrigger };
