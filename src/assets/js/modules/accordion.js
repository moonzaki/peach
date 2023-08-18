'use strict';

const accItemsTitleList = document.querySelectorAll('.directions__item-title');
const accItemHeight = document.querySelector('.directions__item');
const targetClassOpen = 'directions__item--open';
const eventTypesMobile = ['click'];
const eventTypesDesktop = ['mouseenter', 'mouseleave'];


function setAccordionItemPosition() {
    accItemsTitleList.forEach(item => {
        item.parentNode.parentNode.removeAttribute('style');
        if (item.parentNode.parentNode.parentNode.classList.contains(targetClassOpen)) {
            item.parentNode.parentNode.parentNode.classList.remove(targetClassOpen);
        }
        if (window.innerWidth < 1024) {
            item.parentNode.parentNode.style.transform = `translateY(${0}px)`;
            item.parentNode.parentNode.previousElementSibling.style.height = `${item.parentNode.parentElement.clientHeight}px`;
            item.parentNode.parentNode.style.height = `${item.clientHeight}px`;

        } else {
            let contentHeight = accItemHeight.clientHeight - item.parentNode.scrollHeight;

            item.parentNode.parentNode.previousElementSibling.removeAttribute('style');
            item.parentNode.parentNode.style.transform = `translateY(${contentHeight}px)`;
        }
    });
}

function actionOnAccordionItems(context, eventType, targetClass) {

    const checkContext = context.classList.contains(targetClass);
    let parentItem, changedItem;
    if (checkContext && eventType == 'click') {
        parentItem = context.parentNode.parentNode;
        changedItem = context.parentNode;
        if (!parentItem.classList.contains(targetClassOpen)) {
            context.lastElementChild.style.transform = `rotate(180deg)`;
            parentItem.classList.add(targetClassOpen);
            changedItem.style.transition = '0.3s';

            changedItem.style.height = `${changedItem.firstElementChild.clientHeight + changedItem.lastElementChild.clientHeight}px`;
        } else {
            changedItem.style.height = `${changedItem.firstElementChild.clientHeight}px`;
            context.lastElementChild.style.transform = `rotate(0deg)`;
            parentItem.classList.remove(targetClassOpen);
        }

    } else if (checkContext && eventType == 'mouseenter') {
        parentItem = context;
        changedItem = context.lastElementChild;
        parentItem.classList.add(targetClassOpen);
        changedItem.style.transition = '0.3s';
        changedItem.style.transform = `translateY(${0}px)`;

    } else if (checkContext && eventType == 'mouseleave') {
        parentItem = context;
        changedItem = context.lastElementChild;
        changedItem.style.transform = `translateY(${changedItem.clientHeight - changedItem.firstElementChild.clientHeight}px)`;
        parentItem.classList.remove(targetClassOpen);

    }
}

function accordeon() {
    const mobileTarget = 'directions__item-head';
    const desktopTarget = 'directions__item';


    function hoverItems(event) {
        if (window.innerWidth < 1024 && event.type == 'click') {
            actionOnAccordionItems(this, event.type, mobileTarget);
        } else if (window.innerWidth > 1023 && event.type == 'mouseenter') {
            actionOnAccordionItems(this, event.type, desktopTarget);
        } else if (window.innerWidth > 1023 && event.type == 'mouseleave') {
            actionOnAccordionItems(this, event.type, desktopTarget);
        }
    }
    eventTypesMobile.forEach(e => {
        document.querySelectorAll(`.${mobileTarget}`).forEach(i => i.addEventListener(e, hoverItems));
    });
    eventTypesDesktop.forEach(e => {
        document.querySelectorAll(`.${desktopTarget}`).forEach(i => i.addEventListener(e, hoverItems));
    });
}

export { setAccordionItemPosition };
export { accordeon };
