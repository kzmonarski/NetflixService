package netflix.model;

public class MovieDetails {

	private  String show_title;
	private  String poster;
	
	public String getShowTitle() {
		return show_title;
	}

	public String getPoster() {
		return poster;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((show_title == null) ? 0 : show_title.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		MovieDetails other = (MovieDetails) obj;
		if (show_title == null) {
			if (other.show_title != null)
				return false;
		} else if (!show_title.equals(other.show_title))
			return false;
		return true;
	}

	@Override
	public String toString() {
		return "MovieDetails [showTitle=" + show_title + ", poster=" + poster + "]";
	}	
}

