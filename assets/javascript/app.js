var topics = ["The Office", "House of Cards", "Family Guy", "Naruto", "Rick And Morty", "The Walking Dead"];

// Creates animal buttons when the page loads so the user has some choices to pick from.
createTvShowButtons();


// When the button with the ID of addTVShow is clicked, a new variable is saved as the value that the user entered
// with the excess spaces trimmed off. This value is then pushed to the end of the topics array and the createTvShowButtons
// function is called to redraw the buttons. This button is a submit type so this block returns false to prohibit the page
// from reloading.
$('#addTVShow').on('click', function() {
    var animalEntered = $('#tvShowInput').val().trim();
    topics.push(animalEntered);
    $('#tvShowInput').val('');
    createTvShowButtons();

    return false;
});

$(document.body).on('click', '.button-list', function() {
    // Creates a variable and assigns the value to the name of the show clicked
    var tvShowClicked = $(this).data('topics');
    // Creates a variable to hold the query string for the Giphy API request and adds the shows name to the query string.
    var query = 'https://api.giphy.com/v1/gifs/search?q=' + tvShowClicked + '&limit=10&api_key=368b3d08d9c747a8b4cc4b62924879d4';

    // Empties the topics element so new gifs are loaded in on each click of a button.
    $('#topics').empty();


    // Makes an AJAX request using the query string outlined above.
    $.ajax({
        url: query,
        method: 'GET'
            // Performs this anonymous function when the request is recieved back from the API.
    }).done(function(response) {
        // Creates a new variable and assigns its value to the responses JSON data object.
        var results = response.data;

        // Runs a for loop for the number of recieved results. 
        for (i = 0; i < results.length; i++) {
            // Creates a new variable and assigns a div with a class of col-sm-4 to it.
            var newGif = $('<div class="col-sm-4">');
            // Creates a new variable and assigns a rating from the response to it.
            var rating = results[i].rating.toUpperCase();
            // Creates a new variable and assigns a paragraph to it with the HTML of the gifs rating.
            var p = $('<p>').html('Rating: ' + rating);
            // Adds the text-center class to the p variable.
            p.addClass('text-center');
            // Creates a new variable and assigns a img.
            var img = $('<img>');

            // Adds a src to the img variable of the gifs still image.
            img.attr('src', results[i].images.fixed_height_small_still.url);
            // Adds a data attribute to the img variable of the gifs still image.
            img.attr('data-still', results[i].images.fixed_height_small_still.url);
            // Adds a data attribute to the img variable of the gif.
            img.attr('data-animate', results[i].images.fixed_height_small.url);
            // Adds a data attribute to the img variable of the gifs state.
            img.attr('data-clicked', 'still');
            // Adds a classes to the img variable.
            img.addClass('gif-margin gif center-block panel');

            // Appends the p and img variables to the newGif variable.
            newGif.append(p);
            newGif.append(img);
            // Appends the newGif variable to the element with the topics ID.
            $('#topics').append(newGif);
        }
    });
});


$(document.body).on('click', '.gif', function() {
    var click = $(this).attr('data-clicked');

    if (click === 'still') {
        $(this).attr('src', $(this).data('animate'));
        $(this).attr('data-clicked', 'animated');
    } else {
        $(this).attr('src', $(this).data('still'));
        $(this).attr('data-clicked', 'still');
    }
});


//
// FUNCTIONS --------------------------------------------------------------------------------------------------------------
//


// This function is responsible for creating the clickable buttons. When the fuction is called the tvShowButtons
// div is emptied and then a for loop interates through the values stored in the topics array. At each value the block creates a
// button with the classes btn, btn-primary and button-list. A custom data attribute with the value of the arrays index value is also
// stored on the button and the arrays index value is written to the buttons HTML. This button is then appended to the tvShowButtons
// element.
function createTvShowButtons() {
    $('#tvShowButtons').empty();

    for (var i = 0; i < topics.length; i++) {
        var button = $('<button>').addClass('btn btn-primary button-list');
        button.attr('data-topics', topics[i]).html(topics[i]);
        $('#tvShowButtons').append(button);
    }
}