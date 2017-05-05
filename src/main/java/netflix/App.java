package netflix;

import java.awt.datatransfer.StringSelection;
import java.util.function.Function;

import com.google.gson.Gson;

import netflix.controller.IndexController;
import netflix.controller.JsonResponseTransformer;
import netflix.controller.NetflixController;
import netflix.model.NetFlixServiceException;
import netflix.repository.NetflixRepositoryImpl;
import netflix.repository.RestClient;
import netflix.repository.restClientImpl.UniRestClient;
import netflix.service.NetflixRepository;
import netflix.service.NetflixService;
import spark.Spark;


public class App 
{
    public static void main( String[] args )
    {
    	//URL for Netflix REST endpoint
    	String url =  System.getProperty("url");
    	if (url == null || url.isEmpty()) {
    		url = "http://netflixroulette.net/api/api.php";
    	}
    	
    	//dependecies
    	RestClient restClient = new UniRestClient(url);
    	NetflixRepository netflixRepository = new NetflixRepositoryImpl(restClient);
    	NetflixService netflixService = new NetflixService(netflixRepository);
    	
    	//Web App set up
    	Spark.port(4567);
    	Spark.staticFiles.location("/public");
    	 
    	//Web URI binding
    	Spark.get(IndexController.IndexPath, new IndexController().serveIndexPage);
    	Spark.get(NetflixController.GetMoviesPath, new NetflixController(netflixService).getMoviesRoute(),JsonResponseTransformer.getTransformer());	
    	
    	//ExceptionHandling
    	Spark.exception(NetFlixServiceException.class, (exception, request, response) -> {
    		response.type("application/json");  
    		response.status(400);
			response.body(((NetFlixServiceException)exception).exportTo(new Gson()::toJson));
    	});
    }
}
