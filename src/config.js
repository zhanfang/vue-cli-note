export const API_ROOT = (process.env.NODE_ENV === 'production')
			? 'http://api.jackhu.top/'
			: '/'

export const CookieDomain = (process.env.NODE_ENV === 'production')
			? '.jackhu.top'
			: ''
