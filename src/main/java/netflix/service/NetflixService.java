package netflix.service;

import netflix.model.Movies;
import netflix.model.SearchCriteria;

public class NetflixService {

	private final NetflixRepository netflixRepository;
		
	public NetflixService(NetflixRepository netflixRepository) {
		this.netflixRepository = netflixRepository;
	}

	public Movies getMoviesBy(SearchCriteria searchCriteria) {		
		 return netflixRepository.getMoviesBy(searchCriteria);		
	}	
}
