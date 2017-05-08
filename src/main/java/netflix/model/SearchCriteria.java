package netflix.model;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

public class SearchCriteria {
	
	private static final String YEAR_IS_NOT_A_NUMBER = "Year is not a number";
	private static final String AT_LEASE_ON_SEARCH_PARAMETER_HAS_TO_BE_PROVIDED = "At lease on search parameter has to be provided";
	private static final String DATE_IS_OUT_OF_VALID_RANGE_1900_UP_TILL_NOW = "Date is out of valid range 1900 up till now";
	private static final String RELEASE_DATE_CAN_BE_ONLY_PROVIDED_IN_CONJUCTION_WITH_TITLE_NAME = "Release date can be only provided in conjuction with title name";

	private static final LocalDate before = LocalDate.ofYearDay(1900, 1);
	
	private final String title;
	private final String director;
	private final String actor;
	private final String release_year;
	
	public SearchCriteria(String title, String director, String actor, String year) {
		validate(title,director,actor,year);
		this.title = title;
		this.director = director;
		this.actor = actor;
		this.release_year = year;
	}

	private void validate(String title, String director, String actor, String year) {
		validateIfEmply(title, director, actor, year);
		validateYear(title, year);
	}

	private void validateYear(String title, String year) {
		if (!year.isEmpty()){
		validatePresenceOfTitle(title);
		validateIfNumber(year);
		validateYearRange(year);
		}
	}

	private void validateIfNumber(String year) {
		try {
		Integer.valueOf(year);
		}
		catch(NumberFormatException e) {
			throw new NetFlixServiceException(YEAR_IS_NOT_A_NUMBER);
		}	
	}

	private void validateYearRange(String year) {
		LocalDate date = LocalDate.ofYearDay(Integer.valueOf(year),1);
		if (date.isBefore(before) || date.isAfter(LocalDate.now())){
			throw new NetFlixServiceException(DATE_IS_OUT_OF_VALID_RANGE_1900_UP_TILL_NOW);
		}
	}

	private void validatePresenceOfTitle(String title) {
		if (title.isEmpty()){
			throw new NetFlixServiceException(RELEASE_DATE_CAN_BE_ONLY_PROVIDED_IN_CONJUCTION_WITH_TITLE_NAME);
		}
	}

	private void validateIfEmply(String title, String director, String actor, String year) {
		if (title.isEmpty() && director.isEmpty() && actor.isEmpty() && year.isEmpty()){
			throw new NetFlixServiceException(AT_LEASE_ON_SEARCH_PARAMETER_HAS_TO_BE_PROVIDED);
		}
	}

	public Map<String,Object> getMapRepresentation(){
		Map<String,Object> map = new HashMap<>();
		if (!title.isEmpty())  map.put("title", title);
		if (!director.isEmpty())  map.put("director", director);
		if (!actor.isEmpty())  map.put("actor", actor);
		if (!release_year.isEmpty() && !title.isEmpty())  map.put("year", release_year);
		return map;
	}
	
	public static LocalDate getBefore() {
		return before;
	}

	public String getTitle() {
		return title;
	}

	public String getDirector() {
		return director;
	}

	public String getActor() {
		return actor;
	}

	public String getReleaseYear() {
		return release_year;
	}

	@Override
	public String toString() {
		return "SearchCriteria [title=" + title + ", director=" + director + ", actor=" + actor + ", release_year="
				+ release_year + "]";
	}
}
