$(document).ready(function () {


    var cities = ["Los Angeles", "New York City", "Tokyo", "Paris", "Dubai"];


    //displays the array of cities into buttons 

    function renderButtons() {

        $("#buttons-view").empty();

        for (var i = 0; i < cities.length; i++) {
            var a = $("<button>");
            a.addClass("city");
            a.attr("data-name", cities[i]);
            a.text(cities[i]);
            $("#buttons-view").append(a);
        }
    }


    //function to add more buttons once the id add-cities is clicked 
    $("#add-cities").on("click", function (event) {
        event.preventDefault();

        //the value the user inputs is stored in this variable
        var city = $("#city-input").val().trim();

        //gets pushed into the cities array
        cities.push(city);

        //calling back the render function
        renderButtons();

        $('.firstRow').css("height", "+=10px");

        //add margin bottom to class of firstRow
        $('.firstRow').css("margin-bottom", "+=20px");


    });


    // on click function that enables the ajax call to get the giphy images

    $("#buttons-view").on("click", ".city", function (event) {
        var city = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + city + "&api_key=dc6zaTOxFJmzC&limit=10&rating=PG";
        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function (response) {
            var results = response.data;
            for (var i = 0; i < results.length; i++) {
                var gifDiv = $("<div class='item'>");
                var rating = results[i].rating;
                var p = $("<p>").text("Rating: " + rating);
                var cityImage = $("<img>");
                cityImage.attr('src', results[i].images.fixed_height.url);
                gifDiv.prepend(p);
                gifDiv.prepend(cityImage);
                $("#cities-view").prepend(gifDiv);

                //dynamically changes the css of buttons that are clicked

                $('.item').css("margin", "20px");
                $('.item').css("border", "solid black");
                $('.item').css({
                    'width': '180px',
                    'height': '180px'
                });

                //add more height to class of firstRow 
                $('.firstRow').css("height", "+=30px");

            }

        });
    });

    renderButtons();



});
