// Write your code here
import './index.css'

import {Component} from 'react'

import Loader from 'react-loader-spinner'

import LatestMatch from '../LatestMatch'

import MatchCard from '../MatchCard'

class TeamMatches extends Component {
  state = {oneTeamDetails: [], isTrue: true}

  componentDidMount() {
    this.getTeamItemData()
  }

  getTeamItemData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const response = await fetch(`https://apis.ccbp.in/ipl/${id}`)

    const data = await response.json()

    const latestMatch = {
      competingTeam: data.latest_match_details.competing_team,
      competingTeamLogo: data.latest_match_details.competing_team_logo,
      date: data.latest_match_details.date,
      firstInnings: data.latest_match_details.first_innings,
      manOfTheMatch: data.latest_match_details.man_of_the_match,
      matchStatus: data.latest_match_details.match_status,
      result: data.latest_match_details.result,
      secondInnings: data.latest_match_details.second_innings,
      umpires: data.latest_match_details.umpires,
      venue: data.latest_match_details.venue,
    }

    const recentMatchesUp = data.recent_matches.map(eachTwo => ({
      competingTeam: eachTwo.competing_team,
      competingTeamLogo: eachTwo.competing_team_logo,
      umpires: eachTwo.umpires,
      result: eachTwo.result,
      manOfTheMatch: eachTwo.man_of_the_match,
      matchStatus: eachTwo.match_status,
      secondInnings: eachTwo.second_innings,
      date: eachTwo.date,
      firstInnings: eachTwo.first_innings,
      id: eachTwo.id,
      venue: eachTwo.venue,
    }))

    const updatedData = {
      teamBannerUrl: data.team_banner_url,
      latestMatchDetails: latestMatch,
      recentMatches: recentMatchesUp,
    }

    this.setState({oneTeamDetails: updatedData, isTrue: false})
  }

  getRouteClassName = () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    switch (id) {
      case 'RCB':
        return 'rcb'
      case 'KKR':
        return 'kkr'
      case 'KXP':
        return 'kxp'
      case 'CSK':
        return 'csk'
      case 'RR':
        return 'rr'
      case 'MI':
        return 'mi'
      case 'SH':
        return 'srh'
      case 'DC':
        return 'dc'
      default:
        return ''
    }
  }

  renderLoader = () => (
    <div data-testid="loader" className="loader-container">
      <Loader type="Oval" color="#ffffff" height={50} />
    </div>
  )

  render() {
    const {oneTeamDetails, isTrue} = this.state

    const className = `team-matches-container ${this.getRouteClassName()}`

    const {teamBannerUrl, latestMatchDetails, recentMatches} = oneTeamDetails

    return (
      <div className={className}>
        <img src={teamBannerUrl} alt="team banner" />
        {isTrue ? (
          this.renderLoader()
        ) : (
          <LatestMatch eachDetails={latestMatchDetails} />
        )}
        <ul className="resentAllMatches">
          {isTrue
            ? this.renderLoader()
            : recentMatches.map(eachMatch => (
                <MatchCard key={eachMatch.id} everyMatch={eachMatch} />
              ))}
        </ul>
      </div>
    )
  }
}

export default TeamMatches
