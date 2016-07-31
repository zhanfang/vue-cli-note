export const API_ROOT = (process.env.NODE_ENV === 'production')
			? 'http://localhost:3345/'
			: 'http://localhost:3345/'

export const CookieDomain = (process.env.NODE_ENV === 'production')
			? '.demozhan.com'
			: ''
