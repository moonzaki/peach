
'use strict';
const listHead = document.querySelector('.map__head');
const list = document.querySelector('.map__list');
const popupList = document.querySelector('.map__list-popup');
const mapBox = document.querySelector('.map__box');
const citiesList = {
    'Москва': {

        city: {
            'Москва': {
                y: 224,
                x: 155,
                mob_y: 171,
                mob_x: 85,
            }
        }
    },
    'Центр': {

        city: {
            'Воронеж': {
                y: 246,
                x: 103,
                mob_y: 186,
                mob_x: 49,
            },
            'Ярославль': {
                y: 197,
                x: 184,
                mob_y: 151,
                mob_x: 108,
            },
            'Белгород': {
                y: 276,
                x: 98,
                mob_y: 212,
                mob_x: 41,
            },
        }
    },
    'Северо-Запад': {
        city: {
            'Санкт-Петербург': {
                y: 131,
                x: 138,
                mob_y: 103,
                mob_x: 77,
            },
            'Калининград': {
                y: 126,
                x: 37,
                mob_y: 98,
                mob_x: 0,
            }
        }
    },
    'Юг': {
        city: {
            'Ростов-на-Дону': {
                y: 319,
                x: 72,
                mob_y: 239,
                mob_x: 29,
            },
            'Краснодар': {
                y: 378,
                x: 56,
                mob_y: 283,
                mob_x: 15,
            },
            'Волгоград': {
                y: 361,
                x: 114,
                mob_y: 269,
                mob_x: 56,
            }
        }
    },
    'Волга': {
        city: {
            'Казань': {
                y: 298,
                x: 265,
                mob_y: 224,
                mob_x: 166,
            },
            'Самара': {
                y: 306,
                x: 202,
                mob_y: 230,
                mob_x: 120,
            },
            'Уфа': {
                y: 336,
                x: 276,
                mob_y: 251,
                mob_x: 175,
            },
            'Оренбург': {
                y: 365,
                x: 228,
                mob_y: 272,
                mob_x: 139,
            },
            'Нижний Новгород': {
                y: 261,
                x: 175,
                mob_y: 197,
                mob_x: 98,
            }
        }
    },
    'Урал': {
        city: {
            'Екатеринбург': {
                y: 328,
                x: 318,
                mob_y: 246,
                mob_x: 204,
            },
            'Челябинск': {
                y: 363,
                x: 323,
                mob_y: 271,
                mob_x: 210,
            },
            'Пермь': {
                y: 299,
                x: 395,
                mob_y: 225,
                mob_x: 262,
            },
            'Сургут': {
                y: 311,
                x: 449,
                mob_y: 236,
                mob_x: 312,
            },
            'Тюмень': {
                y: 363,
                x: 424,
                mob_y: 269,
                mob_x: 289,
            },
            'Ижевск': {
                y: 289,
                x: 339,
                mob_y: 217,
                mob_x: 220,
            }
        }
    },
    'Сибирь': {
        city: {
            'Новосибирск': {
                y: 454,
                x: 509,
                mob_y: 332,
                mob_x: 343,
            },
            'Омск': {
                y: 473,
                x: 478,
                mob_y: 350,
                mob_x: 322,
            },
            'Томск': {
                y: 458,
                x: 595,
                mob_y: 320,
                mob_x: 401,
            },
            'Красноярск': {
                y: 456,
                x: 636,
                mob_y: 331,
                mob_x: 429,
            },
            'Иркутск': {
                y: 489,
                x: 703,
                mob_y: 363,
                mob_x: 483,
            }
        }
    },
    'Дальний восток': {
        city: {
            'Хабаровск': {
                y: 497,
                x: 989,
                mob_y: 368,
                mob_x: 687,
            },
            'Владивосток': {
                y: 574,
                x: 970,
                mob_y: 422,
                mob_x: 671,
            }
        }
    }

};

function setTranslateYMapMenu() {
    popupList.style.transform = `translateY(${listHead.clientHeight + 20}px)`;
}

function closeSubListItems(itemsClass, openClass) {
    if (document.querySelector(`.${itemsClass}`)) {
        const items = document.querySelectorAll(`.${itemsClass}`);

        items.forEach(item => {
            if (item.lastElementChild.classList.contains(openClass)) {
                item.classList.remove(itemsClass);
                item.lastElementChild.classList.remove(openClass);
            }
        });
    }
}

function showSubListItems(itemClass, { openClass }) {

    if (list.classList.contains('map__list--open') && window.innerWidth < 1023) {
        if (!itemClass.lastElementChild.classList.contains(openClass)) {
            itemClass.classList.add('map__list-item--sub-show');
            itemClass.lastElementChild.classList.add(openClass);
        } else {
            itemClass.classList.remove('map__list-item--sub-show');
            itemClass.lastElementChild.classList.remove(openClass);
        }
    }
}

function clearTranslateYMapMenu() {
    popupList.removeAttribute('style');
}

function closeMapMenu({ itemClass, openClass, listClass, popupListClass }) {

    const clickTarget = document.querySelector(itemClass);
    const list = document.querySelector(`.${listClass}`);
    const poupList = document.querySelector(`.${popupListClass}`);

    if (clickTarget.classList.contains(openClass)) {
        clickTarget.classList.remove(openClass);
        list.classList.remove(`${listClass}--open`);
        poupList.classList.remove(`${popupListClass}--open`);
        list.firstElementChild.style.display = 'flex';
        if (window.innerWidth <= 1023) {
            list.parentNode.removeAttribute('style');
            setActiveClassSubListItems(listClass);
        }

        let timer = setTimeout(() => {
            clearTranslateYMapMenu();
            clearTimeout(timer);
        }, 300);
        mapBox.classList.remove('map__box--hidden');
    }
}

function setActiveClassSubListItems(parentClass) {
    const listItems = document.querySelectorAll(`.${parentClass}-item`);

    listItems.forEach(item => {
        if (item.childElementCount > 1) {

            if (!item.classList.contains(`${parentClass}-item--active`)) {
                item.classList.add(`${parentClass}-item--active`);
            } else {
                item.classList.remove(`${parentClass}-item--active`);
            }
        }
    });
}

function showMapMenu(itemClass, { openClass, listClass, popupListClass }) {
    const list = document.querySelector(`.${listClass}`);
    const poupList = document.querySelector(`.${popupListClass}`);

    if (!itemClass.classList.contains(openClass)) {
        itemClass.classList.add(openClass);
        list.classList.add(`${listClass}--open`);

        if (window.innerWidth <= 1023) {
            list.firstElementChild.style.display = 'none';
            list.parentNode.style.height = 'auto';

            setActiveClassSubListItems(listClass);

        } else {
            setTranslateYMapMenu();
            poupList.classList.add(`${popupListClass}--open`);
        }
        mapBox.classList.add('map__box--hidden');
    } else {
        list.firstElementChild.style.display = 'flex';
        itemClass.classList.remove(openClass);
        list.classList.remove(`${listClass}--open`);
        if (window.innerWidth <= 1023) {
            setActiveClassSubListItems(listClass);
            list.parentNode.removeAttribute('style');
        } else {
            poupList.classList.remove(`${popupListClass}--open`);
            let timer = setTimeout(() => {
                clearTranslateYMapMenu();
                clearTimeout(timer);
            }, 300);
        }
        mapBox.classList.remove('map__box--hidden');
    }
}

function showRegion(targetItem, { openClass }) {
    if (!list.classList.contains('map__list--open')) {
        if (!targetItem.classList.contains(openClass)) {
            document.querySelectorAll(`.${openClass}`).forEach(item => {
                item.classList.remove(openClass);
            });
            if (document.querySelector('.map__dot')) {
                document.querySelectorAll(`.map__dot`).forEach(item => {
                    item.remove();
                });
            }
            console.log(openClass);
            targetItem.classList.add(openClass);
            createSpanRegion(targetItem);
        }
    }
}

function showRegionsAfterLoad(dataAttr, findingClass) {
    if (document.querySelector('.map__dot')) {
        document.querySelectorAll(`.map__dot`).forEach(item => {
            item.remove();
        });
    }
    if (document.querySelector(dataAttr)
        && document.querySelector(findingClass) === list.firstElementChild
        && !list.classList.contains('.map__list--open')) {
        createSpanRegion(list.firstElementChild);
    }
}

function createSpanRegion(elements) {
    const cities = elements.lastElementChild;

    if (window.innerWidth > 768) {
        if (cities.childElementCount == 0 && cities.textContent !== 'Все') {
            const div = document.createElement('div');
            const span = document.createElement('span');
            const p = document.createElement('p');
            div.classList.add('map__dot');
            p.classList.add('text');
            p.classList.add('text--sg');
            let item = cities.textContent;
            let itemY = citiesList[item]['city'][item]['y'];
            let itemX = citiesList[item]['city'][item]['x'];
            p.textContent = cities.textContent;
            div.dataset.city = cities.textContent;
            div.append(span);
            div.append(p);
            div.style.top = `${itemY}px`;
            div.style.left = `${itemX}px`;
            mapBox.append(div);

        } else if (cities.childElementCount == 0 && cities.textContent === 'Все') {
            let array = Object.keys(citiesList);
            array.forEach(elem => {
                let inArray = Object.keys(citiesList[elem]['city']);
                let inArrayValues = Object.values(citiesList[elem]['city']);

                inArray.forEach((e, idx) => {

                    const div = document.createElement('div');
                    const span = document.createElement('span');
                    const p = document.createElement('p');
                    div.classList.add('map__dot');
                    p.classList.add('text');
                    p.classList.add('text--sg');
                    if (e == 'Томск') {
                        div.style.flexDirection = 'column-reverse';
                    }
                    let itemY = inArrayValues[idx]['y'];
                    let itemX = inArrayValues[idx]['x'];
                    p.textContent = e;
                    div.dataset.city = e;
                    div.append(span);
                    div.append(p);
                    div.style.top = `${itemY}px`;
                    div.style.left = `${itemX}px`;
                    mapBox.append(div);
                });
            });
        }
        else {

            for (let i = 0; i < cities.childElementCount; i++) {
                let region = elements.firstChild.nextElementSibling.textContent.trim();
                const div = document.createElement('div');
                const span = document.createElement('span');
                const p = document.createElement('p');
                div.classList.add('map__dot');
                p.classList.add('text');
                p.classList.add('text--sg');
                let item = cities.children[i].firstElementChild.textContent;
                if (item == 'Томск') {
                    div.style.flexDirection = 'column-reverse';
                }
                let itemY = citiesList[region]['city'][item]['y'];
                let itemX = citiesList[region]['city'][item]['x'];
                p.textContent = cities.children[i].firstElementChild.textContent;
                div.dataset.city = cities.children[i].firstElementChild.textContent;
                div.append(span);
                div.append(p);
                div.style.top = `${itemY}px`;
                div.style.left = `${itemX}px`;
                mapBox.append(div);
            }
        }
    } else {
        if (cities.childElementCount == 0 && cities.textContent !== 'Все') {
            const div = document.createElement('div');
            const span = document.createElement('span');
            const p = document.createElement('p');
            div.classList.add('map__dot');
            p.classList.add('text');
            p.classList.add('text--sg');
            let item = cities.textContent;
            let itemY = citiesList[item]['city'][item]['mob_y'];
            let itemX = citiesList[item]['city'][item]['mob_x'];
            p.textContent = cities.textContent;
            div.dataset.city = cities.textContent;
            div.append(span);
            div.append(p);
            div.style.top = `${itemY}px`;
            div.style.left = `${itemX}px`;
            mapBox.append(div);

        } else if (cities.childElementCount == 0 && cities.textContent === 'Все') {
            let array = Object.keys(citiesList);
            array.forEach(elem => {
                let inArray = Object.keys(citiesList[elem]['city']);
                let inArrayValues = Object.values(citiesList[elem]['city']);

                inArray.forEach((e, idx) => {

                    const div = document.createElement('div');
                    const span = document.createElement('span');
                    const p = document.createElement('p');
                    div.classList.add('map__dot');
                    p.classList.add('text');
                    p.classList.add('text--sg');
                    if (e == 'Томск') {
                        div.style.flexDirection = 'column-reverse';
                    }
                    let itemY = inArrayValues[idx]['mob_y'];
                    let itemX = inArrayValues[idx]['mob_x'];
                    p.textContent = e;
                    div.dataset.city = e;
                    div.append(span);
                    div.append(p);
                    div.style.top = `${itemY}px`;
                    div.style.left = `${itemX}px`;
                    mapBox.append(div);
                });
            });
        }
        else {

            for (let i = 0; i < cities.childElementCount; i++) {
                let region = elements.firstChild.nextElementSibling.textContent.trim();
                const div = document.createElement('div');
                const span = document.createElement('span');
                const p = document.createElement('p');
                div.classList.add('map__dot');
                p.classList.add('text');
                p.classList.add('text--sg');
                let item = cities.children[i].firstElementChild.textContent;
                if (item == 'Томск') {
                    div.style.flexDirection = 'column-reverse';
                }
                let itemY = citiesList[region]['city'][item]['mob_y'];
                let itemX = citiesList[region]['city'][item]['mob_x'];
                p.textContent = cities.children[i].firstElementChild.textContent;
                div.dataset.city = cities.children[i].firstElementChild.textContent;
                div.append(span);
                div.append(p);
                div.style.top = `${itemY}px`;
                div.style.left = `${itemX}px`;
                mapBox.append(div);
            }
        }
    }
}


export { showMapMenu };
export { closeMapMenu };
export { showSubListItems };
export { closeSubListItems };
export { showRegion };
export { showRegionsAfterLoad };