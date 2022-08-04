const animationContainer = document.querySelector('[data-animation-container]');

// animations
const animationListeners = {};

const animationListener = () => {
    const animationHandler = a => {
        const suffix = a.type.substring(9).replace(/^\w/, ch => ch.toUpperCase()); // Start, End etc.
        const listenerName = a.animationName
            .replace(/-\w/g, m => m.replace('-', '').toUpperCase()) // CSS animation name to camel Case
            .concat(suffix);

        animationListeners[listenerName]?.call(window, a);
    }
    const animationTypes = ['animationstart', 'animationend', 'animationcancel', 'animationiteration'];
    animationTypes.forEach(t => document.addEventListener(t, animationHandler, false));

    return (listenerName, callback) => animationListeners[listenerName] = callback;
}
const addAnimationListener = animationListener();

addAnimationListener('igogoStart', () => play('igogo'));
addAnimationListener('runningAwayToTheSunsetStart', () => play('skok'));
addAnimationListener('runningAwayToTheSunsetEnd', () => pause('skok'));

// sounds
const soundHandler = (soundName, action) => {
    const mediaElement = document.querySelector(`[data-sound-${soundName}]`);
    (new Audio())[action].call(mediaElement);
}
// curry it
const curry = action => soundName => soundHandler(soundName, action);
const play = curry('play');
const pause = curry('pause');

// start action
const actionize = selector => selector.classList.add('action');

/**
 * Animate main text block
 */
const animateTextContainer = r => {
    const textContainer = document.querySelector('[data-text-container]');
    textContainer.addEventListener('transitionend', e => r());

    actionize(textContainer);
    play('magic');
}

const animateMainScene = r => {
    // start main scene action
    animationContainer.classList.add('action');
    r();
}

/**
 * Stop the cloud and add the paper animation
 */
const animateCloud = r => {
    const cloudContainer = document.querySelector('[data-cloud-container]');
    cloudContainer.style.animationPlayState = 'paused';
    actionize(cloudContainer);
    r();
}

const animateRainbows = r => {
    // unicorn stops shitting
    document.getAnimations().forEach(a => {
        if ('rainbow' !== a.animationName) return;

        a.effect.updateTiming({iterations: 1});
        a.finish();
        a.cancel();
    })
    document.querySelectorAll('.rainbow').forEach(el => {
        el.classList.add('action');
    });

   document.querySelector('.action.rainbow').ontransitionend = e => {
       animationContainer.firstElementChild.appendChild(e.target)
       r()
   }

}

const animateSunset = r => {
    // split the sun
    const sun = document.querySelector('[data-sun-raised]');
    const sunTopHalf = document.querySelector('[data-sun-top-half]');
    const sunBottomHalf = document.querySelector('[data-sun-bottom-half]');

    sun.classList.add('action');
    sun.ontransitionend = () => {
        sun.classList.add('d-none');

        setTimeout(() => {
            play('knife');
            sunTopHalf.classList.replace('d-none', 'action');
            sunBottomHalf.classList.replace('d-none', 'action');
            r()
        }, 1500);
    }
}

const animateUnicorn = r => {
    // unicorn igogo and run
    const unicornContainer = document.querySelector('[data-unicorn-container]');
    unicornContainer.classList.add('action');
    r()
}

const run = async f => new Promise(resolve => f(resolve))
const runAll = async () => {
    await run(animateTextContainer)
    await run(animateCloud)
    await run(animateMainScene)
    await run(animateRainbows)
    await run(animateSunset)
    await run(animateUnicorn)
}
document.addEventListener('click', e => {
    if (undefined === e.target.dataset.action) return;

    runAll().then(() => window.location.replace('#'))
}, false);


