addListeners();

let object;
let objectMoveAndHide;
let fadeInResetter = null;
let fadeOutResetter = null;
let scaleResetter1 = null;
let scaleResetter2 = null;


function addListeners() {
    const animator = animaster();

    document.getElementById('fadeInPlay')
        .addEventListener('click', function () {
            const block = document.getElementById('fadeInBlock');
            animator.addFadeIn(5000).play(block);
        });

    document.getElementById('fadeInReset')
        .addEventListener('click', function () {
            if (fadeInResetter) {
                fadeInResetter();
            }
        });

    document.getElementById('fadeOutPlay')
        .addEventListener('click', function () {
            const block = document.getElementById('fadeOutBlock');
            animator.addFadeOut(5000).play(block);
        });

    document.getElementById('fadeOutReset')
        .addEventListener('click', function () {
            if (fadeOutResetter) {
                fadeOutResetter();
            }
        });

    document.getElementById('movePlay')
        .addEventListener('click', function () {
            const block = document.getElementById('moveBlock');
            animaster().addMove(500, {x: 20, y:20}).play(block);
        });

    document.getElementById('moveAndScaleReset1')
        .addEventListener('click', function () {
            if (scaleResetter1) {
                scaleResetter1();
            }
        });

    document.getElementById('moveAndScaleReset2')
        .addEventListener('click', function () {
            if (scaleResetter2) {
                scaleResetter2();
            }
        });

    document.getElementById('scalePlay')
        .addEventListener('click', function () {
            const block = document.getElementById('scaleBlock');
             animator.addScale( 1000, 1.25).play(block);
        });

    document.getElementById('moveAndHidePlay')
        .addEventListener('click', function () {
            const block = document.getElementById('moveAndHideBlock');
            animator.addMove(1000 * 2/5, {x: 100, y:20})
                .addFadeOut(1000 * 3/5)
                .play(block);
        });

    document.getElementById('moveAndHideReset')
        .addEventListener('click', function () {
            const block = document.getElementById('moveAndHideBlock');
            if (objectMoveAndHide)
            {
                objectMoveAndHide.reset();
            }
        });

    document.getElementById('showAndHidePlay')
        .addEventListener('click', function () {
            const block = document.getElementById('showAndHideBlock');
            animator.addFadeIn(1000 * (1/3))
                .addDelay(1000 * (1/3))
                .addFadeOut(1000 * (1/3))
                .play(block);
        });

    document.getElementById('heartBeatingPlay')
        .addEventListener('click', function () {
            const block = document.getElementById('heartBeatingBlock');
            object = animator.heartBeating(block);
        });

    document.getElementById('heartBeatingStop')
        .addEventListener('click', function () {
            if (object) {
                object.stop();
            }
        });
}

function animaster() {
    function resetFadeIn(element) {
        element.classList.remove('show');
        element.classList.add('hide');
        element.style.transitionDuration = null;
        element.style.transform = null;
    }

    function resetFadeOut(element) {
        element.classList.remove('hide');
        element.classList.add('show');
        element.style.transitionDuration = null;
        element.style.transform = null;
    }

    function resetMoveAndScale(element) {
        element.style.transitionDuration = null;
        element.style.transform = null;
    }

    return {
        _steps : [],
        addMove(duration, transform) {
            this._steps.push({
                title : 'move',
                duration : duration,
                params : transform
            })
            return this;
        },

        addDelay(duration) {
            this._steps.push({
                title : 'delay',
                duration : duration,
            })
            return this;
        },

        addScale(duration, ratio) {
            this._steps.push({
                title : 'scale',
                duration : duration,
                params : ratio
            })
            return this;
        },
        addFadeIn(duration) {
            this._steps.push({
                title : 'fadeIn',
                duration : duration,
            })
            return this;
        },
        addFadeOut(duration) {
            this._steps.push({
                title : 'fadeOut',
                duration : duration,
            })
            return this;
        },


        play(element){
            this._steps.forEach((command) => {
                switch(command.title){
                    case 'move':
                        this.move(element, command.duration, command.params);
                        break;
                    case 'scale':
                        this.scale(element, command.duration, command.params);
                        break;
                    case 'fadeIn':
                        this.fadeIn(element, command.duration);
                        break;
                    case 'fadeOut':
                        this.fadeOut(element, command.duration);
                        break;
                    case 'delay':
                        this.delay(command.duration);
                        break;
                    default:
                        break;
                }
            });
        },

        delay(duration) {
            setTimeout(() =>{}, duration);
        },
        move(element, duration, translation) {
            element.style.transitionDuration = `${duration}ms`;
            element.style.transform = getTransform(translation, null);

            return function () {
                resetMoveAndScale(element);
            };
        },

        fadeIn(element, duration) {
            element.style.transitionDuration = `${duration}ms`;
            element.classList.remove('hide');
            element.classList.add('show');

            return function () {
                resetFadeIn(element);
            };
        },

        scale(element, duration, ratio) {
            element.style.transitionDuration = `${duration}ms`;
            element.style.transform = getTransform(null, ratio);

            return function () {
                resetMoveAndScale(element);
            };
        },

        fadeOut(element, duration) {
            element.style.transitionDuration = `${duration}ms`;
            element.classList.remove('show');
            element.classList.add('hide');

            return function () {
                resetFadeOut(element);
            };
        },

        moveAndHide(element, duration) {
            this.move(element, duration * 2 / 5, { x: 100, y: 20 });
            this.fadeOut(element, duration * 3 / 5);

            return {
                reset(){
                    resetFadeOut(element);
                    resetMoveAndScale(element);
                }
            }
        },

        showAndHide(element, duration) {
            this.fadeIn(element, duration / 3);
            setTimeout(() => {
                this.fadeOut(element, duration / 3);
            }, duration / 3);
        },

        heartBeating(element) {
            let intervalId = setInterval(() => {
                this.scale(element, 500, 1.4);
                setTimeout(() => {
                    this.scale(element, 500, 1);
                }, 500);
            }, 1000);

            return {
                stop() {
                    clearInterval(intervalId);
                }
            };
        },
    };
}

function getTransform(translation, ratio) {
    const result = [];

    if (translation) {
        result.push(`translate(${translation.x}px, ${translation.y}px)`);
    }

    if (ratio) {
        result.push(`scale(${ratio})`);
    }

    return result.join(' ');
}