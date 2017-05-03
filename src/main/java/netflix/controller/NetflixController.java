package netflix.controller;

import java.util.Map;

import netflix.model.SearchCriteria;
import netflix.service.NetflixService;
import spark.QueryParamsMap;
import spark.Request;
import spark.Response;
import spark.Route;

public class NetflixController {

public static final String GetMoviesPath = "/getMovies.json";

	private final NetflixService netflixService;

	public NetflixController(NetflixService netflixService) {
		this.netflixService = netflixService;
	}
	
	public Route getMoviesRoute() {
		Route route = (Request request, Response response) -> {	
			System.out.println(request.queryString());
			SearchCriteria searchCriteria = new SearchCriteria(request.queryParams("title"),request.queryParams("director"),
															   request.queryParams("actor"),request.queryParams("year"));
			
	        return  netflixService.getMoviesBy(searchCriteria);
		};
		return route;
	}
}
