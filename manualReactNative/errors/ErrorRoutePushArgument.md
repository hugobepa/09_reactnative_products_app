Argument of type '`/movie/${number}`' is not assignable to parameter of type 'RelativePathString | ExternalPathString | "/" |
MoviePoster: min 1.45

problema: onPress={() => router.push(`/movie/${id}` )}

solucion: router.push( { pathname: "/movie/[id]", params: { id: id }})

// Correct (using href):
router.push(href('/movie/[id]', { id: movieId })); // Best for known dynamic routes
router.push('/movie/' + movieId); // Simple string concatenation

// Another way to cast if href isn't used:
router.push('/movie/' + movieId as Href<string>);

//name: 'switches/index',

<Link key={route.name} href={route.name.split("/")[0] as Href}>
router.push(name.split("/")[0] as Href)
const[routeName]= name.split('/');
