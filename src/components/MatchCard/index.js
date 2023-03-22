// Write your code here
import './index.css'

const MatchCard = props => {
  const {everyMatch} = props

  const {
    competingTeam,
    competingTeamLogo,
    umpires,
    result,
    manOfTheMatch,
    matchStatus,
    secondInnings,
    date,
    firstInnings,
    id,
    venue,
  } = everyMatch

  return (
    <li className="match-item">
      <img
        src={competingTeamLogo}
        alt={competingTeam}
        className="competing-team-logo"
      />
      <p className="heading">{competingTeam}</p>
      <p>{matchStatus}</p>
      <p>{result}</p>
    </li>
  )
}

export default MatchCard
