package netflix.model;

public class NetFlixServiceException extends RuntimeException{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public NetFlixServiceException(String message) {
		super(message);
	}
	
	public String exportTo(ExportBuilder exportBuilder){
		return exportBuilder.render(new ErrorMessage(getMessage()));
	}
	
	 public interface ExportBuilder {
		String render(Object o);
	}
	
}
