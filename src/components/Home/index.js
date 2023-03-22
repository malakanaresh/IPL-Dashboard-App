// Write your code here
import './index.css'

import {Component} from 'react'

import Loader from 'react-loader-spinner'

import TeamCard from '../TeamCard'

class Home extends Component {
  state = {isTrue: true, teams: []}

  componentDidMount() {
    this.getTeamData()
  }

  getTeamData = async () => {
    const response = await fetch('https://apis.ccbp.in/ipl')

    const data = await response.json()

    const formatedData = data.teams.map(eachTeam => ({
      name: eachTeam.name,
      id: eachTeam.id,
      teamImageUrl: eachTeam.team_image_url,
    }))

    this.setState({teams: formatedData, isTrue: false})
  }

  loaderGet = () => (
    <div data-testid="loader">
      <Loader type="Oval" color="#ffffff" height={50} />
    </div>
  )

  render() {
    const {isTrue, teams} = this.state

    return (
      <div className="ipl-container">
        <h1 className="dashboad">
          <img
            src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png"
            alt="ipl logo"
            className="ipl-logo"
          />
          IPL Dashboard
        </h1>
        <ul className="team-li-container">
          {isTrue
            ? this.loaderGet()
            : teams.map(eachLi => (
                <TeamCard key={eachLi.id} teamDetails={eachLi} />
              ))}
        </ul>
      </div>
    )
  }
}

export default Home
