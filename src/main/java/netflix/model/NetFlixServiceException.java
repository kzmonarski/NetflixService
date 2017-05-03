package netflix.model;

import java.util.function.Function;

public class NetFlixServiceException extends RuntimeException{

	public NetFlixServiceException(String message) {
		super(message);
	}
	
	public String exportTo(Function<Object,String> exportBuilder){
		return exportBuilder.apply("ErrorMessage:" + getMessage());
	}
	
}
