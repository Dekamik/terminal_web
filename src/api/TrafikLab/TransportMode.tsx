import { faBus, faExclamationTriangle, faShip, faSubway, faTrain } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"

export enum TransportMode {
    Bus = "BUS",
    Metro = "METRO",
    Train = "TRAIN",
    Tram = "TRAM",
    Ship = "SHIP",
    Unspecified = ""
}

export function getModeIcon(mode: TransportMode) {
    switch (mode) {

        case TransportMode.Bus:
            return <FontAwesomeIcon icon={faBus} />

        case TransportMode.Metro:
            return <FontAwesomeIcon icon={faSubway} />

        case TransportMode.Train:
        case TransportMode.Tram:
            return <FontAwesomeIcon icon={faTrain} />

        case TransportMode.Ship:
            return <FontAwesomeIcon icon={faShip} />
        
        default:
            return <FontAwesomeIcon icon={faExclamationTriangle} />
    }
}
