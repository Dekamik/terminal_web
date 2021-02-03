import React from "react";
import { ModalSize } from "../common/modal/ModalSize";
import { SingleButtonModal } from "../common/modal/SingleButtonModal";
import { ISLDeviationsModalItem, SLDeviationsModalItem } from "./SLDeviationsModalItem";

interface ISLDeviationsModal {
    deviations?: ISLDeviationsModalItem[];
}

export const SLDeviationsModal: React.FunctionComponent<ISLDeviationsModal> = (props) => {
    return (
        <SingleButtonModal id="disruptionsModal" title="Störningar" modalSize={ModalSize.Large}>
            <div className="col-12" id="accordion">
                <div className="card text-white custom-border-dark">
                    {
                        props.deviations
                            ? props.deviations.map((item: ISLDeviationsModalItem) => 
                                <SLDeviationsModalItem {...item} />
                            )
                            : null
                    }
                </div>
            </div>
        </SingleButtonModal>
    );
}