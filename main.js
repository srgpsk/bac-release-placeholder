const textContainer = document.querySelector('[data-text-container]')
const animationContainer = document.querySelector('[data-animation-container]')
const sounds = document.getElementsByTagName('audio')

window.addEventListener('click', e => {
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
        a.effect.updateTiming({iterations: 1});
        a.finish();
        a.cancel();
    })
    document.querySelectorAll('.rainbow').forEach(el => el.classList.add('action'));

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


}, false);

const animationHandler = (a, suffix) => window[a.animationName.replace(/-\w/, m => m.replace('-', '').toUpperCase()).concat(suffix)]?.();
animationContainer.addEventListener("animationstart", a => animationHandler(a, 'AnimationStartHandler'), false);
animationContainer.addEventListener("animationend", a => animationHandler(a, 'AnimationEndHandler'), false);

const rainbowAnimationEndHandler = () => {

}

const runningAwayToTheSunsetAnimationStartHandler = () => {
    for (let i = 0; i < sounds.length; i++) {
        sounds[i].play()
    }
}

const runningAwayToTheSunsetAnimationEndHandler = () => {

    console.log('end of animation : ' + a.animationName)
    for (let i = 0; i < sounds.length; i++) {
        sounds[i].pause()
    }


    // function soundHandler(callback) {
    //     for (let i = 0; i < sounds.length; i++) {
    //         callback.apply(sounds[i])
    //         // sounds[i].callback()
    //     }
    // }
}
