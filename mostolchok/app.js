// Инициализация карты при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // Создаем карту с центром в Москве
    const map = L.map('map').setView([55.755826, 37.617300], 11);
    
    // Добавляем слой OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19
    }).addTo(map);
    
    // Получаем элементы DOM для информационной панели
    const toiletInfo = document.getElementById('toilet-info');
    const toiletTitle = document.getElementById('toilet-title');
    const toiletAddress = document.getElementById('toilet-address');
    const toiletHours = document.getElementById('toilet-hours');
    const toiletPrice = document.getElementById('toilet-price');
    const closeInfoButton = document.getElementById('close-info');
    
    // Функция для создания кастомного маркера
    function createCustomMarker(toilet) {
        // Определяем класс маркера в зависимости от цены
        let markerClass = 'marker-free';
        
        if (toilet.isPaid === true) {
            markerClass = 'marker-paid';
        } else if (toilet.isPaid === null) {
            markerClass = 'marker-unknown';
        }
        
        // Создаем иконку для маркера
        const icon = L.divIcon({
            className: `custom-marker ${markerClass}`,
            html: `<div style="width: 12px; height: 12px; border-radius: 50%;"></div>`,
            iconSize: [12, 12],
            iconAnchor: [6, 6]
        });
        
        // Создаем маркер с кастомной иконкой
        return L.marker([toilet.lat, toilet.lng], { icon: icon });
    }
    
    // Добавляем маркеры на карту
    toiletsData.forEach(toilet => {
        const marker = createCustomMarker(toilet);
        
        // Добавляем обработчик клика по маркеру
        marker.on('click', function() {
            // Заполняем информационную панель данными о туалете
            toiletTitle.textContent = toilet.title;
            toiletAddress.textContent = toilet.address;
            toiletHours.textContent = toilet.hours;
            toiletPrice.textContent = toilet.price;
            
            // Показываем информационную панель
            toiletInfo.classList.remove('hidden');
        });
        
        // Добавляем маркер на карту
        marker.addTo(map);
    });
    
    // Обработчик клика по кнопке закрытия информационной панели
    closeInfoButton.addEventListener('click', function() {
        toiletInfo.classList.add('hidden');
    });
    
    // Функция для определения текущего местоположения пользователя
    function locateUser() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                // Успешное получение местоположения
                function(position) {
                    const userLat = position.coords.latitude;
                    const userLng = position.coords.longitude;
                    
                    // Перемещаем карту к местоположению пользователя
                    map.setView([userLat, userLng], 14);
                    
                    // Добавляем маркер местоположения пользователя
                    L.marker([userLat, userLng], {
                        icon: L.divIcon({
                            className: 'user-location',
                            html: `<div style="width: 16px; height: 16px; background-color: #3498db; border-radius: 50%; border: 2px solid white;"></div>`,
                            iconSize: [16, 16],
                            iconAnchor: [8, 16]
                        })
                    }).addTo(map);
                },
                // Ошибка получения местоположения
                function(error) {
                    console.error('Ошибка при определении местоположения:', error.message);
                }
            );
        } else {
            console.error('Геолокация не поддерживается вашим браузером');
        }
    }
    
    // Пытаемся определить местоположение пользователя при загрузке страницы
    locateUser();
    
    // Добавляем обработчик изменения размера окна для корректной работы карты
    window.addEventListener('resize', function() {
        map.invalidateSize();
    });
});