import { faSms } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DOMPurify from 'dompurify';
import * as React from 'react';

export interface IRssFeedItem {
    id: number;
    title?: string;
    description?: string;
    date?: string;
    link?: string;
    feedImage?: string;
    feedImageAlt?: string;
}

export const RssFeedItem: React.FunctionComponent<IRssFeedItem> = (props) => {

    const detailsId = `details${props.id}`;

    const sendLink = () => {

    }

    return (
        <>
            <div key={props.id} className="card text-dark">
                <div className="card-header"
                    data-toggle="collapse"
                    data-target={`#${detailsId}`}
                    aria-expanded="false"
                    aria-controls={detailsId}>
                    <div className="row align-middle">
                        <div className="col-10">
                            <h4>
                                {props.title}
                            </h4>
                        </div>
                        <div className="col-2 text-right">
                            <img className="rss-thumbnail" src={props.feedImage} alt={props.feedImageAlt} />
                        </div>
                    </div>
                </div>
                <div id={detailsId} className="collapse">
                    <div className="card-body">
                        <p className="text-muted">{props.date}</p>
                        <div dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(props.description) ?? ""}}>

                        </div>
                    </div>
                    <div className="card-footer text-right">
                        <button className="btn btn-info btn-lg" onClick={sendLink} ><FontAwesomeIcon icon={faSms} /> Skicka länk</button>
                    </div>
                </div>
            </div>
            <hr/>
        </>
    );
}