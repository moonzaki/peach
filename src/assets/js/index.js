import './../sass/style.scss';
import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';
import { setAccordionItemPosition } from './modules/accordion';
import { accordeon } from './modules/accordion';
import { click } from './modules/click';
import { showMapMenu } from './modules/map';
import { showSubListItems } from './modules/map';
import { showRegion } from './modules/map';
import { showRegionsAfterLoad } from './modules/map';
import { closeMapMenu } from './modules/map';
import { closeSubListItems } from './modules/map';
import { hover } from './modules/hover';

'use strict';


window.addEventListener('load', function () {
    setAccordionItemPosition();
});

window.addEventListener('DOMContentLoaded', () => {
    accordeon();

    const swiper = new Swiper('.swiper', {

        slidesPerView: 'auto',
        autoHeight: false,
        direction: 'horizontal',
        centeredSlides: true,
        speed: 600,
        pagination: {
            el: '.swiper-pagination',
        },
        navigation: {
            nextEl: '.corp-slider__control-next',
            prevEl: '.corp-slider__control-prev',

        },

    });

    showRegionsAfterLoad('[data-map=item]', '.map__list-item--current');
    hover({
        type: 'block',
        hoverSelector: '.map__list-item',
        showSelector: 'map__list-item--hover'
    });
    click({
        elementClass: '.map__head-title',
        options: {
            openClass: 'map__head-title--open',
            listClass: 'map__list',
            popupListClass: 'map__list-popup'
        },
        action: showMapMenu,
    });

    click({
        elementClass: '[data-list=item-sub]',
        options: {
            openClass: 'sublist-popup--open',
        },
        action: showSubListItems,
    });

    click({
        elementClass: '[data-map=item]',
        options: {
            openClass: 'map__list-item--current'
        },
        action: showRegion
    });

    window.addEventListener('resize', () => {
        showRegionsAfterLoad('[data-map=item]', '.map__list-item--current');
        closeMapMenu({
            itemClass: '.map__head-title',
            openClass: 'map__head-title--open',
            listClass: 'map__list',
            popupListClass: 'map__list-popup'
        });
        closeSubListItems('map__list-item--sub-show', 'sublist-popup--open');
    });
});



