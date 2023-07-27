export const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const convertCookiesToString = (cookies: { [key: string]: string }) => {
	return Object.keys(cookies)
		.map((name) => `${name}=${cookies[name]}`)
		.join('; ');
};
