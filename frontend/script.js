async function apiFetch(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Request failed: ${response.status}`);
  return response.json();
}

function displayAllData(data) {
  document.getElementById("professionalName").textContent =
    data.professionalName;

  const img = document.getElementById("professionalImage");
  img.src = data.imagePath;
  img.alt = "Professional Image";

  const nameLink = document.getElementById("nameLink");
  nameLink.textContent = data.nameLink.firstName;
  nameLink.href = data.nameLink.url;

  document.getElementById("primaryDescription").textContent =
    data.primaryDescription;

  document.getElementById("workDescription1").textContent =
    data.workDescription1;
  document.getElementById("workDescription2").textContent =
    data.workDescription2;

  document.getElementById("linkTitleText").textContent = data.linkTitleText;

  const linkedIn = document.getElementById("linkedInLink");
  linkedIn.textContent = data.linkedInLink.text;
  linkedIn.href = data.linkedInLink.link;

  const github = document.getElementById("githubLink");
  github.textContent = data.githubLink.text;
  github.href = data.githubLink.link;
}

async function getData() {
  const data = await apiFetch("/professional");
  displayAllData(data);
}

getData().catch(console.error);
