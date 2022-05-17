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

// Append elements to container
elementContainer.append(title, row);

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

// var title = "Jersey Shore BlueClaws at Wilmington Blue Rocks";
// var text =
//   "Lorem ipsum, dolor sit amet consectetur adipisicing elit Optio odio nostrum aliquam voluptate exercitationem labore quibusdam illo vero modi. Qui dicta cupiditate delectus nam,quia facilis aliquam eveniet voluptas sapiente?";
// var image =
//   "https://seatgeek.com/images/performers-landscape/generic-minor-league-baseball-9c1f76/677210/35944/huge.jpg";

// createCard((title = title), (image = image), (text = text));

// createCard((title = title), (image = image), (text = text));

async function addContent() {
  let res = await fetch(
    "https://api.seatgeek.com/2/events?client_id=MjcwMjQxMDl8MTY1MjgwODYzMi4xMjA3NTQ"
  );
  let result = await res.json();

  for (i in result["events"]) {
    let titleOne = result["events"][i]["title"];
    let image = result["events"][i]["performers"][0]["image"];
    let venue = result["events"][i]["venue"]["name"];
    let link = result["events"][i]["url"];
    createCard(
      (title = titleOne),
      (image = image),
      (text = venue),
      (link = link)
    );
  }

  console.log(result["events"]);
}

addContent();

// Append elements to container
elementContainer.append(title, row);

// Append container to the body
document.body.append(elementContainer);
