const app = document.getElementById('typed-text');

    const typewriter = new Typewriter(app, {
        loop: true,
        delay: 75,
        deleteSpeed: 120
    });

    typewriter
        .typeString(' Mechanical Engineer')
        .pauseFor(500)
        .deleteAll()
        .typeString(' MIT Undergraduate Student')
        .pauseFor(200)
        .deleteAll()
        .typeString(' Maker')
        .pauseFor(300)
        .deleteAll()
        .typeString('n Undergraduate Researcher')
        .pauseFor(600)
        .deleteAll()
        .typeString(' Musician - Oboist')
        .pauseFor(300)
        .deleteAll()
        .typeString(' Fire Spinning Performer')
        .pauseFor(300)
        .deleteAll()
        .start();
