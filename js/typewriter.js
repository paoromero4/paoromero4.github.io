const app = document.getElementById('typed-text');

    const typewriter = new Typewriter(app, {
        loop: true,
        delay: 75,
        deleteSpeed: 50
    });

    typewriter
        .typeString(' Mechanical Engineer')
        .pauseFor(2000)
        .deleteAll()
        .typeString(' MIT Undergraduate Student')
        .pauseFor(2000)
        .deleteAll()
        .typeString(' Maker')
        .pauseFor(2000)
        .deleteAll()
        .typeString('n Undergraduate Researcher')
        .pauseFor(2000)
        .deleteAll()
        .typeString(' Musician - Oboist')
        .pauseFor(2000)
        .deleteAll()
        .typeString('n Assistant Shop Manager')
        .pauseFor(2000)
        .deleteAll()
        .start();