package netflix.service;

import netflix.model.Movies;
import netflix.model.SearchCriteria;

public interface NetflixRepository {

	Movies getMoviesBy(SearchCriteria searchCriteria);
}
