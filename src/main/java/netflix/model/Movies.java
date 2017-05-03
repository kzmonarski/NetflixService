package netflix.model;

import java.util.Collections;
import java.util.Set;

public class Movies {

	private final Set<MovieDetails> movies;
	
	public Movies(Set<MovieDetails> movies) {
		this.movies = movies;
	}

	public Set<MovieDetails> getMovies() {
		return Collections.unmodifiableSet(movies);
	}

	@Override
	public String toString() {
		return "Movies [movies=" + movies + "]";
	}	
	
}
