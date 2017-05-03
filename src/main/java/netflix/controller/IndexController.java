package netflix.controller;

import spark.Request;
import spark.Response;
import spark.Route;

public class IndexController {

	public static final String IndexPath = "/index.html";
	
	public Route serveIndexPage = (Request request, Response response) -> {
        return "index.html";
    };	
}
