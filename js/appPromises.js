const fetchMovies = (page) => {
    const movies = fetch(`https://api.themoviedb.org/3/movie/popular?page=${page}&language=en-US&api_key=3d7fd0461ae8d0f2e808c37fb41950d7`)
        .then((response) => response.json())
    return movies
}

const displayMovie = (data) => {
    const source = document.getElementById('movies').innerHTML;
    const template = Handlebars.compile(source);
    const generatedHtml = template(data);
    const show = document.getElementById('movies-container');
    console.log('Esto es show' + generatedHtml)
    show.innerHTML = generatedHtml;
}

const importMovies = () => {
    $("#import").hide();
    fetchMovies(1).then((e => {
        displayMovie(e);
    }))
}

$("#import").on("click", importMovies);

$('.page').on('click', function () {
    event.preventDefault();
    const page = $(this).text()
    fetchMovies(page).then((e => {
        displayMovie(e);
    }))

})

