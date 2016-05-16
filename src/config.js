export const API_ROOT = (process.env.NODE_ENV === 'production')
			? 'http://vue.demozhan.com/'
			: 'http://localhost:3344/'

export const CookieDomain = (process.env.NODE_ENV === 'production')
			? '.demozhan.com'
			: ''
