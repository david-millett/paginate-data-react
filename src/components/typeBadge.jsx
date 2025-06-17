import { typeColors } from "../utils/types"

const TypeBadge = ({ type, changePokemonList }) => {

    const typeColor = typeColors[type.toLowerCase()]

    return (
        <p
            className='type'
            style={{ backgroundColor: typeColor }}
            onClick={changePokemonList}
        >
            {type}
        </p>
    )
}

export default TypeBadge