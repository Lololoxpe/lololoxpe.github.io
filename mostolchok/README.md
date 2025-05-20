# Mostolchok - Карта туалетов Москвы и Подмосковья

## Описание проекта

Mostolchok - это веб-приложение, предназначенное для отображения местоположения общественных туалетов в Москве и Подмосковье. Приложение оптимизировано для мобильных устройств и может быть встроено в Android WebView.

## Функциональность

- Интерактивная карта с метками туалетов
- Информация о каждом туалете (адрес, время работы, цена)
- Определение текущего местоположения пользователя
- Адаптивный дизайн для мобильных устройств
- Цветовая дифференциация меток (зеленые - бесплатные, красные - платные)

## Технологии

- HTML5, CSS3, JavaScript
- Leaflet.js для работы с картами
- OpenStreetMap в качестве картографического сервиса

## Структура проекта

- `index.html` - основная HTML-страница
- `styles.css` - стили для веб-приложения
- `app.js` - основной JavaScript-файл с логикой работы приложения
- `data.js` - данные о туалетах (местоположение, информация)

## Запуск проекта

### Локальный запуск

1. Клонируйте репозиторий
2. Откройте папку проекта
3. Запустите локальный сервер (например, с помощью Python):
   ```
   python -m http.server 8080
   ```
   или с помощью Node.js:
   ```
   npx http-server -p 8080
   ```
4. Откройте браузер и перейдите по адресу `http://localhost:8080`

### Встраивание в Android WebView

Для встраивания в Android-приложение используйте следующий код:

```java
WebView webView = findViewById(R.id.webview);
WebSettings webSettings = webView.getSettings();
webSettings.setJavaScriptEnabled(true);
webSettings.setDomStorageEnabled(true);
webSettings.setGeolocationEnabled(true);

// Разрешить доступ к геолокации
webView.setWebChromeClient(new WebChromeClient() {
    @Override
    public void onGeolocationPermissionsShowPrompt(String origin, GeolocationPermissions.Callback callback) {
        callback.invoke(origin, true, false);
    }
});

// Загрузить URL вашего сайта
webView.loadUrl("https://ваш-домен.ru");
```

## Дальнейшее развитие

- Добавление возможности фильтрации туалетов по параметрам
- Добавление отзывов и рейтингов
- Возможность добавления новых туалетов пользователями
- Интеграция с другими картографическими сервисами
- Добавление маршрутов до ближайших туалетов

## Лицензия

MIT