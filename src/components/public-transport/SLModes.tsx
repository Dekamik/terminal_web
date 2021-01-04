import { faBus, faSubway, faTrain, faShip, faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export enum SLMode {
    Bus = 0,
    Subway = 1,
    CommuterTrain = 2,
    Tram = 3,
    Boat = 4
}

export function getModeIcon(mode: SLMode) {
    switch (mode) {

        case SLMode.Bus:
            return <FontAwesomeIcon icon={faBus} />

        case SLMode.Subway:
            return <FontAwesomeIcon icon={faSubway} />

        case SLMode.CommuterTrain:
        case SLMode.Tram:
            return <FontAwesomeIcon icon={faTrain} />

        case SLMode.Boat:
            return <FontAwesomeIcon icon={faShip} />
        
        default:
            return <FontAwesomeIcon icon={faExclamationTriangle} />
    }
}
