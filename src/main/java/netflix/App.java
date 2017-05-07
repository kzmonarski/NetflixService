package netflix;

import com.google.gson.Gson;

import netflix.controller.IndexController;
import netflix.controller.NetflixController;
import netflix.model.ErrorMessage;
import netflix.model.NetFlixServiceException;
import netflix.model.NetFlixServiceException.ExportBuilder;
import netflix.repository.NetflixRepositoryImpl;
import netflix.repository.RestClient;
import netflix.repository.restClientImpl.UniRestClient;
import netflix.service.NetflixRepository;
import netflix.service.NetflixService;
import spark.ResponseTransformer;
import spark.Spark;


public class App 
{
	private static final String APPLICATION_JSON = "application/json";
	private static final ResponseTransformer gsonResponseTransformer = (Object o) -> {return new Gson().toJson(o);};
	
@SuppressWarnings("unchecked")
public static void main( String[] args )
    {
    	String url = getNetflixEndpointURL();
    	
    	//dependecies
    	RestClient restClient = new UniRestClient(url);
    	NetflixRepository netflixRepository = new NetflixRepositoryImpl(restClient);
    	NetflixService netflixService = new NetflixService(netflixRepository);
    	
    	//Web App set up
    	Spark.port(4567);
    	Spark.staticFiles.location("/public");
    	 
    	//Web URI binding
    	Spark.get(IndexController.IndexPath, new IndexController().serveIndexPage);
    	Spark.get(NetflixController.GetMoviesPath, new NetflixController(netflixService).getMoviesRoute(),gsonResponseTransformer);	
    	
    	//ExceptionHandling
    	Spark.exception(NetFlixServiceException.class, (exception, request, response) -> {
    		response.type(APPLICATION_JSON);  
    		response.status(400);
			response.body(((NetFlixServiceException)exception).exportTo((ExportBuilder)gsonResponseTransformer));
    	});
    	Spark.internalServerError((req, res) -> {
    	    res.type(APPLICATION_JSON);
    	    return gsonResponseTransformer.render(new ErrorMessage("Couldn't connect to NetFlix"));
    	});
    }

private static String getNetflixEndpointURL() {
	String url =  System.getProperty("url");
	if (url == null || url.isEmpty()) {
		url = "http://netflixroulette.net/api/api.php";
	}
	return url;
}
}
