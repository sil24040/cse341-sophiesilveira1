async function apiFetch(url) {
  const response = await fetch(url);
  return response.json();
}

async function getData() {
  const data = await apiFetch("/professional");
  displayAllData(data);
}

function displayAllData(data) {
  // NAME
  document.getElementById("professionalName").textContent =
    data.professionalName;

  // IMAGE (THIS IS THE KEY FIX)
  const img = document.getElementById("professionalImage");
  img.src = data.imagePath;              // <-- uses /images/me.jpeg
  img.alt = "Professional Image";

  // NAME LINK
  const nameLink = document.getElementById("nameLink");
  nameLink.textContent = data.nameLink.firstName;
  nameLink.href = data.nameLink.url;

  // PRIMARY DESCRIPTION
  document.getElementById("primaryDescription").textContent =
    data.primaryDescription;

  // WORK DESCRIPTIONS
  document.getElementById("workDescription1").textContent =
    data.workDescription1;

  document.getElementById("workDescription2").textContent =
    data.workDescription2;

  // LINK TITLE
  document.getElementById("linkTitleText").textContent =
    data.linkTitleText;

  // LINKS
  const linkedIn = document.getElementById("linkedInLink");
  linkedIn.textContent = data.linkedInLink.text;
  linkedIn.href = data.linkedInLink.link;

  const github = document.getElementById("githubLink");
  github.textContent = data.githubLink.text;
  github.href = data.githubLink.link;
}

// RUN
getData();