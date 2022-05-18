/*
Layout of the card

Creates a div element with row which will contain card with contain
*/

// container
elementContainer = document.createElement("div");
elementContainer.setAttribute("class", "container");

/*
Title Element
Creates a container which contains tile of main page
*/

title = document.createElement("div");
title.setAttribute("class", "title-container");

// Main title
titleHeading = document.createElement("h1");
titleHeading.innerHTML = "Let there be live";

// Quote for title which attracts audience
titleText = document.createElement("p");
titleText.innerHTML =
  "Your next best-night-ever is waiting. And we have the tickets.";

// Append elements to title container
title.append(titleHeading, titleText);

row = document.createElement("div");
row.setAttribute("class", "row");

/*
Search Functionality added

Creates the elements for the search functionality 
*/

searchBox = document.createElement("div");
searchBox.setAttribute("class", "search");
inputSearch = document.createElement("input");
inputSearch.setAttribute("type", "text");
inputSearch.setAttribute("name", "searchBar");
inputSearch.setAttribute("placeholder", "Search for Event");

searchBox.append(inputSearch);

// Append elements to container
elementContainer.append(title, searchBox, row);

/*
Fetch the content of seatgeek api and display the result using
displayContent() function

Also has a search functionality which filter the content according to the search string
*/
async function addContent() {
  try {
    let res = await fetch(
      "https://api.seatgeek.com/2/events?client_id=MjcwMjQxMDl8MTY1MjgwODYzMi4xMjA3NTQ"
    );
    let result = await res.json();
    result = result["events"];
    displayContent(result);

    searchBox.addEventListener("keyup", (e) => {
      let searchString = e.target.value;
      let filteredEvents = result.filter((events) => {
        return (
          events["title"].includes(searchString) ||
          events["venue"]["name"].includes(searchString)
        );
      });
      row.innerHTML = "";
      displayContent(filteredEvents);
    });
    
  } catch (e) {
    console.log(e);
  }
}

/*
It takes the whole result of json data as input and pass the content 
to the createCard() function which displays the content on page 
*/
function displayContent(result) {
  for (i in result) {
    let titleOne = result[i]["title"];
    let image = result[i]["performers"][0]["image"];
    let venue = result[i]["venue"]["name"];
    let link = result[i]["url"];

    if (image != null) {
      createCard(
        (title = titleOne),
        (image = image),
        (text = venue),
        (link = link)
      );
    }
  }
}

/*
This function creates the card with the content given
*/
function createCard(title, image, text, link = "#") {
  col = document.createElement("div");
  col.setAttribute("class", "col-lg-4 col-md-6 col-sm-12");

  card = document.createElement("div");
  card.setAttribute("class", "card text-center h-100");

  img = document.createElement("img");
  img.setAttribute("src", image);
  img.setAttribute("class", "card-img-top");

  card_body = document.createElement("div");
  card_body.setAttribute("class", "card-body");

  card_title = document.createElement("h4");
  card_title.setAttribute("class", "card-title");
  card_title.innerHTML = title;

  card_text = document.createElement("p");
  card_text.setAttribute("class", "card-text");
  card_text.innerHTML = "Venue: " + text;

  card_link = document.createElement("a");
  card_link.setAttribute("class", "");
  card_link.setAttribute("href", link);
  card_link.setAttribute("target", "_blank");

  card_link.innerHTML = "Book Tickets";

  card_body.append(card_title, card_text, card_link);
  card.append(img, card_body);

  col.append(card);

  row.append(col);
}

// Add cards to the row
addContent();

// Append elements to container
elementContainer.append(title, searchBox, row);

// Append container to the body
document.body.append(elementContainer);
