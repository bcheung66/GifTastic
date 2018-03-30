var topics = ["cat", "dog", "goat", "monkey", "bird", "turtle", "fish"];

$("#add-animal").on("click", function (event) {
    event.preventDefault();

    topics.push($("#animal-input").val().trim());
    addButton($("#animal-input").val().trim());
});

function addButton(topic) {
    var button = $('<input id="' + topic + '-button" type="button" value="' + topic + '" />');
    button.appendTo($("#animal-buttons"));

    // Event listener for our cat-button
    $("#" + topic + "-button").on("click", function () {

        // Storing our giphy API URL for a random cat image
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=s1xlS43zDdNWtmMNCSkzFZc8npdUL6Md&limit=10";

        // Perfoming an AJAX GET request to our queryURL
        $.ajax({
            url: queryURL,
            method: "GET"
        })

            // After the data from the AJAX request comes back
            .then(function (response) {
                // Saving the image_original_url property
                $("#animals").empty();
                //$("#rating").empty();
                var rowCnt = 0;
                var cellCnt = 0;
                response.data.forEach(dat => {
                    var stillImageUrl = dat.images.fixed_height_still.url;
                    var animateImageUrl = dat.images.fixed_height.url;

                    // Creating and storing an image tag
                    var catImage = $("<img>");

                    // Setting the catImage src attribute to imageUrl
                    catImage.attr("src", stillImageUrl);
                    //catImage.attr("alt", "cat image");
                    catImage.attr("class", "gif");
                    catImage.attr("data-state", "still");
                    catImage.attr("data-still", stillImageUrl);
                    catImage.attr("data-animate", animateImageUrl);

                    var h3 = $("<h3>")
                    h3.text("Rating: " + dat.rating);
                    $("#animals").append(h3);
                    $("#animals").append(catImage);

                    // Prepending the catImage to the images div
                });

                $(".gif").on("click", function () {
                    // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
                    var state = $(this).attr("data-state");
                    // If the clicked image's state is still, update its src attribute to what its data-animate value is.
                    // Then, set the image's data-state to animate
                    // Else set src to the data-still value
                    if (state === "still") {
                        $(this).attr("src", $(this).attr("data-animate"));
                        $(this).attr("data-state", "animate");
                    } else {
                        $(this).attr("src", $(this).attr("data-still"));
                        $(this).attr("data-state", "still");
                    }
                });
            });
    });
}

topics.forEach(topic => {
    addButton(topic);
});