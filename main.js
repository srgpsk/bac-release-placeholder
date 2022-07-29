const textContainer = document.querySelector('[data-text-container]');
const animationContainer = document.querySelector('[data-animation-container]');

const animationTypes = ['animationstart', 'animationend', 'animationcancel', 'animationiteration'];
const animationHandler = a => {
    const suffix = a.type.substring(9).replace(/^\w/, ch => ch.toUpperCase()); // Start, End etc.
    const listenerName = a.animationName
        .replaceAll(/-\w/g, m => m.replace('-', '').toUpperCase()) // CSS animation name to camel Case
        .concat(suffix);

    animationListeners[listenerName]?.call(window, a);
}
animationTypes.forEach(t => animationContainer.addEventListener(t, animationHandler, false));

const animationListeners = {};
const registerAnimationListener = (listenerName, callback) => animationListeners[listenerName] = callback;
const soundHandler = (soundName, action) => {
    const mediaElement = document.querySelector(`[data-sound-${soundName}]`);
    (new Audio())[action].call(mediaElement);
}
// curry it
const curry = action => soundName => soundHandler(soundName, action);
const play = curry('play');
const pause = curry('pause');

registerAnimationListener('igogoStart', () => play('igogo'));
registerAnimationListener('runningAwayToTheSunsetStart', () => play('skok'));
registerAnimationListener('runningAwayToTheSunsetEnd', () => pause('skok'));

document.addEventListener('click', e => {
    if (undefined === e.target.dataset.action) return;

    // change text container
    textContainer.classList.add('action');
    document.querySelector('[data-sound-magic]').play();

    // stop the cloud and add the paper animation
    const cloudContainer = document.querySelector('[data-cloud-container]');
    cloudContainer.style.animationPlayState = 'paused';
    cloudContainer.classList.add('action');

    // start main scene action
    animationContainer.classList.add('action');

    // unicorn stops shitting
    document.getAnimations().forEach(a => {
        if ('rainbow' !== a.animationName) return;

        console.log(a)
        a.effect.updateTiming({iterations: 1});
        a.finish();
        a.cancel();
    })
    document.querySelectorAll('.rainbow').forEach(el => {
        el.classList.add('action');

        // remove rainbows from unicorn container
        animationContainer.firstElementChild.appendChild(el);
    });

    // split the sun
    const sun = document.querySelector('[data-sun-raised]');
    const sunTopHalf = document.querySelector('[data-sun-top-half]');
    const sunBottomHalf = document.querySelector('[data-sun-bottom-half]');

    sun.classList.add('action');
    sun.ontransitionend = () => {
        sun.classList.add('d-none');

        setTimeout(() => {
            document.querySelector('[data-sound-knife]').play();
            sunTopHalf.classList.replace('d-none', 'action');
            sunBottomHalf.classList.replace('d-none', 'action');
        }, 1500);
    }

    // unicorn igogo and run
    const unicornContainer = document.querySelector('[data-unicorn-container]');
    unicornContainer.classList.add('action');

}, false);


