import { typeColors } from "../utils/types"

const TypeBadge = ({ type }) => {
    return (
        <p className='type' style={{ backgroundColor: typeColors[type.toLowerCase()] }}>{type}</p>
    )
}

export default TypeBadge