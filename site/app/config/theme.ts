import { type VerticalPaddingValue } from './types'

export interface Headings {
	heading1: string
	heading2: string
	heading3: string
	heading4: string
	heading5: string
	heading6: string
}

interface Typography extends Headings {
	bodyLarge: string
	bodyPrimary: string
	bodySecondary: string
	bodyTertiary: string
	bodyTiny: string
	blockquotePrimary: string
	blockquoteSecondary: string
	titleDisplay: string
	titlePrimary: string
	titleSecondary: string
	titleTertiary: string
	titleQuaternary: string
	navigationPrimary: string
	buttonsPrimary: string
}

interface ProjectTheme {
	typography: Typography
	paddingTop: {
		[key in VerticalPaddingValue]: string
	}
	paddingBottom: {
		[key in VerticalPaddingValue]: string
	}
	icons: {
		add: string
		badge: string
		basket: string
		cart: string
		check: string
		checkBold: string
		circleDown: string
		circleLeft: string
		circleRight: string
		close: string
		down: string
		envelope: string
		facebook: string
		filter: string
		forward: string
		giftCard: string
		giftCardCheck: string
		instagram: string
		left: string
		linkedin: string
		map: string
		minus: string
		package: string
		phone: string
		right: string
		tiktok: string
		ticket: string
		trash: string
		twitter: string
		up: string
		youtube: string
	}
}

export const theme: ProjectTheme = {
	typography: {
		// IBM Plex Sans H1 — 42/60/68px
		heading1: 'font-heading [font-size:_clamp(2.625rem,7.8vw,3.3125rem)] md:[font-size:_clamp(3.3125rem,5.3vw,3.75rem)] leading-none leading-[105%]',
		// IBM Plex Sans H2–H6 — 37/40/47px (Figma treats H2–H6 as a single style)
		heading2: 'font-heading [font-size:_clamp(2.625rem,5.2vw,3.3125rem)] md:[font-size:_clamp(2.5rem,3.7vw,3.75rem)] leading-[105%]',
		heading3: 'font-heading [font-size:_clamp(2.625rem,5.2vw,3.3125rem)] md:[font-size:_clamp(2.5rem,3.7vw,3.75rem)] leading-[105%]',
		heading4: 'font-heading [font-size:_clamp(2.625rem,5.2vw,3.3125rem)] md:[font-size:_clamp(2.5rem,3.7vw,3.75rem)] leading-[105%]',
		heading5: 'font-heading [font-size:_clamp(2.625rem,5.2vw,3.3125rem)] md:[font-size:_clamp(2.5rem,3.7vw,3.75rem)] leading-[105%]',
		heading6: 'font-body [font-size:_clamp(2.0625rem,5.2vw,2.3125rem)] md:[font-size:_clamp(2.3125rem,3.7vw,2.625rem)] leading-[110%]',
		// Body styles — 18/20/23px
		bodyLarge: 'font-body [font-size:_clamp(1.125rem,2.6vw,1.25rem)] md:[font-size:_clamp(1.25rem,1.8vw,1.4375rem)] leading-[150%]',
		// 16/16/18px — mobile and tablet are equal so base is fixed
		bodyPrimary: 'font-body text-base md:[font-size:_clamp(1rem,1.4vw,1.125rem)] leading-[150%]',
		// 14/16/16px — tablet and desktop are equal so md: stays fixed
		bodySecondary: 'font-body [font-size:_clamp(0.875rem,2.1vw,1rem)] md:text-base leading-[150%]',
		// 14px all breakpoints
		bodyTertiary: 'font-body text-sm leading-[150%]',
		// 12px all breakpoints
		bodyTiny: 'font-body text-xs leading-[140%]',
		// Blockquote — 26/29/33px
		blockquotePrimary: 'font-body [font-size:_clamp(1.625rem,3.8vw,1.8125rem)] md:[font-size:_clamp(1.8125rem,2.6vw,2.0625rem)] leading-[130%]',
		// Blockquote Secondary — 20/20/26px
		blockquoteSecondary: 'font-body font-medium text-xl md:[font-size:_clamp(1.25rem,2.3vw,1.625rem)] leading-[150%]',
		// Titles
		titleDisplay: 'font-heading [font-size:_clamp(2.3125rem,6.9vw,2.5rem)] md:[font-size:_clamp(2.5rem,4.7vw,2.9375rem)] leading-[105%]',
		titlePrimary: 'font-body font-medium [font-size:_clamp(1.4375rem,3.4vw,1.625rem)] md:[font-size:_clamp(1.625rem,2.3vw,1.8125rem)] leading-[130%]',
		titleSecondary: 'font-body font-medium [font-size:_clamp(1.125rem,2.6vw,1.25rem)] md:[font-size:_clamp(1.25rem,1.8vw,1.4375rem)] leading-[120%]',
		titleTertiary: 'font-body font-medium [font-size:_clamp(1rem,2.3vw,1.125rem)] md:[font-size:_clamp(1.125rem,1.6vw,1.25rem)] leading-[120%]',
		// 10px fixed, uppercase — only style with non-zero tracking in Figma
		titleQuaternary: 'font-body font-medium text-[0.625rem] leading-[140%] tracking-[1px] uppercase',
		// 14/16/16px — same scale as bodySecondary
		navigationPrimary: 'font-body [font-size:_clamp(0.875rem,2.1vw,1rem)] md:text-base leading-[150%]',
		// 14px all breakpoints
		buttonsPrimary: 'font-body font-medium text-sm leading-none',
	},
	paddingTop: {
		'240': 'pt-14 md:pt-16 lg:pt-[15rem]', // 56_64_240
		'200': 'pt-14 md:pt-16 lg:pt-[12.5rem]', // 56_64_200
		'160': 'pt-14 md:pt-16 lg:pt-40', // 56_64_160
		'128': 'pt-14 md:pt-16 lg:pt-32', // 56_64_128
		'104': 'pt-10 md:pt-14 lg:pt-[6.5rem]', // 40_56_104
		'80': 'pt-10 md:pt-14 lg:pt-20', // 40_56_80
		'64': 'pt-10 md:pt-14 lg:pt-16', // 40_56_64
		'40': 'pt-8 md:pt-8 lg:pt-10', // 32_32_40
		none: '',
	},
	paddingBottom: {
		'240': 'pb-14 md:pb-16 lg:pb-[15rem]', // 56_64_240
		'200': 'pb-14 md:pb-16 lg:pb-[12.5rem]', // 56_64_200
		'160': 'pb-14 md:pb-16 lg:pb-40', // 56_64_160
		'128': 'pb-14 md:pb-16 lg:pb-32', // 56_64_128
		'104': 'pb-10 md:pb-14 lg:pb-[6.5rem]', // 40_56_104
		'80': 'pb-10 md:pb-14 lg:pb-20', // 40_56_80
		'64': 'pb-10 md:pb-14 lg:pb-16', // 40_56_64
		'40': 'pb-8 md:pb-8 lg:pb-10', // 32_32_40
		none: '',
	},
	icons: {
		add: 'font-icomoon icon-add',
		badge: 'font-icomoon icon-badge',
		basket: 'font-icomoon icon-basket',
		cart: 'font-icomoon icon-cart',
		check: 'font-icomoon icon-check',
		checkBold: 'font-icomoon icon-check-bold',
		circleDown: 'font-icomoon icon-circle-down',
		circleLeft: 'font-icomoon icon-circle-left',
		circleRight: 'font-icomoon icon-circle-right',
		close: 'font-icomoon icon-close',
		down: 'font-icomoon icon-down',
		envelope: 'font-icomoon icon-envelope',
		facebook: 'font-icomoon icon-facebook',
		filter: 'font-icomoon icon-filter',
		forward: 'font-icomoon icon-forward',
		giftCard: 'font-icomoon icon-gift-card',
		giftCardCheck: 'font-icomoon icon-gift-card-check',
		instagram: 'font-icomoon icon-instagram',
		left: 'font-icomoon icon-left',
		linkedin: 'font-icomoon icon-linkedin',
		map: 'font-icomoon icon-map',
		minus: 'font-icomoon icon-minus',
		package: 'font-icomoon icon-package',
		phone: 'font-icomoon icon-phone',
		right: 'font-icomoon icon-right',
		tiktok: 'font-icomoon icon-tiktok',
		ticket: 'font-icomoon icon-ticket',
		trash: 'font-icomoon icon-trash',
		twitter: 'font-icomoon icon-twitter',
		up: 'font-icomoon icon-up',
		youtube: 'font-icomoon icon-youtube',
	},
}
