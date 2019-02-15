# Agenda

- Pokazanie aplikacji i najwazniejsze punkty
  - Analiza obrazu z kamery (poszukiwanie fragmentów które mają określony kolor i rozmiar)
  - Stworzenie gry ktora pokazuje nanosi robaka na obraz z kamery
  - Porównywanie położenia robaka z położeniem fragmentów obrazu o danym kolorze w video
- Lista narzędzi (Ionic, Android Studio)
- Wygenerowanie aplikacji z ionica + zainstalowanie jej na komórkę
- Przejście do implementacji gry
  - HTML : kilka słów o video tagu i canvas (jak reprezentowany jest obraz, tablica bajtow etc.)
  - Implementacja algorytmu:
    - Blob: struktura reprezentujaca fragment obrazu ktory spelnia pewne kryteria (minimalny rozmiar + kolor zblizony do wzorca)
    - W jaki sposób obliczyć czy piksel i jego kolor jest zblizony do wzorca (dystans w 3 wymiarach)
    - W jaki sposób łączyć piksele aby stworzyć większy obszar
  - Implementacja gry
    - Stworzenie canvasa z planszą
    - Rysowanie robaka
    - Sprawdzanie czy robak został trafiony
    - Parametryzowanie gry (szybkośc, wielkość planszy, liczbę robaków etc.)

Browser support: http://iswebrtcreadyyet.com/

# Co bylo

## Dorota

- zmienne,
- petle,
- tablice,
- instrukcje warunkowe
- interpolacja stringow
- funkcje
- obiekty, klasy

# teaching-task

## https://app.pluralsight.com/player?course=webrtc-fundamentals

http://peerjs.com/ is used.

SimpleWebRTC is another framework that enables writing multi person solution

One of WebRTC parts is `MediaStream`/`getUserMedia` API.

- https://appr.tc/ or apprtc.appspot.com

## A MediaStream Object

It is available from navigator.getUserMedia success callback.

It has MediaStreamTrack

# TO DO:

getUserMedia

- https://webrtc.github.io/samples/
- https://chromium.googlesource.com/external/webrtc-samples/
- https://www.webrtc-experiment.com/
- https://shanetully.com/2014/09/a-dead-simple-webrtc-example/
- https://www.html5rocks.com/en/tutorials/getusermedia/intro/
- https://developers.google.com/web/fundamentals/native-hardware/capturing-images/

https://app.pluralsight.com/library/courses/webrtc-fundamentals/table-of-contents
https://app.pluralsight.com/library/courses/html5-audio-video-webrtc/table-of-contents
https://app.pluralsight.com/library/courses/real-time-web-nodejs/table-of-contents
https://app.pluralsight.com/library/courses/vr-creating-experiences-javascript/table-of-contents
