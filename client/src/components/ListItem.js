import { Link } from 'react-router-dom'

function ListItem(props) {
  return (
    <div className="col-3 col-xs-6">
      <div className="card text-center mb-4">
        <h3>Name: {props.name}</h3>
        <h5>Id: {props.id}</h5>
        <h4>Pokedex: {props.pokedexNumber}</h4>
        <h5>Height: {props.height}</h5>
        <img src={props.image} alt="Pokemon" />
        <Link to={`/pokemon/${props.name}`}>
          View
        </Link>
      </div>
    </div>
  )
}

export default ListItem