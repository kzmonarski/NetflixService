package netflix.repository;

import netflix.model.Movies;
import netflix.model.SearchCriteria;

public interface RestClient {
	Movies getMoviesBy(SearchCriteria searchCriteria);
}
