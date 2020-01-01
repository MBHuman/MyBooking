let MAX_LOCATION = 630, MIN_LOCATION = 130;
let MAX_PRICE = 1000000, MIN_PRICE = 1000;
let MAX_ROOMS = 5, MIN_ROOMS = 1;
let MAX_AVATARS = 8, MIN_AVATARS = 1;
let MAX_GUESTS = 5, MIN_GUESTS = 1
// ARRAYS WITH DATA
// START

let TITLE = [
    'Большая уютная квартирка',
    'Маленькая неуютная квартирка',
    'Огромный прекрасный дворец',
    'Огромный ужасный дворец',
    'Красивый гостевой домик',
    'Некрасивый негостеприимный домик',
    'Уютное бунгало далеко от моря',
    'Неуютное бунгало по колено в воде'
];

let AVATARS = [
    'img/avatars/user01.png',
    'img/avatars/user02.png',
    'img/avatars/user03.png',
    'img/avatars/user04.png',
    'img/avatars/user05.png',
    'img/avatars/user06.png',
    'img/avatars/user07.png',
    'img/avatars/user08.png',
];

let TYPE = [
    'Дворец',
    'Квартира',
    'Дом',
    'Бунгало'
];

let CHECKIN = [
    '12:00',
    '13:00',
    '14:00'
];

let CHECKOUT = [
    '12:00',
    '13:00',
    '14:00'
];

let FEATURES = [
    'wifi',
    'dishwasher',
    'parking',
    'washer',
    'elevetor',
    'conditioner'
];

let PHOTOS = [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];
// END


function isHave(arr, elem) {
    let flag = false;
    for(let i = 0; i < arr.length; i++) {
        if(arr[i].author.avatar == elem) {
            flag = true;
            break;
        }
    }
    return flag;
}

// function randomItemsUnrepeat(array, numbers) {
//     let arr = [];
//     while(arr.length != numbers)
//     {
//         let random = Math.floor(Math.random() * (numbers - 1));
//         if(!isHave(arr, array[random]))
//             arr.push(array[random]);
//     }
//     return arr;
// }

// function randomItems(array, numbers) {
//     let arr = [], num = numbers;
//     while(arr.length != numbers)
//     {
//         let random = Math.floor(Math.random() * (numbers - 1));
//         arr.push(array[random]);
//     }
//     return arr;
// }

// function randomItemsWithRandomLength(array) {
//     let arr = [], num = Math.floor(Math.round() * (array.length));
//     if(num == 0) return;
//     while(arr.length != num)
//     {
//         let random = Math.floor(Math.random() * (num - 1));
//         arr.push(array[random - 1]);
//     }
//     return arr;
// }

function randomItem(array) {
    return Math.floor(Math.random() * array.length);
}

function random(x) {
    return Math.floor(Math.random() * x);
}

let list = (x) => {
    
    let ads = {
        author: {
            avatar: ''
        },
        offer: {
            title: '',
            address: '',
            price: 0,
            type: '',
            rooms: 0,
            guests: 0,
            checkin: '',
            checkout: '',
            features: '',
            desctiption: '',
            photos: '',
            
        },
        location: {
            x: 0,
            y: 0
        }
    }

    let arr = [];
    for(let i = 0; i < x; i++) {
        let NW = JSON.parse(JSON.stringify(ads));
        NW.author.avatar = AVATARS[i];
        let offerAndLoc = {
            title: TITLE[randomItem(TITLE)],
            address: 'left: ' + location.x + 'px; top: ' + location.y + 'px;',
            price: Math.floor(Math.random() * (MAX_PRICE - MIN_PRICE) + MIN_PRICE),
            type: TYPE[randomItem(TYPE)],
            rooms: Math.floor(Math.random() * (MAX_ROOMS - MIN_ROOMS) + MIN_ROOMS),
            guests: Math.floor(Math.random() * (MAX_GUESTS - MIN_GUESTS) + MIN_GUESTS),
            checkin: CHECKIN[Math.floor(Math.random() * CHECKIN.length)],
            checkout: CHECKOUT[Math.floor(Math.random() * CHECKOUT.length)],
            features: FEATURES[randomItem(FEATURES)],
            desctiption: '',
            photos: PHOTOS[randomItem(PHOTOS)],
            location: {
                x: Math.floor(Math.random() * (MAX_LOCATION - MIN_LOCATION) + MIN_LOCATION),
                y: Math.floor(Math.random() * (MAX_LOCATION - MIN_LOCATION) + MIN_LOCATION)
            }
        }
        NW.offer.title = (offerAndLoc.title);
        NW.offer.address = (offerAndLoc.address);
        NW.offer.price = (offerAndLoc.price);
        NW.offer.type =(offerAndLoc.type);
        NW.offer.rooms = (offerAndLoc.rooms);
        NW.offer.guests = (offerAndLoc.guests);
        NW.offer.checkin = (offerAndLoc.checkin);
        NW.offer.checkout = (offerAndLoc.checkout);
        NW.offer.features = (offerAndLoc.features);
        NW.offer.desctiption = (offerAndLoc.desctiption);
        NW.offer.photos = (offerAndLoc.photos);
        NW.location.x = offerAndLoc.location.x;
        NW.location.y = offerAndLoc.location.y;
        arr.push(NW);
    }

    return arr; 
};

document.querySelector('.map').classList.remove('map--faded');
let fragment = new DocumentFragment();


function outputElement(x) {
    let apnd = document.querySelector('.map__pins');
    let elem = document.querySelector('template');
    let arr = list(x);
    for(let i = 0; i < x; i++) {
        let card = elem.content.querySelector('.map__card').cloneNode(true);
        let pin = elem.content.querySelector('.map__pin').cloneNode(true);
        // fragment.querySelector('.popup__avatar').src = arr[i].author.avatar;
        card.querySelector('.popup__avatar').src = arr[random(x)].author.avatar;
        card.querySelector('h3').innerHTML = arr[i].offer.title;
        card.querySelector('.popup__price').innerHTML = arr[i].offer.price + '₽ ночь' /* + '&#x20bd;/ночь' */ ;
        card.querySelector('h4').innerHTML = arr[i].offer.type;
        card.querySelector('.rooms').innerHTML = arr[i].offer.rooms + ' комнаты для ' + arr[i].offer.guests + ' гостей';
        card.querySelector('.check').innerHTML = 'Заезд после ' + arr[i].offer.checkin + ', выезд до ' + arr[i].offer.checkout;
        pin.querySelector('.pin__image').src = arr[i].author.avatar;
        pin.style = 'left: ' + arr[i].location.x + 'px; top: ' + arr[i].location.y + 'px;';
        // fragment.querySelector('') Для дополнительных элементов
        // card.querySelector('.map__pin').style = arr[i].offer.address;
        // fragment.querySelector('.pin__image').src = arr[i].author.avatar;
        apnd.appendChild(card);
        apnd.appendChild(pin);
    }
}

outputElement(8);

// let apnd = document.querySelector('.map__pins');
// let elem = document.querySelector('template')
//     .content
//     .querySelector('.map__pin');


// apnd.appendChild(elem);
