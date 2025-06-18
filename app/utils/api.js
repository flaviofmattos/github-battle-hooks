export default function BattleApi(location) {
  this.host = location.protocol + "//" + location.hostname + "/battle-api";
}

BattleApi.prototype.fetchRepositories = function (language, page) {
  const repositories = `${this.host}/repositories`
  const query = `?language=${language}&page=${page}`
  const endpoint = window.encodeURI(`${repositories}${query}`)
  return fetch(endpoint, {
    headers: {

    }
  })
    .then((response) => response.json())
    .then((data) => {
      if (!data.items) {
        throw new Error(data.message)
      }

      return data
    })
}

BattleApi.prototype.fetchUser = function (username) {
  const users = `${this.host}/users/${username}`
  const endpoint = window.encodeURI(users)
  return fetch(endpoint, {
    headers: {

    }
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.message) {
        throw new Error(data.message)
      }
      return data
    })
};

BattleApi.prototype.fetchUserRepos = function (username) {
  const userRepos = `${this.host}/users/${username}/repos?per_page=100`
  const endpoint = window.encodeURI(userRepos)
  return fetch(endpoint, {
    headers: {

    }
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.message) {
        throw new Error(data.message)
      }
      return data
    })
}

BattleApi.prototype.calculateScore = function (followers, repos) {
  const stars = this.getStartCount(repos);
  return (followers * 3) + stars;
}

BattleApi.prototype.getStartCount = function (repos) {
  return repos.map((repo) => repo.stargazers_count).reduce((accumulator, currentValue) => accumulator + currentValue)
}

BattleApi.prototype.battle = async function (playerOne, playerTwo) {
  const userOne = await this.getUserAndRepos(playerOne)
  const userTwo = await this.getUserAndRepos(playerTwo)
  return this.computeResults(userOne, userTwo)
}

BattleApi.prototype.computeResults = function (playerOne, playerTwo) {
  let result = {}
  if (playerOne.score > playerTwo.score) {
    result = {
      winner: {
        profile: playerOne.profile,
        score: playerOne.score
      },
      loser: {
        profile: playerTwo.profile,
        score: playerTwo.score
      }
    }
  } else if (playerOne.score < playerTwo.score) {
    result = {
      winner: {
        profile: playerTwo.profile,
        score: playerTwo.score
      },
      loser: {
        profile: playerOne.profile,
        score: playerOne.score
      }
    }
  } else {
    result = {
      winner: {
        profile: playerOne.profile,
        score: playerOne.score
      },
      loser: {
        profile: playerTwo.profile,
        score: playerTwo.score
      }
    }
  }
  return result
}

BattleApi.prototype.getUserAndRepos = async function (username) {

  try {
    let user = await this.fetchUser(username)
    let userRepos = await this.fetchUserRepos(username)
    let result = {
      profile: user,
      score: this.calculateScore(user.followers, userRepos)
    }
    return result
  } catch (e) {
    console.log(e)
    throw new Error('There was an error loading user data')
  }
}
