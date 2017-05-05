package netflix.repository.restClientImpl;

import java.lang.reflect.Type;
import java.util.HashSet;
import java.util.Set;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonDeserializationContext;
import com.google.gson.JsonDeserializer;
import com.google.gson.JsonElement;
import com.google.gson.JsonParseException;
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.ObjectMapper;
import com.mashape.unirest.http.Unirest;

import netflix.model.MovieDetails;
import netflix.model.Movies;
import netflix.model.SearchCriteria;
import netflix.repository.RestClient;

public class UniRestClient implements RestClient {
	
	private static final Logger logger = LoggerFactory.getLogger(UniRestClient.class);
	
	private final String endpoint;
	
	public UniRestClient(final String endpoint) {
		
		this.endpoint = endpoint;
		
        Unirest.setObjectMapper(new ObjectMapper() {
            private final Gson gson = new GsonBuilder()
            						  .registerTypeAdapter(Movies.class,new MovieDetailsDeserializer())
            						  .create();
            
            @Override
            public String writeValue(Object value) {
                return gson.toJson(value);
            }

            @Override
            public <T> T readValue(String value, Class<T> valueType) {
                return gson.fromJson(value, valueType);
            }
        });
    }

		@Override
		public Movies getMoviesBy(SearchCriteria searchCriteria) {
			HttpResponse<Movies> movies = null;
			try {
				movies = Unirest.get(endpoint).queryString(searchCriteria.getMapRepresentation()).asObject(Movies.class);
			} catch (Exception e) {
				logger.error("An Exception was thrown while connecting to " + endpoint + " ,because of" + e.getMessage());
				throw new RuntimeException(e.getMessage());
			}
			return movies.getBody();
		}
		
		private static class MovieDetailsDeserializer implements JsonDeserializer<Movies> {
		
			@Override
			public Movies deserialize(JsonElement json, Type typeOfT, JsonDeserializationContext context) throws JsonParseException {
				
				Set<MovieDetails> moviesDetails = new HashSet<>();
				
				if (json.isJsonArray()) {
					for (JsonElement element : json.getAsJsonArray()) {
						moviesDetails.add((MovieDetails) context.deserialize(element, MovieDetails.class));
		            }
				}
					else if (json.isJsonObject()) {
						moviesDetails.add((MovieDetails) context.deserialize(json, MovieDetails.class));
			        } else {
			            throw new RuntimeException("Unexpected JSON type: " + json.getClass());
			        }
				return new Movies(moviesDetails);
		}		
	}
}
