

let observer = new IntersectionObserver(enties => {
    enrties.forEach(entry => {
        console.log(entry)
    });
});

observer.observe(refs.sentingDiv);