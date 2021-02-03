import moment from "moment";
import React from "react";
import { getDateStr, getTimeStr, isSameDate, isSameYear } from "../../helpers/DateHelper";
import { contains } from "../../helpers/StringHelper";
import { ModalSize } from "../common/modal/ModalSize";
import { SingleButtonModal } from "../common/modal/SingleButtonModal";
import { DeviationSeverity } from "./SLDepartureDeviationsRow";
import { ISLDeviationsModalItem, SLDeviationsModalItem } from "./SLDeviationsModalItem";

interface ISLDeviationsModal {
    deviations?: ISLDeviationsModalItem[];
}



export const SLDeviationsModal: React.FunctionComponent<ISLDeviationsModal> = (props) => {

    

    return (
        <SingleButtonModal id="disruptionsModal" title="Störningar" modalSize={ModalSize.Large}>
            {
                props.deviations
                    ? props.deviations.map((item: ISLDeviationsModalItem) => 
                        <SLDeviationsModalItem {...item} />
                    )
                    : null
            }
        </SingleButtonModal>
    );
}