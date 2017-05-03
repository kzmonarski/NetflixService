package netflix.controller;

import com.google.gson.Gson;

import spark.ResponseTransformer;

public class JsonResponseTransformer {
	
	private static final Gson gson = new Gson();
	
	public static ResponseTransformer getTransformer() {
		return gson::toJson;
	}

}
