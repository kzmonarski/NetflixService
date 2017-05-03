package netflix.repository;

import netflix.model.Movies;
import netflix.model.SearchCriteria;
import netflix.service.NetflixRepository;

public class NetflixRepositoryImpl implements NetflixRepository {

	private final RestClient restClient;
	
	public NetflixRepositoryImpl(RestClient restClient){
		this.restClient = restClient;
	}
	
	@Override
	public Movies getMoviesBy(SearchCriteria searchCriteria)  {
		return restClient.getMoviesBy(searchCriteria);
	}

}
