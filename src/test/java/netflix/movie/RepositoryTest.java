package netflix.movie;


import org.junit.Assert;
import org.junit.Test;

import netflix.model.Movies;
import netflix.model.SearchCriteria;
import netflix.repository.NetflixRepositoryImpl;
import netflix.service.NetflixRepository;
import netflix.service.NetflixService;

public class RepositoryTest {
	
@Test
public void shouldReturnMoviesSet(){
	//Given
	NetflixRepository netflixRepository = new NetflixRepositoryImpl("http://netflixroulette.net/api/api.php");
	NetflixService netflixService = new NetflixService(netflixRepository);		
	SearchCriteria searchCriteria = new SearchCriteria("Attack on Titan","","","2013");
	//When
	Movies movies = netflixService.getMoviesBy(searchCriteria);
	//Then
	Assert.assertEquals("The movie is not present","Attack on Titan",movies.getMovies().iterator().next().getShowTitle());
}	
}
