// Mian container
let mainContainer = document.createElement('div');
mainContainer.setAttribute('class', 'container');
//mainContainer.style.backgroundColor = 'sandybrown';
document.body.appendChild(mainContainer);

// // SubContainer
// const subContainer = document.createElement('div');
// subContainer.setAttribute('class', 'container sub');
// subContainer.style.backgroundColor = 'brown';
// mainContainer.appendChild(subContainer);

// // Image of books

let myData = [];
//To fetch api
let getBook = async () => {
	for (let i = 1; i <= 12; i++) {
		const res = await fetch(`https://anapioficeandfire.com/api/books/${i}`);
		const data = await res.json();
		let characters = getCharacters(data.characters);
		myData[i - 1] = {
			Name: data.name,
			Authors: data.authors,
			Publisher: data.publisher,
			Released: data.released,
			ISBN: data.isbn,
			NPages: data.numberOfPages,
			Characters: characters,
		};
	}
	displayDetails(myData);
	//console.log(myData);
};

// To get Characters
function getCharacters(data) {
	//console.log(data);
	if (data.length == 0) {
		return "Characters aren't revealed";
	} else {
		let allCharacters = [];
		for (let i = 10; i < 15; i++) {
			var url = data[i];
			//console.log(url);
			let charName = async () => {
				const charRes = await fetch(`${url}`);
				const charData = await charRes.json();
				//console.log(charData);
				allCharacters[i - 10] = charData.name;
			};
			charName();
		}
		//console.log(allCharacters);
		return allCharacters;
	}
}

// To print
function displayDetails(mydata) {
	var createContent = '';
	console.log(mydata);
	let n = 0;
	mydata.forEach((data) => {
		//console.log(e);
		let releaseDate = new Date(data.Released);
		let releasedDate = `${releaseDate.getDate()} - ${releaseDate.getMonth()} - ${releaseDate.getFullYear()}  `;
		createContent += `<div class="container sub">
    <div class="row content">
      <div class="imageContent">
        <img
          src="./images/1200px-Closed_Book_Icon.svg.png"
          alt=""
					class="image"
        />
				<h3 id="bookTitle">${data.Name}</h3>
      </div>
      <div class="otherContent">
        
        <!-- Author -->
						<div class="row dataContent author">
							<div class="iconTitle">
								<img src="./images/writer.png" alt="" />
								<span id="span Author">Author</span>
							</div>
							<span class="answerContent">${data.Authors}</span>
						</div>

						<!-- publisher -->
						<div class="row dataContent publisher">
							<div class="iconTitle">
								<img src="./images/publish.png" alt="" />
								<span id="span Publisher">Publisher</span>
							</div>
							<span class="answerContent">${data.Publisher}</span>
						</div>

						<!-- Release Date -->
						<div class="row dataContent release">
							<div class="iconTitle">
								<img src="./images/release.png" alt="" />
								<span id="span Release">Released on</span>
							</div>
							<span class="answerContent">${releasedDate}</span>
						</div>

						<div class="hideThese">
						<!-- ISBN -->
						<div class="row dataContent isbn" id="hide">
							<div class="iconTitle">
								<img src="./images/isbn.jpg" alt="" />
								<span id="span Isbn">ISBN</span>
							</div>
							<span class="answerContent">${data.ISBN}</span>
						</div>

						<!-- No of Pages -->
						<div class="row dataContent nPages" id="hide">
							<div class="iconTitle">
								<img src="./images/release.png" alt="" />
								<span id="span nPages">No. of Pages</span>
							</div>
							<span class="answerContent">${data.NPages}</span>
						</div>

						<!-- Book Characters -->
						<div class="row dataContent bookCharacters" id="hide">
							<div class="iconTitle">
								<img src="./images/writer.png" alt="" />
								<span id="span Characters">Characters</span>
							</div>
							<span class="answerContent">${data.Characters}</span>
						</div>
						</div>
						<div class="button">
							<a class="btn btn-danger" id="myButton" onclick="removeHide(${n})">Read More...</a>
						</div>
      </div>
    </div>
  </div>`;
		n++;
		mainContainer.innerHTML = createContent;
	});
}

function removeHide(a) {
	let x = a * 3;
	let getHide = document.querySelectorAll('#hide');

	if (getHide[x].style.display != 'flex') {
		getHide[x].style.display = 'flex';
		getHide[x + 1].style.display = 'flex';
		getHide[x + 2].style.display = 'flex';

		let read = document.querySelectorAll('#myButton');
		read[a].setAttribute('class', 'btn btn-primary');
		read[a].innerHTML = 'Show Less';
	} else {
		getHide[x].style.display = 'none';
		getHide[x + 1].style.display = 'none';
		getHide[x + 2].style.display = 'none';

		let read = document.querySelectorAll('#myButton');
		read[a].setAttribute('class', 'btn btn-danger');
		read[a].innerHTML = 'Read More...';
	}
}
window.onload = getBook;
