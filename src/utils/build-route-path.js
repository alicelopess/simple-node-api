//TODO: Create dinamic route path using regex
// --Model: /users/:id

export function buildRoutePath(path) {
    //regex identifier
    const routeParametersRegex = /:([a-zA-Z]+)/g

    const pathWithParams = path.replaceAll(routeParametersRegex, '(?<$1>[a-z0-9\-_]+)')
	
	const pathRegex = new RegExp(`^${pathWithParams}`)
	
	return pathRegex
}