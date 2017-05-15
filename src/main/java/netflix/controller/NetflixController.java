package netflix.controller;

import java.util.Map;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import netflix.model.Movies;
import netflix.model.SearchCriteria;
import netflix.service.NetflixService;
import spark.QueryParamsMap;
import spark.Request;
import spark.Response;
import spark.Route;

public class NetflixController {

public static final String GetMoviesPath = "/getMovies.json";

	private static final Logger logger = LoggerFactory.getLogger(NetflixController.class);

	private final NetflixService netflixService;

	public NetflixController(NetflixService netflixService) {
		this.netflixService = netflixService;
	}
	
	public Route getMoviesRoute() {
		Route route = (Request request, Response response) -> {	
		logger.debug(String.format("Get request for movies collection with query params: title=%s director=%s actor=%s year=%s",
					request.queryParams("title"),request.queryParams("director"),request.queryParams("actor"),request.queryParams("releaseYear")));
		
		String title = Optional.ofNullable(request.queryParams("title")).orElse("");
		String director = Optional.ofNullable(request.queryParams("director")).orElse("");
		String actor = Optional.ofNullable(request.queryParams("actor")).orElse("");
		String releaseYear = Optional.ofNullable(request.queryParams("releaseYear")).orElse("");
		
		SearchCriteria searchCriteria = new SearchCriteria(title,director,actor,releaseYear);
		
		Movies movies = netflixService.getMoviesBy(searchCriteria);
		response.type("application/json");
		logger.debug("Collection of movies is " + movies);
	    return  movies;
		};
		return route;
	}
}
