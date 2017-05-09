# Netflix Movies Search

Proces budowania:
Wymagania: zainstalowany: jre 1.8, npm oraz maven
Do zbudowania front-end-u nalezy wykonac polecenie npm install znajdujac sie w folderze src\main\resources\front-end a nastepnie npm run build
Do zbudowania back-end-u nalezy wykonac polecenie maven clean package znajdujac sie w folderze z plikiem pom

Zbudowania aplicaja znajduje sie w folderze root/target, do jej uruchomienia nalezy wykonac polecenie
java -jar netflixMoviesSearch.jar. Aplikacja posiada wbudowany serwer http (oraz kontener servletow jetty) ktora jest dostepna lokalnie pod adresem http://localhost:4567/index.html .Opcjonalnie mozna podac zmienne systemowe: port (domyslnie 4567) oraz url(domyslny rest netflix endpoint http://netflixroulette.net/api/api.php)(java -Dport={port} -Durl={netflix endpoint} -jar netflixMoviesSearch.jar)
