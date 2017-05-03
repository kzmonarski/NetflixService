package netflix.movie;

import org.junit.Assert;
import org.junit.Test;

import netflix.model.Movies;
import netflix.model.SearchCriteria;
import netflix.repository.NetflixRepositoryImpl;
import netflix.repository.RestClient;
import netflix.repository.restClientImpl.UniRestClient;
import netflix.service.NetflixService;
import netflix.service.NetflixRepository;

public class RepositoryTest {
	
@Test
public void shouldReturnMoviesSet(){
	RestClient restClient = new UniRestClient("http://netflixroulette.net/api/api.php");
	NetflixRepository netflixRepository = new NetflixRepositoryImpl(restClient);
	NetflixService movieService = new NetflixService(netflixRepository);
	SearchCriteria searchCriteria = new SearchCriteria("Attack on Titan","","","2013");
	Movies movies = movieService.getMoviesBy(searchCriteria);
	Assert.assertNotNull(movies.getMovies());
	System.out.println(movies);
}
	
}
