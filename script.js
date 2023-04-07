const usernameInput = document.getElementById("username-input");
const searchButton = document.getElementById("search-button");
const userDetails = document.getElementById("user-details");

searchButton.addEventListener("click", () => {
  const username = usernameInput.value;
  if (username) {
    fetch(`https://api.github.com/users/${username}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "Not Found") {
          userDetails.innerHTML = `<p>User not found</p>`;
        } else {
          const repositoriesCount = data.public_repos;
          const followersList = data.followers_url;
          const profilePicture = data.avatar_url;

          let followersData = "";

          fetch(followersList)
            .then((response) => response.json())
            .then((data) => {
              data.forEach((follower) => {
                followersData += `<li>${follower.login}</li>`;
              });

              userDetails.innerHTML = `
								<img src="${profilePicture}" alt="Profile Picture">
								<p>Repositories: ${repositoriesCount}</p>
								<h2>Followers</h2>
								<ul>${followersData}</ul>
							`;
            })
            .catch((error) => {
              console.error(error);
            });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  } else {
    userDetails.innerHTML = `<p>Please enter a username</p>`;
  }
});
