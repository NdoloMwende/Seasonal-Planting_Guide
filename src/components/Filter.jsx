import { useState } from "react"

function Filter () {
    const [selectedOption, setSelectedOption] = useState("")
    return (
        <div className="filter">
            <form>
                <select value={selectedOption} onChange={setSelectedOption(e => e.target.value)}>
                    <option value="">Select a Season</option>
                    <option value="Temperate">Temperate</option>
                    <option value="Tropical">Tropical</option>
                    <option value="Dry">Dry</option>
                </select>
            </form>
        </div>
    )
}

export default Filter;